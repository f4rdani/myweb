// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, authLoading, user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  if (authLoading) {
    return (
      <div className={`flex flex-col items-center justify-center h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <Loader2 className="animate-spin h-16 w-16 text-blue-500" />
        <p className={`mt-4 text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Memuat...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return requiredRole === 'admin' ? (
      <Navigate to="/adm" replace />
    ) : (
      <Navigate to="/" replace />
    );
  }

  if (requiredRole && (!user?.role || user.role !== requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
