import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaBook, FaClipboardList, FaCogs, FaDonate, FaClipboardCheck } from 'react-icons/fa';


const AdminSidePanel = () => {
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

  const logoStyle = {
    fontSize: '24px',
    color: 'white',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const navLinkItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    fontSize: '18px',
    color: 'white',
    transition: 'background 0.1s ease',
  };

  const navLinkItemHoverStyle = {
    background: 'black',
    borderRadius: '10px',
    color: 'black',
    transition: 'background 0.1s ease',
  };

  const iconStyle = {
    marginRight: '10px',
  };

  const userProfileStyle = {
    textAlign: 'center',
  };

  const logoutLinkStyle = {
    color: 'white',
    fontSize: '16px',
    textDecoration: 'none',
  };

  const logoutLinkHoverStyle = {
    textDecoration: 'underline',
  };

  return (
    <div style={sidebarStyle}>
      <div style={logoStyle}>
        <h2>Libro</h2>
      </div>
      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/admin/dashboard"
          style={navLinkItemStyle}
          onMouseEnter={(e) => (e.currentTarget.style = navLinkItemHoverStyle)}
          onMouseLeave={(e) => (e.currentTarget.style = navLinkItemStyle)}
        >
          <FaClipboardList style={iconStyle} /> Dashboard
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/admin/user-management"
          style={navLinkItemStyle}
          onMouseEnter={(e) => (e.currentTarget.style = navLinkItemHoverStyle)}
          onMouseLeave={(e) => (e.currentTarget.style = navLinkItemStyle)}
        >
          <FaUser style={iconStyle} /> User Management
        </Nav.Link>
        <NavDropdown
          title={
            <span style={{ color: 'white' }}>
              <FaBook style={iconStyle} /> Book Management
            </span>
          }
          id="book-management-dropdown"
          style={navLinkItemStyle}
        >
          <NavDropdown.Item as={Link} to="/admin/book-management/add-books">Add Books</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/admin/book-management/delete-books">Edit & Delete Books</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/admin/book-management/update-availability">Update Availability</NavDropdown.Item>
        </NavDropdown>
      
        
        <Nav.Link
          as={Link}
          to="/admin/system-settings"
          style={navLinkItemStyle}
          onMouseEnter={(e) => (e.currentTarget.style = navLinkItemHoverStyle)}
          onMouseLeave={(e) => (e.currentTarget.style = navLinkItemStyle)}
        >
          <FaCogs style={iconStyle} /> System Settings
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/admin/donation"
          style={navLinkItemStyle}
          onMouseEnter={(e) => (e.currentTarget.style = navLinkItemHoverStyle)}
          onMouseLeave={(e) => (e.currentTarget.style = navLinkItemStyle)}
        >
          <FaDonate style={iconStyle} /> Donations
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/admin/request-approve"
          style={navLinkItemStyle}
          onMouseEnter={(e) => (e.currentTarget.style = navLinkItemHoverStyle)}
          onMouseLeave={(e) => (e.currentTarget.style = navLinkItemStyle)}
        >
          <FaClipboardCheck style={iconStyle} /> Book Request
        </Nav.Link>
      </Nav>

      <div style={userProfileStyle}>
        <Nav.Link
          as={Link}
          to="/logout"
          style={logoutLinkStyle}
          onMouseEnter={(e) => (e.currentTarget.style = logoutLinkHoverStyle)}
          onMouseLeave={(e) => (e.currentTarget.style = logoutLinkStyle)}
        >
          Logout
        </Nav.Link>
      </div>
    </div>
  );
};

export default AdminSidePanel;