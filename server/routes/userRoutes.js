import express from 'express';
// Use the clerkMiddleware to verify the session token
import { clerkMiddleware } from '@clerk/express'; 
import { 
    addUserRating, 
    getUserCourseProgress, 
    getUserData, 
    updateUserCourseProgress, 
    userEnrolledCourses, 
    enrollUser 
} from '../controllers/userController.js';

const userRouter = express.Router();

// Adding clerkMiddleware() to each route ensures req.auth is populated
userRouter.get('/data', clerkMiddleware(), getUserData);
userRouter.get('/enrolled-courses', clerkMiddleware(), userEnrolledCourses);
userRouter.post('/update-course-progress', clerkMiddleware(), updateUserCourseProgress);
userRouter.post('/get-course-progress', clerkMiddleware(), getUserCourseProgress);
userRouter.post('/add-rating', clerkMiddleware(), addUserRating);
userRouter.post('/enroll', clerkMiddleware(), enrollUser);

export default userRouter;