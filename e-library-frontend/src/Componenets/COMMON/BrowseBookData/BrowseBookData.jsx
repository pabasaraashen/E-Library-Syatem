import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';

const BrowseBookData = () => {
  const { id } = useParams(); // Assume donation ID is passed in URL
  const [bookData, setBookData] = useState(null);
  const [message, setMessage] = useState('');  // Message for success or failure
  const [messageType, setMessageType] = useState(''); // Message type for styling (success/danger)

  // Calculate today's date and date after 14 days
  const today = new Date();
  const after14Days = new Date();
  after14Days.setDate(today.getDate() + 14);

  // Function to format the date into a readable string
  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
  };

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`https://localhost:7034/api/Donation/GetDonation/${id}`);
        setBookData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, [id]);

  const handleRequestBook = async () => {
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
    
    try {
      const requestData = {
        userId: userId, // UserId from localStorage
        donationId: id,  
        title: bookData.bookTitle,
        author: bookData.author,
        bookImage: bookData.bookImage,
        bookId: bookData.bookId, // BookId from bookData
        borrowedDate: new Date(), // BorrowedDate is set to today
        returnDate: new Date(Date.now() + 12096e5), // ReturnDate is set to 14 days from today
        status: 'Pending' // Status is set to "Pending"
      };

      const response = await axios.post('https://localhost:7034/api/BorrowBook/RequestBook', requestData);
      console.log(response);
      if (response.status === 200) {
        setMessage('Book request was successful.');
        setMessageType('success');
      }
    } catch (error) {
      // If the book is already requested, catch and handle the error
      if (error.response && error.response.status === 409) {  // Assuming the API returns a 409 Conflict status for duplicate requests
        setMessage('This book has already been requested.');
        setMessageType('danger');
      } else {
        setMessage('An error occurred while requesting the book.');
        setMessageType('danger');
      }
    }

    // Clear the message after 3 seconds
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  if (!bookData) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <Container fluid className="mt-4">
      <Row className="align-items-center">
        <Col xs={12} md={6} className="text-center mb-3 mb-md-0">
          <img
            src={`data:image/png;base64,${bookData.bookImage}`}
            alt={bookData.title}
            className="img-fluid mb-3"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
        </Col>
        <Col xs={12} md={6}>
          <h1>Title: {bookData.bookTitle}</h1>
          <h5>Author: {bookData.author}</h5>
          <p>Category: {bookData.category}</p>

          <div className="mt-4 row">
            <h4>Borrow Date</h4>
            <Button
              variant="secondary"
              className="mb-2 mb-md-0 mr-md-2"
            >
              {formatDate(today)}
            </Button>
            <br />
            <h4>Return Date</h4>
            <Button
              variant="secondary"
            >
              {formatDate(after14Days)}
            </Button>
          </div>

          <div className="mt-4">
            <Button variant="primary" onClick={handleRequestBook}>
              Request Book
            </Button>
          </div>

          {/* Display success or error message */}
          {message && (
            <Alert variant={messageType} className="mt-3">
              {message}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BrowseBookData;
