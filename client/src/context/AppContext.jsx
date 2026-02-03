import humanizeDuration from 'humanize-duration';
import { createContext, useEffect, useState } from "react";
import { testData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import {useAuth, useUser} from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from 'react-toastify';


export const AppContext=createContext()
export const AppContextProvider = (props) =>{

    const [allCourses, setAllCourses] = useState([])
    const [enrolledCourses, setenrolledCourses] = useState([])
    const [userData, setUserData] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate()
    const {getToken} = useAuth()
    const { user, isLoaded, isSignedIn } = useUser();
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllCourses =async()=>{
        //setAllCourses(testData)
        try {
          const {data} = await axios.get(backendUrl + '/api/course/all');
          if (data.success){
            setAllCourses(data.courses)
          }
          else {
            toast.error(data.message)
          }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchUserData = async ()=>{
        
        if (user.publicMetadata.role === 'admin'){
            setIsAdmin(true)
        }

        try {
            const token = await getToken();
            const {data} = await axios.get(backendUrl + '/api/user/data', {headers: {Authorization: `Bearer ${token}`}})
            if (data.success) {
                setUserData(data.user)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getUserEnrolledCourses = async ()=>{
        try {
            const token = await getToken();
            const { data }= await axios.get(backendUrl + '/api/user/enrolled-courses',
            {headers: {Authorization: `Bearer ${token}`}})
             if (data.success){
                setenrolledCourses(data.enrolledCourses.reverse())
            }
            else {
            toast.error(data.message)
            }
            } 
            catch (error) {
            toast.error(error.message)
        }
        
    }


    useEffect(()=>{
        getAllCourses()
    },[]
    )
   useEffect(() => {
    // Only fetch if Clerk has finished loading and the user is actually signed in
    if (isLoaded && isSignedIn && user) {
        fetchUserData();
        getUserEnrolledCourses()
    }
}, [user, isLoaded, isSignedIn]);
    
    const calChapterTime = (chapter) => {
    let time = 0;
    // Use chapterContent and optional chaining
    chapter?.chapterContent?.forEach((lecture) => {
        time += lecture.lectureDuration;
    });
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
};
    const calCourseTime = (course)=>{
        let time =0;
        course?.courseContent?.forEach((chapter) => {
        chapter?.chapterContent?.forEach((lecture) => {
            time += lecture.lectureDuration;
        });
    });
        return humanizeDuration(time*60*1000,{units: ["h","m"]})
    }
    const calLecturesNo =(course)=> {
        let totalLectures = 0;
        course?.courseContent?.forEach(chapter => {if (Array.isArray(chapter?.chapterContent)) {
            totalLectures=totalLectures+chapter.chapterContent.length
        }});
        return totalLectures;
    }
    const calRating =(course)=>{
        if (course.courseRatings.length === 0){
            return 0;
        }let overallRating=0;
        course.courseRatings.forEach(rating=> {overallRating=overallRating+rating.rating})
        return Math.floor(overallRating/course.courseRatings.length)
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
        isAdmin,
        backendUrl,
        userData,
        setUserData,
        getToken,
        getAllCourses
    }
    return (
        <AppContext.Provider value ={value}>
            {props.children}
        </AppContext.Provider>
    )

}