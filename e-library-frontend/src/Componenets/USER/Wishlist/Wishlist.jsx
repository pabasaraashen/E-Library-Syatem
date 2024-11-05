import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap'; // Added Alert
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserSidePanel from '../UserSidePanel/UserSidePanel';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState(''); // State for success or error messages
  const userId = localStorage.getItem('userId'); // Get userId from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the wishlist data from the backend
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`https://localhost:7034/api/Wishlist/${userId}`);
        setWishlist(response.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };
    fetchWishlist();
  }, [userId]);

  // Remove item from wishlist
  const removeFromWishlist = async (bookId) => {
    try {
      await axios.delete(`https://localhost:7034/api/Wishlist/${userId}/${bookId}`);
      // Filter out the removed book from the state
      setWishlist(wishlist.filter((item) => item.book.bookId !== bookId));
      setMessage('Book removed from wishlist.');  // Set success message
      setTimeout(() => setMessage(''), 3000);  // Clear message after 3 seconds
    } catch (error) {
      console.error('Error removing book from wishlist:', error);
    }
  };

  // Navigate to book details page
  const viewDetails = (bookId) => {
    // Navigate to the BookDetails component using the bookId from the wishlist
    navigate(`/book-details/${bookId}`);
  };

  if (wishlist.length === 0) {
    return <h2>Your wishlist is empty.</h2>;
  }

  return (
    <div className='d-flex'>
      <UserSidePanel />
      <Container className="mt-5">
        <h2>Your Wishlist</h2>

        {/* Display success message */}
        {message && (
          <Alert variant="success">
            {message}
          </Alert>
        )}

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Book Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((item) => (
              <tr key={item.book.bookId}>
                <td>
                  <img 
                    src={`data:image/png;base64,${item.book.bookImage}`} 
                    alt={item.book.title} 
                    style={{ width: '100px', height: 'auto', objectFit: 'contain' }} 
                  />
                </td>
                <td>{item.book.title}</td>
                <td>
                  <Button variant="info" className="me-2" onClick={() => viewDetails(item.book.bookId)}>
                    View Details
                  </Button>
                  <Button variant="danger" onClick={() => removeFromWishlist(item.book.bookId)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Wishlist;
