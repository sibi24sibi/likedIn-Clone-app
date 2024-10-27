import linkedinSmallLogo from "./images/logo.png";
import linkedinBigLogo from "./images/LinkedIn-Logo.png";
import defaultProfile from "./images/image.jpg";
import defaultCoverImage from "./images/cover2.webp";
import errorImg from '../assets/images/Likedin-error-image.png'
import NoPost from '../assets/images/Screenshot 2024-10-14 221043.png'

import profilePic_King from "../assets/images/profilePic/Monkey_Profile (1).jpg";
import profilePic_BlueFunky from "../assets/images/profilePic/Monkey_Profile (2).jpg";
import profilePic_BrownSkele from "../assets/images/profilePic/Monkey_Profile (3).jpg";
import profilePic_SquareCap from "../assets/images/profilePic/Monkey_Profile (5).jpg";
import profilePic_RedCheckeShirt from "../assets/images/profilePic/Monkey_Profile (6).jpg";
import profilePic_Leopard from "../assets/images/profilePic/Monkey_Profile (7).jpg";
import profilePic_Royal from "../assets/images/profilePic/Monkey_Profile (8).jpg";
import profilePic_Devil from "../assets/images/profilePic/Monkey_Profile (9).jpg";
import profilePic_FunnyHatBatch from "../assets/images/profilePic/Monkey_Profile (10).jpg";
import profilePic_BasketBallAthelete from "../assets/images/profilePic/Monkey_Profile (11).jpg";
import profilePic_Normal from "../assets/images/profilePic/Monkey_Profile (12).jpg";
import profilePic_superman from "../assets/images/profilePic/Monkey_Profile (13).jpg";
import profilePic_cigar from "../assets/images/profilePic/Monkey_Profile (14).jpg";
import profilePic_luffy from "../assets/images/profilePic/Monkey_Profile (16).jpg";

// Function to format the timestamp
export const formatTimestamp = (timestamp) => {
  const now = new Date();
  const timeDiff = now - timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  return `${days} day${days !== 1 ? "s" : ""} ago`;
};





export const allDefaultProfilePics = [
  profilePic_King,
  profilePic_BlueFunky,
  profilePic_BasketBallAthelete,
  profilePic_SquareCap,
  profilePic_RedCheckeShirt,
  profilePic_Devil,
  profilePic_Leopard,
  profilePic_BasketBallAthelete,
  profilePic_Royal,
  profilePic_BrownSkele,
  profilePic_FunnyHatBatch,
  profilePic_Normal,
  profilePic_superman,
  profilePic_cigar,
  profilePic_luffy,
];



// Named exports
export {
  linkedinSmallLogo,
  linkedinBigLogo,
  defaultProfile,
  defaultCoverImage,
  errorImg,
  NoPost
};
