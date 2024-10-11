import React from "react";
import JobModel from "../Components/JobModel";
import JobDetail from "./../Components/JobDetail";

function JobPage() {
  return (
    <div className="flex py-5">
      <JobModel />
      <JobDetail />
    </div>
  );
}

export default JobPage;
