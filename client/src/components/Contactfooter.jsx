"use client"
import React from 'react'
import { TextField } from '@mui/material'
const ContactFooter = () => {
  return (
    <div className='bg-gray-200 mt-20 flex flex-col lg:flex-row items-center justify-center px-4 py-10 space-y-10 lg:space-y-0 lg:space-x-10'>
      
      {/* Form Section */}
      <div className='w-full lg:w-[500px]'>
        <h1 className='text-2xl md:text-3xl font-bold text-center lg:text-left'>
          GET A FREE CASE EVALUATION TODAY!
        </h1>
        <h2 className='text-lg md:text-xl font-bold text-gray-500 mt-2 text-center lg:text-left'>
          AVAILABLE 24 HOURS A DAY
        </h2>
  
        <form className='mt-8'>
          <div className='flex flex-col space-y-6 items-center lg:items-start'>
            <TextField
              className='w-full md:w-[300px] bg-white'
              id="name"
              label="Enter your Name"
              variant="outlined"
            />
            <TextField
              className='w-full md:w-[300px] bg-white'
              id="email"
              label="Enter your valid email"
              variant="outlined"
            />
            <TextField
              className='w-full md:w-[300px] bg-white'
              id="message"
              label="Enter your Message"
              variant="outlined"
            />
            <button className='h-12 w-28 border border-black mt-4'>
              Submit
            </button>
          </div>
        </form>
      </div>
  
      {/* Map Section */}
      <div className='w-full lg:w-[500px] text-center lg:text-left'>
        <h1 className='text-2xl md:text-3xl font-bold'>WE ARE HERE</h1>
        <h2 className='text-lg md:text-xl font-bold text-gray-500 mt-2'>
          MON-FRI 8:30AM-5:00PM / PHONES ARE OPEN 24/7
        </h2>
  
        <div className='mt-6 flex justify-center lg:justify-start'>
          <iframe
            className='w-full h-[300px] max-w-[500px]'
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.871892057373!2d77.44477937533559!3d28.63360137566421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cee3d4e3485ed%3A0xe0fe1689b57c7d2e!2sABESIT%20GROUP%20OF%20INSTITUTIONS!5e0!3m2!1sen!2sin!4v1744826379860!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  )
  
}

export default ContactFooter
