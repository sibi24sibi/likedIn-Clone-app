import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ConnectModel from "./Components/ConnectModel";

function App() {
  return (
    <>
      {/* <Header /> */}
      <ConnectModel />

      {/* 

      <Routes>
        <Route path="/" element='' />
        <Route path="/" element='' />
        <Route path="/" element='' />
      </Routes>
      
      */}

      {/* <Footer /> */}
    </>
  );
}

export default App;
