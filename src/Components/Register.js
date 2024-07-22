import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ setShowLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:9090/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                setError(errorData);
                return;
            }

            navigate('/');
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="containerRegister">
            <h1 className="titleRegister">Register</h1>
            <form className="register-form" onSubmit={handleRegister}>
                <div className="form-group register-form">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group register-form">
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
                <button type="submit">Register</button>
                <button type="button" onClick={() => navigate('/')}>Back to Login</button>
            </form>
        </div>
    );
};

export default Register;
