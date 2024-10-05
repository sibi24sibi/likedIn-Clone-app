import React from "react";
import JobModel from "../Components/JobModel";
import JobDetail from "./../Components/JobDetail";

function JobPage() {
  return (
    <div className="flex">
      <JobModel />
      <JobDetail />
    </div>
  );
}

export default JobPage;
