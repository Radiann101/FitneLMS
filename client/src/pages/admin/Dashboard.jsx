import React, { useEffect, useState } from 'react'
import { assets, testDashboardData, testStudentEnrolled } from '../../assets/assets'
import Loading from '../../components/user/Loading'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'

const Dashboard = () => {
  const {backendUrl, getToken, isAdmin} = useContext(AppContext)
  const [dashboardData, setDashboardData] = useState(null)

  const getDashboardData = async () => {
    try {
      const token = await getToken()
      const {data} = await axios.get(backendUrl + '/api/admin/dashboard',
        {headers: {Authorization: `Bearer ${token}`}}
      )
      if (data.success) {
        setDashboardData(data.dashboardData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
 //execute getDashboardData function whenever this Dashboard component gets loaded
 useEffect(()=> {
  if (isAdmin){
    getDashboardData()
  }
 }, [isAdmin])

  return dashboardData ? (
    <div className='min-h-screen flex flex-col justify-between items-start gap-6 md:p-6 md:pb-0 p-4
    pt-8 pb-0'>
      <div className='space-y-5'>
          <div className='flex flex-wrap gap-5 items-center'>
            <div className='flex flex-row items-center gap-3 shadow-card border border-blue-500 p-4 w-60 h-24 whitespace-nowrap flex-grow-0 flex-shrink-0 rounded-md'>
              <img src={assets.allUsers} alt="" />
              <div className='flex flex-row gap-3'>
                <p className='text-2xl font-medium text-slate-500'>{dashboardData.enrolledUsersData.length}</p>
                <p className='text-base text-slate-500'> Total enrollments</p>
              </div>
            </div>
            <div className='flex flex-row items-center gap-3 shadow-card border border-blue-500 p-4 w-60 h-24 whitespace-nowrap flex-grow-0 flex-shrink-0 rounded-md'>
              <img src={assets.allCourses} alt="" />
              <div className='flex flex-row gap-3'>
                <p className='text-2xl font-medium text-slate-500'>{dashboardData.totalCourses}</p>
                <p className='text-base text-slate-500'> Total Courses</p>
              </div>
            </div>
          </div>
            <h2 className='pb-3 font-medium text-lg'>Latest Enrollments</h2>
            <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md
            bg-white border border-gray-500/20'>
            <table className='table-fixed md:table-auto w-full overflow-hidden'>
              <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
                <tr>
                  <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>#</th>
                  <th className='px-4 py-3 font-semibold'>User Name</th>
                  <th className='px-4 py-3 font-semibold'>Course Title</th>
                </tr>
              </thead>
              <tbody className='text-sm text-gray-500'>
                {dashboardData.enrolledUsersData.map((item, index) => (
                  <tr key={index} className='border-b border-gray-500/20'>
                    <td className='px-4 py-3 text-center hidden sm:table-cell'>{index+1}</td>
                    <td className='md:px-4 px-2 py-3 flex items-center space-x-3'>
                      <img src={item.student.imageUrl} className='w-9 h-9 rounded-full' />
                      <span className='truncate'>{item.student.name}</span>
                    </td>
                    <td className='px-4 py-3 truncate'>{item.courseTitle}</td>
                  </tr>
                ))}  
              </tbody>
            </table>
            </div>
          </div>
      </div>
    
  ) : <Loading/>
}

export default Dashboard
