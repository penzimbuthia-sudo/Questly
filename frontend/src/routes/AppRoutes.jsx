// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
// Remove lazy loading for testing
import ContributorRoutes from './ContributorRoutes';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/contributor/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Direct route without RoleRoute or lazy loading */}
      <Route path="/contributor/*" element={<ContributorRoutes />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
