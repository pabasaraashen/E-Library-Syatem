import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminSidePanel from '../AdminSidePanel/AdminSidePanel';

const AddBook = () => {
  const navigate = useNavigate(); // Hook to navigate
  const [formData, setFormData] = useState({
    productcode: '',
    title: '',
    author: '',
    isbn: '',
    price: '',
    category: '',
    language: '',
    publication_year: '',
    description: '',
    book_cover_url: null,
    added_date: '',
    book_url: '',
  });

  const [message, setMessage] = useState('');

  // Handles text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handles file input (book cover)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        book_cover_url: file,
      });
    }
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object for sending data
    const formDataToSend = new FormData();

    // Append file as formFile
    if (formData.book_cover_url) {
      formDataToSend.append('formFile', formData.book_cover_url);
    }

    // Append each book field individually
    formDataToSend.append('Productcode', formData.productcode);
    formDataToSend.append('Isbn', formData.isbn);
    formDataToSend.append('Title', formData.title);
    formDataToSend.append('Author', formData.author);
    formDataToSend.append('Price', formData.price);
    formDataToSend.append('Category', formData.category);
    formDataToSend.append('Language', formData.language);
    formDataToSend.append('Description', formData.description);
    formDataToSend.append('PublicationYear', formData.publication_year);
    formDataToSend.append('AddedDate', formData.added_date || new Date().toISOString());
    formDataToSend.append('Book_Url', formData.book_url);

    try {
      const response = await axios.put('https://localhost:7034/api/Book/DBUploadImage', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage('Book added successfully!');

        // Reset the form
        setFormData({
          productcode: '',
          title: '',
          author: '',
          isbn: '',
          price: '',
          category: '',
          language: '',
          publication_year: '',
          description: '',
          book_cover_url: null,
          added_date: '',
          book_url: '',
        });

        // Navigate to the admin dashboard after a short delay
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 2000); // Redirect after 2 seconds
      } else {
        setMessage('Error adding book');
      }
    } catch (error) {
      console.log(error.response); // Log the error response to see the actual issue
      setMessage(`Error adding book: ${error.response?.data?.message || error.message}`);
    }
  };

  // Inline Styles
  const styles = {
    customContainer: {
      maxWidth: '800px',
      backgroundColor: '#f8f9fa',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      marginLeft: 'auto',
      marginRight: 'auto',
      transform: 'translateX(-10%)',
      border: '2px solid #0b0c0c',
    },
    customForm: {
      input: {
        borderRadius: '6px',
        border: '1px solid #ced4da',
        transition: 'border-color 0.3s',
      },
      inputFocus: {
        borderColor: '#007bff',
      },
    },
    customBtn: {
      backgroundColor: '#007bff',
      border: 'none',
      padding: '0.6rem 1.2rem',
      fontSize: '1rem',
      transition: 'background-color 0.3s',
    },
    alert: {
      marginTop: '20px',
    },
    h2: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 700,
      color: '#333',
    },
  };

  return (
    <div className='d-flex'>
      <AdminSidePanel />
      <div style={styles.customContainer}>
        <h2 style={styles.h2}>Add a New Book</h2>

        {message && (
          <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`} style={styles.alert}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Product Code:</label>
              <input
                type="text"
                className="form-control"
                name="productcode"
                value={formData.productcode}
                onChange={handleInputChange}
                required
                style={styles.customForm.input}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Title:</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                style={styles.customForm.input}
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
                style={styles.customForm.input}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>ISBN:</label>
              <input
                type="text"
                className="form-control"
                name="isbn"
                value={formData.isbn}
                onChange={handleInputChange}
                required
                style={styles.customForm.input}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Price:</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                style={styles.customForm.input}
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
                style={styles.customForm.input}
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
              <label>Language:</label>
              <input
                type="text"
                className="form-control"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                required
                style={styles.customForm.input}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Publication Year:</label>
              <input
                type="number"
                className="form-control"
                name="publication_year"
                value={formData.publication_year}
                onChange={handleInputChange}
                style={styles.customForm.input}
              />
            </div>

            <div className="col-md-12 mb-3">
              <label>Description:</label>
              <textarea
                name="description"
                className="form-control"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                required
                style={styles.customForm.input}
              ></textarea>
            </div>

            <div className="col-md-6 mb-3">
              <label>Book Cover:</label>
              <input
                type="file"
                className="form-control"
                name="book_cover_url"
                onChange={handleFileChange}
                style={styles.customForm.input}
              />
            </div>
            
            <div className="col-md-6 mb-3">
              <label>Book URL:</label>
              <input
                type="text"
                className="form-control"
                name="book_url"
                value={formData.book_url}
                onChange={handleInputChange}
                required
                style={styles.customForm.input}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Added Date:</label>
              <input
                type="date"
                className="form-control"
                name="added_date"
                value={formData.added_date}
                onChange={handleInputChange}
                style={styles.customForm.input}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={styles.customBtn}
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
