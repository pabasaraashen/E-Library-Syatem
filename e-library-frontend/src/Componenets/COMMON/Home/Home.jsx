import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { Alert } from 'react-bootstrap';
import HeroSection from '../Hero/HeroSection';
import LatestBooksSection from '../LatestBook/LatestBookSection';
import DigitalLibraryAccess from '../DigitalAccess/DigitalAccess';
import TestimonialSection from '../TestimonialSection/TestimonialSection';

const Home = () => {
//   const location = useLocation();
//   const message = location.state?.message || '';  // Get the success message if available

  return (
    <div>
      {/* Display success notification if present
      {message && <Alert variant="success" className="text-center">{message}</Alert>} */}
      
      {/* Home page sections */}
      <HeroSection />
      <LatestBooksSection />
      <DigitalLibraryAccess />
      <TestimonialSection />
    </div>
  );
};

export default Home;
