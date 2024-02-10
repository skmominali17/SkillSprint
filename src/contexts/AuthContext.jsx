import { createContext, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
  
    const login = (userData) => {
      setIsLoggedIn(true);
      setUser(userData);
    };
  
    const logout = () => {
      setIsLoggedIn(false);
      setUser(null);
    };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthContext;