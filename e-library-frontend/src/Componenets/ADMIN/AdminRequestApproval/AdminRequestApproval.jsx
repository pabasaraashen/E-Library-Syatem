import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import AdminSidePanel from '../AdminSidePanel/AdminSidePanel';

const AdminRequestApproval = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Fetch pending requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('https://localhost:7034/api/BorrowBook/GetPendingRequests');
        console.log(response.data);
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  // Handle Approve Request
  const handleApprove = async (borrowId) => {
    try {
      const response = await axios.post(`https://localhost:7034/api/BorrowBook/ApproveRequest/${borrowId}`);
      setMessage(response.data);
      setMessageType('success');
      setRequests(requests.filter(request => request.borrowedId !== borrowId)); // Remove approved request from the list
    } catch (error) {
      setMessage('Failed to approve the request.');
      setMessageType('danger');
    }
  };

  // Handle Reject Request
  const handleReject = async (borrowId) => {
    try {
      const response = await axios.post(`https://localhost:7034/api/BorrowBook/RejectRequest/${borrowId}`);
      setMessage(response.data);
      setMessageType('success');
      setRequests(requests.filter(request => request.borrowedId !== borrowId)); // Remove rejected request from the list
    } catch (error) {
      setMessage('Failed to reject the request.');
      setMessageType('danger');
    }
  };

  return (
    <div className='d-flex'>
      <AdminSidePanel/>
      <Container fluid className="mt-4">
      <h2>Pending Book Requests</h2>
      {message && (
        <Alert variant={messageType} className="mt-3">
          {message}
        </Alert>
      )}
      {requests.length > 0 ? (
        requests.map(request => (
          <Row key={request.borrowedId} className="align-items-center mb-3">
            <Col xs={12} md={8}>
              <h5>Book Title: {request.title}</h5>
              <img
            src={`data:image/png;base64,${request.bookImage}`}
            alt={request.title}
            className="img-fluid mb-3"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
              <h5>Author : {request.author}</h5>
              <p>Requested by User ID: {request.userId}</p>
              <p>Borrow Date: {new Date(request.borrowedDate).toLocaleDateString()}</p>
              <p>Return Date: {new Date(request.returnDate).toLocaleDateString()}</p>
            </Col>
            <Col xs={12} md={4}>
              <Button variant="success" onClick={() => handleApprove(request.borrowedId)} className="mr-2">
                Approve
              </Button>
              <Button variant="danger" onClick={() => handleReject(request.borrowedId)}>
                Reject
              </Button>
            </Col>
          </Row>
        ))
      ) : (
        <p>No pending requests found.</p>
      )}
    </Container>
    </div>
  );
};

export default AdminRequestApproval;
