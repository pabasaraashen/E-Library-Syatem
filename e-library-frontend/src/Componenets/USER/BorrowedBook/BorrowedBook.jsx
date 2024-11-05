import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import UserSidePanel from '../UserSidePanel/UserSidePanel';

const BorrowedBook = () => {
  const [books, setBooks] = useState([]);
  const [remainingTimes, setRemainingTimes] = useState([]);
  const userId = localStorage.getItem('userId'); // Get userId from local storage inside the component

  // Function to calculate remaining time in days, hours, and minutes
  const calculateRemainingTime = (returnDate) => {
    const now = new Date();
    const returnDateTime = new Date(returnDate);
    const timeDiff = returnDateTime - now;

    if (timeDiff <= 0) {
      return 'Time Expired';
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${minutes}m`;
  };

  useEffect(() => {
    // Fetch the borrowed books for the user
    const fetchBorrowedBooks = async () => {
      try {
        if (userId) {
          const response = await axios.get(`https://localhost:7034/api/BorrowBook/GetBorrowedBooks/${userId}`);
          setBooks(response.data);
        } else {
          console.error('User ID not found in local storage');
        }
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
      }
    };

    fetchBorrowedBooks();
  }, [userId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTimes(
        books.map((book) => calculateRemainingTime(book.returnDate))
      );
    }, 60000); // Update every minute

    // Initial calculation
    setRemainingTimes(books.map((book) => calculateRemainingTime(book.returnDate)));

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [books]);

  return (
    <div className='d-flex'>
        <UserSidePanel/>
        <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-12">
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Borrowed Date</th>
                  <th>Return Date</th>
                  <th>Remaining Time</th>
                </tr>
              </thead>
              <tbody>
                {books.length > 0 ? (
                  books.map((book, index) => (
                    <tr key={book.borrowedId}>
                      <td>
                        <img
                          src={
                            book.bookImageBase64
                              ? `data:image/png;base64,${book.bookImageBase64}`
                              : '/path/to/placeholder.png'
                          }
                          alt={book.title}
                          className="img-fluid"
                          style={{ maxHeight: '250px', objectFit: 'cover' }}
                        />
                      </td>
                      <td>{new Date(book.borrowedDate).toLocaleDateString()}</td>
                      <td>{new Date(book.returnDate).toLocaleDateString()}</td>
                      <td>{remainingTimes[index]}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center' }}>
                      No books borrowed
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default BorrowedBook;
