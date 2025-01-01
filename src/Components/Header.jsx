import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    return (
        <nav className="nav">
            <h1 className="nav-title" onClick={() => navigate('/home')}>Auto Rickshaw Booking</h1>
            <div>
                
                <p className="nav-link" onClick={() => navigate('/home')}>Home</p>
                <p className="nav-link" onClick={() => navigate('/')}>Logout</p>
                
            </div>
        </nav>
    );
}

export default Header;
