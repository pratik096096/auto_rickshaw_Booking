import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:9090/api/auth/login', {
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

            const data = await response.json();
            localStorage.setItem('token', data.token);
            navigate('/home');
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="containerLogin">
            <h1 className="titleLogin">Login</h1>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="form-group logingroup">
                    <label className='loginLabel' htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group logingroup">
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
                <button type="submit" className="loginform-button">Login</button>
            </form>
            <button onClick={() => navigate('/register')} className="register-button">
                Register
            </button>
        </div>
    );
};

export default Login;
