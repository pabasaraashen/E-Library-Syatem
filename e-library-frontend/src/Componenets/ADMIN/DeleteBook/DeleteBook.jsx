import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AdminSidePanel from '../AdminSidePanel/AdminSidePanel';

const DeleteBook = () => {
    const [books, setBooks] = useState([]);
    const [message, setMessage] = useState(''); // State for messages
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('https://localhost:7034/api/Book/GetDBImageDet'); // Adjust the API endpoint as needed
                if (Array.isArray(response.data.result)) {
                    setBooks(response.data.result); // Adjust based on your API response structure
                } else {
                    console.error('Unexpected API response:', response.data);
                }
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, []);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(''); // Clear the message after 2 seconds
            }, 2000);

            return () => clearTimeout(timer); // Cleanup timeout on unmount or message change
        }
    }, [message]);

    const handleDelete = async (bookId) => {
        try {
            await axios.delete(`https://localhost:7034/api/Book/DeletBook/${bookId}`); // Adjust the API endpoint for deletion
            setBooks(books.filter(book => book.bookId !== bookId)); // Update the state to remove the deleted book
            setMessage('Book deleted successfully!'); // Success message
        } catch (error) {
            console.error('Error deleting book:', error);
            setMessage('Failed to delete the book.'); // Error message
        }
    };

    const handleUpdate = (bookId) => {
        navigate(`/admin/book-management/update/${bookId}`); // Adjust the path to include 'admin/book-management/update/'
    };
    

    return (
        <div className='d-flex'>
            <AdminSidePanel/>
            <div className="container mt-4">
            <h2 className="mb-4">Delete or Update Books</h2>
            {message && <div className="alert alert-info">{message}</div>} {/* Display message */}
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Book Name</th>
                            <th>Author Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length > 0 ? (
                            books.map(book => (
                                <tr key={book.bookId}>
                                    <td>
                                        <img
                                            src={`data:image/png;base64,${book.imageBase64}`} // Adjust for your image format
                                            alt={book.title}
                                            className="img-fluid"
                                            style={{ maxWidth: '100px', height: 'auto' }}
                                        />
                                    </td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(book.bookId)} // Delete book
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="btn btn-warning ms-2"
                                            onClick={() => handleUpdate(book.bookId)} // Navigate to Update form
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No books available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default DeleteBook;
