import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import {Line} from 'rc-progress'
import Footer from '../../components/user/Footer'
import axios from 'axios'
import { useEffect } from 'react'

const Enrollments = () => {
  const {enrolledCourses, calCourseTime, navigate, userData, getUserEnrolledCourses
    ,backendUrl, getToken, calLecturesNo} = useContext(AppContext)


  const [progress, setProgress]=useState([])

  const getCourseProgress = async()=>{
    try {
      const token = await getToken();
      const tempProgressAray = await Promise.all(enrolledCourses.map(async (course)=>{
        const {data} = await axios.post(`${backendUrl}/api/user/get-course-progress`,
          {courseId: course._id}, {headers: {Authorization: `Bearer ${token}`}}
        )
        let totalLectures = calLecturesNo(course);
        const lectureCompleted = data.progressData ? data.progressData.lectureCompleted.length : 0;
        return {totalLectures, lectureCompleted}

      }))
      setProgress(tempProgressAray);

    } catch (error) {
      toast.error(error.message)
    }
  }
useEffect(()=>{
  if (userData){
    getUserEnrolledCourses()
  }
},[userData])


useEffect(()=>{
  if (enrolledCourses.length > 0){
    getCourseProgress()
  }
},[enrolledCourses])

  return (
    <>
    <div className='md:px-30 px-10 pt-10'>
      <h1 className='text-2xl font-semibold'>Enrollments page</h1>
      <table className='md:table-auto table-fixed w-full overflow-hidden border mt-10'>
        <thead className='text-gray-500 border-b border-gray-500 text-sm text-left max-sm:hidden'>
          <tr>
            <th className='px-3 py-3 font-semibold truncate'>Course</th>
            <th className='px-3 py-3 font-semibold truncate'>Duration</th>
            <th className='px-3 py-3 font-semibold truncate'>Completed</th>
            <th className='px-3 py-3 font-semibold truncate'>Status</th>
          </tr>
        </thead>
        <tbody className='text-slate-500'>
          {enrolledCourses.map((course, index)=> (
            <tr key={index} className='border-b border-gray-500/50'>
              <td className='md:px-5 pl-3 md:pl-5 py-4 flex items-center space-x-3'>
                <img src={course.courseThumbnail} className='w-10 sm:w-20 md:w-25' />
                <div className='flex-1'>
                  <p className='mb-2 max-sm:text-sm'>{course.courseTitle}</p>
                  <Line strokeWidth={3} percent={progress[index] ? (progress[index].lectureCompleted *100)/
                    progress[index].totalLectures : 0}
                  className='bg-gray-300 rounded'/>
                </div>
              </td>
              <td className='px-5 py-4 max-sm:hidden'>
                {calCourseTime(course)}
              </td>
              <td className='px-5 py-4 max-sm:hidden'>
                {progress[index ] && `${progress[index].lectureCompleted} / ${progress[index].totalLectures} `} <span>lectures</span> completed 
              </td>
              <td className='px-5 py-4 max-sm:text-right'>
                <button className='bg-blue-500 py-2 px-1 w-25 sm:py-3 sm:px-2 rounded text-white'
                onClick={()=> navigate('/watch/'+ course._id)}>
                  {progress[index ] && progress[index].lectureCompleted / progress[index].totalLectures === 1 
                  ? 'Completed': 'Ongoing'}</button>
              </td>
            </tr>
          
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>
    </>
  )
}

export default Enrollments
