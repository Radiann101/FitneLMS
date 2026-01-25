import React, { useState } from 'react'
import {assets} from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({data}) => {
  

  const navigate= useNavigate()/*hook*/
  const [input, setInput] = useState(data ? data : '')
  const Handler =(event1) => {
    event1.preventDefault()
    navigate('/course-list/' + input)
  }
  return (
      <form onSubmit={Handler} className='max-w-xl w-full md:h-12 h10 flex items-center bg-white border border-gray-500 rounded'>
        <img src={assets.searchIcon} alt="search_Icon" className='md: w-auto w-10 px-3' />
        <input onChange={event1 => setInput(event1.target.value)} value ={input} type="text" placeholder='Search courses' className='w-full h-full outline-none text-slate-500/80'/>
        <button type='submit' className='bg-green-100 rounded text-slate-500 md:px-9 px-7 md:py-2 py-1 mx-1'>Search</button>
      </form>
  )
}

export default SearchBar