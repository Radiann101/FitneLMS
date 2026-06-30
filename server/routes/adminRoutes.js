import express from 'express'

import { addCourse, adminDashboardData, getAdminCourses, getEnrolledStudentsData, updateRoleToAdmin, getCacheStats, clearCache, resetCacheStats } from '../controllers/AdminController.js'
import upload from '../configs/multer.js'
import { protectAdmin } from '../middlewares/authMiddleware.js'

const adminRouter = express.Router()

//give admin role
adminRouter.get('/update-role', updateRoleToAdmin)
adminRouter.post('/add-course', upload.single('image'), protectAdmin, addCourse)
adminRouter.get('/courses', protectAdmin, getAdminCourses)
adminRouter.get('/dashboard', protectAdmin, adminDashboardData)
adminRouter.get('/enrolled-users', protectAdmin, getEnrolledStudentsData)
adminRouter.get('/cache-stats', protectAdmin, getCacheStats)
adminRouter.delete('/cache-clear', protectAdmin, clearCache)
adminRouter.post('/cache-stats/reset', protectAdmin, resetCacheStats)
export default adminRouter