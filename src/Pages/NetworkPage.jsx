import React, { useEffect, useState } from "react";
import ConnectModel from "../Components/ConnectModel";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../Firebase";

export const NetworkPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "users"),
      (snapshot) => {
        const postData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(postData);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="md:p-10 bg-gray-100 min-h-screen ">
      <div className="max-w-7xl ">
        <h3 className="text-2xl font-bold md:m-2 m-6">People You May Know</h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4  gap-y-4 p-4 ">
          {data.length === 0 ? (
            <p>No users found.</p>
          ) : (
            data.map((user) => <ConnectModel key={user.id} user={user} />) // Pass user as a prop
          )}
        </div>
      </div>
    </div>
  );
};
