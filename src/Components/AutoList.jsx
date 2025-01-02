import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AutoList = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    
    const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const selectedSeats = params.get('seats');
    const currentLocation = params.get('currentLocation');
    const destination = params.get('destination');

    useEffect(() => {
        fetch('http://localhost:9090/api/drivers')
            .then(response => response.json())
            .then(data => {
                const filteredDrivers = data.filter(driver => driver.autoType === `${selectedSeats}-seat`);
                setDrivers(filteredDrivers);
            })
            .catch(error => console.error('Error fetching drivers:', error))
            .finally(() => setLoading(false));
    }, [selectedSeats]);

    const handleSelectDriver = (driver) => {
        navigate('/confirmation', {
            state: {
                auto: driver,
                currentLocation: currentLocation,
                destination: destination
            }
        });
    };

    if (loading) {
        return <div>Loading drivers...</div>;
    }

    return (
        <div className="auto-list">
            {drivers.length === 0 ? (
                <p>No drivers available for {selectedSeats}-seat vehicles</p>
            ) : (
                drivers.map(driver => (
                    <div key={driver.id} className="auto-card">
                        <h3>{driver.name}</h3>
                        <p>Vehicle Number: {driver.vehicleNumber}</p>
                        <p>Auto Type: {driver.autoType}</p>
                        <p>Available: {driver.available ? 'Yes' : 'No'}</p>
                        <p>Driver Email: {driver.email}</p>
                        <button
                            onClick={() => handleSelectDriver(driver)}
                            className="confirmation-link"
                            disabled={!driver.available} // Disable button if not available
                        >
                            Select Driver
                        </button>
                    </div>
                ))
            )}
        </div>
    );
    
}

export default AutoList;
