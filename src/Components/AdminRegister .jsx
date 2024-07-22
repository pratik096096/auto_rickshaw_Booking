import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:9090/api/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                setError(errorData);
                return;
            }

            
            navigate('/adminLogin');
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="containerRegister">
            <h1 className="titleRegister">Admin Register</h1>
            <form className="register-form" onSubmit={handleRegister}>
                <div className="form-group registergroup">
                    <label className='registerLabel' htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group registergroup">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="registerform-button">Register</button>
            </form>
        </div>
    );
};

export default AdminRegister;
