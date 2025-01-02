import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [city, setCity] = useState('');
    const navigate = useNavigate();

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleStartBooking = () => {
        navigate('/vehicles');
    };

    

    return (
        <div className="container">
            <h1 className="title">Welcome to Auto Rickshaw Booking</h1>
            <p className="description">Book an auto rickshaw easily and get picked up from anywhere.</p>
            <div className="city-selector">
                <label htmlFor="city">Select Your City:</label>
                <select id="city" value={city} onChange={handleCityChange}>
                    <option value="">Select a city</option>
                    <option value="Belagavi">Belagavi</option>
                    
                </select>
                <button className="start-button" onClick={handleStartBooking}>Start Booking</button> <br /><br />
                <button onClick={()=>navigate('/viewBookings')}>View Bookings</button>
                
            </div>
        </div>
    );
};

export default Home;
