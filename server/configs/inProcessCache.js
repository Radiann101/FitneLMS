/**
 * In-Process Memory Cache
 * A lightweight TTL-aware cache backed by a plain JavaScript Map.
 * Exposes the same interface used by the Redis client (get, setEx, del, keys)
 * so the middleware can swap between backends without any logic changes.
 */

const store = new Map(); // { key -> { value: string, expiresAt: number } }

const inProcessCache = {
    /**
     * Retrieve a value by key. Returns null if missing or expired.
     */
    get(key) {
        const entry = store.get(key);
        if (!entry) return null;
        if (Date.now() > entry.expiresAt) {
            store.delete(key);
            return null;
        }
        return entry.value;
    },

    /**
     * Store a value with a TTL (in seconds), matching Redis setEx signature.
     */
    setEx(key, ttlSeconds, value) {
        store.set(key, {
            value,
            expiresAt: Date.now() + ttlSeconds * 1000,
        });
    },

    /**
     * Delete one or more keys. Accepts a single string or an array of strings.
     */
    del(keys) {
        const targets = Array.isArray(keys) ? keys : [keys];
        targets.forEach((k) => store.delete(k));
    },

    /**
     * Return all keys that start with the given prefix (matches Redis KEYS pattern).
     */
    keys(pattern) {
        // Strip trailing '*' — we just match by prefix
        const prefix = pattern.replace('*', '');
        return [...store.keys()].filter((k) => k.startsWith(prefix));
    },
};

export default inProcessCache;
