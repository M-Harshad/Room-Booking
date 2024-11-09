import { useState, useEffect, useRef } from 'react';
import { NavLink, } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import Menuitems from '../common/navbar/MenuItems';


const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const IsLoggedIn = useSelector((state: RootState) => state.isloggedin.value);

  // Toggle the mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close the mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Close the menu if clicked outside the sidebar
  useEffect(() => {
    // Function to detect click outside the sidebar
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeMobileMenu();
      }
    };

    // Add event listener on mount
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-dark-background p-6">
        <div className="flex justify-between items-center container mx-auto">
          {/* Logo Section */}
          <div className="text-2xl font-semibold text-dark-white">
            <NavLink to="/">RoomBooking</NavLink>
          </div>

          {/* Menu Items */}
          <div className="hidden large:flex space-x-8">
          <Menuitems />

            {IsLoggedIn ? (
              <NavLink
              to="/profile"
              className="bg-purple-pink-gradient text-white p-2 rounded-xl hover:bg-blue-700"
            >
              profile
            </NavLink>
            ) : (
              <NavLink
              to="/login"
              className="bg-purple-pink-gradient text-white p-2 rounded-xl hover:bg-blue-700"
            >
              login
            </NavLink>
            )}
            
          </div>

          {/* Mobile Menu (Hamburger Icon) */}
          <div className="large:hidden">
            <button
              className="text-dark-white focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div
            ref={sidebarRef}
            className="fixed left-0 top-0 w-[300px] h-full bg-dark-background p-6 space-y-6"
          >
            <div className="flex justify-between items-center">
              <div className="text-2xl font-semibold text-dark-white">
                <NavLink to="/">RoomBooking</NavLink>
              </div>
              <button
                className="text-dark-white focus:outline-none"
                onClick={closeMobileMenu}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Mobile Menu NavLinks */}
            <div className="space-y-4 flex flex-col relative">
            <Menuitems />
            </div>
            <div className='fixed bottom-10'>
            {IsLoggedIn ? (
              <NavLink
              to="/profile"
              className="bg-purple-pink-gradient text-white p-2 rounded-xl hover:bg-blue-700"
            >
              profile
            </NavLink>
            ) : (
              <NavLink
              to="/login"
              className="bg-purple-pink-gradient text-white p-2 rounded-xl hover:bg-blue-700"
            >
              login
            </NavLink>
            )}
            </div>
          </div>
        </div>
      )}

      {/* Outlet for nested routes */}
      <Outlet />
    </>
  );
};

export default Navbar;