import React from 'react'
import { assets } from '../../assets/assets'

const Extra = () => {
  return (
    <div className=' pt-50 pb-50 px-10 md:px-0 flex flex-col items-center gap-12'>
      <h1 className='text-slate-500 font-bold text-xl md:text-4xl '>It's as simple as it sounds</h1>
      <p className=' sm:text-sm text-slate-500'>More information about me, and how to take your first step</p>
      <div className='gap-6 mt-4 flex items-center '>
        <button className='rounded-md text-white bg-blue-900 px-15 py-5'>First steps</button>
        <button className='flex items-center gap-1'><img src={assets.aboutMe} alt="me_icon" /></button>
      </div>
    </div>
  )
}

export default Extra
