import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

  const {isAdmin} = useContext(AppContext)

  const menu =[
    {name: 'Dashboard', path: '/admin', icon: assets.dashboardLogo},
    {name: 'Add Course', path: '/admin/add-course', icon: assets.addCourse},
    {name: 'All Courses', path: '/admin/my-courses', icon: assets.allCourses },
    {name: 'Users enrolled', path: '/admin/users-enrolled', icon: assets.allUsers},
  ];

  return isAdmin && (
    <div className='md:w-57 w-15 border-r min-h-screen text-base border-gray-500 flex flex-col'>
      {menu.map((item)=> (
        <NavLink className={({isActive})=> `flex items-center md:flex-row flex-col md:justify-start
        justify-center py-4 md:px-8 gap-4 ${isActive ? 'bg-blue-300/20 border-r-[8px] border-cyan-500/80'
        :'hover:bg-gray-200/80 border-r-[8px] border-white hover:border-red-200/90'}` } to={item.path} key={item.name} end={item.path === '/admin'}>
          <img src={item.icon} className='h-7 w-7' />
          <p className='md:block hidden text-center'> {item.name} </p>
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar