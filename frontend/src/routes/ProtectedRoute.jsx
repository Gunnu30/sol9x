import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userName } = useContext(AuthContext);
  console.log(userName, "from protected route");

  if (!userName) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;