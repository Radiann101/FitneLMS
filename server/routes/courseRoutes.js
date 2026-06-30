import express from 'express'
import { getAllCourses, getCourseId, cacheAllCourses, cacheCourseById } from '../controllers/courseController.js'
const courseRouter = express.Router()
courseRouter.get('/all', cacheAllCourses, getAllCourses)
courseRouter.get('/:id', cacheCourseById, getCourseId)
export default courseRouter;