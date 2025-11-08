import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/authContext";
import Landing from "./Landing";

const LandingGate: React.FC = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/school-dashboard" replace />;
  }
  return <Landing />;
};

export default LandingGate;
