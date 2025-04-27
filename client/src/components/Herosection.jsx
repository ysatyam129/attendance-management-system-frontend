"use client"
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import EmailIcon from '@mui/icons-material/Email';
const Herosection = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap justify-center items-center gap-10 p-6'>

    {/* MAIN OFFICE */}
    <div className='w-72 h-auto flex flex-col items-center text-center p-4 shadow-md rounded-lg'>
      <LocationOnIcon fontSize='large' />
      <h1 className='text-2xl text-black font-bold mt-4'>OUR MAIN OFFICE</h1>
      <p className='text-gray-600 font-semibold mt-2'>
        Tower No.152 third floor<br />
        Sec-62, Noida, Uttar Pradesh
      </p>
    </div>
  
    {/* PHONE */}
    <div className='w-72 h-auto flex flex-col items-center text-center p-4 shadow-md rounded-lg'>
      <LocalPhoneIcon fontSize='large' />
      <h1 className='text-2xl text-black font-bold mt-4'>PHONE</h1>
      <p className='text-xl text-black font-light mt-2'>999999999</p>
    </div>
  
    {/* FAX */}
    <div className='w-72 h-auto flex flex-col items-center text-center p-4 shadow-md rounded-lg'>
      <LocalPrintshopIcon fontSize='large' />
      <h1 className='text-2xl text-black font-bold mt-4'>FAX</h1>
      <p className='text-xl text-black font-light mt-2'>1-234-567-89123</p>
    </div>
  
    {/* EMAIL */}
    <div className='w-72 h-auto flex flex-col items-center text-center p-4 shadow-md rounded-lg'>
      <EmailIcon fontSize='large' />
      <h1 className='text-2xl text-black font-bold mt-4'>EMAIL</h1>
      <p className='text-xl text-black font-light mt-2'>ABcdef@gmail.com</p>
    </div>
  
  </div>
  
  )
}

export default Herosection
