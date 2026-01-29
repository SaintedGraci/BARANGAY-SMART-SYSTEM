import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ResidentDashboard from './pages/ResidentDashboard';
import BarangayLogin from './pages/BarangayLogin.jsx';
import BarangayDashboard from './pages/BarangayDashboard.jsx';
import LearnMore from './pages/LearnMore.jsx';
import Login from './pages/login.jsx';

// (Optional) You can create these in separate files in /pages/
const ServicesPage = () => <div className="p-10 text-center">Services Page Content</div>;
const ClearancePage = () => <div className="p-10 text-center">Clearance Page Content</div>;

function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/clearance" element={<ClearancePage />} />
          <Route path="/learnmore" element={<LearnMore />} />
          
          {/* Authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/barangay-login" element={<BarangayLogin />} />
          
          {/* Dashboard routes */}
          <Route path="/resident-dashboard" element={<ResidentDashboard />} />
          <Route path="/barangay-dashboard" element={<BarangayDashboard />} />
          
          {/* Legacy route redirects */}
          <Route path="/dashboard" element={<ResidentDashboard />} />
          <Route path="/municipality-dashboard" element={<BarangayDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;