import React, { useContext, useEffect, useState } from 'react'
import SearchBar from '../../components/user/SearchBar'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from '../../components/user/CourseCard'
import Footer from '../../components/user/Footer'

const CoursesList = () => {
  const {allCourses, navigate} = useContext(AppContext)
  const {input} = useParams()
  const [searchCourse, showFilteredCourse] = useState([])
  useEffect(()=> {if (allCourses && allCourses.length>0){const tempCourses= allCourses.slice()
    input ? showFilteredCourse(tempCourses.filter(item => item.courseTitle.toLowerCase().includes(input.toLowerCase()))) 
    : showFilteredCourse(tempCourses)
  }},[allCourses, input])
  return (
    <>
    <div className='relative md:px-30  pt-15 px-8 text-left min-h-200'>
      <div className='flex md:flex-row flex col gap-6 items-start justify-between w-full'>
        <div>
          <h1 className='font-bold text-4xl text-slate-500'>Course List</h1>
          <p className='text-slate-400 font-semibold'>
            <span className=''>Browse Courses</span>
          </p>
        </div>
       <SearchBar data={input} />
      </div>
      {
        input && 
        <div>
          <p onClick={()=>navigate('/course-list')} className='text-end cursor-pointer font-bold text-red-500'>
            Click here to remove "{input}" keyword</p>
        </div>
      }
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10 gap-4 md:p-0 px-3'>
          {searchCourse.map((course, i)=> <CourseCard key={i} course={course}/>)}
      </div>
    </div>
    <Footer/>
    </>
    
  )
}

export default CoursesList
