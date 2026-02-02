import { CourseProgress } from "../models/CourseProgress.js"
import User from "../models/User.js"
import Course from "../models/Course.js"
//Fetch user data
export const getUserData = async(req, res) =>{
    try {
        const userId = req.auth.userId
        const user = await User.findById(userId)
        if (!user){
            return res.json({success: false, message: 'User not found'})
        }
        res.json({success: true, user})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//Users Enrolled Courses w lecture link
export const userEnrolledCourses = async(req, res)=>{
    try {
        const userId = req.auth.userId
        const userData = await User.findById(userId).populate('enrolledCourses')
        res.json({success: true, enrolledCourses: userData.enrolledCourses})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//User Course Progress

export const updateUserCourseProgress = async (req, res)=>{
    try {
        const userId = req.auth.userId
        const {courseId, lectureId} = req.body
        const progressData = await CourseProgress.findOne({userId, courseId})
        if(progressData){
            if (progressData.lectureCompleted.includes(lectureId)){
                return res.json({success: true, message: 'Lecture Already Completed'})
            }

            progressData.lectureCompleted.push(lectureId)
            await progressData.save()
        } else {
            await CourseProgress.create({
                userId, courseId, lectureCompleted:[lectureId]
            })
        }
        res.json({success: true, message: 'Progress Updated'})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//get User Course Progress
export const getUserCourseProgress= async(req, res) =>{
    try {
        const userId = req.auth.userId
        const {courseId} = req.body
        const progressData = await CourseProgress.findOne({userId, courseId})
        return res.json({success: true, progressData})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//Add User Rating to course
export const addUserRating = async(req, res)=>{
    const userId= req.auth.userId;
    const {courseId, rating} = req.body;
    if (!courseId || !userId || !rating || rating<1 || rating>5){
        return res.json({success: false, message: 'Invalid Values'})
    }
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.json({success: false, message: 'Course not found'})
        }
        const user = await User.findById(userId)
        if (!user || !user.enrolledCourses.includes(courseId)) {
            return res.json({ success: false, message: 'User is not enrolled in this course' });
        }
        const existingRating = course.courseRatings.findIndex(r => r.userId === userId)
        if(existingRating > -1){
            course.courseRatings[existingRating].rating = rating;
        } else{
            course.courseRatings.push({userId, rating})
        }
        await course.save();

        return res.json({success:true, message:'Rating added'})

    } catch (error) {
         return res.json({success:false, message: error.message})
    }
}

// Enroll User in a Course (Free)
export const enrollUser = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { courseId } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.json({ success: false, message: 'Course not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        // Check if already enrolled to prevent duplicates
        if (user.enrolledCourses.includes(courseId)) {
            return res.json({ success: true, message: 'Already enrolled' });
        }

        // 1. Add Course to User's enrolledCourses array
        user.enrolledCourses.push(courseId);
        await user.save();

        // 2. Add User to Course's enrolledStudents array
        if (course.enrolledUsers) {
            course.enrolledUsers.push(userId);
            await course.save();
        }

        res.json({ success: true, message: 'Successfully enrolled' });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}