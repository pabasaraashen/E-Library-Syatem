import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract bookId and book from the navigation state
  const { bookId, book } = location.state || {};

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const userId = localStorage.getItem('userId');

  const handleConfirmPayment = async (e) => {
    e.preventDefault();

    try {
      console.log('Processing payment for userId:', userId, 'and bookId:', bookId);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate payment delay

      // Call the API to update user points or handle payment
      const response = await axios.post('https://localhost:7034/api/Users/UpdatePoints', {
        Id: userId,
        points: 10,
      });

      if (response.status === 200) {
        setMessage('Payment successful! Redirecting...');
        setMessageType('success');

        // Redirect to Thank You page after successful points update
        setTimeout(() => {
          navigate('/thankyou', { state: { bookId } });
        }, 2000);
      }
    } catch (error) {
      console.error('Error processing payment:', error.response ? error.response.data : error.message);
      setMessage('Failed to process payment.');
      setMessageType('danger');
    }
  };

  return (
    <Container className="mt-5 mb-4">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card className="p-4 shadow-lg">
            <h1 className="text-center mb-4">Checkout</h1>
            {book && <h3 className="text-center text-muted">Purchasing: {book.title}</h3>}
            <Form onSubmit={handleConfirmPayment}>
              <Form.Group controlId="formCardNumber" className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formExpiryDate" className="mb-3">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formCvc" className="mb-3">
                <Form.Label>CVC</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="CVC"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name on Card</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              {message && <Alert variant={messageType} className="mt-3">{message}</Alert>}

              <Row className="justify-content-center mt-4">
                <Col xs={6} md={4}>
                  <Button variant="primary" type="submit" className="w-100">
                    Confirm Payment
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
