// frontend/src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import RecruiterDashboard from "./components/recruiter/RecruiterDashboard";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/auth/jobseeker/SignUp";
import Login from "./components/auth/jobseeker/Login";
import RecruiterSignUp from "./components/auth/recruiter/SignUp";
import RecruiterLogin from "./components/auth/recruiter/Login";
import Home from "./components/sidebar-components/home/Home";
import { AuthProvider } from "./context/AuthContext";
import { RecruiterAuthProvider } from "./context/RecruiterAuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Jobs from "./components/sidebar-components/jobs/Jobs";
import Tabs from "./components/sidebar-components/profile/Tabs"; // Import Tabs component
// import JobDetails from "./components/sidebar-components/jobs/JobDetails";
import CreateJob from "./components/recruiter/CreateJob";
import MyJobs from "./components/recruiter/MyJobs"; // Import MyJobs component
import AppliedJobs from './components/sidebar-components/applied/AppliedJobs';
import RecruiterHome from './components/recruiter/RecruiterHome';

function App() {
  return (
    <AuthProvider>
      <RecruiterAuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />

            {/* Job Seeker Auth */}
            <Route path="/auth/jobseeker/signup" element={<SignUp />} />
            <Route path="/auth/jobseeker/login" element={<Login />} />

            {/* Recruiter Auth */}
            <Route
              path="/auth/recruiter/signup"
              element={<RecruiterSignUp />}
            />
            <Route path="/auth/recruiter/login" element={<RecruiterLogin />} />

            {/* Protected Job Seeker Routes */}
            <Route element={<ProtectedRoute />}> 
              <Route path="/dashboard/*" element={<Dashboard />}>
                <Route path="home" element={<Home />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="profile" element={<Tabs />} /> {/* Add this line */}
                <Route path="applied-jobs" element={<AppliedJobs />} />
                {/* Other job seeker routes */}
              </Route>
            </Route>

            {/* Protected Recruiter Routes */}
            <Route element={<ProtectedRoute isRecruiter />}>
  <Route path="/recruiter/dashboard/*" element={<RecruiterDashboard />}>
    <Route index element={<RecruiterHome />} /> {/* Add this line */}
    <Route path="home" element={<RecruiterHome />} />
    <Route path="create-job" element={<CreateJob />} />
    <Route path="my-jobs" element={<MyJobs />} />
  </Route>
</Route>

            {/* Redirect any undefined routes to landing page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </RecruiterAuthProvider>
    </AuthProvider>
  );
}

export default App;
