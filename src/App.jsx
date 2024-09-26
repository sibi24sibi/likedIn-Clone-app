import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import PostModel from "./Components/PostModel";
function App() {
  return (
    <>
      <Header />

      {/* 

      <Routes>
        <Route path="/" element='' />
        <Route path="/" element='' />
        <Route path="/" element='' />
      </Routes>
      
      */}
      <PostModel />

      <Footer />
    </>
  );
}

export default App;
