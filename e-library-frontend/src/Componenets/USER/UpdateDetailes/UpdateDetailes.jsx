import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import UserSidePanel from '../UserSidePanel/UserSidePanel';
import { useNavigate } from 'react-router-dom';

const UpdateDetails = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(`https://localhost:7034/api/Auth/GetUserData/${userId}`);
        if (response.status === 200) {
          const user = response.data.result;
          setFormData({
            fullName: user.fullName,
            email: user.email,
            password: '',
            confirmPassword: '',
            role: user.role,
          });
        }
      } catch (error) {
        setError('Failed to load user data');
      }
    };
    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const updateData = new FormData();
    updateData.append('FullName', formData.fullName);
    updateData.append('Email', formData.email);
    updateData.append('Role', formData.role);

    if (formData.password) {
      updateData.append('PasswordHash', formData.password);
    }

    try {
      await axios.put(`https://localhost:7034/api/Auth/UpdateUser/${userId}`, updateData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Details updated successfully');

      setTimeout(() => {
        navigate('/user-dash');
      }, 2000);
    } catch (error) {
      setError('Failed to update user details');
    }
  };

  // Inline styles
  const styles = {
    formContainer: {
      backgroundColor: '#f8f9fa',
      padding: '30px',
      borderRadius: '10px',
      border: '2px solid #6a00ff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginTop: '50px',
    },
    formControl: {
      borderRadius: '5px',
      border: '2px solid #ced4da',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    },
    formControlFocus: {
      borderColor: '#6a00ff',
      boxShadow: '0 0 0 0.2rem rgba(106, 0, 255, 0.25)',
    },
    formLabel: {
      fontWeight: 'bold',
      color: '#495057',
    },
    btnPrimary: {
      backgroundColor: '#6a00ff',
      borderColor: '#6a00ff',
      transition: 'background-color 0.3s ease, border-color 0.3s ease',
      width: '100%',
    },
    btnPrimaryHover: {
      backgroundColor: '#8b5cf6',
      borderColor: '#8b5cf6',
    },
    alert: {
      marginBottom: '20px',
    },
    sidebar: {
      height: '100vh',
      background: 'linear-gradient(to bottom, #6a00ff, #8b5cf6)',
      padding: '20px',
      color: 'white',
      borderTopRightRadius: '45px',
      position: 'sticky',
      top: 0,
    },
    h2: {
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#6a00ff',
      textAlign: 'center',
    },
  };

  return (
    <div className="d-flex">
      <UserSidePanel />
      <Container style={styles.formContainer}>
        <h2 style={styles.h2}>Update Details</h2>
        {error && <Alert variant="danger" style={styles.alert}>{error}</Alert>}
        {success && <Alert variant="success" style={styles.alert}>{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="fullName" className="mb-3">
            <Form.Label style={styles.formLabel}>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              style={styles.formControl}
              required
            />
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label style={styles.formLabel}>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.formControl}
              required
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label style={styles.formLabel}>New Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password (optional)"
              style={styles.formControl}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label style={styles.formLabel}>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              style={styles.formControl}
            />
          </Form.Group>

          <Form.Group controlId="role" className="mb-3">
            <Form.Label style={styles.formLabel}>Role</Form.Label>
            <Form.Control
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={styles.formControl}
              readOnly
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={styles.btnPrimary}>
            Update Details
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default UpdateDetails;
