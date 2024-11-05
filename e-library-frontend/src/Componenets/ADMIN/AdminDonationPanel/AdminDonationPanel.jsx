import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminSidePanel from '../AdminSidePanel/AdminSidePanel';

const AdminDonationPanel = () => {
  const [donations, setDonations] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPendingDonations = async () => {
      try {
        const response = await axios.get('https://localhost:7034/api/Donation/GetPendingDonations');
        console.log(response);
        setDonations(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPendingDonations();
  }, []);

  const handleStatusUpdate = async (donationId, status) => {
    if (status === 'Rejected') {
      handleDonationRemoval(donationId);
    } else {
      try {
        const response = await axios.put(`https://localhost:7034/api/Donation/UpdateDonationStatus/${donationId}`, { status });
        if (response.status === 200) {
          setMessage(`Donation ${status} successfully!`);
          // Update donation list
          setDonations(donations.filter(donation => donation.donationId !== donationId));
          setTimeout(() => setMessage(''), 3000);
        }
      } catch (error) {
        console.log(error);
        setMessage('Error updating donation status');
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  const handleDonationRemoval = async (donationId) => {
    try {
      const response = await axios.delete(`https://localhost:7034/api/Donation/DeleteDonation/${donationId}`);
      if (response.status === 200) {
        setMessage('Donation rejected successfully!');
        setDonations(donations.filter(donation => donation.donationId !== donationId));
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.log(error);
      setMessage('Error removing donation');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className='d-flex'>
      <AdminSidePanel/>
      <div className="container mt-4">
      <h2 className="text-center">Admin Panel - Pending Donations</h2>

      {message && (
        <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}

      {donations.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Book Image</th>
                <th>Book Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Submission Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.donationId}>
                  <td>
                    {donation.bookImage ? (
                      <img
                        src={`data:image/png;base64,${donation.bookImage}`}
                        alt={donation.bookTitle}
                        className="img-fluid"
                        style={{ maxWidth: '100px', height: 'auto' }} // Responsively adjust image size
                      />
                    ) : (
                      <p>No image</p>
                    )}
                  </td>
                  <td>{donation.bookTitle}</td>
                  <td>{donation.author}</td>
                  <td>{donation.category}</td>
                  <td>{new Date(donation.submissionDate).toLocaleDateString()}</td>
                  <td>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleStatusUpdate(donation.donationId, 'Approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm ml-2"
                        onClick={() => handleStatusUpdate(donation.donationId, 'Rejected')}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No pending donations found.</p>
      )}
    </div>
    </div>
  );
};

export default AdminDonationPanel;
