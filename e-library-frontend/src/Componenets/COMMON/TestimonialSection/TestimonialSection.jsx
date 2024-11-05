import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Button, Card } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import ReactStars from 'react-rating-stars-component'; // For star rating display
import { motion, useInView } from 'framer-motion'; // Import Framer Motion utilities

const bounceTransition = {
  type: "spring",
  stiffness: 300,
  damping: 150
};

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const navigate = useNavigate();

  const refHeading = useRef(null); // Create ref for heading animation
  const isInViewHeading = useInView(refHeading, { triggerOnce: true });

  // Fetch testimonials from the API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('https://localhost:7034/api/Testimonial/GetTestimonials');
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  // Handle the 'Add Yours' button click
  const handleAddTestimonial = () => {
    const isLoggedIn = !!localStorage.getItem('userId'); // Check if the user is logged in
    if (isLoggedIn) {
      navigate('/submit-testimonial'); // Redirect to testimonial submission page if logged in
    } else {
      navigate('/login'); // Redirect to login page if not logged in
    }
  };

  return (
    <section style={{ padding: '40px 0', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
      <hr></hr>
      <Container>
        {/* Animated Heading using Framer Motion */}
        <motion.h2
          ref={refHeading}
          className='text-center spicy-rice-regular-L'
          style={{ marginBottom: '30px', textAlign: 'center' }}
          initial={{ x: -200, opacity: 0 }}
          animate={isInViewHeading ? { x: 0, opacity: 1, scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, ...bounceTransition }}
        >
          What Our Users Say
        </motion.h2>

        {/* Testimonials Slider */}
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1200: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <Card
                style={{
                  border: 'none',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s',
                  width: '90%',
                  margin: 'auto',
                }}
                className="testimonial-card"
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Card.Body style={{ textAlign: 'center' }}>
                  <Card.Text style={{ fontStyle: 'italic', padding: '1rem 0', fontWeight: '500' }}>
                    <i className="fas fa-quote-left" style={{ fontSize: '30px', color: '#6c757d', position: 'absolute', left: '10px', top: '-10px' }}></i>
                    "{testimonial.content}"
                    <i className="fas fa-quote-right" style={{ fontSize: '30px', color: '#6c757d', position: 'absolute', right: '10px', top: '-10px' }}></i>
                  </Card.Text>
                  <ReactStars
                    count={5}
                    value={testimonial.rating}
                    size={24}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <Card.Footer style={{ textAlign: 'center', color: '#6c757d', fontWeight: '500' }}>
                    <small>{testimonial.name}</small>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Add Yours Button */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button variant="primary" onClick={handleAddTestimonial}>
            Add Yours
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialSection;
