import React, { useState } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserSidePanel = () => {
  // State to track hover
  const [hoveredLink, setHoveredLink] = useState(null);

  const sidebarStyle = {
    width: '250px',
    height: '90vh',
    background: 'linear-gradient(to bottom, #6a00ff, #8b5cf6)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px',
    color: 'white',
    borderTopRightRadius: '45px',
    top: '110px',
    position: 'sticky',
    marginLeft: '0px',
  };

  const navLinkItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    fontSize: '18px',
    color: 'white',
  
    transition: 'background 0.3s ease',
  };

  const navDropdownItemStyle = {
    color: 'black',
  };

  const navDropdownItemHoverStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'black',
  };

  const handleMouseEnter = (link) => {
    setHoveredLink(link); // Set the hovered link
  };

  const handleMouseLeave = () => {
    setHoveredLink(null); // Reset on mouse leave
  };

  return (
    <div style={sidebarStyle}>
      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/user/update-details"
          style={{
            ...navLinkItemStyle,
            color: hoveredLink === 'update-details' ? 'black' : 'white', // Apply hover color dynamically
            background: hoveredLink === 'update-details' ? 'rgba(255, 255, 255, 0.1)' : 'transparent', // Add background on hover
          }}
          onMouseEnter={() => handleMouseEnter('update-details')}
          onMouseLeave={handleMouseLeave}
        >
          Update Details
        </Nav.Link>

        <NavDropdown
          title="Wishlist"
          id="wishlist-dropdown"
          style={navLinkItemStyle}
        >
          <NavDropdown.Item
            as={Link}
            to="/user/wishlist"
            style={navDropdownItemStyle}
            onMouseEnter={(e) => (e.currentTarget.style = navDropdownItemHoverStyle)}
            onMouseLeave={(e) => (e.currentTarget.style = navDropdownItemStyle)}
          >
            View Wishlist
          </NavDropdown.Item>
          <NavDropdown.Item
            as={Link}
            to="/user/wishlist/manage-wishlist"
            style={navDropdownItemStyle}
            onMouseEnter={(e) => (e.currentTarget.style = navDropdownItemHoverStyle)}
            onMouseLeave={(e) => (e.currentTarget.style = navDropdownItemStyle)}
          >
            Manage Wishlist
          </NavDropdown.Item>
        </NavDropdown>

        <NavDropdown
          title="Borrowed Books"
          id="borrowed-books-dropdown"
          style={navLinkItemStyle}
        >
          <NavDropdown.Item
            as={Link}
            to="/user/borrowed-books"
            style={navDropdownItemStyle}
            onMouseEnter={(e) => (e.currentTarget.style = navDropdownItemHoverStyle)}
            onMouseLeave={(e) => (e.currentTarget.style = navDropdownItemStyle)}
          >
            View Borrowed Books
          </NavDropdown.Item>
          <NavDropdown.Item
            as={Link}
            to="/user/borrowed-books/return-books"
            style={navDropdownItemStyle}
            onMouseEnter={(e) => (e.currentTarget.style = navDropdownItemHoverStyle)}
            onMouseLeave={(e) => (e.currentTarget.style = navDropdownItemStyle)}
          >
            Return Books
          </NavDropdown.Item>
        </NavDropdown>

        <Nav.Link
          as={Link}
          to="/user/leaderboard"
          style={{
            ...navLinkItemStyle,
            color: hoveredLink === 'leaderboard' ? 'black' : 'white', // Apply hover color dynamically
            background: hoveredLink === 'leaderboard' ? 'rgba(255, 255, 255, 0.1)' : 'transparent', // Add background on hover
          }}
          onMouseEnter={() => handleMouseEnter('leaderboard')}
          onMouseLeave={handleMouseLeave}
        >
          LeaderBoard
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default UserSidePanel;