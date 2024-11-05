import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddBook from '../AddBook/AddBook';
import DeleteBook from '../DeleteBook/DeleteBook';
import UpdateBook from '../UpdateBook/UpdateBook';
// import EditBook from '../EditBook/EditBook'; // Example component
// import UpdateAvailability from '../UpdateAvailability/UpdateAvailability'; // Example component

const BookManagement = () => {
  return (
    <div className="book-management">
      <Routes>
        <Route path="add-books" element={<AddBook />} />
        <Route path="delete-books/*" element={<DeleteBook/>} />
        <Route path="update/:bookId" element={<UpdateBook/>} /> {/* Add route for UpdateBook */}
        {/* <Route path="edit-books" element={<EditBook />} />
        <Route path="update-availability" element={<UpdateAvailability />} /> */}
      </Routes>
    </div>
  );
};

export default BookManagement;
