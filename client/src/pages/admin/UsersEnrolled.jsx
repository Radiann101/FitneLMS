import React, { useEffect, useState } from 'react'
import {testStudentEnrolled} from '../../assets/assets'
import Loading from '../../components/user/Loading'

const UsersEnrolled = () => {
  
  const [enrolledStudents, setEnrolledStudents] = useState(null)

  const getEnrolledStudents=async() =>{
    setEnrolledStudents(testStudentEnrolled)
  }
  useEffect(()=>{
    getEnrolledStudents()
  }, [])

  return enrolledStudents ?  (
    <div className='flex flex-col items-start justify-between min-h-screen md:pb-0 p-4 pt-8 pb-0 md:p-8'>
      <div className='flex flex-col items-center bg-white border border-gray-500 max-w-4xl w-full overflow-hidden rounded'>
        <table className='table-fixed md:table-auto w-full pb-4 overflow-hidden'>
          <thead className='border-b border-gray-500 text-sm text-left text-gray-500'>
            <tr>
              <th className='px-3 py-3 font-semibold'>Nr.</th>
              <th className='px-3 py-3 font-semibold'>Student Name</th>
              <th className='px-3 py-3 font-semibold'>Course Title</th>
              <th className='px-3 py-3 font-semibold'>Date</th>
            </tr>
          </thead>
          <tbody className='text-sm text-slate-500'>
            {enrolledStudents.map((item,index) => (
              <tr key={index} className='border-b border-gray-500'>
                <td className='px-3 py-3 sm:table-cell text-center hidden'>{index+1}</td>
                <td className='md:px-3 px-2 py-3 flex items-center space-x-2'>
                  <img src={item.student.imageUrl} className='w-8 rounded h-8'/>
                  <span className='truncate'>{item.student.name}</span>
                </td>
                <td className='px-3 py-3'>{item.courseTitle}</td>
                <td className='px-3 py-3 sm:table-cell hidden'>{new Date(item.purchaseDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : <Loading/>
}

export default UsersEnrolled
