import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../../hooks/authContext";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // 🔑 CRITICAL: Redirects to signin and replaces the current history entry
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If authenticated, render the main layout with the AppNavbar
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* <AppNavbar /> */}
      <main className="container mx-auto px-4 py-8">
        {/* Outlet renders the matched child Route component (Home, Profile) */}
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedRoute;
