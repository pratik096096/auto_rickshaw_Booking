
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BookingPage = () => {
    const [currentLocation, setCurrentLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [places, setPlaces] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const selectedVehicle = params.get('vehicle');


    useEffect(() => {
        fetch('http://localhost:9090/api/places')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setPlaces(data))
            .catch(error => console.error('Error fetching places:', error));
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        navigate(`/autos?seats=${selectedVehicle}&currentLocation=${currentLocation}&destination=${destination}`);
    };

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchLocationName(latitude, longitude);
                },
                (error) => {
                    console.error('Error fetching location:', error);
                    alert('Failed to get your location.');
                },
                options
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const fetchLocationName = async (latitude, longitude) => {
        const apiKey = 'pk.44f85c7d2511f9c1521b7d998878ef60';
        const url = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.display_name) {
                setCurrentLocation(data.display_name);
            } else {
                alert('Failed to get the location name.');
            }
        } catch (error) {
            console.error('Error fetching location name:', error);
            alert('Failed to get the location name.');
        }
    };

    return (
        <div className="container">
            <h1 className="title">Book Your {selectedVehicle}-Seat Auto</h1>
            <form className="booking-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="current-location" className="form-label">Current Location:</label>
                    <div className="location-input-group">
                        <input
                            type="text"
                            id="current-location"
                            className="form-input"
                            value={currentLocation}
                            onChange={(e) => setCurrentLocation(e.target.value)}
                            required
                        />
                        <p>or</p>
                        <button type="button" className="location-button" onClick={handleGetLocation}>
                            Use Live Location
                        </button>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="destination" className="form-label">Destination:</label>
                    <select
                        id="destination"
                        className="form-input"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select your destination</option>
                        {places.map(place => (
                            <option key={place.id} value={place.name}>{place.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="form-button">Book Now</button>
            </form>
        </div>
    );
}

export default BookingPage;


