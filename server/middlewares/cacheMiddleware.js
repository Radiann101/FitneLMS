import { performance } from 'perf_hooks';
import redisClient from '../configs/redisClient.js';
import inProcessCache from '../configs/inProcessCache.js';
import memcachedClient from '../configs/memcachedClient.js';

// Read which backend to use from the environment (set before server starts)
const CACHE_BACKEND = process.env.CACHE_BACKEND || 'redis';

// Pick the active cache engine once at startup
// Supported values: 'redis' | 'memory' | 'memcached'
const cache =
    CACHE_BACKEND === 'redis' ? redisClient
        : CACHE_BACKEND === 'memcached' ? memcachedClient
            : inProcessCache;

console.log(`Cache middleware using backend: ${CACHE_BACKEND.toUpperCase()}`);

// Track cache hit/miss stats in memory for the admin dashboard
export const cacheStats = {
    hits: 0,
    misses: 0,
    responseTimes: { cached: [], uncached: [] },
};

// Resets all counters to zero (called by the admin reset endpoint)
export const resetStats = () => {
    cacheStats.hits = 0;
    cacheStats.misses = 0;
    cacheStats.responseTimes.cached = [];
    cacheStats.responseTimes.uncached = [];
};


/**
 * Generic Express cache middleware.
 * Usage: router.get('/route', cacheMiddleware('cache-key', ttlSeconds), controller)
 *
 * Uses performance.now() for sub-millisecond precision — essential for
 * in-process cache hits which complete in microseconds (< 1ms).
 * Date.now() has only 1ms resolution and always returned 0 for in-memory hits.
 *
 * @param {string} key    - Cache key to store the response under
 * @param {number} ttl    - Time-to-live in seconds (default: 1 hour)
 */
const cacheMiddleware = (key, ttl = 3600) => {
    return async (req, res, next) => {
        const start = performance.now(); // high-precision timer (sub-millisecond)
        try {
            const cached = await cache.get(key);

            if (cached) {
                // Cache HIT — return stored data immediately
                const elapsed = parseFloat((performance.now() - start).toFixed(3));
                cacheStats.hits++;
                cacheStats.responseTimes.cached.push(elapsed);

                return res.json({
                    ...JSON.parse(cached),
                    _cache: 'HIT',
                    _responseTimeMs: elapsed,
                    _cacheBackend: CACHE_BACKEND,
                });
            }

            // Cache MISS — let the real controller run, then intercept the response
            cacheStats.misses++;

            // Override res.json to intercept the response from the controller
            const originalJson = res.json.bind(res);
            res.json = async (data) => {
                const elapsed = parseFloat((performance.now() - start).toFixed(3));
                cacheStats.responseTimes.uncached.push(elapsed);

                // Only cache successful responses
                if (data && data.success) {
                    await cache.setEx(key, ttl, JSON.stringify({
                        ...data,
                        _cache: 'MISS',
                        _responseTimeMs: elapsed,
                        _cacheBackend: CACHE_BACKEND,
                    }));
                }

                // Send the original response with metadata
                return originalJson({
                    ...data,
                    _cache: 'MISS',
                    _responseTimeMs: elapsed,
                    _cacheBackend: CACHE_BACKEND,
                });
            };

            next();
        } catch (err) {
            // If the cache engine fails, fall through gracefully — don't break the app
            console.error('Cache middleware error:', err.message);
            next();
        }
    };
};

export { CACHE_BACKEND };
export default cacheMiddleware;
