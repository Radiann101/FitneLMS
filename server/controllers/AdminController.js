import {clerkClient} from '@clerk/express'
import Course from '../models/Course.js'
import {v2 as cloudinary} from 'cloudinary'
import User from '../models/User.js'


//promote someone to admin, only me for the time being
export const updateRoleToAdmin = async (req, res)=>
{
    try {
        const userId = req.auth.userId

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: 'admin',

            }
        })
        res.json({success: true, message: 'You are an administrator now'})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//Add new course
export const addCourse = async (req, res) =>{
    try {
        const {courseData} = req.body
        const imageFile = req.file
        const adminId = req.auth.userId
        if (!imageFile){
            return res.json({success: false, message: 'Thumbnail Not Attached'})
        }
        const parsedCourseData = await JSON.parse(courseData)
        parsedCourseData.admin = adminId
        const newCourse = await Course.create(parsedCourseData)
        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        newCourse.courseThumbnail = imageUpload.secure_url
        await newCourse.save()
        res.json({success: true, message:'Course Added'})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


//Get courses of any admin(only me for now)
export const getAdminCourses = async(req, res)=>{
    try {
        const admin = req.auth.userId
        const courses = await Course.find({admin})
        res.json({success: true, courses})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//Get Admin Dashboard Data (Enrolled users, No. courses)
export const adminDashboardData = async (req, res)=>{
    try {
        const admin = req.auth.userId
        const courses = await Course.find({admin})
        const totalCourses = courses.length
        //Fetch unique enrolled user Id's
        const enrolledUsersData = []
        for(const course of courses) {
            const users = await User.find(
        {
            _id: {$in: course.enrolledUsers}
        }, 'name imageUrl');
        users.forEach(user => { // Corrected: removed .array and changed variable to 'user'
            enrolledUsersData.push({
            courseTitle: course.courseTitle,
            student: user // Frontend expects 'student' property
    });
});
    }
        res.json({success: true, dashboardData: {
            enrolledUsersData, totalCourses
    }})
    } catch (error) {
        res.json({success: false, message: error.message})
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
