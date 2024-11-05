import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('https://localhost:7034/api/Users/Leaderboard');
        console.log("Fetched leaderboard data:", response.data);
        if (response.data && Array.isArray(response.data)) {
          setUsers(response.data); // Ensure it's an array before setting state
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <Container className="mt-5">
      <h1 className="text-center">Leaderboard</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.fullName || "No Name"}</td> {/* Default to "No Name" if undefined */}
                <td>{user.email || "No Email"}</td>   {/* Default to "No Email" if undefined */}
                <td>{user.points || 0}</td>           {/* Default to 0 if undefined */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No records found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
  
};

export default Leaderboard;