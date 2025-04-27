"use client"
import Contactfooter from '@/components/Contactfooter'
// import Herosection from '@/components/Herosection'
import React from 'react'
import Navbar from "@/components/Navbar"

const page = () => {
  return (
    <div className='h-[900px] w-[1500px] bg-gray-200 text-black'>
      {/* <h1 className='ml-[610px] mb-16 text-5xl text-black font-bold'>Let Connect</h1> */}
      <Navbar />
      
      {/* <Herosection/> */}
      <Contactfooter/>
    </div>
  )
}

export default page