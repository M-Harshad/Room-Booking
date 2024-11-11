import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';  // Ensure you import jwtDecode

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("AccessToken");  // Retrieve the token from localStorage (or cookies/sessionStorage)
  
  let isAdmin = false;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);  // Decode the JWT to access its contents
      // Assuming the role is stored under "role" in the decoded token
      isAdmin = decodedToken.role === "admin";  
    } catch (error) {
      console.error("Invalid token", error);  // Handle any errors in decoding the token
    }
  }

  // If the user has admin role, render the protected children (content), else redirect them to the home page
  return isAdmin ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
