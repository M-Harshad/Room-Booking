import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Import jwt-decode to decode the token

// Decode the JWT token from localStorage to get the user role
const token = localStorage.getItem('AccessToken');
let userRole: string = 'user'; // Default to 'user'

if (token) {
  try {
    const decoded: any = jwtDecode(token);
    userRole = decoded.role;  // Set the user role from the decoded token
  } catch (error) {
    console.error('Error decoding token:', error);
  }
}

function Menuitems({closeMobileMenu}) {
  const location = useLocation(); // Get the current URL path

  // Check if the current route is an admin route (e.g., "/admin" or "/dashboard")
  const isAdminRoute =
    location.pathname.startsWith('/addroom') || // For adding a room
    location.pathname === '/dashboard' ||       // For the admin dashboard
    location.pathname.startsWith('/rooms/update/');  // For update routes like /rooms/update/:Roomid

  // Admin-specific links (only shown if the user is on an admin route)
  const adminLinks = (
    <>
      <NavLink
        to="/"
        onClick={closeMobileMenu}
        className={({ isActive }) =>
          isActive
            ? 'text-[#B515DF] font-bold' // Active link color
            : 'text-dark-white hover:text-[#D528A7] font-bold' // Default and hover color
            
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/dashboard"
        onClick={closeMobileMenu}
        className={({ isActive }) =>
          isActive
            ? 'text-[#B515DF] font-bold'
            : 'text-dark-white hover:text-[#D528A7] font-bold'
        }
      >
        Rooms
      </NavLink>

      <NavLink
        to="/addroom"
        onClick={closeMobileMenu}
        className={({ isActive }) =>
          isActive
            ? 'text-[#B515DF] font-bold'
            : 'text-dark-white hover:text-[#D528A7] font-bold'
        }
      >
        Add Rooms
      </NavLink>
    </>
  );

  // Regular user-specific links
  const userLinks = (
    <>
      <NavLink
        to="/"
        onClick={closeMobileMenu}
        className={({ isActive }) =>
          isActive
            ? 'text-[#B515DF] font-bold' // Active link color
            : 'text-dark-white hover:text-[#D528A7] font-bold' // Default and hover color
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/rooms"
        onClick={closeMobileMenu}
        className={({ isActive }) =>
          isActive
            ? 'text-[#B515DF] font-bold'
            : 'text-dark-white hover:text-[#D528A7] font-bold'
        }
      >
        Rooms
      </NavLink>

      <NavLink
        to="/about"
        onClick={closeMobileMenu}
        className={({ isActive }) =>
          isActive
            ? 'text-[#B515DF] font-bold'
            : 'text-dark-white hover:text-[#D528A7] font-bold'
        }
      >
        About Us
      </NavLink>

      <NavLink
        to="/contact"
        onClick={closeMobileMenu}
        className={({ isActive }) =>
          isActive
            ? 'text-[#B515DF] font-bold'
            : 'text-dark-white hover:text-[#D528A7] font-bold'
        }
      >
        Contact
      </NavLink>
    </>
  );

  return (
    <>
      {/* Render admin-specific links only if the user is on an admin route */}
      {userRole === 'admin' && isAdminRoute ? adminLinks : userLinks}
    </>
  );
}

export default Menuitems;
