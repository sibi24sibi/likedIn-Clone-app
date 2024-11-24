import { Watch } from "react-loader-spinner";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useAuth } from "./Api/AuthApi";
import { routes } from "./Routes/route";

function App() {
  const { user, mainLoading, isMobile } = useAuth();




  const renderRoute = ({ path, element, protected: isProtected }) => {
    if (isProtected && !user) {

      return <Route key={path} path={path} element={<Navigate to="/signin" />} />;
    }


    return (
      <Route
        key={path}
        path={path}
        element={typeof element === "function" ? element({ isMobile }) : element}
      />
    );
  };

  // Handle loading state
  if (mainLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Watch visible={true} width="200" color="#4fa94d" />
      </div>
    );
  }

  return (
    <div className="min-w-full">
      <Header />
      <div className="App min-h-screen">
        <Routes>
          {routes.map(renderRoute)}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
