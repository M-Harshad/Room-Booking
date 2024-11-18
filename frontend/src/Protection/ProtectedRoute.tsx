import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

// Define a type for the JWT payload. You can extend this type as needed to match your JWT's structure.
interface JwtPayload {
  role: string;
  // Add other fields as needed, e.g.:
  // userId: string;
  // username: string;
}

interface ProtectedRouteProps {
  children: React.ReactNode; // Explicitly define the type for children
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("AccessToken");  // Retrieve the token from localStorage (or cookies/sessionStorage)

  let isAdmin = false;  // Set default as false (not admin)
  if (token) {
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);  // Decode the JWT to access its contents

      // Check if the role is "admin"
      isAdmin = decodedToken.role === "admin";
    } catch (error) {
      console.error("Invalid token", error);  // Handle any errors in decoding the token
    }
  }

  // If the user is an admin, render the protected children, else redirect them to the login page
  return isAdmin ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;

