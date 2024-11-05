import React, { useEffect, useState } from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ThankYou = () => {
  const [points, setPoints] = useState(0); 
  const [bookUrl, setBookUrl] = useState('');
  const Id = localStorage.getItem('userId'); 
  const navigate = useNavigate();
  const location = useLocation();

  // Extract bookId from location state
  const { bookId } = location.state || {};

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get(`https://localhost:7034/api/Users/${Id}`);
        setPoints(response.data.points);
      } catch (error) {
        console.error("Error fetching user points:", error);
      }
    };

    const fetchBookUrl = async () => {
      if (bookId) {
        try {
          const response = await axios.get(`https://localhost:7034/api/Book/GetBookUrl/${bookId}`);
          setBookUrl(response.data.bookUrl);
        } catch (error) {
          console.error("Error fetching book URL:", error);
        }
      }
    };

    fetchPoints();
    fetchBookUrl(); // Fetch the book URL
  }, [Id, bookId]);

  return (
    <Container className="d-flex justify-content-center align-items-center mb-4">
      <Row className="justify-content-center">
        <Col xs={20} md={12} lg={10}>
          <Card className="p-4 shadow-lg text-center">
            <Card.Body>
              <h1 className="mb-4">Thank You for Your Purchase!</h1>
              <p className="lead">Your payment has been processed successfully.</p>
              <h3 className="mt-4 text-success">You've earned 10 points!</h3>
              <h4 className="mt-3">Your total points: <span className="text-primary">{points}</span></h4>

              {bookUrl && (
                <div className="mt-4">
                  <h5>Your book is available at:</h5>
                  <a href={bookUrl} target="_blank" rel="noopener noreferrer">{bookUrl}</a>
                </div>
              )}

              <Button
                variant="primary"
                className="mt-4 w-70"
                onClick={() => navigate('/leaderboard')} // Link to the leaderboard page
              >
                View Current Leaderboard
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ThankYou;
