import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='md: px-30 text-left w-full mt-9 bg-gray-700'>
      <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10
      border-b border-white'>
        <div className='hidden md:flex flex-col items-start w-full'>
          <h2 className='font-bold text-white mb-4'>Subscribe to our Newsletter</h2>
          <p className='text-sm text-white/90'>Subscribe to be amongst the first who get notified about new courses.</p>
          <div className='flex items-center gap-2 pt-4'>
            <input type="email" placeholder='Enter your email address'  className='border border-gray-500
            bg-gray-500 text-white-500 placeholder-white-500 h-8 w-50 px-2 text-sm rounded '/>
            <button className='bg-blue-500 w-30 text-white rounded h-8 px-5'>Subscribe</button>
          </div>
        </div> 

        <div className='flex flex-col md:items-start items-center w-full'>
          <h2 className='font-bold text-white mb-5'>Quick links </h2>
          <ul className='flex flex-col px-5 w-full justify-between mt-3 text-sm text-white/90 space-y-2'>
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About this website</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/social" className="hover:text-white">Social Media</Link></li>
          </ul>
        </div>

        <div className='flex flex-col md:items-end items-center w-full'><img src={assets.logo} alt="logo" />
        <p className='text-center mt-6 md:text-left text-sm text-white/90'>Your fitness dreams, made possible in the simplest way possible</p>
        </div>
      </div>
      <p className='text-center text-xs md:text-sm text-white/90'>Copyright 2026 © FitneLMS. All Rights Reserved</p>

    </footer>
  )
}

export default Footer