import React from "react";
import JobModel from "../Components/JobModel";
import JobDetail from "./../Components/JobDetail";

function JobPage() {
  return (
    <div className="flex py-5 justify-center">
    <JobModel />
    <div className="hidden md:block h-full overflow-y-auto"> 
      <JobDetail />
    </div>
  </div>
  );
}

export default JobPage;
