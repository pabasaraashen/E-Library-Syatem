import React, { useState } from 'react';
import { Form, Button, Col, Row, Container, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Registerimg from "../../../images/Register.png";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    PasswordHash: '',
    confirmPassword: '',
    role: ''
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { fullName, email, PasswordHash, confirmPassword, role } = formData;
    const newErrors = {};
    if (!fullName) newErrors.fullName = 'Full name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!PasswordHash) newErrors.PasswordHash = 'Password is required';
    if (PasswordHash !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!role) newErrors.role = 'Role is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('https://localhost:7034/api/Auth/register', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(response.data);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/login');
        }, 3000);
      } catch (error) {
        console.error('There was an error registering the user:', error.response ? error.response.data : error.message);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-80">
      <Card className="shadow-sm " style={{ maxWidth: '900px' }}>
        <Row className="g-0">
          
          {/*Image Section */}
          <Col md={6} className="d-flex justify-content-center align-items-center">
            <img 
              src={Registerimg}
              alt="registerimage"
              className="img-fluid" 
              style={{ padding: '20px', maxWidth: '100%', height: 'auto', maxHeight: '400px', }} 
            />
          </Col>
          <Col md={6}>
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Register</h2>
              {showSuccess && (
                <Alert variant="success" className="text-center">
                  Registration successful! Redirecting to login page...
                </Alert>
              )}

              {/* Form Section */}

              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="fullName">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        isInvalid={!!errors.fullName}
                        placeholder="Enter your full name"
                      />
                      <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                        placeholder="Enter your email"
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="PasswordHash">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="PasswordHash"
                        value={formData.PasswordHash}
                        onChange={handleChange}
                        isInvalid={!!errors.PasswordHash}
                        placeholder="Enter your password"
                      />
                      <Form.Control.Feedback type="invalid">{errors.PasswordHash}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="confirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmPassword}
                        placeholder="Confirm your password"
                      />
                      <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="role">
                      <Form.Label>Select Role</Form.Label>
                      <Form.Select name="role" value={formData.role} onChange={handleChange} isInvalid={!!errors.role}>
                        <option value="">Select Role</option>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="admin">Admin</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col className="text-center">
                    <Button variant="primary" type="submit" className="px-5">
                      Register
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default RegistrationForm;