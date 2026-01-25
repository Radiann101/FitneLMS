import React from 'react'
import Hero from '../../components/user/Hero'
import CoursesSection from '../../components/user/CoursesSection'
import Extra from '../../components/user/Extra'
import Footer from '../../components/user/Footer'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero/>
      <CoursesSection/>
      <Extra/>
      <Footer/>
    </div>
  )
}

export default Home
