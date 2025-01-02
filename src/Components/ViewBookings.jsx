import React, { useEffect, useState } from 'react';

const ViewBookings = () => {
    const [bookings, setBookings] = useState([]);
    const userEmail = localStorage.getItem('userMail'); 

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch(`http://localhost:9090/api/bookings/user?userEmail=${userEmail}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchBookings();
    }, [userEmail]);

    if (bookings.length === 0) {
        return <p>No bookings found!</p>;
    }

    return (
        <div className="container viewCont">
            <h1 className='viewH1'>Your Bookings</h1>
            {bookings.map((booking) => (
                <div key={booking.id} className="booking-cardView">
                    <h2>{booking.autoName}</h2>
                    <p className='viewP'>Vehicle Number: {booking.vehicleNumber}</p>
                    <p className='viewP'>From: {booking.currentLocation}</p>
                    <p className='viewP'>To: {booking.destination}</p>
                </div>
            ))}
        </div>
    );
};
export default ViewBookings;
