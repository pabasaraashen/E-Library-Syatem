import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../../node_modules/swiper/swiper-bundle.min.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const DigitalLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState({
    Fiction: [],
    'Non-Fiction': [],
    Academic: [],
    "Children's Books": [],
    'Comics & Graphic Novels': [],
    Poetry: []
  });

  const [filteredBooks, setFilteredBooks] = useState(books);
  const [noBooksFound, setNoBooksFound] = useState(false);
  const navigate = useNavigate(); // Add the useNavigate hook for navigation

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://localhost:7034/api/Book/GetDBImageDet');
        console.log(response.data.result); // Check if bookId is present in the book object
        const categorizedBooks = categorizeBooks(response.data);
        setBooks(categorizedBooks);
        setFilteredBooks(categorizedBooks); // Set initial filtered books to all fetched books
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const categorizeBooks = (bookList) => {
    const categorized = {
      Fiction: [],
      'Non-Fiction': [],
      Academic: [],
      "Children's Books": [],
      'Comics & Graphic Novels': [],
      Poetry: []
    };

    bookList.result.forEach((book) => {
      if (categorized[book.catergory]) {
        categorized[book.catergory].push(book);
        
      }
    });
    return categorized;
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter books based on the search term
    const newFilteredBooks = {};
    Object.keys(books).forEach((category) => {
      const matchingBooks = books[category].filter((book) =>
        book.title.toLowerCase().includes(term.toLowerCase())
      );
      if (matchingBooks.length > 0) {
        newFilteredBooks[category] = matchingBooks;
      }
    });
    setFilteredBooks(newFilteredBooks);

    // Check if there are no matching books in any category
    setNoBooksFound(Object.keys(newFilteredBooks).length === 0 && term.length > 0);
  };

  // Navigate to BookDetails when a book is clicked
//   const handleBookClick = (bookId) => {
//     navigate(`/book-details/${bookId}`);
//   };
const handleBookClick = (bookId) => {
    // Ensure the bookId is being passed correctly
    if (bookId) {
      navigate(`/book-details/${bookId}`);
      console.log(`${bookId}`);
    } else {
      console.error('Book ID is undefined');
    }
  };
  

  return (
    <Container fluid className="mt-4">
      {/* Search Bar */}
      <Row className="mb-4">
        <Col xs={12} md={8} className="mx-auto">
          <Form inline className="d-flex">
            <Form.Group controlId="search" className="flex-grow-1">
              <Form.Control
                type="text"
                placeholder="Search for books..."
                value={searchTerm}
                onChange={handleSearch}
                className="p-2"
                style={{ maxWidth: '100%', marginRight: '10px' }}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
        </Col>
      </Row>

      <Container>
        {/* Check if no books found */}
        {noBooksFound ? (
          <Row className="mb-4">
            <Col xs={12} className="text-center">
              <p>This book is unavailable.</p>
            </Col>
          </Row>
        ) : null}

        {/* Carousels by Category */}
        {Object.keys(filteredBooks).map((category) => (
          <Row key={category} className="mb-5">
            <Col xs={12}>
              <h1 className="mb-4 mt-4 text-center">{category}</h1>
              {filteredBooks[category].length === 0 ? (
                <p>No books in this category.</p>
              ) : (
                <>
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={4}
                    navigation
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    pagination={{ clickable: true }}
                    modules={[Autoplay, Pagination, Navigation]}
                    breakpoints={{
                      320: { slidesPerView: 1 },
                      768: { slidesPerView: 2 },
                      1024: { slidesPerView: 3 },
                      1200: { slidesPerView: 4 }
                    }}
                    className="category-carousel"
                  >
                    {filteredBooks[category].map((book, index) => (
                      <SwiperSlide key={index} onClick={() => handleBookClick(book.bookId)}>
                        <div className="d-flex justify-content-center">
                          <img
                            className="d-block"
                            src={`data:image/png;base64,${book.imageBase64}`}
                            alt={book.title}
                            style={{ height: '250px', objectFit: 'cover', width: 'auto' }}
                          />
                        </div>
                        <div className="text-center mt-2">
                          <h6>{book.title}</h6>
                          <p>{book.author}</p>
                          <p>${book.price}</p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {/* See More Button */}
                  <div className="text-center mt-3">
                    <Button
                      variant="primary"
                      className="bg-primary"
                      style={{ backgroundColor: 'blue', color: 'white' }}
                    >
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

export default DigitalLibrary;
