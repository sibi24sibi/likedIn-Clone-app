import React from "react";
import { useParams } from "react-router-dom";
import jobData from "../data/jobData";
import JobInfo from "./JobInfo"; // Import the new component

function JobDetail() {
  const { id } = useParams();
  const job = jobData.find((job) => job.id === parseInt(id));
  const firstJob = jobData[0]; // Get the first job in the data array

  const jobToDisplay = job || firstJob; // Use job if available, otherwise use the first job

  return (
    <div className="flex justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-w-fit sticky top-10">
        {jobToDisplay ? (
          <JobInfo job={jobToDisplay} /> // Render the JobInfo component
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="bg-slate-100 p-6 rounded-lg shadow-md text-center w-full h-full">
              <p className="text-lg font-semibold">No job data available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobDetail;
