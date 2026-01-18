import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';

// (Optional) You can create these in separate files in /pages/
const ServicesPage = () => <div className="p-10 text-center">Services Page Content</div>;
const ClearancePage = () => <div className="p-10 text-center">Clearance Page Content</div>;
const Dashboard = () => <div className="p-10 text-center">User Dashboard</div>;
const AdminDashboard = () => <div className="p-10 text-center">Admin Dashboard</div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* Route pointing to your Home page */}
        <Route path="/" element={<Home />} />
        
        {/* Other pages would follow the same pattern */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/clearance" element={<ClearancePage />} />
        
        {/* Dashboard routes referenced in LoginModal */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;