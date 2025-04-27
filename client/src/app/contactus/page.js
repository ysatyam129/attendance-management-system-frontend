"use client"
import Contactfooter from '@/components/ContactFooter'
import Herosection from '@/components/Herosection'
import React from 'react'

const page = () => {
  return (
    <div className='h-[900px] w-[1500px] bg-gray-200'>
      <h1 className='ml-[610px] mb-16 text-5xl text-black font-bold'>Let '&apos' Connect</h1>
      
      <Herosection/>
      <Contactfooter/>
    </div>
  )
}

export default page