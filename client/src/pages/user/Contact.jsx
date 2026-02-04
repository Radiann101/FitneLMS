import React, { useEffect } from 'react';
import Footer from '../../components/user/Footer';
import { assets } from '../../assets/assets';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className='flex flex-col items-center px-6 md:px-10 py-16 bg-white min-h-[80vh]'>
        <div className='text-center max-w-3xl mb-16'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-6'>Get in Touch</h1>
          <p className='text-lg text-gray-600 leading-relaxed'>
            Have questions about a course or need technical support? We're here to help you 
            stay on track with your fitness goals.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-6xl mb-20'>
          <div className='flex flex-col gap-8'>
            <div>
              <h3 className='text-2xl font-bold text-gray-800 mb-4'>Contact Information</h3>
              <p className='text-gray-600 mb-6'>Fill out the form and our team will get back to you within 24 hours.</p>
            </div>

            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                <div className='bg-blue-100 p-3 rounded-lg text-blue-600'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className='font-semibold text-gray-800'>Email Us</p>
                  <p className='text-gray-600'>support@fitnelms.com</p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='bg-blue-100 p-3 rounded-lg text-blue-600'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className='font-semibold text-gray-800'>Our Office</p>
                  <p className='text-gray-600'>Str. X, nr. 10<br/>Timisoara</p>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-gray-50 p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100'>
            <form className='flex flex-col gap-5' onSubmit={(e) => e.preventDefault()}>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-gray-700'>Full Name</label>
                <input type="text" placeholder="John Doe" className='px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white' />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-gray-700'>Email Address</label>
                <input type="email" placeholder="john@example.com" className='px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white' />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-gray-700'>Message</label>
                <textarea rows="5" placeholder="How can we help you?" className='px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none'></textarea>
              </div>

              <button className='bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg mt-2'>
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;