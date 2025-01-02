import React, { useState, useEffect } from 'react';

const DriverConfirmedData = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    // Get the logged-in driver's name from localStorage or from the logged-in user context
    const autoName = localStorage.getItem('adminUsername'); // Example, could also be from JWT or context
    

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                 
                 const token = localStorage.getItem('adminToken');
                const response = await fetch(`http://localhost:9090/api/bookings/driver?autoName=${autoName}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Add Authorization header
                    },
                });

                if (!response.ok) {
                    const errorData = await response.text();
                    throw new Error(`Failed to fetch bookings: ${errorData}`);
                }

                const data = await response.json();
                setBookings(data);
                setError(''); // Clear any previous error
            } catch (err) {
                setBookings([]); // Clear bookings in case of an error
                setError(err.message); // Set error message
            }
        };

        fetchBookings();
    }, [autoName]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container dataCont">
            <h1 className='dataH1'>Your Bookings</h1>
            {bookings.length === 0 ? (
                <p>No bookings found for you.</p>
            ) : (
                bookings.map((booking) => (
                    <div key={booking.id} className="booking-card dataCard">
                        <h2 className='dataH2'>{booking.autoName}</h2>
                        <p className='dataP'>Vehicle Number: {booking.vehicleNumber}</p>
                        <p className='dataP'>From: {booking.currentLocation}</p>
                        <p className='dataP'>To: {booking.destination}</p>
                        <p className='dataP'>User Email: {booking.userEmail}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default DriverConfirmedData;
