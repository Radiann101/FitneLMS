/**
 * benchmark/run.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Single-backend, single-scenario autocannon benchmark for the FitneLMS
 * caching layer.
 *
 * HOW TO USE:
 *   1. Set CACHE_BACKEND in server/.env  (redis | memcached | memory)
 *   2. Start the server:  npm run server
 *   3. In a separate terminal:
 *        node benchmark/run.js <scenario>
 *      where <scenario> is one of:  low | medium | high | stress
 *
 * The script will:
 *   - Auto-detect CACHE_BACKEND from server/.env
 *   - Run a warm-up pass (not measured), then the real measured pass
 *   - Print this backend's result (6 metrics) in the console
 *   - Append to benchmark/results.json  (all history preserved)
 *   - If all 3 backends are done for this scenario, print the full table
 * ─────────────────────────────────────────────────────────────────────────────
 */

import autocannon from 'autocannon';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Scenarios ────────────────────────────────────────────────────────────────

const SCENARIOS = {
    low: { connections: 10, label: 'Low    (10 connections)   — normal usage' },
    medium: { connections: 100, label: 'Medium (100 connections)  — moderate spike' },
    high: { connections: 500, label: 'High   (500 connections)  — heavy load' },
    stress: { connections: 1000, label: 'Stress (1000 connections) — peak / worst-case' },
};

// ─── Configuration ────────────────────────────────────────────────────────────

const TARGET_URL = 'http://localhost:5000/api/course/all';
const DURATION_SEC = 10;   // seconds per measured run
const WARMUP_SEC = 3;    // warm-up pass (not recorded)

const ENV_PATH = path.resolve(__dirname, '../.env');
const RESULTS_PATH = path.resolve(__dirname, 'results.json');
const ALL_BACKENDS = ['redis', 'memcached', 'memory'];

// ─── CLI — scenario argument ──────────────────────────────────────────────────

const scenarioKey = process.argv[2]?.toLowerCase();

if (!scenarioKey || !SCENARIOS[scenarioKey]) {
    console.error('\n  Please provide a valid scenario as the first argument.');
    console.error('    Usage:  node benchmark/run.js <scenario>\n');
    console.error('    Available scenarios:');
    for (const [key, val] of Object.entries(SCENARIOS)) {
        console.error(`      ${key.padEnd(8)} — ${val.label}`);
    }
    console.error('');
    process.exit(1);
}

const scenario = SCENARIOS[scenarioKey];

// ─── .env reader ──────────────────────────────────────────────────────────────

/** Read a specific key from a .env file without requiring dotenv */
function readEnvKey(filePath, key) {
    if (!fs.existsSync(filePath)) return null;
    const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('#') || !trimmed.includes('=')) continue;
        const [k, ...rest] = trimmed.split('=');
        if (k.trim() === key) return rest.join('=').trim().replace(/^['"]|['"]$/g, '');
    }
    return null;
}

// ─── Results JSON helpers ─────────────────────────────────────────────────────

/**
 * Detect and migrate old flat schema { redis: [...], memcached: [...], memory: [...] }
 * to the new nested schema { low: { redis: [...], ... }, medium: { ... } }
 * Old runs used 10 connections → they belong under "low".
 */
function migrateIfNeeded(data) {
    const isOldSchema = ALL_BACKENDS.some(b => Array.isArray(data[b]));
    if (!isOldSchema) return data;

    console.log(' Old results.json format detected — migrating data to new schema (placing under "low")...\n');
    const migrated = { low: {} };
    for (const b of ALL_BACKENDS) {
        if (Array.isArray(data[b])) migrated.low[b] = data[b];
    }
    return migrated;
}

function loadResults() {
    if (!fs.existsSync(RESULTS_PATH)) return {};
    try {
        const raw = JSON.parse(fs.readFileSync(RESULTS_PATH, 'utf8'));
        return migrateIfNeeded(raw);
    } catch {
        return {};
    }
}

