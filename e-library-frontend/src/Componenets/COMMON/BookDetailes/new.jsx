import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const BookDetails = memo(({ books }) => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [wishlistStatus, setWishlistStatus] = useState(false);
  const [message, setMessage] = useState('');  // State for success or error messages
  const [messageType, setMessageType] = useState(''); // For setting alert style

  // Get the userId from localStorage
  const userId = localStorage.getItem('userId');

  const book = books.find((b) => b.bookId === parseInt(bookId, 10));

  useEffect(() => {
    if (book) {
      console.log('Book object passed to BookDetails:', book);
    } else {
      console.log('No matching book found for bookId:', bookId);
    }
  }, [book, bookId]);

  // Function to hide messages after 3 seconds
  const hideMessageAfterDelay = () => {
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000); // 3 seconds
  };

  // API call to add book to wishlist
  const addToWishlist = async () => {
    try {
      console.log(userId, bookId);
      const response = await axios.post('https://localhost:7034/api/Wishlist', {
        userId: userId, // Use userId from localStorage
        bookId: book.bookId
      });
      if (response.status === 200) {
        setWishlistStatus(true); // Set flag to indicate it's added
        setMessage('Book successfully added to your wishlist!'); // Success message
        setMessageType('success');
        hideMessageAfterDelay(); // Hide message after 3 seconds
        console.log('Book added to wishlist:', response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage('Book is already in your wishlist.'); // Message for existing wishlist entry
      } else {
        setMessage('Failed to add book to wishlist.'); // General error message
      }
      setMessageType('danger');
      hideMessageAfterDelay(); // Hide message after 3 seconds
      console.error('Failed to add book to wishlist:', error);
    }
  };

  const handleBuyNow = () => {
    navigate('/checkout', { state: { book } }); // Navigate to checkout with the selected book
  };

  if (!book) {
    return <h2>Book not found or loading...</h2>;
  }

  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col xs={12} md={4} className="text-center">
          <img 
            src={`data:image/png;base64,${book.imageBase64}`} 
            alt={book.title} 
            className="img-fluid mb-3"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
          <Button variant="primary" className="mb-2 w-100" onClick={handleBuyNow}>Buy Now</Button>
          <Button 
            variant={wishlistStatus ? "success" : "outline-secondary"} 
            className="w-100" 
            onClick={addToWishlist}
            disabled={wishlistStatus}
          >
            {wishlistStatus ? "Added to Wishlist" : "Add to Wishlist"}
          </Button>
          
          {/* Conditionally display success or error message */}
          {message && (
            <Alert variant={messageType} className="mt-3">
              {message}
            </Alert>
          )}
        </Col>


        <Col xs={12} md={8}>
  <div
    style={{
      padding: '1rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    }}
  >
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <tbody>
        {[
          { label: 'Title', value: book.title },
          { label: 'Author', value: book.author },
          { label: 'Category', value: book.category },
          { label: 'Description', value: book.descrition },
          { label: 'Price', value: `${book.price}` },
        ].map((row, index) => (
          <tr key={index}>
            <td
              style={{
                padding: '0.3rem 0.2rem',
                fontWeight: 'bold',
                textAlign: 'left',
                width: '20%',
                color: '#333',
                verticalAlign: 'top',
              }}
            >
              <strong>{row.label}:</strong>
            </td>
            <td
              style={{
                padding: '0.3rem 0.2rem',
                textAlign: 'left',
                color: '#555',
                verticalAlign: 'top',
                fontWeight: '500',
              }}
            >
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</Col>




        

      </Row>
    </Container>
  );
});

export default BookDetails;