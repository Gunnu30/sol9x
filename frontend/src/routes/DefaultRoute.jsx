import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
const DefaultRoute = ({ children }) => {
  const { role } = useContext(AuthContext);
    console.log(role, "from default route");
    if (role === "student") {
        return <Navigate to="/student/dashboard" />;    
    }else if (role === "admin") {
        return <Navigate to="/admin/dashboard" />;
    }else{
        return  children;
    }
};

export default DefaultRoute;