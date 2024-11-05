import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios';
import UserSidePanel from '../UserSidePanel/UserSidePanel';

const UserDashboard = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage or from authentication
      if (userId) {
        try {
          const response = await axios.post(`https://localhost:7034/api/Auth/GetUserData/${userId}`);
          const { fullName, email, role } = response.data.result;
          setUserData({ fullName, email, role });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  // Inline styles
  const styles = {
    dashboardContainer: {
      display: 'flex',
      marginTop: '3rem',
      flexDirection: 'row',
    },
    sidePanel: {
      flex: 1,
    },
    dashboardContent: {
      flex: 4,
      padding: '2rem',
      backgroundColor: '#f8f9fa', // Light gray background
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for the card
    },
    h1: {
      fontSize: '2.5rem',
      marginBottom: '1.5rem',
      color: '#343a40', // Darker text color
    },
    userCard: {
      border: 'none', // Remove the default border
      borderRadius: '10px', // Smooth edges
      backgroundColor: '#ffffff', // White background
      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)', // Card shadow
    },
    userCardBody: {
      padding: '2rem',
    },
    userCardTitle: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#007bff', // Blue title color
    },
    userCardText: {
      fontSize: '1.2rem',
      color: '#6c757d', // Gray text
    },
    // Media query for responsiveness
    mediaQuery: {
      '@media (maxWidth: 768px)': {
        dashboardContainer: {
          flexDirection: 'column',
        },
        dashboardContent: {
          padding: '1rem',
        },
      },
    },
  };

  return (
    <div style={styles.dashboardContainer}>
      <UserSidePanel style={styles.sidePanel} />
      <Container style={styles.dashboardContent}>
        <h1 style={styles.h1}>User Dashboard</h1>
        <Card style={styles.userCard}>
          <Card.Body style={styles.userCardBody}>
            <Card.Title style={styles.userCardTitle}>
              Welcome, {userData.fullName}
            </Card.Title>
            <Card.Text style={styles.userCardText}>
              <strong>Email:</strong> {userData.email}
            </Card.Text>
            <Card.Text style={styles.userCardText}>
              <strong>Role:</strong> {userData.role}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default UserDashboard;