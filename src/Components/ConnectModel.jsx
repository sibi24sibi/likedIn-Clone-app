import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";
import { defaultCoverImage, defaultProfile } from "../assets/assets";
import { firestore } from "../Firebase";
import { collection, addDoc, doc, deleteDoc, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from "../Api/AuthApi";

function ConnectModel({ user }) {
  const { userData } = useAuth();
  const [connected, setConnected] = useState(false);

  // Check connection status when component mounts
  useEffect(() => {
    const checkConnectionStatus = async () => {
      try {
        const connectionCollection = collection(firestore, "connections");
        const q = query(
          connectionCollection,
          where("userId", "==", userData.userID),
          where("targetId", "==", user.userID)
        );
        const querySnapshot = await getDocs(q);

        // If there's a connection document, set connected to true
        setConnected(!querySnapshot.empty);
      } catch (error) {
        console.error("Error checking connection status:", error);
      }
    };

    if (user.userID && userData.userID) {
      checkConnectionStatus();
    }
  }, [user.userID, userData.userID]);

  const handleConnect = async () => {
    if (connected) {
      // Fetch the existing connection document that needs to be deleted
      const connectionCollection = collection(firestore, "connections");
      const q = query(
        connectionCollection,
        where("userId", "==", userData.userID),
        where("targetId", "==", user.userID)
      );

      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const connectionDoc = querySnapshot.docs[0]; // Get the first matching connection doc
          await deleteDoc(doc(firestore, "connections", connectionDoc.id)); // Delete the document
          setConnected(false);
          console.log(`Successfully disconnected with ${user.userID}`);
        }
      } catch (error) {
        console.error("Error disconnecting user:", error);
      }
    } else {
      try {
        console.log(`Connecting with ${user.userID}`);
        const connectionCollection = collection(firestore, "connections");

        // Add the connection document with userId, targetId, and connectionId
        await addDoc(connectionCollection, {
          userId: userData.userID,
          targetId: user.userID,
          connectedAt: new Date(),
        });

        setConnected(true); // Set connected after successfully adding the document
        console.log(`Successfully connected with ${user.userID}`);
      } catch (error) {
        console.error("Error connecting with user:", error);
      }
    }
  };

  return (
    <div
      key={user.id}
      className="md:min-w-[184px] md:max-w-[184px] h-72 rounded-md shadow-sm hover:shadow-[0px_3px_4px_1px_#b6b6b6] relative border-[1px] border-gray-300 border-opacity-90 transition-shadow ease-in duration-100"
    >
      <div className="banner-image">
        <img
          src={defaultCoverImage}
          alt="Banner"
          className="w-full h-16 object-cover rounded-t-md"
        />
      </div>

      <div className="avatar flex justify-center items-center">
        <img
          src={user.profileImage || defaultProfile}
          alt={user.name || "User"}
          className="rounded-full w-24 absolute"
        />
      </div>
      <div className="names mt-14 px-2 flex items-center justify-center flex-col">
        <h3 className="font-semibold">{user.name}</h3>
        <div className="font-thin text-center min-h-11 overflow-hidden line-clamp-2 break-words leading-5">
          {user.role}
        </div>
      </div>
      <div className="bottom px-2">
        <div className="min-h-11">
          <div className="font-thin text-[0.8rem] leading-4 line-clamp-2 text-center">
            Based on your profile
          </div>
        </div>
        <div className="button">
          <button
            onClick={handleConnect}
            className={` ${connected ? ' bg-teal-700 hover:bg-teal-900 text-slate-100 ' : ' text-[#0a66c2]'} border-[#0a66c2] border-[1.5px] border-solid rounded-[1rem] w-full py-[1px] font-semibold hover:bg-[#e7e7e7] hover:border-[2px] transition-all duration-100 ease-linear h-[30px] `}
          >
            <FontAwesomeIcon icon={faUserPlus} className="w-4 h-4 mr-1" />
            {connected ? "Connected" : "Connect"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConnectModel;
