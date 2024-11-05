import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidePanel from '../AdminSidePanel/AdminSidePanel';

const UpdateBook = () => {
    const { bookId } = useParams(); // Get bookId from route parameters
    const [book, setBook] = useState({
        title: '',
        author: '',
        isbn: '',
        category: '',
        language: '',
        publicationYear: '',
        description: ''
    });
    const [bookImage, setBookImage] = useState(null); // State for the new book image
    const [message, setMessage] = useState(''); // State for success message
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`https://localhost:7034/api/Book/GetBook/${bookId}`);
                if (response.data) {
                    setBook(response.data); // Populate the form with fetched data
                }
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };
        fetchBookDetails();
    }, [bookId]);

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setBookImage(e.target.files[0]); // Store the uploaded image file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Append the updated book data to formData
        formData.append('Title', book.title);
        formData.append('Author', book.author);
        formData.append('Isbn', book.isbn);
        formData.append('Category', book.category);
        formData.append('Language', book.language);
        formData.append('PublicationYear', book.publicationYear);
        formData.append('Description', book.description);

        // If the user has uploaded a new image, append it to the formData
        if (bookImage) {
            formData.append('formFile', bookImage); // Match key with the API
        }

        try {
            await axios.put(`https://localhost:7034/api/Book/Update/${bookId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Set success message
            setMessage('Book updated successfully!');
            
            // Navigate back to the book list or home after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error updating book:', error);
            setMessage('Failed to update the book.');
        }
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(''); // Clear message after 2 seconds
            }, 2000);

            return () => clearTimeout(timer); // Cleanup timeout
        }
    }, [message]);

    return (
        <div className='d-flex'>
            <AdminSidePanel/>
            <div className="container mt-4">
            <h2 className="text-center mb-4">Update Book</h2>
            {message && (
                <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'} text-center`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={book.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="author" className="form-label">Author</label>
                        <input
                            type="text"
                            className="form-control"
                            id="author"
                            name="author"
                            value={book.author}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="isbn" className="form-label">ISBN</label>
                        <input
                            type="text"
                            className="form-control"
                            id="isbn"
                            name="isbn"
                            value={book.isbn}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <input
                            type="text"
                            className="form-control"
                            id="category"
                            name="category"
                            value={book.category}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="language" className="form-label">Language</label>
                        <input
                            type="text"
                            className="form-control"
                            id="language"
                            name="language"
                            value={book.language}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="publicationYear" className="form-label">Publication Year</label>
                        <input
                            type="number"
                            className="form-control"
                            id="publicationYear"
                            name="publicationYear"
                            value={book.publicationYear}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            rows="3"
                            value={book.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </div>

                {/* Image upload field */}
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="bookImage" className="form-label">Book Image (optional)</label>
                        <input
                            type="file"
                            className="form-control"
                            id="bookImage"
                            name="bookImage"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Update Book</button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default UpdateBook;
