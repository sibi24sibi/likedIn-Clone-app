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
import { ref as dbRef, set, onDisconnect } from 'firebase/database'; // Import from Firebase Realtime Database
import { database } from '../Firebase'; // Your Firebase initialization file

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


export const handleCommentPost = async (postId, username, commentText) => {
  const postRef = doc(firestore, "posts", postId);
  await updateDoc(postRef, {
    comments: arrayUnion({ commenterId:username, text: commentText, createdAt: new Date() }) // Add comment object to the comments array
  });
};



// Function to fetch comments for a specific post
export const fetchCommentsForPost = async (postId) => {
  const postRef = doc(firestore, 'posts', postId);
  const postSnap = await getDoc(postRef);
  if (postSnap.exists()) {
    return postSnap.data().comments || []; // Return comments array or empty if undefined
  }
  throw new Error('Post not found');
};


export const addConnection = async (userId, targetId) => {
  try {
    const connectionToAdd = doc(collection(firestore, 'connections'), `${userId}_${targetId}`);

    await setDoc(connectionToAdd, { userId, targetId });


  } catch (err) {
    console.error("Error adding connection:", err);

  }
};



// this belowe code to be modified
const connectionsCollection = collection(firestore, "connections");

// Check if a connection exists
export const checkConnectionStatus = async (userId, targetId) => {
  const q = query(
    connectionsCollection,
    where("userId", "==", userId),
    where("targetId", "==", targetId)
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};


// Toggle connection (add or delete)
export const toggleConnectionStatus = async (connected, userId, targetId, setConnected) => {
  const q = query(
    connectionsCollection,
    where("userId", "==", userId),
    where("targetId", "==", targetId)
  );

  try {
    if (connected) {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const connectionDoc = querySnapshot.docs[0];
        await deleteDoc(doc(firestore, "connections", connectionDoc.id));
        setConnected(false);
        console.log(`Disconnected with ${targetId}`);
      }
    } else {
      await addDoc(connectionsCollection, {
        userId,
        targetId,
        connectedAt: new Date(),
      });
      setConnected(true);
      console.log(`Connected with ${targetId}`);
    }
  } catch (error) {
    console.error("Error updating connection status:", error);
  }
};



export const listenToUserFollowers = async (userID, setFollowersCount) => {
  const followersQuery = query(
    collection(firestore, "connections"),
    where("targetId", "==", userID)
  );

  try {
    const querySnapshot = await getDocs(followersQuery);
    const followersCount = querySnapshot.size; // Get the number of followers
    setFollowersCount(followersCount);
  } catch (error) {
    console.error("Error getting followers count: ", error);
  }
};


export const listenToUserFollowing = async (userID, setFollowingCount) => {
  const followingQuery = query(
    collection(firestore, "connections"),
    where("userId", "==", userID)
  );

  try {
    const querySnapshot = await getDocs(followingQuery);
    const followingCount = querySnapshot.size; // Get the number of people the user is following
    setFollowingCount(followingCount);
  } catch (error) {
    console.error("Error getting following count: ", error);
  }
};


export const listenToUserPosts = async (userID, setPostsCount) => {
  const postsQuery = query(
    collection(firestore, "posts"),
    where("userId", "==", userID)
  );

  try {
    const querySnapshot = await getDocs(postsQuery);
    const postsCount = querySnapshot.size; // Get the number of posts for the user
    setPostsCount(postsCount);
  } catch (error) {
    console.error("Error getting posts count: ", error);
  }
};