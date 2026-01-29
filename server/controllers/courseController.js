import Course from "../models/Course.js";

//Fetch all courses
export const getAllCourses = async(req, res)=>{
    try {
        const courses = await Course.find({isPublished: true}).select(
            ['-courseContent', '-enrolledUsers']).populate({path: 'admin'})
        res.json({success: true, courses})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//Get Course by id
export const getCourseId = async(req, res) =>{
    const {id} = req.params
    try {
        const courseData = await Course.findById(id).populate({path: 'admin'})
        res.json({success: true, courseData})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}