import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    rating: 0,
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const ratingChanged = (newRating) => {
    setFormData({
      ...formData,
      rating: newRating,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('https://localhost:7034/api/Testimonial/AddTestimonial', {
        userId: localStorage.getItem('userId'),
        name: formData.name,
        content: formData.content,
        rating: formData.rating,
      });

      if (response.status === 200) {
        setSuccess('Testimonial added successfully');
        setFormData({ name: '', content: '', rating: 0 });

        // Redirect to home after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (err) {
      setError('Failed to add testimonial');
    }
  };

  return (
    <div className="testimonial-form-container">
      {/* Success message at the top */}
      {success && <Alert variant="success" className="mt-3 text-center">{success}</Alert>}
      
      <Form onSubmit={handleSubmit} className="p-4">
        <Form.Group controlId="name">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </Form.Group>

        <Form.Group controlId="content" className="mt-3">
          <Form.Label>Your Testimonial</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            rows={3}
            value={formData.content}
            onChange={handleChange}
            required
            placeholder="Write your experience"
          />
        </Form.Group>

        <Form.Group controlId="rating" className="mt-3">
          <Form.Label>Rating</Form.Label>
          <ReactStars
            count={5}
            value={formData.rating}
            onChange={ratingChanged}
            size={30}
            activeColor="#ffd700"
          />
        </Form.Group>

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

        <Button type="submit" variant="primary" className="mt-4">Submit</Button>
      </Form>
    </div>
  );
};

export default TestimonialForm;
