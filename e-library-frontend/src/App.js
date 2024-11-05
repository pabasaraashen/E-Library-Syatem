import React, { useState, useEffect } from 'react';
import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/swiper/swiper-bundle.min.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import RegistrationForm from "./Componenets/COMMON/RegistrationForm/RegistrationForm";
import LoginForm from "./Componenets/COMMON/LoginForm/LoginForm";
import Home from './Componenets/COMMON/Home/Home';
import NavBar from './Componenets/COMMON/Navbar/Navbar';
import AdminDashboard from './Componenets/ADMIN/AdminDashboard/AdminDashboard';
import BookDetails from './Componenets/COMMON/BookDetailes/BookDetaile';

import axios from 'axios';
import UserDashboard from './Componenets/USER/UserDashBoard/UserDashboard';
import UpdateDetails from './Componenets/USER/UpdateDetailes/UpdateDetailes';
import TestimonialForm from './Componenets/USER/TestimonialForm/TestimonialForm';
import Wishlist from './Componenets/USER/Wishlist/Wishlist';
import UserManagement from './Componenets/ADMIN/UserManagement/UserManagment';
import Donate from './Componenets/COMMON/Donate/Donate';
import AdminDonationPanel from './Componenets/ADMIN/AdminDonationPanel/AdminDonationPanel';
import BrowseComponent from './Componenets/COMMON/BrowseComponent/BrowseComponent';
import Footer from './Componenets/COMMON/Footer/Footer';
import BrowseBookData from './Componenets/COMMON/BrowseBookData/BrowseBookData';
import AdminRequestApproval from './Componenets/ADMIN/AdminRequestApproval/AdminRequestApproval';
import Leaderboard from './Componenets/COMMON/Leaderboard/Leaderboard';
import ThankYou from './Componenets/COMMON/Checkout/ThankYou';
import Checkout from './Componenets/COMMON/Checkout/Checkout';
import DigitalLibrary from './Componenets/COMMON/DigitalLibrary/DigitalLibrary';
import LoadingAnimation from './Componenets/COMMON/LoadingAnimation/LoadingAnimation';
import BorrowedBook from './Componenets/USER/BorrowedBook/BorrowedBook';
import AddBook from './Componenets/ADMIN/AddBook/AddBook';
import DeleteBook from './Componenets/ADMIN/DeleteBook/DeleteBook';
import UpdateBook from './Componenets/ADMIN/UpdateBook/UpdateBook';

const App = () => {
  const [userRole, setUserRole] = useState('guest');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://localhost:7034/api/Book/GetDBImageDet');
        setBooks(response.data.result || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <LoadingAnimation/>;
  }

  return (
    <Router>
      <AppContent userRole={userRole} setUserRole={setUserRole} books={books} />
    </Router>
  );
};

const AppContent = ({ userRole, setUserRole, books }) => {
  // Paths where we want to hide the footer
  const hideFooterRoutes = ['/login', '/register'];
  const location = useLocation(); // Now useLocation is inside Router

  return (
    <div>
      <NavBar userRole={userRole} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/digital-library" element={<DigitalLibrary/>} />
        <Route path="/book-details/:bookId" element={<BookDetails books={books} />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm setUserRole={setUserRole} />} />
        <Route path="/submit-testimonial" element={<TestimonialForm />} />
        <Route path='/donate' element={<Donate />} />
        <Route path='/browse' element={<BrowseComponent />} />
        <Route path="/browsecomponent-detailes/:id" element={<BrowseBookData />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/leaderboard" element={<Leaderboard/>} />

        {/* Admin-specific routes */}
        {userRole === 'admin' && (
          <>
            <Route path="/admin/*" element={<AdminDashboard />}/>
            <Route path="/admin/book-management/add-books" element={<AddBook />} />
            <Route path="/admin/book-management/delete-books" element={<DeleteBook/>} />
            <Route path="/admin/book-management/update/:bookId" element={<UpdateBook/>} />
            <Route path="/admin/user-management" element={<UserManagement/>} />
            <Route path="/admin/donation" element={<AdminDonationPanel />} />
            <Route path='/admin/request-approve' element={<AdminRequestApproval/>}/>
          </>
        )}

        {/* Student-specific routes */}
        {userRole === 'student' && (
          <>
            <Route path="/user-dash" element={<UserDashboard />} />
            <Route path='/user/update-details' element={<UpdateDetails />} />
            <Route path='/user/wishlist' element={<Wishlist />} />
            <Route path ="/user-leaderboard" element={<Leaderboard/>}/>
            <Route path = "/user/borrowed-books" element={<BorrowedBook/>}/>
            <Route path ="/user/leaderboard" element={<Leaderboard/>}/>
          </>
        )}
      </Routes>
      {/* Conditionally render the footer if the current path is not in hideFooterRoutes */}
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default App;
