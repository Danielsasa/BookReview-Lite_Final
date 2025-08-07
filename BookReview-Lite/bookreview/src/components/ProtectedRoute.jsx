import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);

  if (!user) {
    // No está logueado, redirige a login
    return <Navigate to="/login" replace />;
  }

  // Usuario logueado, renderiza la ruta protegida
  return children;
}

export default ProtectedRoute;
