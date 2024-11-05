import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../../node_modules/swiper/swiper-bundle.min.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const BrowseComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [donations, setDonations] = useState({
    Fiction: [],
    'Non-Fiction': [],
    Academic: [],
    "Children's Books": [],
    'Comics & Graphic Novels': [],
    Poetry: []
  });

  const [filteredDonations, setFilteredDonations] = useState(donations);
  const [noBooksFound, setNoBooksFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprovedDonations = async () => {
      try {
        const response = await axios.get('https://localhost:7034/api/Donation/GetApprovedDonations');
        const categorizedDonations = categorizeDonations(response.data);
        setDonations(categorizedDonations);
        setFilteredDonations(categorizedDonations);
      } catch (error) {
        console.error('Error fetching approved donations:', error);
      }
    };
    fetchApprovedDonations();
  }, []);

  const categorizeDonations = (donationList) => {
    const categorized = {
      Fiction: [],
      'Non-Fiction': [],
      Academic: [],
      "Children's Books": [],
      'Comics & Graphic Novels': [],
      Poetry: []
    };

    donationList.forEach((donation) => {
      if (categorized[donation.category]) {
        categorized[donation.category].push(donation);
      }
    });
    return categorized;
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  
    // Filter donations based on the search term
    const newFilteredDonations = {};
    Object.keys(donations).forEach((category) => {
      const matchingDonations = donations[category].filter((donation) => {
        // Check if donation.title exists before calling toLowerCase
        return donation.title && donation.title.toLowerCase().includes(term.toLowerCase());
      });
  
      if (matchingDonations.length > 0) {
        newFilteredDonations[category] = matchingDonations;
      }
    });
  
    setFilteredDonations(newFilteredDonations);
  
    // Check if there are no matching donations in any category
    setNoBooksFound(Object.keys(newFilteredDonations).length === 0 && term.length > 0);
  };
  

  const handleDonationClick = (donationId) => {
    if (donationId) {
      navigate(`/browsecomponent-detailes/${donationId}`);
    } else {
      console.error('Donation ID is undefined');
    }
  };

  return (
    <Container fluid className="mt-4">
      {/* Search Bar */}
      <Row className="mb-4">
        <Col xs={12} md={8} className="mx-auto">
          <Form className="d-flex">
            <Form.Group controlId="search" className="flex-grow-1">
              <Form.Control
                type="text"
                placeholder="Search for donation books..."
                value={searchTerm}
                onChange={handleSearch}
                className="p-2"
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={() => handleSearch}>
              Search
            </Button>
          </Form>
        </Col>
      </Row>

      <Container>
        {/* Check if no books found */}
        {noBooksFound && (
          <Row className="mb-4">
            <Col xs={12} className="text-center">
              <p>No approved books found.</p>
            </Col>
          </Row>
        )}

        {/* Carousels by Category */}
        {Object.keys(filteredDonations).map((category) => (
          <Row key={category} className="mb-5">
            <Col xs={12}>
              <h1 className="mb-4 mt-4 text-center">{category}</h1>
              {filteredDonations[category].length === 0 ? (
                <p>No books in this category.</p>
              ) : (
                <>
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={1} // Default to 1 for small screens
                    navigation
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    pagination={{ clickable: true }}
                    modules={[Autoplay, Pagination, Navigation]}
                    breakpoints={{
                      576: { slidesPerView: 2 }, // 2 slides on small screens
                      768: { slidesPerView: 3 }, // 3 slides on medium screens
                      992: { slidesPerView: 4 } // 4 slides on large screens
                    }}
                    className="category-carousel"
                  >
                    {filteredDonations[category].map((donation, index) => (
                      <SwiperSlide key={index} onClick={() => handleDonationClick(donation.donationId)}>
                        <div className="d-flex justify-content-center">
                          <img
                            className="d-block"
                            src={`data:image/png;base64,${donation.bookImage}`}
                            alt={donation.title}
                            style={{ height: '250px', objectFit: 'cover', width: 'auto' }}
                          />
                        </div>
                        <div className="text-center mt-2">
                          <h6>{donation.title}</h6>
                          <p>{donation.author}</p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {/* See More Button */}
                  <div className="text-center mt-3">
                    <Button variant="primary" style={{ backgroundColor: 'blue', color: 'white' }}>
                      See More
                    </Button>
                  </div>
                </>
              )}
            </Col>
          </Row>
        ))}
      </Container>
    </Container>
  );
};

export default BrowseComponent;
