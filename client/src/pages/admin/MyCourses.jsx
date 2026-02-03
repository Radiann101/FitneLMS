import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/user/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyCourses = () => {

  const {backendUrl, isAdmin, getToken} = useContext(AppContext)
  const [courses, setCourses] = useState(null)

  const getCourses = async ()=> {
    try {
      const token = await getToken()
      const {data} = await axios.get(backendUrl + '/api/admin/courses',
        {headers: {Authorization: `Bearer ${token}`}}
      )
      data.success && setCourses(data.courses)

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect (()=> {
    if (isAdmin){
      getCourses()
    }
 
  },[isAdmin])


  return  courses ? (
    <div className='flex flex-col items-start justify between md:p-6 md:pb-0 p-4 pt-4 h-screen'>
       <div className='w-full'>
        <h1 className='pb-4 font-medium text-lg'>Courses</h1>
        <div className='flex flex-col items-center max-w-4xl overflow-hidden rounded w-full bg-white border border-gray--500'>
          <table className='md:table-auto table-fixed w-full overflow-hidden'>
            <thead className='border-b border-gray-500 text-sm text-left text-slate-500'>
              <tr>
                <th className='px-3 py-3 font-semibold'>All Courses</th>
                <th className='px-3 py-3 font-semibold'>Users Enrolled</th>
                <th className='px-3 py-3 font-semibold'>Published On</th>
              </tr>
            </thead>
            <tbody className='text-sm text-slate-500'>
              {courses.map((course) => (
                <tr key={course._id} className='border-b border-gray-500'>
                  <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
                    <img src={course.courseThumbnail} className='w-12' />
                    <span className='hidden md:block truncate'>{course.courseTitle}</span>
                  </td>
                  <td className='px-3 py-3'>{course.enrolledUsers.length}</td>
                  <td className='px-3 py-3'>{new Date(course.createdAt).toLocaleDateString()}</td>
                </tr>
              )
              )}
            </tbody>
          </table>
        </div>
       </div>
    </div>
  ) : <Loading/>
}

export default MyCourses
