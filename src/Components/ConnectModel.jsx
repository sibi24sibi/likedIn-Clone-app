import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { defaultCoverImage, defaultProfile } from "../assets/assets";
import { useAuth } from "../Api/AuthApi";
import { checkConnectionStatus, toggleConnectionStatus } from "../Api/UploadApi";
import { useNavigate } from "react-router-dom";
import { ModalForm } from './Modals/Modal';

function ConnectModel({ user }) {
  const { userData } = useAuth();
  const [connected, setConnected] = useState(false);
  const [open, setOpen] = useState(false);  // Track the modal open state
  const navigate = useNavigate();

  useEffect(() => {
    if (user.userID && userData.userID) {
      checkConnectionStatus(userData.userID, user.userID).then(setConnected);
    }
  }, [user.userID, userData.userID]);

  const handleConnect = useCallback(() => {
    // Open the modal before toggling the connection status
    setOpen(true);
  }, []);

  const handleConfirmConnection = () => {
    // Toggle connection status when confirmed in the modal
    toggleConnectionStatus(connected, userData.userID, user.userID, setConnected);
    setOpen(false); // Close the modal after confirming
  };

  const handleViewProfile = () => {
    navigate(`/profilepage/${user.id}`);
  };

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
            {user.role || 'unknown'}
          </div>
        </div>

        <div className="font-thin my-3 text-[0.8rem] leading-4 line-clamp-2 text-center">Based on your profile</div>
      </div>

      <div className="bottom px-2">
        <button
          onClick={handleConnect}
          className={`${connected ? 'bg-teal-700 hover:bg-teal-900 text-slate-100' : 'text-[#0a66c2]'} border-[#0a66c2] border-[1.5px] border-solid rounded-[1rem] w-full py-[1px] font-semibold hover:bg-[#e7e7e7] hover:border-[2px] transition-all duration-100 ease-linear h-[30px]`}
        >
          <FontAwesomeIcon icon={faUserPlus} className="w-4 h-4 mr-1" />
          {connected ? "Connected" : "Connect"}
        </button>
      </div>

      {/* Modal Form */}
      <ModalForm
        open={open}
        onClose={() => setOpen(false)}
        modelTitle="Connect Request"
        modelDesc={`Are you sure you want to '${connected ? 'Disconnect' : 'Connect'}`}
        modelFooter={<ModalForm
          open={open}
          onClose={() => setOpen(false)}
          modelTitle="Connect Request"
          modelDesc={`Are you sure you want to ${connected ? 'Disconnect' : 'Connect'} with ${user.name}`}
          modelFooter={
            <div className="flex space-x-4">

              <button
                className={`px-4 py-2 text-white font-semibold rounded-md transition-all duration-300 ${connected ? 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700' : 'bg-green-500 hover:bg-green-600 active:bg-green-700'}`}
                onClick={handleConfirmConnection}
              >
                {connected ? 'Disconnect' : 'Connect'}
              </button>

              <button
                className="px-4 py-2 text-gray-600 font-semibold rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>

            </div>
          }
        />
        }
      />
    </div>
  );
}

export default ConnectModel;
