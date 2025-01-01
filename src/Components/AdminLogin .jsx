
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:9090/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (!response.ok) {
                const errorData = await response.text();
                console.error('Error response from backend:', errorData); // Debugging line
                setError(errorData || 'Login failed. Please try again.');
                return;
            }
    
            const data = await response.json();
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminUsername', username);
            navigate('/admin');  
        } catch (err) {
            console.error('Network or unexpected error:', err); // Debugging line
            setError('Something went wrong. Please try again.');
        }
    };
    
    return (
        <div className="containerLogin">
            <h1 className="titleLogin">Admin Login</h1>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="form-group logingroup">
                    <label  htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <button type="button" className="register-button" onClick={() => navigate('/adminRegister')}>Register</button>
            </form>
        </div>
    );
};

export default AdminLogin;

