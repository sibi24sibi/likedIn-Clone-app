import { firestore } from "../Firebase";
import { collection, addDoc  , deleteDoc,
  doc, } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
