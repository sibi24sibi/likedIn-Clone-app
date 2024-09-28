import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SigninForm from "./Components/SigninForm";

function App() {
  return (
    <>
      {/* <Header /> */}

      <SigninForm />

      {/* <Footer /> */}
    </>
  );
}

export default App;
