import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/user/Loading'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration';
import Footer from '../../components/user/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'



const CourseDetails = () => {
  const {id} = useParams()
  const [alreadyEnrolled, setalreadyEnrolled] =useState(false)
  const [courseData, setCourseData] =useState(null)
  const [openChapter, setOpenChapters] =useState({})
  
  const {allCourses, calRating, calChapterTime, calCourseTime, calLecturesNo, backendUrl, userData, getToken} 
  = useContext(AppContext)

  const getCourseData = async ()=>{
    try {
      const {data} = await axios.get(backendUrl + '/api/course/' + id)
      if (data.success){
        setCourseData(data.courseData)
      }else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  

  const toggleChapter =(index)=>{
    setOpenChapters((previous)=>({
      ...previous, [index]: !previous[index]
    }))
  }
  const enrollCourse = async () =>{
    try {
      if(!userData){
        return toast.warn('Please login to enroll to a course')
      }
      if(alreadyEnrolled){
        return toast.warn('Already enrolled')
      }
      const token = await getToken();
      const {data} = await axios.post(backendUrl + '/api/user/enroll', 
        {courseId: courseData._id}, {headers: {Authorization: `Bearer ${token}`}})
      if (data.success){
        toast.success(data.message);
      }else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
useEffect(()=> {getCourseData()},[])
useEffect(()=> {
  if (userData && courseData)
    setalreadyEnrolled(userData.enrolledCourses.includes(courseData._id))
},[userData, courseData])

  return courseData ? (
    <>
    <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8
    md:pt-30 pt-20 text-left '>
      <div className='absolute top-0 left-0 w-full h-section-height -z-1'>

      </div>
      <div className='max-w-xl z-8 text-slate-500'>
        <h1 className='md:text-home-heading-large text-home-heading-small font-bold text-gray-500'>{courseData.courseTitle}</h1>
        <div className='flex items-center space-x-2 pt-4 pb-2 text-sm'>
                  <p>{calRating(courseData)}</p>
                  <div className='flex'>
                    {[...Array(5)].map((_,i)=>(<img key={i} src={i< Math.floor(calRating(courseData))
                    ? assets.filledStar : assets.blankStar
        
                    } alt='' className='w-3 h-3'/>)
                  )}
                  </div>
                  <p className='text-blue-500'>({courseData?.courseRatings?.length || 0}
                    {(courseData?.courseRatings?.length || 0) > 1 ? ' ratings': ' rating'})
                  </p>
                  <p>{courseData?.enrolledUsers?.length || 0} {(courseData?.enrolledUsers?.length || 0) > 1 ?
                  ' users enrolled' : ' user enrolled'}</p>
                </div>
        <p className='text-md'> Instructor: <span className='font-bold'>Pinter Csaba-Attila</span></p>
        <div className='text-gray-500 pt-10'>
            <h2 className='text-xl font-bold text-purple-400'>Course Structure</h2>
            <div className='pt-3'>
                {courseData?.courseContent?.map((chapter, index) => (
                   <div className='border border-gray-500 rounded mp-2 bg-white mb-1' key={index}>
                      <div onClick={()=> toggleChapter(index)} className='flex items-center justify-between cursor-pointer px-5 py-6 min-h-[80px] hover:bg-white-50 transition-all'>
                      <div className='flex items-center gap-4'>
                        <img className={` transform transition-transform ${openChapter[index]? 'rotate-180':'' }`} src={assets.arrowDown} alt="arrow_down_icon" />
                        <p className='md:text-lg text-base font-semibold text-gray-700 leading-tight'>{chapter.chapterTitle}</p>
                      </div>
                      <div className='flex items-center gap-3 text-slate-500 whitespace-nowrap ml-4'>
                          <p className='text-sm md:text-base font-medium'>
                              {chapter.chapterContent.length} lecture(s)
                          </p> -
                          <p className='text-sm md:text-base font-medium'>
                            {calChapterTime(chapter)}
                          </p>
                        </div>
                    </div>
                    <div className={`overflow-hidden transition-all ${openChapter[index] ? 'max-h-70' : 'max-h-0'}`}>
                      <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-500 border-t border-gray-500'>
                        {chapter.chapterContent.map((lecture, i)=> (
                        <li className='flex items-start gap-2 py-1' key={i}> <img src={assets.playIcon} alt="playIcon" className='w-4 h-3 mt-1' /> 
                          <div className='flex items-center justify-between w-full text-gray-500 test-xs md:text-default'>
                            <p>{lecture.lectureTitle}</p>
                            <div className='flex gap-2'>
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
        </div>
        <div className='py-15 text-sm md:text-default px-2 max-w-l'>
          <h2 className='font-bold text-xl text-slate-500'>Course Description</h2>
          <p  className='pt-5 break-words' dangerouslySetInnerHTML={{__html: courseData.courseDescription}}></p>
        </div>
      </div>
      <div className='max-w-[575px] z-10 shadow-md/40 rounded-t md:rounded-none overflow-hidden
      min-w-[300px] sm:min-w-[373px]'>
        <img src={courseData.courseThumbnail} alt="courseThumbnail" />
        <div className='px-3'>
          <div className='flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-slate-500'>
            <div className='flex items-center gap-2 mb-1 pb-1'>
              <img src={assets.filledStar} alt="filledStar" />
              <p>{calRating(courseData)}</p>
            </div>

            <div className='h-4 w-px bg-gray-500/40'></div>

            <div className='flex items-center gap-2 mb-1 pb-1'>
              <img src={assets.clock} alt="clock" />
              <p>{calCourseTime(courseData)}</p>
            </div>

            <div className='h-4 w-px bg-gray-500/40'></div>

            <div className='flex items-center gap-2 mb-1 pb-1 '>
              <img src={assets.books} alt="books" />
              <p>{calLecturesNo(courseData)} lesson(s)</p>
            </div>    
          </div>
          <button onClick={enrollCourse} className='rounded bg-blue-500 md:mt-4 mt-3 py-3 mb-3 w-full text-white-500 font-medium'>{alreadyEnrolled ? 'Enrolled': 'Enroll Now'}</button>
          <div className='pt-4'> 
            <p className='text-lg font-bold text-grey-500'>What will you learn in this course?</p>
            <ul className='ml-5 pt-1 pb-3 text-md md:text-md list-disc text-slate-500'>
              <li>Muscle fundamentals</li>
              <li>Muscle mechanisms</li>
              <li>Workout ideas and examples</li>
            </ul>
          </div>      
        </div>
      </div>
    </div>
    <Footer/>
    </>
  ) :<Loading/>
}

export default CourseDetails
