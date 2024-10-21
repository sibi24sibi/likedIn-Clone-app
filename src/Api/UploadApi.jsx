import { firestore } from "../Firebase";
import { collection, addDoc  , deleteDoc,
  doc, updateDoc,arrayRemove ,arrayUnion ,setDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import uuid from "react-uuid";

const postsCollection = collection(firestore, "posts");
const storage = getStorage();

const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  
  return downloadURL;
};

export const addPost = async (postData, imageFile) => {
  try {
    let imageUrl = null;

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    const postWithImage = {
      ...postData,
      imageUrl,
    };

    await addDoc(postsCollection, postWithImage);

    return true; // Indicate success
  } catch (e) {
    console.error("Error adding document: ", e);
    return false; // Indicate failure
  }
};

// Function to handle post deletion
export const handleDeletePost = async (postId) => {
  try {
    
    await deleteDoc(doc(firestore, "posts", postId)); // Delete the post from Firestore
  } catch (error) {
    console.error("Error deleting post: ", error);
  }
};


export const handlePostSubmit = async  (postContent,selectedFile,user,closeModal,setLoading) => {
  if (postContent.trim() === "") return; // Prevent empty posts

  setLoading(true); // Start loading when posting
  const postData = {
    content: postContent,
    createdAt: new Date(),
    userID: user.uid,
    username:user.displayName,
    postID: uuid()
  };

  try {
    // Get the postID from addPost
    const returnedPostID = await addPost(postData, selectedFile);

    if (returnedPostID) {
      console.log("Post created with ID:", returnedPostID); // Use the returned postID as needed
      closeModal();
      document.querySelector('input[type="file"]').value = ""; // Reset file input
    }
  } catch (error) {
    console.error("Error creating post:", error); // Log the error
    // Optionally, set an error state to show a message to the user
  } finally {
    setLoading(false); // Stop loading after the process
  }
};


export const handleLikePost = async (postId, username, like) => {
  const postRef = doc(firestore, "posts", postId);
  
  // Update likes based on like parameter
  try {
    await updateDoc(postRef, {
      likes: like
        ? arrayUnion(username) // Add user ID to likes array
        : arrayRemove(username) // Remove user ID from likes array
    });
  } catch (error) {
    console.error("Error updating likes: ", error);
  }
};


export const handleCommentPost = async (postId, username, commentText) => {
  const postRef = doc(firestore, "posts", postId);
  await updateDoc(postRef, {
      comments: arrayUnion({ username, text: commentText, createdAt: new Date() }) // Add comment object to the comments array
  });
};


export const addConnection = async (userId, targetId) => {
  try {
    const connectionToAdd = doc(collection(firestore,'connections'), `${userId}_${targetId}`);

    await setDoc(connectionToAdd, { userId, targetId });


  } catch (err) {
    console.error("Error adding connection:", err);
  
  }
};