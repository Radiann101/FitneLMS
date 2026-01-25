import React from 'react'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from cyan-100/70'>
      <h1 className='md:text-home-heading-large text-home-heading-small relative font-bold text-slate-600 max-w-3xl mx-auto'>
        Your fitness dreams, made possible in the simplest way possible
      </h1>
      <h2 className='md:block hidden text-gray-500 max-w-2xl mx-auto'>Make your dreams come true, with easy to follow, science based lifting exercises</h2>
      <h2 className='md:hidden text-gray-500 max-w-sm mx-auto'>Make your dreams come true, with easy to follow, science based lifting exercises</h2>
      <SearchBar/>
    </div>
  )
}

export default Hero
