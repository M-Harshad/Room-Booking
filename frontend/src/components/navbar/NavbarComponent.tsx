import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

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
            <Link to="/">RoomBooking</Link>
          </div>

          {/* Menu Items */}
          <div className="hidden large:flex space-x-8">
            <Link to="/" className="text-dark-white hover:text-[#D528A7] font-bold">Home</Link>
            <Link to="/rooms" className="text-dark-white hover:text-[#D528A7] font-bold">Rooms</Link>
            <Link to="/about" className="text-dark-white hover:text-[#D528A7] font-bold">About Us</Link>
            <Link to="/contact" className="text-dark-white hover:text-[#D528A7] font-bold">Contact</Link>
            
            <Link
              to="/login"
              className="bg-purple-pink-gradient text-white p-2 rounded-xl hover:bg-blue-700"
            >
              Login
            </Link>
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
                <Link to="/">RoomBooking</Link>
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

            {/* Mobile Menu Links */}
            <div className="space-y-4 flex flex-col relative">
              <Link to="/" className="text-dark-white hover:text-[#D528A7] font-bold" onClick={closeMobileMenu}>Home</Link>
              <Link to="/rooms" className="text-dark-white hover:text-[#D528A7] font-bold" onClick={closeMobileMenu}>Rooms</Link>
              <Link to="/about" className="text-dark-white hover:text-[#D528A7] font-bold" onClick={closeMobileMenu}>About Us</Link>
              <Link to="/contact" className="text-dark-white hover:text-[#D528A7] font-bold" onClick={closeMobileMenu}>Contact</Link>
            </div>
            <div className='fixed bottom-10'>
              <Link
                to="/login"
                className="bg-purple-pink-gradient text-white p-2 rounded-xl hover:bg-blue-700"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
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
