import React, { useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion, useInView } from "framer-motion"; // Import useInView for scroll animations
import authorImg1 from "../../../images/Auth2.jpeg";
import authorImg2 from "../../../images/Auth1.jpeg";
import authorImg3 from "../../../images/Auth3.jpeg";
import authorImg4 from "../../../images/Auth4.jpeg";
import authorImg5 from "../../../images/Auth5.jpeg";
import authorImg6 from "../../../images/Auth6.jpeg";

const authors = [
  { name: "Ernest Hemingway", role: "Novelist", imgSrc: authorImg1 },
  { name: "Nora Roberts", role: "Novelist", imgSrc: authorImg2 },
  { name: "Leo Tolstoy", role: "Novelist", imgSrc: authorImg3 },
  { name: "R. Tagore", role: "Philosopher", imgSrc: authorImg4 },
  { name: "Toni Morrison", role: "Novelist", imgSrc: authorImg5 },
  { name: "André Gide", role: "Essayist", imgSrc: authorImg6 },
];

const bounceTransition = {
  type: "spring",
  stiffness: 300,
  damping: 150
};;

const DigitalLibraryAccess = () => {
  const ref1 = useRef(null); // Create refs for scroll tracking
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);

  // Track if each author image is in view
  const isInView1 = useInView(ref1, { triggerOnce: true });
  const isInView2 = useInView(ref2, { triggerOnce: true });
  const isInView3 = useInView(ref3, { triggerOnce: true });
  const isInView4 = useInView(ref4, { triggerOnce: true });
  const isInView5 = useInView(ref5, { triggerOnce: true });
  const isInView6 = useInView(ref6, { triggerOnce: true });

  return (
    <section
      className="digital-library-access py-5"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Container>
        {/* E-Books Section */}
        <Row className="align-items-center mb-3">
          <Col xs={12} md={6} className=" text-md-left text-center">
            <div
              style={{
                background: "linear-gradient(to right, #4facfe, #00f2fe)",
                borderRadius: "15px",
                padding: "2rem",
                color: "#fff",
              }}
            >
              <h3 className="mb-3">E-Books</h3>
              <p>
                Access our vast collection of e-books to enrich your learning
                journey.
              </p>
              <Button
                variant="light"
                size="lg"
                style={{ borderRadius: "30px" }}
              >
                Access E-Books
              </Button>
            </div>
          </Col>

          {/* Resources Section */}
          <Col xs={12} md={6} className="text-md-left text-center">
            <div
              style={{
                background: "linear-gradient(to right, #ff9a9e, #fad0c4)",
                borderRadius: "15px",
                padding: "2rem",
                color: "#fff",
              }}
            >
              <h3 className="mb-3">Resources</h3>
              <p>
                Explore our collection of research papers and other learning
                resources.
              </p>
              <Button
                variant="light"
                size="lg"
                style={{ borderRadius: "30px" }}
              >
                Access Resources
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Favorite Authors Section */}
      <Container className="mt-5 text-center">
        <div className="mb-3">
          <motion.h2 
           className="text-center spicy-rice-regular-L"
           initial={{ x: -200, opacity: 0 }}
           animate={isInView1 ? { x: 0, opacity: 1, scale: [1, 1.2, 1] } : {}}
           transition={{ duration: 7, ...bounceTransition }} 
           style={{ padding: '10px 20px' }}>Favorite Authors</motion.h2>
        </div>
        <p className="edu-au-vic-wa-nt-guides-p">
          Learn more about your favorite authors in multiple topics such as
          literature, philosophy, and much more.
        </p>

        <Row className="justify-content-center mt-5">
          {authors.map((author, index) => {
            const ref = [ref1, ref2, ref3, ref4, ref5, ref6][index]; // Assign refs dynamically
            const isInView = [isInView1, isInView2, isInView3, isInView4, isInView5, isInView6][index]; // Assign scroll state
            return (
              <Col key={index} xs={6} md={4} lg={2} className="text-center mb-4">
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, y: 150 }} // Initial off-screen position
                  animate={isInView ? { opacity: 1, y: 0, scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, ...bounceTransition }} // Apply bounce transition
                >
                  <img
                    src={author.imgSrc}
                    alt={author.name}
                    className="rounded-circle img-fluid"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <h5 className="mt-3">{author.name}</h5>
                  <p className="text-muted">{author.role}</p>
                </motion.div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default DigitalLibraryAccess;
