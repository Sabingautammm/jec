import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isStaff }) => {
  const token = localStorage.getItem('authToken');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" />;
  }

  if (isStaff && !user.is_staff) {
    // Redirect to home if the user is not an admin
    return <Navigate to="/" />;
  }

  // If authenticated and role is valid, render the requested route
  return <Outlet />;
};

export default PrivateRoute;
