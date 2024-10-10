import { firestore } from "../Firebase";
import { collection, addDoc  , deleteDoc,
  doc, } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

    const docRef = await addDoc(postsCollection, postWithImage);

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
