import { createClient } from 'redis';

// Only connect to Redis if the cache backend is set to 'redis' (or not set at all)
const CACHE_BACKEND = process.env.CACHE_BACKEND || 'redis';

let redisClient = null;

if (CACHE_BACKEND === 'redis') {
    redisClient = createClient({
        url: process.env.REDIS_URL,
    });

    redisClient.on('error', (err) => {
        console.error('Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
        console.log(' Connected to Redis');
    });

    await redisClient.connect();
} else {
    console.log(` Cache backend is '${CACHE_BACKEND}' — skipping Redis connection.`);
}

export default redisClient;
