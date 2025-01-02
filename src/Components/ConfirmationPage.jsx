import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { auto, currentLocation, destination } = location.state || {};

    const [userEmail, setUserEmail] = useState('');

    

    useEffect(()=>{
        const loggedInEmail = localStorage.getItem('userMail');
        setUserEmail(loggedInEmail);
    },[]);

    const handleConfirmBooking = async (e) => {
        e.preventDefault();

        const bookingDetails = {
            autoId: auto.id,
            autoName: auto.name,
            vehicleNumber: auto.vehicleNumber,
            autoType: auto.autoType,
            available: auto.available,
            driverEmail: auto.email,
            driverId: auto.driverId,
            currentLocation,
            destination,
            userEmail: userEmail, // User's email
        };

        try {
            const response = await fetch('http://localhost:9090/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingDetails),
            });

            if (!response.ok) {
                const errorData = await response.text();
                alert('Error confirming booking: ' + errorData);
                return;
            }

            setUserEmail('');
            navigate('/booking-success');
        } catch (err) {
            alert('Something went wrong. Please try again.');
        }
    };

    if (!auto || !currentLocation || !destination) {
        return <div>Missing booking details!</div>;
    }

    return (
        <div className="containerConfirmation">
            <h1 className="title">Confirm Your Booking</h1>
            <div className="auto-details">
                <h2>{auto.name}</h2>
                <p>Vehicle Number: {auto.vehicleNumber}</p>
                <p>Auto Type: {auto.autoType}</p>
                <p>Available: {auto.available ? 'Yes' : 'No'}</p>
                <p>Driver Email: {auto.email}</p>
                <p>From: {currentLocation}</p>
                <p>To: {destination}</p>
            </div>
            <form className="confirmation-form" onSubmit={handleConfirmBooking}>
                <div className="form-group">
                    <label htmlFor="user-email" className="form-label">Your Email:</label>
                    <input
                        type="email"
                        id="user-email"
                        className="form-input"
                        value={userEmail}
                        readOnly
                    />
                </div>
                <button type="submit" className="form-button">Confirm Booking</button>
            </form>
        </div>
    );
};

export default ConfirmationPage;
