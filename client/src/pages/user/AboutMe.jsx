import React, { useEffect } from 'react';
import { assets } from '../../assets/assets';
import Footer from '../../components/user/Footer';

const AboutMe = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className='flex flex-col items-center px-6 md:px-20 py-16 bg-white min-h-screen'>

        <div className='flex flex-col md:flex-row items-center gap-12 max-w-6xl w-full'>
          
          <div className='w-full md:w-1/2 flex justify-center'>
            <div className='relative'>
              <div className='absolute -top-4 -left-4 w-full h-full bg-blue-100 rounded-2xl -z-10'></div>
              <img 
                src={assets.AboutMe}
                alt="My Transformation" 
                className='w-full max-w-md h-[500px] object-cover rounded-2xl shadow-xl'
              />
            </div>
          </div>

          <div className='w-full md:w-1/2 flex flex-col gap-6'>
            <h1 className='text-4xl font-extrabold text-gray-900'>
              From an obese kid to where I am today
            </h1>
            
            <div className='space-y-4 text-lg text-gray-600 leading-relaxed'>
              <p>
                Six years ago, I was an obese kid, unsure of how calories worked, what being healthy actually looked and felt like.
              </p>
              <p>
                Today, after half a decade of consistent lifting and learning, I stand here with all the knowledge I've gathered over the years, eager to help people who find my status 6 years ago similiar to theirs now.
              </p>

              <div className='bg-blue-50 border-l-4 border-blue-600 p-6 my-6'>
                <p className='italic font-medium text-gray-800'>
                  "My goal is simple: I want to share every bit of knowledge I've gained over the years for free, making your transformation as simple as possible."
                </p>
              </div>

              <p>
                Whether you're here to lose weight, build muscle, or just find a healthier routine, I will be here to hold your hand throughout the whole journey.
              </p>
            </div>

            <div className='flex gap-8 mt-4'>
              <div>
                <p className='text-3xl font-bold text-gray-900'>6+</p>
                <p className='text-sm text-gray-500 uppercase tracking-wider'>Years Lifting</p>
              </div>
              <div>
                <p className='text-3xl font-bold text-gray-900'>500h+</p>
                <p className='text-sm text-gray-500 uppercase tracking-wider'>Hours Researching</p>
              </div>
              <div>
                <p className='text-3xl font-bold text-gray-900'>$0</p>
                <p className='text-sm text-gray-500 uppercase tracking-wider'>Cost to Learn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutMe;