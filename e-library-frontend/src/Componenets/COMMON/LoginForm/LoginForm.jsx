import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginimg from "../../../images/Login.jpg";

const LoginForm = ({ setUserRole }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (loginRequest) => {
    try {
      const response = await axios.post('https://localhost:7034/api/Auth/login', loginRequest, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 && response.data.role && response.data.userId) {
        const userRole = response.data.role; // Get role from response
        const userId = response.data.userId; // Get userId from response
        localStorage.setItem('userRole', userRole); // Store role in localStorage
        localStorage.setItem('userId', userId); // Store userId in localStorage
        setUserRole(userRole); // Update role in parent component

        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          if (userRole === 'admin') {
            navigate('/admin'); 
          } else {
            navigate('/'); 
          }
        }, 2000);
      } else {
        setError('Login successful, but role is missing.');
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); 
    handleLogin(loginData);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-80">
      <Card className="p-5 shadow-sm w-100" style={{ maxWidth: '900px', marginTop:'50px'}}>
        <Row className="g-0">

          {/* Image Section */}

          <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
            <img src={loginimg} alt="Login Img" className="img-fluid" 
            style={{maxWidth: '100%', height: 'auto', maxHeight: '400px', padding:'10px' }}
            />
          </Col>



          {/* Form Section */}

          
          <Col xs={12} md={6} className="d-flex align-items-center">
            <div className="w-100">
              <h2 className="text-center mb-4">Login</h2>
              {showSuccess && (
                <Alert variant="success" className="text-center">
                  Login successful! Redirecting...
                </Alert>
              )}
              {error && (
                <Alert variant="danger" className="text-center">
                  {error}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="form-control-sm"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="form-control-sm"
                    required
                  />
                </Form.Group>
                <Row className="mb-3">
                <div className="text-center">
                  <Button variant="primary" type="submit" className="px-5 w-50">
                    Login
                  </Button>
                </div>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default LoginForm;