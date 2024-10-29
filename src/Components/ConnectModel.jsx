// ConnectModel.js
import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { defaultCoverImage, defaultProfile } from "../assets/assets";
import { useAuth } from "../Api/AuthApi";
import { checkConnectionStatus, toggleConnectionStatus } from "../Api/UploadApi";
import { useNavigate} from "react-router-dom";

function ConnectModel({ user }) {
  const { userData } = useAuth();
  const [connected, setConnected] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (user.userID && userData.userID) {
      checkConnectionStatus(userData.userID, user.userID).then(setConnected);
    }
  }, [user.userID, userData.userID]);

  const handleConnect = useCallback(() => {
    toggleConnectionStatus(connected, userData.userID, user.userID, setConnected);
  }, [connected, userData.userID, user.userID]);


  const handleViewProfile = () => {
    navigate(`/connect/${user.id}`)
  }


  return (
    <div
      key={user.id}
      className="md:min-w-[184px] md:max-w-[184px] h-72 rounded-md shadow-sm hover:shadow-[0px_3px_4px_1px_#b6b6b6] relative border-[1px] border-gray-300 border-opacity-90 transition-shadow ease-in duration-100"
    >
     <div onClick={handleViewProfile}>
     <div className="banner-image">
        <img src={defaultCoverImage} alt="Banner" className="w-full h-16 object-cover rounded-t-md" />
      </div>
      <div className="avatar flex justify-center items-center">
        <img src={user.profilePic || defaultProfile} alt={user.name || "User"} className="rounded-full w-24 absolute" />
      </div>
      <div className="names mt-14 px-2 flex items-center justify-center flex-col">
        <h3 className="font-semibold">{user.name}</h3>
        <div className="font-thin text-center min-h-11 overflow-hidden line-clamp-2 break-words leading-5">
          {user.role}
        </div>
      </div>
        
     </div>
      <div className="bottom px-2">
        <button
          onClick={handleConnect}
          className={`${connected ? ' bg-teal-700 hover:bg-teal-900 text-slate-100 ' : ' text-[#0a66c2]'} border-[#0a66c2] border-[1.5px] border-solid rounded-[1rem] w-full py-[1px] font-semibold hover:bg-[#e7e7e7] hover:border-[2px] transition-all duration-100 ease-linear h-[30px]`}
        >
          <FontAwesomeIcon icon={faUserPlus} className="w-4 h-4 mr-1" />
          {connected ? "Connected" : "Connect"}
        </button>
      </div>
    </div>
  );
}

export default ConnectModel;
