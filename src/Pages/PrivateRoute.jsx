// src/Components/PrivateRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Api/AuthApi"; // Adjust the import path if necessary

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
