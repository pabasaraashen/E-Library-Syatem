import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Dropdown, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaBook } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrophy, faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const NavBar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'guest'; // Get userRole from localStorage
  const userId = localStorage.getItem('userId'); // Get userId from localStorage
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications for the logged-in user
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`https://localhost:7034/api/Notification/GetUserNotifications/${userId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.post(`https://localhost:7034/api/Notification/MarkNotificationAsRead/${notificationId}`);
      setNotifications(notifications.filter(n => n.notificationId !== notificationId)); // Remove notification after reading
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Role-based rendering for links
  const renderUserRoleLinks = () => {
    switch (userRole) {
      case 'guest':
        return (
          <>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </>
        );
      case 'student':
      case 'teacher':
        return (
          <>
            <Nav.Link as={Link} to="/user-leaderboard">
              <FontAwesomeIcon icon={faTrophy} size="lg" color="orange" />
            </Nav.Link>
            <Dropdown align="end" className="d-inline">
              <Dropdown.Toggle as={Nav.Link} className="position-relative">
                <FontAwesomeIcon icon={faBell} size="lg" />
                {notifications.length > 0 && (
                  <Badge
                    bg="danger"
                    className="position-absolute top--1 start-100 translate-middle p-1 rounded-circle"
                    style={{ fontSize: '0.75rem' }}
                  >
                    {notifications.length}
                  </Badge>
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-right dropdown-menu-lg-end notification-dropdown">
                {notifications.length === 0 ? (
                  <Dropdown.Item>No notifications</Dropdown.Item>
                ) : (
                  notifications.map((notification, index) => (
                    
                    <Dropdown.Item
                      key={notification.notificationId}
                      onClick={() => handleMarkAsRead(notification.notificationId)}
                      style={{
                        backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#e9ecef', // Alternating background
                        borderBottom: '1px solid #dee2e6', // Separator line between items
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <img
                          className="me-2"
                          src={`data:image/png;base64,${notification.bookImage}`} // Render base64 book image
                          alt={notification.title}
                          style={{ height: '50px', objectFit: 'cover', width: 'auto' }} // Adjust size and style
                        />
                        <div>
                          <strong>{notification.title}</strong> {/* Display book title */}
                          <p>{notification.message}</p> {/* Notification message */}
                        </div>
                      </div>
                    </Dropdown.Item>
                  ))
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Link as={Link} to="/user-dash">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </>
        );
      case 'admin':
        return (
          <>
            <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        {/* First Column - Brand Icon */}
        <Navbar.Brand as={Link} to="/">
          <FaBook size={32} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="mx-auto">
            {/* Second Column - Common Links */}
            <Nav className="justify-content-center" style={{ flex: 1 }}>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/browse">Browse Books</Nav.Link>
              <Nav.Link as={Link} to="/digital-library">Digital Library</Nav.Link>
              <Nav.Link as={Link} to="/donate">Donate Us</Nav.Link>
            </Nav>
          </div>

          {/* Third Column - Role-Specific Links */}
          <Nav>
            {renderUserRoleLinks()} {/* Render links based on the user's role */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
