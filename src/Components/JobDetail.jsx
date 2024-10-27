import React from "react";
import { useParams } from "react-router-dom";
import jobData from "../data/jobData";

function JobDetail() {
  const { id } = useParams();
  const job = jobData.find((job) => job.id === parseInt(id));

  return (
    <div className="flex justify-center p-4">
      <div className="bg-white p-6  rounded-lg shadow-lg border border-gray-200">
        {job ? (
          <>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <img src={job.logo} alt={`${job.company} Logo`} className="w-10 h-10" />
                <h2 className="text-xl md:text-2xl font-semibold">{job.job_role}</h2>
              </div>
            </div>

            <div className="text-base text-gray-500 mt-4">
              <p className="mb-1">→ {job.company} • {job.location} • 1 day ago</p>
              <div className="flex gap-2 flex-wrap text-base mt-4 mb-4">
                <span> →</span>
                <p className="bg-[#d3c973] rounded p-[2px]">On-site</p>
                <p className="bg-[#d3c973] rounded p-[2px]">Full-time</p>
                <p className="bg-[#d3c973] rounded p-[2px]">Executive</p>
              </div>

              <p className="mb-1">→ See how you compare to over 100 other applicants. Try Premium</p>

              <div className="flex gap-4 mt-4 flex-wrap">
                <p className="bg-gray-100 p-2 flex-1 text-center">I am a good fit for this job</p>
                <p className="bg-gray-100 p-2 flex-1 text-center">How can I find the best job</p>
              </div>
            </div>

            <div className="flex mt-4 space-x-2 flex-wrap">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-3xl hover:bg-blue-700 flex-1 mb-2 md:mb-0">Apply</button>
              <button className="text-gray-700 px-6 py-2 rounded-3xl border border-blue-500 hover:bg-gray-300 flex-1">Save</button>
            </div>

            <div className="mt-6 text-lg text-gray-500">
              <p className="font-bold text-xl">About the Job:</p>
              <p>Job Type: {job.type}</p>
              <p>Role: {job.role}</p>
              <p>Experience: {job.experience}</p>
              <p>Location: {job.location}</p>
              <p>Eligibility: {job.eligibility}</p>

              <div className="pt-10">
                <p className="font-bold text-xl">Role Description</p>
                <p>{job.description}</p>
              </div>

              <div className="pt-10">
                <p className="font-bold text-xl">Responsibilities</p>
                <ul className="list-disc list-inside">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="ml-4">{resp}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-10">
                <p className="font-bold text-xl">Requirements</p>
                <ul className="list-disc list-inside">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="ml-4">{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center ">
            <div className="bg-slate-100 p-6 py-20 rounded-lg shadow-md text-center px-32  ">
              <p className="text-lg font-semibold">Select any job to apply</p>
              </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobDetail;
