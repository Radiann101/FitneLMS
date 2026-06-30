import React from 'react'
import { UserButton, useUser } from '@clerk/clerk-react'
import { assets, exampleAdminData } from '../../assets/assets';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const adminData = exampleAdminData
  const { user } = useUser()
  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3'>
      <Link to='/'> <img src={assets.logo} className='w-30 lg:w-50 cursor-pointer' />
      </Link>
      <div className='flex items-center gap-5 text-gray-500 relative'>
        <p>Hi {user ? user.fullName : ''}</p>
        {user ? <UserButton /> : <img className='max-w-8' src={assets.icon} />}
      </div>
    </div>
  )
}

export default Navbar