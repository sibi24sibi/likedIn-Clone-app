import React, { useState } from "react";
import { FaPaperPlane, FaPencilAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { IoNotifications, IoSchoolOutline } from "react-icons/io5";
import { MdVerifiedUser } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { defaultCoverImage, defaultProfile } from "../assets/assets";
import { Modal } from "flowbite-react"; // Import Flowbite modal
import ProfileForm from "./ProfileForm";

function ProfileSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-100 h-auto max-w-max rounded-xl my-10 ml-20 flex flex-col border border-grey">
        <img
          className="relative h-[210px] w-[770px] rounded-t-xl object-cover"
          src={defaultCoverImage}
          alt="cover-photo"
        />
        <div>
          <img
            className="absolute top-[16rem] left-[7rem] h-[155px] w-[155px] rounded-full border-2 border-white object-cover"
            src={defaultProfile}
            alt="profile pic"
          />
        </div>
        <div className="text-2xl mt-2 flex justify-end pt-3 pr-5">
          <IoNotifications className="cursor-pointer" color="#373937" />
        </div>
        <div className="flex justify-between p-1">
          <div className="ml-6 mt-7 flex flex-col">
            <div className="pt-1 flex justify-start items-center gap-2">
              <h1 className="text-[26px] font-medium">Satoru Gojo</h1>
              <MdVerifiedUser />
              <p className="font-light text-sm text-gray-500">(He/Him)</p>
            </div>
            <div className="flex gap-2">
              <h1 className="text-[16px] font-medium">React Js Developer</h1>
              <p className="text-[16px] font-normal">
                | React js | Typescript | Firebase
              </p>
            </div>
            <div className="flex gap-1 justify-start items-center">
              <p className="text-[14px] text-gray-400 font-normal">
                Mumbai, India
              </p>
              <GoDotFill className="text-[14px] text-gray-400 font-normal" />
              <a href="/" className="text-[14px] text-sky-600 font-medium">
                Contact info
              </a>
            </div>
            <a href="/" className="text-[14px] text-sky-600 font-medium">
              500+ connections
            </a>
          </div>
          <div className="mr-10 mt-12">
            <div className="flex justify-start items-center gap-2.5">
              <HiOutlineOfficeBuilding />
              <p className="text-[14px]">Anonymous pvt. ltd</p>
            </div>
            <div className="flex justify-start items-center gap-2.5">
              <IoSchoolOutline />
              <p className="text-[14px]">Jujutsu High School, Japan</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between ml-6 my-2 mb-4">
          <button
            className="flex gap-1 justify-center items-center bg-blue-500 rounded-lg text-white font-medium p-2 w-24 hover:bg-blue-950"
            type="button"
          >
            <FiPlusCircle />
            <p className="text-sm">Connect</p>
          </button>
          <button
            className="flex gap-1 justify-center items-center bg-blue-500 rounded-lg text-white font-medium p-2 w-20 hover:bg-blue-950 mr-6"
            type="button"
            onClick={() => setOpen(true)}
          >
            <FaPencilAlt />
            <p className="text-sm">Edit</p>
          </button>
        </div>
      </div>

      {/* Flowbite Modal */}
      <Modal show={open} onClose={() => setOpen(false)}>
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Body>
          <ProfileForm onClose={() => setOpen(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProfileSection;
