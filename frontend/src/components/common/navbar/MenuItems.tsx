import React from 'react'
import { NavLink } from 'react-router-dom'

function Menuitems() {
  return (
  <>
    <NavLink
    to="/"
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
    className={({ isActive }) =>
      isActive
        ? 'text-[#B515DF] font-bold'
        : 'text-dark-white hover:text-[#D528A7] font-bold'
    }
  >
    Contact
  </NavLink>
  </>


  )
}

export default Menuitems