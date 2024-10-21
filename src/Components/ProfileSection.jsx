import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaPencilAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { IoNotifications, IoSchoolOutline } from "react-icons/io5";
import { MdVerifiedUser } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { defaultCoverImage, defaultProfile } from "../assets/assets";
import { useAuth } from "../Api/AuthApi";
import { ProfileFormModal } from "./Modals/ProfileFormModal";
import { firestore } from "../Firebase"; // Ensure Firestore is imported
import { doc, getDoc } from "firebase/firestore";

function ProfileSection() {
  const [open, setOpen] = useState(false);

  const [profileData, setProfileData] = useState(false);
  const { userData } = useAuth();

  // Fetch user document by ID if needed
  const getDocumentById = async (id) => {
    const docRef = doc(firestore, "users", id); // Replace "users" with your collection name
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setProfileData(docSnap.data())
    } else {
      console.log("No such document!");
    }
  };

  // Optionally call getDocumentById when the component mounts or when userData changes
  useEffect(() => {
    if (userData && profileData) {
      getDocumentById(userData.userID); // Call this if userData is available
    }
  }, [userData,profileData]);

  return (
    <>
      <div className='relative top-5 w-11/12 md:w-9/12 h-auto rounded-xl my-7'>
        <img
          className='relative h-[150px] sm:h-[210px] w-full rounded-t-xl object-cover'
          src={defaultCoverImage}
          alt='cover-photo'
        />
        <div className="absolute md:top-[7rem] top-[5rem] md:left-[1rem] left-[1rem]">
          <img
            className='h-[125px] sm:h-[155px] w-[125px] sm:w-[155px] rounded-full border-2 border-white object-cover'
            src={defaultProfile}
            alt='profile pic'
          />
        </div>
        <div className='text-xl sm:text-2xl mt-2 flex justify-end pt-3 pr-5'>
          <IoNotifications className='cursor-pointer' color='#373937' />
        </div>
        <div className='flex flex-col sm:flex-row justify-between p-1'>
          <div className='ml-4 sm:ml-6 mt-7 flex flex-col'>
            <div className='pt-1 flex items-center gap-2'>
              <h1 className='text-[20px] sm:text-[26px] font-medium'>{ userData.name ||profileData.name}</h1>
              <MdVerifiedUser />
              <p className='font-light text-sm text-gray-500'>(He/Him)</p>
            </div>
            <div className='flex gap-2'>
              <h1 className='text-[14px] sm:text-[16px] font-medium'>{userData.role}</h1>
            </div>
            <div className='flex items-center gap-1'>
              <p className='text-[12px] sm:text-[14px] text-gray-400'>{'Mumbai, India'}</p>
              <GoDotFill className='text-[12px] sm:text-[14px] text-gray-400' />
              <a href='/' className='text-[12px] sm:text-[14px] text-sky-600'>{'+91 2379387342'}</a>
            </div>
            <a href='/' className='text-[12px] sm:text-[14px] text-sky-600'>{'176 followers'}</a>
          </div>
          <div className='mr-4 sm:mr-10 mt-4 sm:mt-12 ml-4'>
            <div className='flex items-center gap-2.5'>
              <HiOutlineOfficeBuilding />
              <p className='text-[12px] sm:text-[14px]'>{'National Pvt. Ltd.'}</p>
            </div>
            <div className='flex items-center gap-2.5'>
              <IoSchoolOutline />
              <p className='text-[12px] sm:text-[14px]'>{'Government School, Mumbai'}</p>
            </div>
          </div>
        </div>
        <div className='flex justify-between ml-4 sm:ml-6 my-2 mb-4'>
          <button className='flex justify-center items-center gap-1.5 bg-blue-500 rounded-lg text-white font-medium p-2 w-auto sm:w-24 hover:bg-blue-950' type='button'>
            <FiPlusCircle className='text-[1rem]' />
            <p className='text-sm'>Connect</p>
          </button>
          <button
            className='flex justify-center items-center gap-1.5 bg-blue-500 rounded-lg text-white font-medium p-2 w-auto sm:w-20 hover:bg-blue-950 mr-4 sm:mr-6'
            type='button'
            onClick={() => setOpen(true)}
          >
            <FaPencilAlt className='text-[1rem]' />
            <p className='text-sm'>Edit</p>
          </button>
        </div>
      </div>

      <ProfileFormModal setOpen={setOpen} open={open} />
    </>
  );
}

export default ProfileSection;
