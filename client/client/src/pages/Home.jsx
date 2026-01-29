import Header from '../components/common/header.jsx';
import Body from '../components/common/body.jsx';
import FunctionalitySlider from '../components/common/FunctionalitySlider.jsx';
import Footer from '../components/common/footer.jsx';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body />
      <FunctionalitySlider />
      <Footer />
    </div>
  );
};

export default Home;