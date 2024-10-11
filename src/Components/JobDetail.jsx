import React from "react";

function JobDetail() {
  return (
    <div className="  justify-center pr-[7rem]  hidden md:block">
      <div className="bg-white p-6 w-[35rem] rounded-lg shadow-lg border border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img
              src="https://via.placeholder.com/50"
              alt="Workassist Logo"
              className="w-10 h-10"
            />
            <h2 className="text-2xl font-semibold">
              Frontend Software Engineer
            </h2>
            <p></p>
          </div>
        </div>

        <div className="text-base text-gray-500 mt-4 ">
          <p className="mb-1">
            {/* {" "} */}→ Workassist • Gurgaon, Haryana, India 1 day ago · Over
            100 applicants
          </p>
          {/* <p className="mb-1 color-[#FFFFE0]">On-site • Full-time • Executive</p> */}
          <div className="flex gap-5 text-base mt-4 mb-4">
            <span> →</span>
            <p className="bg-[#d3c973] rounded p-[2px]"> On-site •</p>
            <p className="bg-[#d3c973] rounded p-[2px]">Full-time •</p>
            <p>Executive</p>
          </div>
          <p className="mb-1 "> → 5 of 8 skills match your profile</p>
          <p className="mb-1 ">
            {/* {" "} */}→ See how you compare to over 100 other applicants. Try
            Premium
          </p>

          <div className="flex gap-8 mt-4">
            <p className="bg-gray-100 p-2">I am good fit for this job</p>
            <p className="bg-gray-100 p-2">How can i find bes job</p>
          </div>
        </div>

        <div className="flex mt-4 space-x-4">
          <button className="bg-blue-600 text-white px-9 py-2 rounded-3xl hover:bg-blue-700 ">
            Apply
          </button>
          <button className=" text-gray-700 px-5 py-2 rounded-3xl border border-blue-500 hover:bg-gray-300">
            Save
          </button>
        </div>

        <div className="mt-6 text-lg text-gray-500">
          <p className="font-bold text-xl">About the Job:</p>
          <p>Job Details</p>
          <p>Job Type: Full-time</p>
          <p>Role: Fresher</p>
          <p>Experience: 0-1 Year</p>
          <p>Location: Gurgaon</p>
          <p>Eligibility: Graduate</p>

          {/* <p className="font-bold text-lg">
            Note: This is a requirement for one of the Workassist Hiring Partner
          </p> */}

          <div className="pt-10">
            <p className="font-bold text-xl">Role Description</p>
            <p>
              This is a full-time on-site role for a Frontend/Backend Developer
              at Workassist in Gurugram. The Developer will be responsible for
              both front-end and back-end web development tasks, ensuring
              responsive web design, software development, and overall web
              development projects.
            </p>
          </div>

          <div className="pt-10">
            <p className="font-bold text-xl">Responsibility</p>
            <ul className="list-disc">
              <li className="ml-4">
                Develop user interface components using Vue.js
              </li>
              <li className="ml-4">
                Build reusable components and front-end libraries
              </li>
              <li className="ml-4">
                Develop user interface components using Vue.js
              </li>
              <li className="ml-4">
                Develop user interface components using Vue.js
              </li>
            </ul>
          </div>

          <div className="pt-10">
            <p className="font-bold text-xl">Requirement</p>
            <ul className="list-disc">
              <li className="ml-4">
                Bachelor's degree in computer science or related field
              </li>
              <li className="ml-4">
                2 years of experience in Vue.js development{" "}
              </li>
              <li className="ml-4">Proficient in HTML, CSS, and JavaScript</li>
              <li className="ml-4">Strong understanding of Vue.js concepts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
