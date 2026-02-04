import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Extra = () => {
  const navigate = useNavigate();

  return (
    <div className='py-32 px-6 flex flex-col items-center text-center bg-gray-50/50 w-full'>
      
      <h1 className='text-gray-800 font-extrabold text-3xl md:text-5xl mb-4 tracking-tight'>
        It's as simple as it sounds
      </h1>
      <p className='text-gray-500 text-lg max-w-xl leading-relaxed mb-12'>
        More information about me, and how to take your first step toward a healthier lifestyle.
      </p>
      
      <div className='flex flex-col sm:flex-row items-center gap-10 lg:gap-16 justify-center'> 
        
        <button 
          onClick={() => navigate('/about')}
          className='w-full sm:w-auto px-12 py-5 font-bold text-white transition-all duration-300 bg-blue-900 rounded-2xl hover:bg-blue-800 shadow-xl hover:shadow-blue-900/30 cursor-pointer active:scale-95'
        >
          First steps
        </button>
        <div className='flex flex-col items-center gap-4'>
          <button 
            onClick={() => navigate('/about-me')}
            className='relative group cursor-pointer'
          >
            
            <div className='w-32 h-32 md:w-40 md:h-40 rounded-full p-1.5 bg-gradient-to-tr from-blue-900 to-blue-400 transition-transform duration-700 shadow-lg'>
              
              
              <div className='w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white'>
                <img 
                  src={assets.aboutMe2} 
                  alt="About Me" 
                  
                  className='w-full h-full object-contain transition-transform duration-300 transform scale-[2.2] group-hover:scale-[2.4]'
                />
              </div>
            </div>

            <div className='absolute bottom-2 right-1 bg-blue-900 text-white text-[10px] md:text-xs font-black px-3 py-1.5 rounded-lg border-2 border-white shadow-md'>
              Click Me
            </div>
          </button>
          
          <span className='text-xs font-black text-gray-500 uppercase tracking-[0.2em]'>
            About Me
          </span>
        </div>

      </div>
    </div>
  )
}

export default Extra