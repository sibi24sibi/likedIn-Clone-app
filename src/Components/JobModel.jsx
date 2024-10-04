import React from 'react'

function JobModel() {

  const sampleData = [
  {
    id: 1,
    job_role: 'Software Developer',
    company: 'XYZ Consultancy Services',
    location: 'Noida, Uttar Pradesh',
  },
  {
    id: 2,
    job_role: 'java Developer',
    company: 'ABC Consultancy Services',
    location: 'Delhi, India',
  }
]

  return (
    <div className='bg-slate-50 h-auto w-[33%] rounded-lg border mx-auto my-4 border-slate-200 flex flex-col p-3 gap-3'>
      <div className='gap-1'>
        <h1 className='font-semibold text-[18px]'>Job picks for you</h1>
        <p className='text-[14px] text-gray-500'>Based on your profile and search history</p>
      </div>
      {
        sampleData.map((data) => (
        <div key={data.id}>
          <hr className='my-2 text-slate-400' />
          <div className='flex items-center gap-6'>
            <img className='h-[56px] w-[56px] rounded-full border border-gray-500 object-cover' src="\src\assets\images\logo.avif" key={data.id} alt='company profile pic' />
           <div>
              <p className='text-[16px] text-sky-500 font-medium'>{data.job_role}</p>
              <p className='text-[14px]'>{data.company}</p>
              <p className='text-[14px] text-gray-400'>{data.location}</p>
           </div>
          </div>
          <div className='py-1 flex justify-end'>
            <button className='bg-blue-500 rounded-lg text-white font-medium text-sm p-2 w-20 hover:bg-blue-950' type='button'>Apply</button>
          </div>
        </div>
      ))
      } 
    </div>
  );
};

export default JobModel;