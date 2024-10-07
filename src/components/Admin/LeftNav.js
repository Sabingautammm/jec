import React from 'react';
import { Link } from 'react-router-dom';

const LeftNav = () => {
  return (
    <div className="bg-gray-800 h-screen w-[18%] p-4">
      <h1 className="text-white text-xl mb-8">JEC</h1>
      <ul>
        <li className="text-gray-300 hover:text-white mb-4">
        <Link to='/applicationstatus' className="text-xl text-white hover:text-gray-300 transition duration-300">Application Status</Link>
        </li>
        
      </ul>
    </div>
  );
};

export default LeftNav;
