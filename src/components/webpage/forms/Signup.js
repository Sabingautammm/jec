import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '', // Added confirm password field
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (formData.password !== formData.confirm_password) {
        setError('Passwords do not match.');
        setSuccess('');
        return;
    }

    if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long.');
        setSuccess('');
        return;
    }

    try {
      const response = await axios.post(
        'https://jec.edu.np/api/signup/',
        formData,{
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setSuccess('Signup successful!!');
      setError('');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      setError('Signup failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="max-w-md p-4 mx-auto my-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-center">Sign Up</h2>
      {error && <p className="text-center text-red-500">{error}</p>}
      {success && <p className="text-center text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="first_name" className="block text-gray-950">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="last_name" className="block text-gray-950">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-950">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone_number" className="block text-gray-950">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-950">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirm_password" className="block text-gray-950">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded-lg">
          Sign Up
        </button>

        <h2 className="mt-2 text-center">Already have an account?</h2>
        <Link to="/login">
          <h2 className="px-3 py-2 font-semibold text-center">Login</h2>
        </Link>
      </form>
    </div>
  );
};

export default Signup;