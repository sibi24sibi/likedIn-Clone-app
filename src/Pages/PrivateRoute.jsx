import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; // Import your Auth context

const PrivateRoute = ({ element }) => {
  const { user } = useAuth(); // Get user state from Auth context

  return user ? element : <Navigate to="/signin" />;
};

export default PrivateRoute;
