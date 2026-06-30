import { clerkClient } from '@clerk/express'
import Course from '../models/Course.js'
import { v2 as cloudinary } from 'cloudinary'
import User from '../models/User.js'
import redisClient from '../configs/redisClient.js'
import inProcessCache from '../configs/inProcessCache.js'
import memcachedClient from '../configs/memcachedClient.js'
import { cacheStats, resetStats, CACHE_BACKEND } from '../middlewares/cacheMiddleware.js'

// Returns whichever cache engine is active — avoids repeating this logic below
const getActiveCache = () =>
    CACHE_BACKEND === 'redis'      ? redisClient
  : CACHE_BACKEND === 'memcached' ? memcachedClient
  : inProcessCache;


//promote someone to admin, only me for the time being
export const updateRoleToAdmin = async (req, res) => {
    try {
        const userId = req.auth.userId

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: 'admin',

            }
        })
        res.json({ success: true, message: 'You are an administrator now' })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Add new course
export const addCourse = async (req, res) => {
    try {
        const { courseData } = req.body
        const imageFile = req.file
        const adminId = req.auth.userId
        if (!imageFile) {
            return res.json({ success: false, message: 'Thumbnail Not Attached' })
        }
        const parsedCourseData = await JSON.parse(courseData)
        parsedCourseData.admin = adminId
        const newCourse = await Course.create(parsedCourseData)
        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        newCourse.courseThumbnail = imageUpload.secure_url
        await newCourse.save()

        // 🔴 Cache Invalidation: delete the stale all-courses cache from the active backend
        await getActiveCache().del('courses:all')
        console.log(`🗑️  Cache invalidated (${CACHE_BACKEND}): courses:all`)

        res.json({ success: true, message: 'Course Added' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


//Get courses of any admin(only me for now)
export const getAdminCourses = async (req, res) => {
    try {
        const admin = req.auth.userId
        const courses = await Course.find({ admin })
        res.json({ success: true, courses })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Get Admin Dashboard Data (Enrolled users, No. courses)
export const adminDashboardData = async (req, res) => {
    try {
        const admin = req.auth.userId
        const courses = await Course.find({ admin })
        const totalCourses = courses.length
        //Fetch unique enrolled user Id's
        const enrolledUsersData = []
        for (const course of courses) {
            const users = await User.find(
                {
                    _id: { $in: course.enrolledUsers }
                }, 'name imageUrl');
            users.forEach(user => { // Corrected: removed .array and changed variable to 'user'
                enrolledUsersData.push({
                    courseTitle: course.courseTitle,
                    student: user // Frontend expects 'student' property
                });
            });
        }
        res.json({
            success: true, dashboardData: {
                enrolledUsersData, totalCourses
            }
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getEnrolledStudentsData = async (req, res) => {
    try {
        const admin = req.auth.userId;

        // 1. Find all courses owned by this admin
        // 2. 'Populate' the enrolledUsers array with actual name and image data
        const courses = await Course.find({ admin }).populate('enrolledUsers', 'name imageUrl email');

        const enrolledStudents = [];

        // 3. Flatten the data so it's easy for your frontend table to display
        courses.forEach(course => {
            course.enrolledUsers.forEach(user => {
                enrolledStudents.push({
                    student: user,            // Contains name and imageUrl
                    courseTitle: course.courseTitle,
                    enrolledAt: course.updatedAt // Approximates enrollment time
                });
            });
        });

        res.json({ success: true, enrolledStudents });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// DELETE /api/admin/cache-clear — Flush all course cache keys (for demo / testing)
export const clearCache = async (req, res) => {
    try {
        const activeCache = getActiveCache();
        const keys = await activeCache.keys('course*');
        if (keys.length > 0) {
            await activeCache.del(keys);
        }
        console.log(`🗑️  Manually cleared ${keys.length} ${CACHE_BACKEND} cache key(s)`);
        res.json({ success: true, message: `Cleared ${keys.length} cache key(s): ${keys.join(', ') || 'none'}` });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
export const getCacheStats = async (req, res) => {
    try {
        const hits = cacheStats.hits;
        const misses = cacheStats.misses;
        const total = hits + misses;
        const hitRate = total > 0 ? ((hits / total) * 100).toFixed(2) : '0.00';

        const avg = (arr) => arr.length > 0
            ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2)
            : 'N/A';

        res.json({
            success: true,
            stats: {
                hits,
                misses,
                total,
                hitRate: `${hitRate}%`,
                avgCachedMs: avg(cacheStats.responseTimes.cached),
                avgUncachedMs: avg(cacheStats.responseTimes.uncached),
                cacheBackend: CACHE_BACKEND,  // tells the frontend which engine is active
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// POST /api/admin/cache-stats/reset — Zero out in-memory hit/miss counters
export const resetCacheStats = (req, res) => {
    try {
        resetStats();
        console.log('Stats counters reset to zero');
        res.json({ success: true, message: 'Cache stats have been reset to zero.' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

