import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Booking.css'; // Import the CSS for styling

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [bikeType, setBikeType] = useState('');
  const [bookingName, setBookingName] = useState('');
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const response = await axios.get('https://t0sfwfs40c.execute-api.ap-south-1.amazonaws.com/prodb1/booking');
      setBookings(response.data);
    } catch (error) {
      console.error(error);
      setMessage('Failed to fetch bookings');
    }
  };

  // Create a new booking
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const data = { bikeType, bookingName };
    try {
      if (editMode) {
        // Update existing booking
        await axios.put(`https://t0sfwfs40c.execute-api.ap-south-1.amazonaws.com/prodb1/booking/${currentBookingId}`, 
        data, { // Pass the data first
          headers: {
            'Content-Type': 'application/json',
          }
        });
        setMessage('Booking updated successfully!');
      } else {
        // Create a new booking
        await axios.post('https://t0sfwfs40c.execute-api.ap-south-1.amazonaws.com/prodb1/booking',
        data, { // Pass the data first
          headers: {
            'Content-Type': 'application/json',
          }
        });
        setMessage('Booking successful! Email confirmation sent.');
      }
      resetForm();
      fetchBookings();
    } catch (error) {
      console.error(error);
      setMessage('Error occurred while booking.');
    }
  };

  // Edit booking
  const handleEdit = (booking) => {
    setEditMode(true);
    setCurrentBookingId(booking.id);
    setBikeType(booking.bikeType);
    setBookingName(booking.bookingName);
  };

  // Delete booking
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://t0sfwfs40c.execute-api.ap-south-1.amazonaws.com/prodb1/booking/${id}`);
      setMessage('Booking deleted successfully!');
      fetchBookings();
    } catch (error) {
      console.error(error);
      setMessage('Failed to delete booking.');
    }
  };

  // Reset form
  const resetForm = () => {
    setBikeType('');
    setBookingName('');
    setEditMode(false);
    setCurrentBookingId(null);
  };

  return (
    <div className="booking-container">
      <h1>Book Your Ride</h1>
      <form onSubmit={handleBookingSubmit} className="booking-form">
        <div className="input-group">
          <label>Your Name</label>
          <input
            type="text"
            value={bookingName}
            onChange={(e) => setBookingName(e.target.value)}
            required
            placeholder="Enter your name"
          />
        </div>
        <div className="input-group">
          <label>Bike Type</label>
          <select value={bikeType} onChange={(e) => setBikeType(e.target.value)} required>
            <option value="">Select a bike</option>
            <option value="Mountain Bike">Mountain Bike</option>
            <option value="Road Bike">Road Bike</option>
            <option value="Hybrid Bike">Hybrid Bike</option>
            <option value="Electric Bike">Electric Bike</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          {editMode ? 'Update Booking' : 'Book Now'}
        </button>
      </form>
      {message && <p className="message">{message}</p>}

      <div className="booking-list">
        <h2>Your Bookings</h2>
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <span>{booking.bookingName} - {booking.bikeType}</span>
              <button className="edit-button" onClick={() => handleEdit(booking)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(booking.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookingPage;
