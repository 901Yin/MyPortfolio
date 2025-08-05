import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminOnly = ({ children, fallback = null }) => {
  const { isAdmin } = useAuth();
  
  if (!isAdmin()) {
    return fallback;
  }
  
  return children;
};

export default AdminOnly;
