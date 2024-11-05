import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUserRole }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle login function
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

        // Show success message and navigate
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          if (userRole === 'admin') {
            navigate('/admin'); // Redirect to admin dashboard
          } else {
            navigate('/'); // Redirect to home or another page for non-admin users
          }
        }, 2000);
      } else {
        setError('Login successful, but role or userId is missing.');
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setError('Invalid email or password. Please try again.');
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Reset error
    handleLogin(loginData);
  };

  return (
    <Container className="login-form my-5">
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
            required
          />
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit" className="px-5">
            Login
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default LoginForm;
