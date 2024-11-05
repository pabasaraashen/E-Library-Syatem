import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Donate = () => {
  const [formData, setFormData] = useState({
    bookTitle: '',
    author: '',
    status: 'Pending', // Always pending
    submissionDate: '',
    category: '',
    bookImage: null,
  });

  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');

  // Retrieve userId from local storage
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Handles text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handles file input (book image)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        bookImage: file,
      });
    }
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object for sending data
    const formDataToSend = new FormData();

    // Append file as formFile
    if (formData.bookImage) {
      formDataToSend.append('formFile', formData.bookImage);
    }

    // Append each form field
    formDataToSend.append('UserId', userId); // Retrieve userId from local storage
    formDataToSend.append('BookTitle', formData.bookTitle);
    formDataToSend.append('Author', formData.author);
    formDataToSend.append('Status', formData.status); // Default to 'Pending'
    formDataToSend.append('SubmissionDate', formData.submissionDate || new Date().toISOString());
    formDataToSend.append('Category', formData.category);

    try {
      const response = await axios.post('https://localhost:7034/api/Donation/CreateDonation', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage('Donation submitted successfully!');
      } else {
        setMessage('Error submitting donation');
      }
    } catch (error) {
      console.log(error.response);
      setMessage(`Error submitting donation: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container mt-4 ">
      <h2>Donate a Book</h2>

      {message && (
        <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Book Title:</label>
            <input
              type="text"
              className="form-control"
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Author:</label>
            <input
              type="text"
              className="form-control"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Category:</label>
            <select
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Academic">Academic</option>
              <option value="Children's Books">Children's Books</option>
              <option value="Comics & Graphic Novels">Comics & Graphic Novels</option>
              <option value="Poetry">Poetry</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label>Submission Date:</label>
            <input
              type="date"
              className="form-control"
              name="submissionDate"
              value={formData.submissionDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Book Image:</label>
            <input
              type="file"
              className="form-control"
              name="bookImage"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit Donation</button>
      </form>
    </div>
  );
};

export default Donate;
