import { firestore } from "../Firebase";
import {
  collection, addDoc, deleteDoc,
  doc, updateDoc, arrayRemove, arrayUnion, setDoc, onSnapshot,
  where,
  query,
  getDoc,
  getDocs,
  Timestamp
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";

// import uuid from "react-uuid";

const postsCollection = collection(firestore, "posts");

const storage = getStorage();

const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};



export const listenToUsers = (setUsers) => {
  // Listen for real-time updates
  const unsubscribe = onSnapshot(collection(firestore, "users"), (snapshot) => {
    const usersList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(usersList);
  });

  return unsubscribe;
};

export const listenToAllPosts = (setAllPosts) => {
  // Listen for real-time updates
  const unsubscribe = onSnapshot(collection(firestore, "posts"), (snapshot) => {
    const usersList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAllPosts(usersList);
  });

  return unsubscribe;
};




export const listenToSingleUser = (setUser, userID) => {
  const usersQuery = query(
    collection(firestore, "users"),
    where("userID", "==", userID)
  );

  const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
    const user = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))[0]; // Assuming only one user per userID
    setUser(user);
  });
  return unsubscribe;
};


export const listenToSingleUserPost = (setAllPosts, userID) => {

  const PostsQuery = query(
    collection(firestore, "posts"),
    where("userID", "==", userID)
  );


  const unsubscribe = onSnapshot(PostsQuery, (snapshot) => {
    const postsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAllPosts(postsList);
  });

  return unsubscribe;
};



export const addPost = async (postData, imageFile, userId, postId) => {

  let imageUrl = null;

  if (imageFile) {
    imageUrl = await uploadImage(imageFile);
  }

  const postWithImage = {
    content: postData,
    imageUrl: imageUrl,
    createdAt: Timestamp.now(),
    userID: userId,
    postID: postId,
  };

  await addDoc(postsCollection, postWithImage);
  toast.success('post added successfully');

  return true;

};

// // Function to handle post deletion
export const handleDeletePost = async (postId) => {
  const postRef = doc(firestore, 'posts', postId);
  await deleteDoc(postRef); // Delete the post from Firestore
  toast.success('post deleted successfully');
};





export const handleLikePost = async (postId, username, like) => {
  const postRef = doc(firestore, "posts", postId);

  // Update likes based on like parameter

  await updateDoc(postRef, {
    likes: like
      ? arrayUnion(username) // Add user ID to likes array
      : arrayRemove(username) // Remove user ID from likes array
  });

};


// export const handleCommentPost = async (postId, username, commentText) => {
//   const postRef = doc(firestore, "posts", postId);
//   await updateDoc(postRef, {
//     comments: arrayUnion({ username, text: commentText, createdAt: new Date() }) // Add comment object to the comments array
//   });
// };


// export const addConnection = async (userId, targetId) => {
//   try {
//     const connectionToAdd = doc(collection(firestore, 'connections'), `${userId}_${targetId}`);

//     await setDoc(connectionToAdd, { userId, targetId });


//   } catch (err) {
//     console.error("Error adding connection:", err);

//   }
// };



// // this belowe code to be modified
// const connectionsCollection = collection(firestore, "connections");

// // Check if a connection exists
// export const checkConnectionStatus = async (userId, targetId) => {
//   const q = query(
//     connectionsCollection,
//     where("userId", "==", userId),
//     where("targetId", "==", targetId)
//   );
//   const querySnapshot = await getDocs(q);
//   return !querySnapshot.empty;
// };


// // Toggle connection (add or delete)
// export const toggleConnectionStatus = async (connected, userId, targetId, setConnected) => {
//   const q = query(
//     connectionsCollection,
//     where("userId", "==", userId),
//     where("targetId", "==", targetId)
//   );

//   try {
//     if (connected) {
//       const querySnapshot = await getDocs(q);
//       if (!querySnapshot.empty) {
//         const connectionDoc = querySnapshot.docs[0];
//         await deleteDoc(doc(firestore, "connections", connectionDoc.id));
//         setConnected(false);
//         console.log(`Disconnected with ${targetId}`);
//       }
//     } else {
//       await addDoc(connectionsCollection, {
//         userId,
//         targetId,
//         connectedAt: new Date(),
//       });
//       setConnected(true);
//       console.log(`Connected with ${targetId}`);
//     }
//   } catch (error) {
//     console.error("Error updating connection status:", error);
//   }
// };