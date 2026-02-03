import React, { useContext, useEffect, useState } from 'react'
import humanizeDuration from 'humanize-duration'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import YouTube from 'react-youtube'
import { assets } from '../../assets/assets'
import Footer from '../../components/user/Footer'
import Rating from '../../components/user/Rating'
import axios from 'axios'
import Loading from '../../components/user/Loading'
import { toast } from 'react-toastify'

const Watch = () => {

  const{enrolledCourses, calChapterTime, backendUrl, getToken, userData, getUserEnrolledCourses} = useContext(AppContext)
  const{courseId} = useParams()
  console.log(useParams())

  const [openChapter, setOpenChapters] = useState({})
  const [progressData, setProgressData] = useState(null)
  const [initialRating, setInitialRating] =useState(0)
  const [watchData, setWatchData] = useState(null)
  const [courseData, setCourseData] = useState(null)

  const toggleChapter =(index)=>{
    setOpenChapters((previous)=>({
      ...previous, [index]: !previous[index]
    }))
  }

  const markLectureAsCompleted = async (lectureId) =>{
    try {
      const token = await getToken();
      const {data} = await axios.post(backendUrl + '/api/user/update-course-progress',
        {courseId, lectureId}, {headers: {Authorization: `Bearer ${token}`}})
      if (data.success) {
        toast.success(data.message)
        getCourseProgress()
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getCourseProgress = async ()=>{
    try {
      const token = await getToken();
      const {data} = await axios.post(backendUrl + '/api/user/get-course-progress',
        {courseId}, {headers: {Authorization: `Bearer ${token}`}}
      )
      if(data.success){
        setProgressData(data.progressData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleRating = async (rating)=>{
    try {
      const token = await getToken()
      const {data} = await axios.post(backendUrl + '/api/user/add-rating',
        {courseId, rating}, {headers: {Authorization: `Bearer ${token}`}})

      if (data.success){
        toast.success(data.message)
        getUserEnrolledCourses()
      }else{
        toast.error(data.message)
      }  
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    getCourseProgress()
  },[])

  const getCourseData = ()=>{
    enrolledCourses.map((course)=> {
      if (course._id === courseId){
        setCourseData(course)
        course.courseRatings.map((item)=>{
          if (item.userId === userData._id){
            setInitialRating(item.rating)
          }

        })
      }
    })
  }

  useEffect(()=>{
    if (enrolledCourses.length >0) {
      getCourseData()
    }
  },[enrolledCourses])
  return courseData ? (
    <>
    <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:px-30 min-h-200'>
      <div className='text-gray-900'>
        <h2 className='text-xl font-semibold'>Course Structure</h2>
        <div className='pt-3'>
          {courseData && courseData.courseContent.map((chapter, index) => (
              <div className='border border-gray-500 rounded mp-2 bg-white mb-1' key={index}>
                <div onClick={()=> toggleChapter(index)} className='flex items-center justify-between cursor-pointer px-3 py-4'>
                <div className='flex items-center gap-2'>
                  <img className={`transform transition-transform ${openChapter[index]? 'rotate-180':'' }`} src={assets.arrowDown} alt="arrow_down_icon" />
                  <p className='md:text-base test-sm font-medium'>{chapter.chapterTitle}</p>
                </div>
                <p className='text-sm md:text-default font-extrabold'>{chapter.chapterContent.length} lectures - {calChapterTime(chapter)}</p>
              </div>
              <div className={`overflow-hidden transition-all ${openChapter[index] ? 'max-h-70' : 'max-h-0'}`}>
                <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-500 border-t border-gray-500'>
                  {chapter.chapterContent.map((lecture, i)=> (
                  <li className='flex items-start gap-2 py-1' key={i}> <img src={progressData && progressData.lectureCompleted.includes(lecture.lectureId) 
                  ? assets.checkmark : assets.playIcon} alt="" className='w-4 h-3 mt-1' /> 
                    <div className='flex items-center justify-between w-full text-gray-500 test-xs md:text-default'>
                      <p>{lecture.lectureTitle}</p>
                      <div className='flex gap-2'>
                        {lecture.lectureUrl && <p onClick={()=>setWatchData({
                          ...lecture, chapter: index +1, lecture: i + 1
                        })} className='font-semibold cursor-pointer text-red-700'>Watch</p>}
                        <p className='font-bold'>{humanizeDuration(lecture.lectureDuration * 60 *1000, {units: ['h','m']})}</p>
                      </div>
                    </div>
                  </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className='flex items-center gap-2 py-3 mt-10'>
          <h1 className='text-xl font-semibold'>Rate this Course:</h1>
          <Rating initialRating={initialRating} onRate={handleRating}/>
        </div>

      </div>





      <div className='md:mt-10 '>
        {watchData ? (<div> <YouTube videoId={new URLSearchParams(new URL(watchData.lectureUrl).search).get('v')} 
  iframeClassName='w-full aspect-video' />
        <div className='flex justify-between items-center mt-1'>
          <p>{watchData.chapter}.{watchData.lecture} {watchData.lectureTitle}</p>
          <button onClick={()=>markLectureAsCompleted(watchData.lectureId)} className='text-blue-600'>
            {progressData && progressData.lectureCompleted.includes(watchData.lectureId) ? 'Completed':'Mark as Complete'}</button>
        </div>

         </div>) : 
        <img src={courseData ? courseData.courseThumbnail : ''} alt="" />}
        
      </div>
    </div>
    <Footer/>
    </>
  ) : <Loading/>
}

export default Watch
