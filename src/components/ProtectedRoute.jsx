import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    // Redirect to login page if not logged in
    return <Navigate to="/login" />;
  }

  // Render the children if the user is logged in
  return children;
};

export default ProtectedRoute;