import humanizeDuration from 'humanize-duration';
import { createContext, useEffect, useState } from "react";
import { testData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const AppContext=createContext()
export const AppContextProvider = (props) =>{

    const [allCourses, setAllCourses] = useState([])
    const [enrolledCourses, setenrolledCourses] = useState([])
    const [isAdmin, setIsAdmin] = useState(true);
    const navigate = useNavigate()

    const getAllCourses =async()=>{
        setAllCourses(testData)
    }

    useEffect(()=>{
        getAllCourses()
        getUserEnrolledCourses()
    },[]
    )
    const calChapterTime = (chapter)=>{
        let time = 0;
        chapter.chapterMaterial.map((lecture)=>time +=lecture.lectureDuration)
        return humanizeDuration(time * 60 * 1000, {units: ["h","m"]})
    }
    const calCourseTime = (course)=>{
        let time =0;
        course.courseMaterial.map((chapter)=> chapter.chapterMaterial.map((lecture)=>time=time+lecture.lectureDuration))
        return humanizeDuration(time*60*1000,{units: ["h","m"]})
    }
    const calLecturesNo =(course)=> {
        let totalLectures = 0;
        course.courseMaterial.forEach(chapter => {if (Array.isArray(chapter.chapterMaterial)) {
            totalLectures=totalLectures+chapter.chapterMaterial.length
        }});
        return totalLectures;
    }
    const calRating =(course)=>{
        if (course.courseRatings.length === 0){
            return 0;
        }let overallRating=0;
        course.courseRatings.forEach(rating=> {overallRating=overallRating+rating.rating})
        return overallRating/course.courseRatings.length
    }
    const getUserEnrolledCourses = async ()=>{
        setenrolledCourses(testData)
    }

    const value = {
        allCourses,
        navigate,
        calRating,
        calChapterTime,
        calCourseTime,
        calLecturesNo,
        enrolledCourses,
        getUserEnrolledCourses,
        isAdmin
    }
    return (
        <AppContext.Provider value ={value}>
            {props.children}
        </AppContext.Provider>
    )

}