import { Navigate } from 'react-router-dom';

const IsLoggedIn = ({ children }) => {
    const isLoggedIn =  localStorage.getItem("isloggedin");  // Retrieve the token from localStorage (or cookies/sessionStorage)
    return isLoggedIn ? children : <Navigate to="/" />;
  };
  
  export default IsLoggedIn;