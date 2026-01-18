import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

// (Optional) You can create these in separate files in /pages/
const ServicesPage = () => <div className="p-10 text-center">Services Page Content</div>;
const ClearancePage = () => <div className="p-10 text-center">Clearance Page Content</div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* Route pointing to your Home page */}
        <Route path="/" element={<Home />} />
        
        {/* Other pages would follow the same pattern */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/clearance" element={<ClearancePage />} />
      </Routes>
    </Router>
  );
}

export default App;