import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import AdminSidePanel from '../../ADMIN/AdminSidePanel/AdminSidePanel';

const UserManagement = () => {
  const [users, setUsers] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch all users categorized by role
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://localhost:7034/api/Auth/GetAllUsers');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const removeUser = async (userId) => {
    try {
      await axios.delete(`https://localhost:7034/api/Auth/RemoveUser/${userId}`);
      // Remove the user from the UI
      setUsers((prevUsers) => {
        const updatedUsers = { ...prevUsers };
        for (const role in updatedUsers) {
          updatedUsers[role] = updatedUsers[role].filter((user) => user.id !== userId);
        }
        return updatedUsers;
      });
      setMessage('User removed successfully!');
      setTimeout(() => setMessage(''), 3000); // Hide message after 3 seconds
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };

  return (
    <div className='d-flex'>
        <AdminSidePanel/>
        <Container className="mt-5">
      <h2>User Management</h2>

      {message && <Alert variant="success">{message}</Alert>}

      {Object.keys(users).map((role) => (
        <div key={role}>
          <h3>{role}</h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>UserId</th>
                <th>User Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users[role].map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.fullName}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => removeUser(user.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
    </Container>
    </div>
  );
};

export default UserManagement;
