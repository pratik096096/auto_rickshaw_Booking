import React, { useState } from 'react';

const AdminPage = () => {
    const [name, setName] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [autoType, setAutoType] = useState('');
    const [availability, setAvailability] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const driverData = {
            name,
            vehicleNumber,
            autoType,
            available: availability,
            email, 
        };

        fetch('http://localhost:9090/api/drivers/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(driverData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Driver registered:', data);

                
                setName('');
                setVehicleNumber('');
                setAutoType('');
                setAvailability(false);
                setEmail('');
            })
            .catch(error => {
                console.error('Error registering driver:', error);
            });
    };

    return (
        <div className="containerAdmin">
            <h1 className="titleAdmin">Admin Page</h1>
            <p className="descriptionAdmin">Auto drivers can register here and manage their slots.</p>
            <form className="admin-form" onSubmit={handleSubmit}>
                <div className="form-group Adminform">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group Adminform">
                    <label htmlFor="vehicle-number">Vehicle Number:</label>
                    <input
                        type="text"
                        id="vehicle-number"
                        value={vehicleNumber}
                        onChange={(e) => setVehicleNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group Adminform">
                    <label htmlFor="auto-type">Auto Type:</label>
                    <select
                        id="auto-type"
                        value={autoType}
                        onChange={(e) => setAutoType(e.target.value)}
                        required
                    >
                        <option value="">Select Auto Type</option>
                        <option value="3-seat">3-Seat</option>
                        <option value="6-seat">6-Seat</option>
                    </select>
                </div>
                <div className="form-group Adminform">
                    <label htmlFor="availability">
                        <input
                            type="checkbox"
                            id="availability"
                            checked={availability}
                            onChange={(e) => setAvailability(e.target.checked)}
                        />
                        {' '} Available Now
                    </label>
                </div>
                <div className="form-group Adminform">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="form-button AdminButton">Submit</button>
            </form>
        </div>
    );
};

export default AdminPage;
