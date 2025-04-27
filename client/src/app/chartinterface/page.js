import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
const page = () => {
  return (
    <div className='h-[750px] w-[1200px]'>
      
     <div className='h-[250px] w-[1460px] flex'>
        <div className='h-[150px] w-[300px] border border-gray-500 ml-10 mt-10 rounded-xl'>
            <h1 className='text-3xl mt-4 font-bold'>Total Employees</h1> 
            <h1 className='text-3xl mt-4 font-bold'>47</h1>
        </div>
        <div className='h-[150px] w-[300px] border border-gray-500 ml-10 mt-10 rounded-xl'>
            <h1 className='text-3xl mt-4 font-bold'>Total Salary Budget</h1>
            <h1 className='text-3xl mt-4 font-bold'>6,83,400</h1>

        </div>
        <div className='h-[150px] w-[300px] border border-gray-500 ml-10 mt-10 rounded-xl'>
            <h1 className='text-3xl mt-4 font-bold'>Total Paid</h1>
            <h1 className='text-3xl mt-4 font-bold'>12,000</h1>

        </div>
        <div className='h-[150px] w-[300px] border border-gray-500 ml-10 mt-10 rounded-xl'>
            <h1 className='text-3xl mt-4 font-bold'>Total Due</h1>
            <h1 className='text-3xl mt-4 font-bold'>6,71,400</h1>

        </div>

     </div>



     <div className='h-[350px] w-[1460px]'>


     <BarChart
      series={[
        { data: [35, 44, 24, 34] },
        { data: [51, 6, 49, 30] },
        { data: [15, 25, 30, 50] },
        { data: [60, 50, 15, 25] },
      ]}
      height={290}
      xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
    />
     </div>


    


    </div>
  )
}

export default page
