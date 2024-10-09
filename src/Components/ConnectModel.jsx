import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";
import { defaultCoverImage, defaultProfile } from "../assets/assets";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../Firebase";

function ConnectModel() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "users"),
      (snapshot) => {
        const postData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(postData);
        setLoading(false); // Set loading to false when data is fetched
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render loading state
  }

  return (
    <>
      {data.length === 0 ? (
        <p>No users found.</p>
      ) : (
        data.map((datas) => (
          <div
            key={datas.id} // Adding a unique key for each child
            className="min-w-[184px] max-w-[184px] h-72 rounded-md shadow-sm hover:shadow-[0px_3px_4px_1px_#b6b6b6] relative border-[1px] border-gray-300 border-opacity-90 transition-shadow ease-in duration-100"
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
                src={datas.profileImage || defaultProfile}
                alt={datas.name || "User"}
                className="rounded-full w-24 absolute"
              />
            </div>
            <div className="names mt-14 px-2 flex items-center justify-center flex-col">
              <h3 className="font-semibold">{datas.name}</h3>
              <div className="font-thin text-center min-h-11 overflow-hidden line-clamp-2 break-words leading-5">
                {datas.role}
              </div>
            </div>
            <div className="bottom px-2 ">
              <div className="min-h-11">
                <div className="font-thin text-[0.8rem] leading-4 line-clamp-2 text-center">
                  Based on your profile
                </div>
              </div>
              <div className="button">
                <button className="text-[#0a66c2] border-[#0a66c2] border-[1.5px] border-solid rounded-[1rem] w-full py-[1px] font-semibold hover:bg-[#e7e7e7] hover:border-[2px] transition-all duration-100 ease-linear h-[30px]">
                  <FontAwesomeIcon icon={faUserPlus} className="w-4 h-4 mr-1" />
                  Connect
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default ConnectModel;
