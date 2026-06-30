import MemJS from 'memjs';

// Only connect to Memcached if the cache backend is set to 'memcached'
const CACHE_BACKEND = process.env.CACHE_BACKEND || 'redis';

let memcachedClient = null;

if (CACHE_BACKEND === 'memcached') {
    const servers = process.env.MEMCACHED_SERVERS || '127.0.0.1:11211';

    memcachedClient = MemJS.Client.create(servers, {
        // Retry failed connections up to 3 times before giving up
        retries: 3,
        retry_delay: 0.2,   // seconds between retries
        // Timeout per operation (ms) — keeps latency measurements honest
        timeout: 0.5,
    });

    console.log(`Connected to Memcached at ${servers}`);
} else {
    console.log(`  Cache backend is '${CACHE_BACKEND}' — skipping Memcached connection.`);
}

/**
 * Thin adapter that wraps the memjs client to expose the same interface
 * used by redisClient and inProcessCache (get / setEx / del / keys).
 * This means cacheMiddleware.js requires zero logic changes — it just
 * calls cache.get(), cache.setEx(), cache.del() regardless of backend.
 */
const memcachedAdapter = memcachedClient
    ? {
        /**
         * Get a value. memjs returns { value: Buffer | null }.
         * We convert to string to match Redis/in-process behaviour.
         */
        async get(key) {
            const { value } = await memcachedClient.get(key);
            return value ? value.toString() : null;
        },

        /**
         * Store a value with a TTL in seconds — same signature as Redis setEx.
         */
        async setEx(key, ttlSeconds, value) {
            await memcachedClient.set(key, value, { expires: ttlSeconds });
        },

        /**
         * Delete one or more keys.
         */
        async del(keys) {
            const targets = Array.isArray(keys) ? keys : [keys];
            await Promise.all(targets.map((k) => memcachedClient.delete(k)));
        },

        /**
         * Memcached has no native KEYS command.
         * We track written keys in a small in-process Set so we can enumerate them.
         * This is only used for the admin "clear cache" feature — not on the hot path.
         */
        _knownKeys: new Set(),
        keys(pattern) {
            const prefix = pattern.replace('*', '');
            return [...this._knownKeys].filter((k) => k.startsWith(prefix));
        },
    }
    : null;

// Patch setEx to also record keys in _knownKeys so del/keys work
if (memcachedAdapter) {
    const originalSetEx = memcachedAdapter.setEx.bind(memcachedAdapter);
    memcachedAdapter.setEx = async function (key, ttlSeconds, value) {
        this._knownKeys.add(key);
        return originalSetEx(key, ttlSeconds, value);
    };
}

export default memcachedAdapter;
