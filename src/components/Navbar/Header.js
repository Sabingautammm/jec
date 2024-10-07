import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../media/images/jec-logo.png';
import ProfileIcon from '../webpage/forms/ProfileIcon'; 
import axios from 'axios';

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    // Toggle the mobile menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Toggle the dropdown menu
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Check login status and admin status
    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                setIsLoggedIn(true); // User is logged in if token exists
                try {
                    const response = await axios.get('https://jec.edu.np/api/user/', {
                        headers: {
                            'Authorization': `Token ${token}`,
                        },
                    });

                    const userData = response.data;

                    if (userData && userData.is_staff !== undefined) {
                        setIsAdmin(userData.is_staff);
                    } else {
                        console.error('is_staff not found in response');
                    }
                } catch (error) {
                    console.error('Error fetching user role:', error.response ? error.response.data : error.message);
                }
            } else {
                setIsLoggedIn(false); // No token means user is not logged in
            }
        };

        checkLoginStatus();
    }, []);

    // Close the menu and show the clicked location
    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        <div className='z-50 w-full bg-blue-900' style={{ fontFamily: "'Merriweather', serif" }}>
            <div className='lg:w-[95%] w-full flex justify-between items-center mx-auto p-2'>
                <div>
                    <Link to="/"><img src={logo} className='h-20' alt="Logo" /></Link>
                </div>
                <div className='md:hidden' onClick={toggleMenu} aria-label="Toggle menu">
                    {menuOpen ? (
                        <FaTimes className="text-3xl text-white transition-transform duration-300 hover:text-gray-300" />
                    ) : (
                        <FaBars className="text-3xl text-white transition-transform duration-300 hover:text-gray-300" />
                    )}
                </div>
                <div className='items-center hidden w-full gap-5 md:flex md:w-auto'>
                    <ul className='flex flex-col gap-5 p-2 md:flex-row'>
                        <li className="relative group">
                            <button className="text-xl text-white transition duration-700 border-none hover:text-gray-300">
                                About Us
                            </button>
                            <ul className="absolute left-0 z-20 hidden mt-0 text-black bg-white border-t-4 border-blue-500 rounded-lg shadow-lg w-60 group-hover:block">
                                <li><Link to="/about/introduction" className="block px-4 py-2 rounded-t-lg hover:bg-slate-200 hover:text-gray-800" onClick={handleLinkClick}>Introduction</Link></li>
                                <li><Link to="/about/courses-offered" className="block px-4 py-2 hover:bg-slate-200 hover:text-gray-800" onClick={handleLinkClick}>Courses Offered</Link></li>
                                <li><Link to="/about/jec-advisory-board" className="block px-4 py-2 rounded-b-lg hover:bg-slate-200 hover:text-gray-800" onClick={handleLinkClick}>JEC Advisory Board</Link></li>
                                <li><Link to="/teachers" className="block px-4 py-2 rounded-b-lg hover:bg-slate-200 hover:text-gray-800" onClick={handleLinkClick}>JEC Teachers</Link></li>
                            </ul>
                        </li>
                        {!isAdmin && <li><Link to="/onlineapply" className="text-xl text-white transition duration-300 hover:text-gray-300" onClick={handleLinkClick}>Apply Online</Link></li>}
                        <li><Link to='/admission' className="text-xl text-white transition duration-300 hover:text-gray-300" onClick={handleLinkClick}>Admission</Link></li>
                        <li><Link to='/facilities' className="text-xl text-white transition duration-300 hover:text-gray-300" onClick={handleLinkClick}>Facilities</Link></li>
                        <li><Link to='/news' className="text-xl text-white transition duration-300 hover:text-gray-300" onClick={handleLinkClick}>News & Updates</Link></li>
                        <li><Link to='/contact-us' className="text-xl text-white transition duration-300 hover:text-gray-300" onClick={handleLinkClick}>Contact</Link></li>
                        {isAdmin && <li><Link to="/admin/adminhome" className='text-xl text-white transition duration-300 hover:text-gray-300' onClick={handleLinkClick}>Admin</Link></li>}
                    </ul>
                    {isLoggedIn ? (
                        <ProfileIcon />
                    ) : (
                        <Link to="/login" className="text-xl text-white transition duration-300 hover:text-gray-300" onClick={handleLinkClick}>Login</Link>
                    )}
                </div>
            </div>

            <div className={`fixed top-0 right-0 h-full bg-blue-900 z-50 transition-transform transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} w-64 md:hidden`}>
                <div className="flex justify-end p-4">
                    <FaTimes 
                        className="text-3xl text-white cursor-pointer hover:text-gray-300" 
                        onClick={toggleMenu} 
                        aria-label="Close menu" 
                    />
                </div>
                <ul className='flex flex-col gap-5 p-3 mt-10'>
                    <li>
                        <div className='mb-4'>
                            {isLoggedIn ? (
                                <ProfileIcon />
                            ) : (
                                <Link to="/login" className="px-4 py-2 text-sm text-white transition duration-300 bg-blue-600 rounded-lg shadow-md md:text-base hover:bg-blue-700 hover:shadow-lg focus:outline-none" onClick={handleLinkClick}>Login</Link>
                            )}
                        </div>
                        <button 
                            onClick={toggleDropdown} 
                            className="text-xl text-white transition duration-300 border-none hover:text-gray-300"
                        >
                            About Us
                        </button>
                        {isDropdownOpen && (
                            <ul className="z-20 mt-2 text-black bg-white rounded-lg shadow-lg">
                                <li><Link to="/about/introduction" className="block px-4 py-2 rounded-t-lg hover:bg-slate-200 hover:text-gray-800" onClick={handleLinkClick}>Introduction</Link></li>
                                <li><Link to="/about/courses-offered" className="block px-4 py-2 hover:bg-slate-200 hover:text-gray-800" onClick={handleLinkClick}>Courses Offered</Link></li>
                                <li><Link to="/about/jec-advisory-board" className="block px-4 py-2 rounded-b-lg hover:bg-slate-200 hover:text-gray-800" onClick={handleLinkClick}>JEC Advisory Board</Link></li>
                                <li><Link to="/teachers" className="block px-4 py-2 text-lg rounded-b-lg hover:bg-slate-200 hover:text-gray-800" onClick={handleLinkClick}>JEC Teachers</Link></li>
                            </ul>
                        )}
                    </li>
                    {!isAdmin && <li><Link to="/onlineapply" className="text-xl text-white transition duration-300 hover:text-gray-300" onClick={handleLinkClick}>Apply Online</Link></li>}
                    <li><Link to='/admission' className="text-xl text-white transition duration-300 hover:text-gray-300" onClick={handleLinkClick}>Admission</Link></li>
                    <li><Link to='/news' className="text-xl text-white transition duration-300 hover:text-gray-300" onClick={handleLinkClick}>News & Updates</Link></li>
                    <li><Link to='/contact-us' className="text-xl text-white transition duration-300 hover:text-gray-300" onClick={handleLinkClick}>Contact</Link></li>
                    {isAdmin && <li><Link to="/admin/adminhome" className='text-xl text-white transition duration-300 hover:text-gray-300' onClick={handleLinkClick}>Admin</Link></li>}
                </ul>
            </div>
        </div>
    );
};