import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Data for the Pie chart
const data = [
  { name: 'New', value: 44.4, color: '#00C49F' },
  { name: 'Issued', value: 33.3, color: '#0088FE' },
  { name: 'Lost', value: 11.1, color: '#FF8042' },
  { name: 'Returned', value: 11.1, color: '#FFBB28' }
];

// Sample data for Activity and Orders
const activities = [
  'Discuss the benefits of integrating the library system with school or university platforms',
  'Create scenarios where books are overdue and show how the system tracks these books.',
  'Show how students and staff can access and borrow digital content.',
  'Demonstrate how the library management system connects with external resources'
];

const orders = [
  { id: '#55763', description: 'Heshan placed a new order for "Computer networking" books.', time: '6 mins ago', status: 'new' },
  { id: '#48230', description: 'Moda Tharindu cancelled an order for "Cyber security" books.', time: '30 mins ago', status: 'cancelled' },
  { id: '#41470', description: 'Naveen placed an order for "Embedded Systems" books.', time: '1 hour ago', status: 'completed' }
];

// Function to generate random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function Admin() {
  const styles = {
    main: {
      width: 'max-content',
      height: 'auto',
    },
    card: {
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease-in-out',
    },
    cardHover: {
      transform: 'scale(1.05)',
    },
    containerFluid: {
      maxWidth: '1200px',
    },
    card1: {
      margin: '10px 0',
    },
    pieChart: {
      display: 'inline-block',
      width: '100px',
      height: '100px',
    },
    stats: {
      marginLeft: '20px',
      marginTop: '10px',
      paddingLeft: '50px',
    },
    rip: {
      paddingTop: '20px',
    },
    rowAdmin: {
      backgroundColor: 'rgb(237, 234, 230)',
    },
  };

  return (
    <div style={styles.main}>
      <div className="content">
        <div className="container mt-5">
          <h2 className="text-center mb-4">Admin Dashboard</h2>
          <div className="row">
            {/* New Books Added Card */}
            <div className="col-md-3">
              <div className="card text-center" style={styles.card}>
                <div className="card-body">
                  <h5 className="card-title">New Books Added</h5>
                  <p className="card-text">250 new books added in the library.</p>
                </div>
              </div>
            </div>

            {/* Lost Books Card */}
            <div className="col-md-3">
              <div className="card text-center" style={styles.card}>
                <div className="card-body">
                  <h5 className="card-title">Lost Books</h5>
                  <p className="card-text">20 books are not in the library.</p>
                </div>
              </div>
            </div>

            {/* Borrowed Books Card */}
            <div className="col-md-3">
              <div className="card text-center" style={styles.card}>
                <div className="card-body">
                  <h5 className="card-title">Borrowed Books</h5>
                  <p className="card-text">576 books borrowed.</p>
                </div>
              </div>
            </div>

            {/* Available Books Card */}
            <div className="col-md-3">
              <div className="card text-center" style={styles.card}>
                <div className="card-body">
                  <h5 className="card-title">Available Books</h5>
                  <p className="card-text">6875 books are available to borrow.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid" style={styles.containerFluid}>
            <div className="row mt-5">
              {/* Left Panel: Notifications */}
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">Notifications</div>
                  <div className="card-body">
                    <ul className="list-group">
                      <li className="list-group-item">5 More networking books are needed.</li>
                      <li className="list-group-item">Theory of scheduling books are still not added to rack S12.</li>
                      <li className="list-group-item">3 Cyber security management books are returned.</li>
                      <li className="list-group-item">5 more science fiction books have just arrived in the library.</li>
                      <li className="list-group-item">Don't miss our book fair event scheduled for next Saturday at 10 AM.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Panel: Total Books Report */}
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">Total Books Report</div>
                  <div className="card-body d-flex align-items-center">
                    <PieChart width={200} height={200}>
                      <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>

                    {/* Stats Section */}
                    <div style={styles.stats}>
                      {data.map((entry, index) => (
                        <p key={index}>
                          <span style={{ color: entry.color }}>{entry.value}%</span> {entry.name}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* New Section: Activity and Orders */}
            <div className="row mt-5">
              {/* Activity Section */}
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">Activity</div>
                  <div className="card-body">
                    {activities.map((activity, index) => (
                      <div key={index} className="activity">
                        <p>{activity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Orders Section */}
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">Orders</div>
                  <div className="card-body">
                    {orders.map((order, index) => (
                      <div key={index} className="order mb-2">
                        <p><strong style={{ color: getRandomColor() }}>{order.id}</strong> {order.description}</p>
                        <small className="text-muted">{order.time}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;