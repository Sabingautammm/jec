import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ProfileIcon = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token); // If token exists, user is logged in

    if (token) {
      // Fetch user data
      axios.get('https://jec.edu.np/api/user/', {
        headers: { Authorization: `Token ${token}` }
      })
      .then(response => {
        setUserData(response.data);
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
      });
    }
  }, []);

  useEffect(() => {
    // Handle clicks outside the dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token
    setIsLoggedIn(false);
    setDropdownVisible(false); // Hide dropdown after logout
    navigate('/'); // Redirect to login page
    window.location.reload(); // Reload page after logout
  };

  return (
    <div className="relative profile-icon">
      {isLoggedIn && (
        <div className="flex items-center space-x-4">
          <FontAwesomeIcon
            icon={faUser}
            size="lg"
            className="text-white cursor-pointer sm:text-xl lg:text-2xl"
            onClick={toggleDropdown}
          />
          {dropdownVisible && (
            <div
              ref={dropdownRef}
              className="absolute right-0 z-50 w-48 bg-white rounded-lg shadow-lg mt-28 lg:mt-20 lg:right-0 "
            >
              <div className="px-4 py-2 text-gray-800">
                {userData ? (
                  <>
                    <p className="font-semibold">{userData.first_name} {userData.last_name}</p>
                  </>
                ) : (
                  <p>Hello User!!</p>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-gray-800 transition-colors duration-200 rounded-lg hover:text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
