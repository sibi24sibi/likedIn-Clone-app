import React from "react";
import ConnectModel from "../Components/ConnectModel";

export const NetworkPage = () => {
  return (
    <div>
      <h3>Recommeded User</h3>
      <div className=" grid grid-cols-4 gap-4">
        <ConnectModel />
      </div>
    </div>
  );
};
