import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AdminSidePanel from '../AdminSidePanel/AdminSidePanel';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Admin from './Admin';

const AdminDashboard = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={3} className="p-0">
          <AdminSidePanel />
        </Col>
        <Col xs={9} className="p-4">
          {/* This is where the nested routes will be rendered */}
          <Admin/>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
