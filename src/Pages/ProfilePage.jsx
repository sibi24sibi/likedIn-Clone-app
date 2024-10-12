import React from 'react'
import ProfileSection from '../Components/ProfileSection'
import PostModel from '../Components/PostModel'

export const ProfilePage = () => {
  return (

    
    <div>
      <div className='   '>
     <div className='flex justify-center'>
     <ProfileSection/>
     </div>
    <div className=' flex flex-col'>
    <PostModel/>
    </div>
    </div>
    </div>
  )
}
