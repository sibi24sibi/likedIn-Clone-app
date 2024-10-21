import React, { useEffect, useState } from "react";
import ConnectModel from "../Components/ConnectModel";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../Firebase";
import { useAuth } from "../Api/AuthApi";



export const NetworkPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const {userData} = useAuth();



  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "users"),
      (snapshot) => {
        const postData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filterData = postData.filter((u) => u.userID !== userData.userID)

        const shuffledNetworksData = filterData.sort(() => Math.random() - 0.5)
 
        setData(shuffledNetworksData);
        setLoading(false);

      }
    );

    return () => unsubscribe();
  }, []);

    

  return (
    <div className="md:p-10 max-w-sm md:max-w-none bg-gray-100 min-h-screen ">
      <div className="max-w-5xl mx-auto ">
        <h3 className="text-4xl font-semibold m-6 uppercase text-center">People You May Know</h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4 p-4 ">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse md:min-w-[184px] md:max-w-[184px] h-72 rounded-md shadow-sm relative border-[1px] border-gray-300"
                >
                  <div className="w-full h-16 bg-gray-200 rounded-t-md"></div>
                  <div className="flex justify-center items-center">
                    <div className="rounded-full w-24 bg-gray-200 absolute"></div>
                  </div>
                  <div className="mt-14 px-2 flex items-center justify-center flex-col">
                    <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                    <div className="mt-2 h-11 w-full bg-gray-200 rounded overflow-hidden"></div>
                  </div>
                  <div className="bottom px-2">
                    <div className="min-h-11">
                      <div className="mt-2 h-4 w-full bg-gray-200 rounded overflow-hidden"></div>
                    </div>
                    <div className="button mt-2">
                      <div className="bg-gray-200 h-[30px] rounded-[1rem]"></div>
                    </div>
                  </div>
                </div>
              ))
            : data.length === 0
            ? <div className=" flex  items-center justify-center w-[100vw] md:w-[70vw]">
              <p className=" text-center">No users found.</p>
              </div>
            : data.map((user) => <ConnectModel key={user.id} user={user} userData={userData} />)}
        </div>
      </div>
    </div>
  );
};
