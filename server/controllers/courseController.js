import Course from "../models/Course.js";
import cacheMiddleware from "../middlewares/cacheMiddleware.js";
import redisClient from "../configs/redisClient.js";

// Cache TTL constants (in seconds)
const TTL_ALL_COURSES = 3600;   // 1 hour
const TTL_SINGLE_COURSE = 3600; // 1 hour

// Exported middleware so routes can use it directly
export const cacheAllCourses = cacheMiddleware('courses:all', TTL_ALL_COURSES);
export const cacheCourseById = (req, res, next) =>
    cacheMiddleware(`course:${req.params.id}`, TTL_SINGLE_COURSE)(req, res, next);

//Fetch all courses
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).select(
            ['-courseContent', '-enrolledUsers']).populate({ path: 'admin' })
        res.json({ success: true, courses })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Get Course by id
export const getCourseId = async (req, res) => {
    const { id } = req.params
    try {
        const courseData = await Course.findById(id).populate({ path: 'admin' })
        res.json({ success: true, courseData })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}