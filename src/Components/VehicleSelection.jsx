import React from 'react';
import { useNavigate } from 'react-router-dom';

const vehicles = [
    { id: 1, name: '3-Seat Auto Rickshaw', seats: 3, image: '/images/auto1.jpg' },
    { id: 2, name: '6-Seat Mini Van', seats: 6, image: '/images/auto2.jpg' },
];

const VehicleSelection = () => {
    const navigate = useNavigate();

    const handleVehicleSelect = (vehicle) => {
        navigate(`/booking?vehicle=${vehicle.seats}`);
    };

    return (
        <div className="containerVehicle">
            <h1 className="titleVechicle">Select Your Vehicle</h1>
            <div className="vehicle-list">
                {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="vehicle-card" onClick={() => handleVehicleSelect(vehicle)}>
                        <img src={vehicle.image} alt={vehicle.name} className="vehicle-image" />
                        <h2 className="vehicle-name">{vehicle.name}</h2>
                        <p className="vehicle-seats">Seats: {vehicle.seats}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VehicleSelection;


