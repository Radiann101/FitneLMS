import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/user/Home'
import CoursesList from './pages/user/CoursesList'
import CourseDetails from './pages/user/CourseDetails'
import Enrollments from './pages/user/Enrollments'
import Watch from './pages/user/Watch'
import Loading from './components/user/Loading'
import Admin from './pages/admin/Admin'
import AddCourse from './pages/admin/AddCourse'
import MyCourses from './pages/admin/MyCourses'
import Dashboard from './pages/admin/Dashboard'
import UsersEnrolled from './pages/admin/UsersEnrolled'
import PerformanceDashboard from './pages/admin/PerformanceDashboard'
import "quill/dist/quill.snow.css";
import Navbar from './components/user/Navbar'
import { ToastContainer } from 'react-toastify'
import About from './pages/user/About'
import Contact from './pages/user/Contact'
import Social from './pages/user/Social'
import AboutMe from './pages/user/AboutMe'

const App = () => {

  const isAdminRoute = useMatch('/admin/*')

  return (
    <div className='text-default min-h-screen bg-white'>
      <ToastContainer />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course-list' element={<CoursesList />} />
        <Route path='/course-list/:input' element={<CoursesList />} />
        <Route path='/course/:id' element={<CourseDetails />} />
        <Route path='/enrollments' element={<Enrollments />} />
        <Route path='/Watch/:courseId' element={<Watch />} />
        <Route path='/About' element={<About />} />
        <Route path='/Social' element={<Social />} />
        <Route path='/about-me' element={<AboutMe />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/loading/:path' element={<Loading />} />
        <Route path='/admin' element={<Admin />}>
          <Route path='/admin' element={<Dashboard />} />
          <Route path='add-course' element={<AddCourse />} />
          <Route path='my-courses' element={<MyCourses />} />
          <Route path='users-enrolled' element={<UsersEnrolled />} />
          <Route path='performance' element={<PerformanceDashboard />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
