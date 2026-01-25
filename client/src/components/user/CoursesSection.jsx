import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'

function top(){
  scrollTo(0,0)
}
const CoursesSection = () => {
  const {allCourses} = useContext(AppContext)
  return (
    <div className='py-16 md:px-40 px-8'>
      <p className='text-home-heading-large font-bold md:py-10 text-slate-500 mt-3 py-3'>What we offer</p>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] px-4 md:px-0 md:my-16 my-10 gap-4'>
        {allCourses.slice(0,4).map((course, i)=> <CourseCard key={i} course={course}/> )}
      </div>
      <Link to ={'/course-list'} onClick={top()} className='text-slate-600 border border-gray-500/30 px-9 py-2'>
      Show All Courses
      </Link>
    </div>
  )
}

export default CoursesSection
