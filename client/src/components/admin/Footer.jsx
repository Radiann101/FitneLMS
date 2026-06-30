import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='flex flex-col-reverse md:flex-row justify-between items-center border-t text-left w-full px-6'>
      <div className='flex items-center gap-3'>
        <img src={assets.logo} className='hidden md:block w-20' />
        <div className='hidden md:block h-10 w-px bg-gray-500/50'></div>
        <p className='text-center text-xs md:text-sm py-4 text-gray-500'>Copyright 2026 © FitneLMS.
          All Rights Reserved. </p>
      </div>
    </footer>
  )
}

export default Footer
