import { useLocation, Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";

const TeacherRoute = ({ children}) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (user && user.userType === "teacher") {
    return children;
  }

  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default TeacherRoute;
