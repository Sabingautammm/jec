import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../media/images/jec-logo.png';

export const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Sidebar for large screens */}
      <div className={`hidden md:block fixed top-0 left-0 h-screen bg-blue-800 p-3 w-64`}>
        <div className="flex justify-between items-center mb-8">
          <Link to='/' className="block">
            <img src={logo} alt='Logo' className="text-white text-xl" />
          </Link>
        </div>
        <ul className="flex flex-col space-y-4">
          <li className="text-gray-300 hover:text-white">
            <Link to="/applicationstatus" className="text-xl text-white hover:text-gray-300 transition duration-300">
              Application Status
            </Link>
          </li>
          <li className="text-gray-300 hover:text-white">
            <Link to="/addteam" className="text-xl text-white hover:text-gray-300 transition duration-300">
              Add Team
            </Link>
          </li>
        </ul>
      </div>

      {/*Navbar for small screens */}
      <div className={`block md:hidden bg-blue-800 py-1`}>
        <div className="flex  items-center mb-4">
          {/* Logo icon hidden on small screens */}
          {/* <Link to='/' className="hidden md:block">
            <img src={logo} alt='Logo' className="h-10" />
          </Link> */}
          <div onClick={toggleMenu} aria-label="Toggle menu">
            {menuOpen ? (
              <FaTimes className="text-2xl text-white hover:text-gray-300 transition duration-300 font-semibold cursor-pointer my-1 mx-4" />
            ) : (
              <FaBars className="text-2xl text-white hover:text-gray-300 transition duration-300 font-semibold cursor-pointer my-1 mx-3" />
            )}
          </div>
        </div>
        {menuOpen && (
          <ul className="flex flex-row justify-around">
            <li className="text-xl text-white hover:text-gray-300 transition duration-300 font-semibold">
              <Link to="/applicationstatus" className="text-xl text-white hover:text-gray-300 transition duration-300">
                Application Status
              </Link>
            </li>
            <li className="text-gray-300 hover:text-white">
              <Link to="/addteam" className="text-xl text-white hover:text-gray-300 transition duration-300 font-semibold">
                Add Team
              </Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};
