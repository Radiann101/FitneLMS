import { CourseProgress } from "../models/CourseProgress.js"
import User from "../models/User.js"
import Course from "../models/Course.js"
//Fetch user data
export const getUserData = async (req, res) => {
    try {
        // Extract userId from the auth object provided by the middleware
        const { userId } = req.auth; 
        console.log(userId)
        if (!userId) {
            return res.json({ success: false, message: 'Unauthorized: No User ID found' });
        }

        // Search for the user using the string ID from Clerk
        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, message: 'User not found in Database' });
        }

        res.json({ success: true, user });

    } catch (error) {
        console.error("Controller Error:", error.message);
        res.json({ success: false, message: error.message });
    }
};

//Users Enrolled Courses w lecture link
export const userEnrolledCourses = async (req, res) => {
    try {
        // Change from req.auth.userId to req.auth() to get the actual ID
        const { userId } = req.auth();

        // Use findById (which works because my schema defines _id as String)
        const userData = await User.findById(userId).populate('enrolledCourses');

        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, enrolledCourses: userData.enrolledCourses });

    } catch (error) {
        res.json({ success: false, message: error.message });
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
        // Correct way to get userId with clerkMiddleware()
        const { userId } = req.auth();
        const { courseId } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.json({ success: false, message: 'Course not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.enrolledCourses.includes(courseId)) {
            return res.json({ success: true, message: 'Already enrolled' });
        }

        user.enrolledCourses.push(courseId);
        await user.save();

        // Ensure this matches your schema (enrolledUsers)
        course.enrolledUsers.push(userId);
        await course.save();

        res.json({ success: true, message: 'Successfully enrolled' });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}