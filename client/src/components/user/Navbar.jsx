import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useClerk } from '@clerk/clerk-react'
import { UserButton } from '@clerk/clerk-react'
import { useUser } from '@clerk/clerk-react'
import { AppContext } from '../../context/AppContext'

const Navbar = () => {

  const {openSignIn}= useClerk()
  const {user} = useUser()
  const {navigate} = useContext(AppContext)


  return (
    <div className='flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 bg-slate-600'>
      <img onClick={()=>navigate('/')} src={assets.logo} alt ="logo" className='w-30 lg:w-50 cursor-pointer'/>
      <div className='hidden md:flex items-center gap-5 text-gray-800'>
          <div className='flex items-center gap-5'>
            { user && <>
            <Link to='/Enrollments' className='text-white'>My Enrollments</Link>
            </>}
          </div>
          {
            user ? <UserButton/> : 

            <button onClick={()=> openSignIn()} className='bg-blue-600 text-white px-5 py-2 cursor-pointer'>Create Account</button>
          }
      </div>
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
          <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
            { user && <>
            <Link to='/Enrollments' className='text-white'>My Enrollments</Link>
            </>}
          </div>
          {
            user ? <UserButton/> : <button onClick={()=> openSignIn()}><img src={assets.icon} className='cursor-pointer rounded-full' alt="" /></button>
          }
          
      </div>
    </div>
  )
}

export default Navbar
