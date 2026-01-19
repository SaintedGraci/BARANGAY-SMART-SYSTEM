import React from 'react';
import Header from '../components/common/header.jsx';
import Body from '../components/common/body.jsx'; // Import the new body
import FunctionalitySlider from '../components/common/FunctionalitySlider.jsx';
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body />
      <FunctionalitySlider />
    </div>
  );
};

export default Home;