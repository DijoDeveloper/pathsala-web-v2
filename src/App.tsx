import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./hooks/authContext";
import ProtectedRoute from "./components/routes/protected-routes";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import AppLayout from "./layout/AppLayout";
import SchoolDashboard from "./pages/SchoolDashboard";
import SchoolRegistration from "./pages/SchoolRegistration";
import LandingGate from "./pages/LandingGate";
import OrganizerSettings from "./pages/settings/OrganizerSettings";
import DefaultHolidays from "./pages/settings/DefaultHolidays";
import DependencyProgram from "./pages/settings/DependencyProgram";
import Subscription from "./pages/settings/Subscription";

const App: React.FC = () => {
  return (
    <div className="font-sans antialiased text-gray-900 dark:text-gray-100 min-h-screen bg-gray-50 dark:bg-gray-900">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* PUBLIC MARKETING PAGE (with auth-aware redirect) */}
            <Route path="/" element={<LandingGate />} />
            {/* AUTH STACK: Public Routes must have unique paths */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* APP STACK: The root path (/) is now protected */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/profile" element={<UserProfiles />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/blank" element={<Blank />} />
                <Route path="/form-elements" element={<FormElements />} />
                <Route path="/basic-tables" element={<BasicTables />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/avatars" element={<Avatars />} />
                <Route path="/badge" element={<Badges />} />
                <Route path="/buttons" element={<Buttons />} />
                <Route path="/images" element={<Images />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/line-chart" element={<LineChart />} />
                <Route path="/bar-chart" element={<BarChart />} />
                <Route path="/settings/organizer" element={<OrganizerSettings />} />
                <Route path="/settings/default-holidays" element={<DefaultHolidays />} />
                <Route path="/settings/dependency-program" element={<DependencyProgram />} />
                <Route path="/settings/subscription" element={<Subscription />} />
                <Route path="/school-dashboard" element={<SchoolDashboard />} />
                <Route path="/school-registration" element={<SchoolRegistration />} />
                {/* <Route path="/profile" element={<ProfilePage />} /> */}
              </Route>
            </Route>

            {/* Fallback: Redirects unknown paths to the protected root */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;

// export default App;
