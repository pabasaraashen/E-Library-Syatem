import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, useInView } from 'framer-motion'; // Import useInView hook
import book1 from "../../../images/book1.jpeg";
import book2 from "../../../images/book2.jpeg";
import book3 from "../../../images/book3.jpeg";
import "./HeroSection.modules.css";

const bounceTransition = {
  type: "spring",
  stiffness: 300,
  damping: 150
};

const HeroSection = () => {
  const ref1 = React.useRef(null); // Create refs to track elements
  const ref2 = React.useRef(null);
  const ref3 = React.useRef(null);

  const isInView1 = useInView(ref1, { triggerOnce: false }); // Detect if in view
  const isInView2 = useInView(ref2, { triggerOnce: false });
  const isInView3 = useInView(ref3, { triggerOnce: false });

  return (
    <section className="hero-section py-2">
      <Container className="text-center mt-2">
        
        <Row className="justify-content-center mt-5">
          {/* Book 1: From left to right */}
          <Col xs={12} md={4} lg={3} className="mb-3 mt-4">
            <motion.img
              ref={ref1}
              className="book book3 img-fluid book-shadow"
              initial={{ x: -200, opacity: 0 }}
              animate={isInView1 ? { x: 0, opacity: 1, scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 2, ...bounceTransition }} 
              src={book1}
              alt="Dark Souls"
              style={{ padding: '10px 20px' }}
            />
          </Col>
          
          {/* Book 2: From top to bottom */}
          <Col xs={12} md={4} lg={3} className="mb-3">
            <motion.img
              ref={ref2}
              className="book book1 img-fluid book-shadow"
              initial={{ y: -200, opacity: 0 }}
              animate={isInView2 ? { y: 0, opacity: 1, scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 2, ...bounceTransition }}  
              src={book2}
              alt="It Ends With Us"
            />
          </Col>
          
          {/* Book 3: From right to mid */}
          <Col xs={12} md={4} lg={3} className="mb-3 mt-4">
            <motion.img
              ref={ref3}
              className="book book2 img-fluid book-shadow"
              initial={{ x: 200, opacity: 0 }}
              animate={isInView3 ? { x: 0, opacity: 1, scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 2, ...bounceTransition }}  
              src={book3}
              alt="I Found You"
              style={{ padding: '10px 20px' }}
            />
          </Col>
        </Row>
        <h1 className="spicy-rice-regular mt-1">Welcome to the E-Library</h1>
        <p className="edu-au-vic-wa-nt-guides-p">
          Explore our collection of books and digital resources from the comfort of your home.
        </p>
      </Container>
    </section>
  );
};

export default HeroSection;
