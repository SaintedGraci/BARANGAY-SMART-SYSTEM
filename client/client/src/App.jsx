import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ResidentDashboard from './pages/ResidentDashboard';
import BarangayLogin from './pages/BarangayLogin.jsx';
import BarangayDashboard from './pages/BarangayDashboard.jsx';
import Register from './pages/register.jsx';
import LearnMore from './pages/LearnMore.jsx';
import Login from './pages/login.jsx';
// (Optional) You can create these in separate files in /pages/
const ServicesPage = () => <div className="p-10 text-center">Services Page Content</div>;
const ClearancePage = () => <div className="p-10 text-center">Clearance Page Content</div>;
const Dashboard = () => <div className="p-10 text-center">User Dashboard</div>;
const MunicipalityDashboard = () => <div className="p-10 text-center">Municipality Admin Dashboard</div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* Route pointing to your Home page */}
        <Route path="/" element={<Home />} />
        
        {/* Other pages would follow the same pattern */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/clearance" element={<ClearancePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard routes referenced in LoginModal */}
        <Route path="/dashboard" element={<ResidentDashboard />} />
        <Route path="/municipality-dashboard" element={<MunicipalityDashboard />} />
        <Route path="/barangay-login" element={<BarangayLogin />} />
        <Route path="/barangay-dashboard" element={<BarangayDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/learnmore" element={<LearnMore />} />

      </Routes>
    </Router>
  );
}

export default App;