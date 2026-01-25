import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

const CourseCard = ({course}) => {
  const {calRating} = useContext(AppContext)
  return (
    <Link to={'/course/'+course._id} onClick={()=> scrollTo(0,0)} className='border boder-slate-500 pb-6 overflow-hidden rounded-lg'>
      <img className='w-full' src={course.courseThumbnail} alt="" />
      <div className='p-3 text-left'>
        <h2 className='text-base font-bold'>{course.courseTitle}</h2>
        <div className='flex items-center space-x-2'>
          <p>{calRating(course)}</p>
          <div className='flex'>
            {[...Array(5)].map((_,i)=>(<img key={i} src={i< Math.floor(calRating(course))
            ? assets.filledStar : assets.blankStar

            } alt='' className='w-3 h-3'/>)
          )}
          </div>
          <p className='text-slate-500'>{course.courseRatings.length}</p>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard
