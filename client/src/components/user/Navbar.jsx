import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { AppContext } from '../../context/AppContext'
import SearchBar from './SearchBar'

const Navbar = () => {

  const { openSignIn } = useClerk()
  const { user } = useUser()
  const { navigate } = useContext(AppContext)

  return (
    <div className='flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 bg-slate-600 sticky top-0 z-50 shadow-md'>

      <div className='flex items-center gap-4'>
        <img 
          onClick={() => navigate('/')} 
          src={assets.logo} 
          alt="logo" 
          className='w-28 lg:w-32 cursor-pointer hover:opacity-90 transition-opacity' 
        />
      </div>

      <div className='hidden lg:block w-full max-w-md px-4'>
        <SearchBar />
      </div>

      <div className='hidden md:flex items-center gap-6 text-white font-medium'>
          <div className='flex items-center gap-6'>
            <Link to='/course-list' className='hover:text-blue-300 transition-colors whitespace-nowrap'>All Courses</Link>
            
            { user && (
              <Link to='/Enrollments' className='hover:text-blue-300 transition-colors whitespace-nowrap'>My Enrollments</Link>
            )}
          </div>

          {user ? (
            <div className='flex items-center gap-3 border-l border-gray-400 pl-6'>
              <UserButton />
            </div>
          ) : (
            <button 
              onClick={() => openSignIn()} 
              className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-bold transition-all cursor-pointer whitespace-nowrap'
            >
              Create Account
            </button>
          )}
      </div>
      {/* for mobile */}
      <div className='md:hidden flex items-center gap-3 text-white'>
          <div className='flex items-center gap-3 text-xs font-bold uppercase'>
            <Link to='/course-list'>Courses</Link>
            { user && <Link to='/Enrollments'>Progress</Link> }
          </div>
          { user ? <UserButton /> : <button onClick={() => openSignIn()} className='cursor-pointer'><img src={assets.icon} className='w-8 h-8 rounded-full' alt="user" /></button> }
      </div>
    </div>
  )
}

export default Navbar