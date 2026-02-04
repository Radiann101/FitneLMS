import React, { useEffect } from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
// 1. Import your Footer component
import Footer from '../../components/user/Footer'; // Adjust the path based on your folder structure

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const navigate = useNavigate();
  const steps = [
    {
      title: "1. Browse Courses",
      description: "Explore our library of fitness programs. You can use the search bar or filter by category to find exactly what fits your goals.",
      image: assets.about1
    },
    {
      title: "2. Click Enroll Now",
      description: "Found a course you like? Click the 'Enroll Now' button to instantly join. You'll get immediate access to all video lectures and materials.",
      image: assets.about2
    },
    {
      title: "3. Track Progress",
      description: "Your 'My Enrollments' page acts as your personal fitness hub. See how much of each course you've completed at a glance.",
      image: assets.about3
    },
    {
      title: "4. Expand and Watch",
      description: "Click on any course to expand the course, and open the player for all lectures.", 
      image: assets.about4
    },
    {
      title: "5. Mark as Complete",
      description: "Stay organized! After finishing a video, hit 'Mark as Complete' to update your progress bar and move to the next challenge.",
      image: assets.about5
    }
  ];

  return (
    <>
      <div className='flex flex-col items-center px-6 md:px-10 py-16 bg-white'>
        
        {/* Header Section */}
        <div className='text-center max-w-3xl mb-20'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-6'>Master Your Fitness Journey</h1>
          <p className='text-lg text-gray-600 leading-relaxed'>
            Getting started with FitneLMS is simple. Follow this guide to learn how to navigate 
            your dashboard, enroll in courses, and track your transformation.
          </p>
        </div>

        {/* Step-by-Step Vertical List */}
        <div className='flex flex-col gap-32 w-full max-w-7xl'>
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-16`}
            >
              <div className='w-full lg:w-4/5 border border-gray-200 shadow-2xl rounded-2xl overflow-hidden hover:scale-[1.01] transition-transform duration-300'>
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className='w-full h-auto object-contain'
                />
              </div>

              <div className='w-full lg:w-1/5 flex flex-col items-start'>
                <div className='bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4'>
                  Step {index + 1}
                </div>
                <h3 className='text-2xl font-bold text-gray-800 mb-4'>{step.title.split('. ')[1]}</h3>
                <p className='text-gray-600 text-base leading-relaxed'>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className='mt-32 w-full max-w-5xl bg-gray-900 rounded-[2rem] p-8 md:p-16 text-center text-white shadow-2xl'>
          <h2 className='text-3xl font-bold mb-4'>Ready to transform?</h2>
          <p className='text-gray-400 mb-8 max-w-xl mx-auto'>
            Your path to a healthier lifestyle is just a click away. Head to your dashboard to begin.
          </p>
          <button 
            onClick={() => navigate('/course-list')}
            className='bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-500 transition-colors shadow-lg'
          >
            Go to Course List
          </button>
        </div>
      </div>

      {/* 2. Add the Footer here, outside the padded div */}
      <Footer />
    </>
  );
};

export default About;