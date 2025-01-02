import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookingSuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>Booking Confirmed Successfully!</h1>
            <button onClick={() => navigate('/home')} className="form-button">
                Home
            </button>
            <button
                onClick={() => navigate('/viewBookings')}
                className="form-button"
                style={{ marginLeft: '20px' }}
            >
                View Bookings
            </button>
        </div>
    );
};

export default BookingSuccessPage;