function saveResults(data) {
    fs.writeFileSync(RESULTS_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// ─── Benchmark helpers ────────────────────────────────────────────────────────

/** Run autocannon and return the results object */
function bench(connections, opts = {}) {
    return new Promise((resolve, reject) => {
        const instance = autocannon({
            url: TARGET_URL,
            duration: opts.duration ?? DURATION_SEC,
            connections,
            ...opts,
        }, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
        autocannon.track(instance, { renderProgressBar: true });
    });
}

const fmt = (v) => (v != null ? Number(v).toFixed(2) : 'N/A');
const fmt3 = (v) => (v != null ? Number(v).toFixed(3) : 'N/A');

// ─── Table helpers ────────────────────────────────────────────────────────────

// Column widths: Backend | Avg Lat | Std Dev | p95 Lat | Req/sec | MB/s | Errors
const COL = [16, 14, 14, 14, 12, 10, 8];
const sep = '─'.repeat(COL.reduce((a, b) => a + b, 0) + COL.length - 1);

function printTableHeader() {
    const header = [
        'Backend'.padEnd(COL[0]),
        'Avg Lat (ms)'.padEnd(COL[1]),
        'Std Dev (ms)'.padEnd(COL[2]),
        'p95 Lat (ms)'.padEnd(COL[3]),
        'Req/sec'.padEnd(COL[4]),
        'MB/s'.padEnd(COL[5]),
        'Errors'.padEnd(COL[6]),
    ];
    console.log(header.join(' │ '));
    console.log(sep);
}

function printTableRow(r) {
    const row = [
        r.backend.padEnd(COL[0]),
        fmt(r.avgLatency).padEnd(COL[1]),
        fmt(r.stdDev).padEnd(COL[2]),
        fmt(r.p95Latency).padEnd(COL[3]),
        fmt(r.reqPerSec).padEnd(COL[4]),
        fmt3(r.throughput).padEnd(COL[5]),
        String(r.errors).padEnd(COL[6]),
    ];
    console.log(row.join(' │ '));
}

// ─── Main ─────────────────────────────────────────────────────────────────────

// 1. Detect active backend from server/.env
const backend = readEnvKey(ENV_PATH, 'CACHE_BACKEND');
if (!backend || !ALL_BACKENDS.includes(backend)) {
    console.error(`\n  Could not read a valid CACHE_BACKEND from: ${ENV_PATH}`);
    console.error(`    Expected one of: ${ALL_BACKENDS.join(', ')}`);
    console.error(`    Got: ${backend ?? '(nothing)'}\n`);
    process.exit(1);
}

// 2. Load existing results (with automatic migration if old format detected)
const allResults = loadResults();

// 3. Banner
console.log('\n');
console.log('   FitneLMS — Cache Backend Benchmark   ');
console.log('\n');
console.log(`  Detected backend : ${backend.toUpperCase()}`);
console.log(`  Scenario         : ${scenarioKey.toUpperCase()}  (${scenario.connections} concurrent connections)`);
console.log(`  Endpoint         : ${TARGET_URL}`);
console.log(`  Duration         : ${DURATION_SEC}s measured  +  ${WARMUP_SEC}s warm-up\n`);
console.log('─'.repeat(55));

// 4. Warm-up pass (results discarded)
console.log(`\n  [Warm-up] Running ${WARMUP_SEC}s warm-up for ${backend} / ${scenarioKey}...`);
await bench(scenario.connections, { duration: WARMUP_SEC });

// 5. Measured pass
console.log(`\n  [Benchmark] Running ${DURATION_SEC}s measured pass for ${backend} / ${scenarioKey}...\n`);
const result = await bench(scenario.connections);

// 6. Build result entry
const scenarioBucket = allResults[scenarioKey] ?? {};
const existingRuns = scenarioBucket[backend] ?? [];
const runNumber = existingRuns.length + 1;

const entry = {
    run: runNumber,
    timestamp: new Date().toISOString(),
    avgLatency: result.latency.mean,
    stdDev: result.latency.stddev,
    p95Latency: result.latency.p97_5 ?? result.latency.p95,
    reqPerSec: result.requests.mean,
    throughput: (result.throughput?.mean ?? 0) / 1e6,   // bytes/s → MB/s
    errors: result.errors,
};

// 7. Print this run's result
console.log(`\n  ${backend.toUpperCase()} / ${scenarioKey.toUpperCase()} — Run #${runNumber} complete.\n`);
console.log('╔══════════════════════════════════════════════════════════════╗');
console.log(`║  Result: ${(backend.toUpperCase() + ' — ' + scenarioKey.toUpperCase() + '  (run #' + runNumber + ')').padEnd(52)}║`);
console.log('╚══════════════════════════════════════════════════════════════╝\n');

printTableHeader();
printTableRow({
    backend: `${backend} #${runNumber}`,
    avgLatency: entry.avgLatency,
    stdDev: entry.stdDev,
    p95Latency: entry.p95Latency,
    reqPerSec: entry.reqPerSec,
    throughput: entry.throughput,
    errors: entry.errors,
});

console.log('\n');

// 8. Persist — append to the correct scenario → backend bucket
allResults[scenarioKey] = {
    ...scenarioBucket,
    [backend]: [...existingRuns, entry],
};
saveResults(allResults);
console.log(` Saved to benchmark/results.json  (${backend} / ${scenarioKey} — run #${runNumber})\n`);

// 9. Progress summary scoped to this scenario only
const doneForScenario = ALL_BACKENDS.filter(b => (allResults[scenarioKey]?.[b]?.length ?? 0) > 0);
const remainingForScenario = ALL_BACKENDS.filter(b => !(allResults[scenarioKey]?.[b]?.length > 0));

if (doneForScenario.length < 3) {
    console.log(`  Scenario [${scenarioKey}] progress: ${doneForScenario.length}/3 backends`);
    console.log(`      Still needed: ${remainingForScenario.join(', ')}\n`);
    console.log('  Switch CACHE_BACKEND in server/.env, restart the server, then run:');
    console.log(`    node benchmark/run.js ${scenarioKey}\n`);
} else {
    // 10. All 3 backends done for this scenario — print full comparison table
    console.log('╔══════════════════════════════════════════════════════════════╗');
    console.log(`║  BENCHMARK RESULTS — ALL BACKENDS — ${scenarioKey.toUpperCase().padEnd(26)}║`);
    console.log('╚══════════════════════════════════════════════════════════════╝\n');
    console.log(`  Scenario  : ${scenarioKey.toUpperCase()}  (${scenario.connections} concurrent connections)`);
    console.log('  (Showing most recent run per backend)\n');

    printTableHeader();
    for (const b of ALL_BACKENDS) {
        const latest = allResults[scenarioKey][b].at(-1);
        printTableRow({
            backend: b,
            avgLatency: latest.avgLatency,
            stdDev: latest.stdDev,
            p95Latency: latest.p95Latency,
            reqPerSec: latest.reqPerSec,
            throughput: latest.throughput,
            errors: latest.errors,
        });
    }
    console.log('\n');
    console.log(`  All 3 backends benchmarked for [${scenarioKey}].`);
    console.log('  Full history in benchmark/results.json\n');
}

console.log('Done.\n');
