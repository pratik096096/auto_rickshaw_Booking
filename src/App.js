
import './App.css';
import { useState,useEffect,Navigate } from 'react';
import { BrowserRouter as Router, Routes, Route,useLocation  } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import BookingPage from './Components/BookingPage';
import VehicleSelection from './Components/VehicleSelection';
import AutoList from './Components/AutoList';
import ConfirmationPage from './Components/ConfirmationPage';
import AdminPage from './Components/AdminPage';
import Login from './Components/Login';
import Register from './Components/Register';
import AdminLogin from './Components/AdminLogin ';
import AdminRegister from './Components/AdminRegister ';
import BookingSuccessPage from './Components/BookingSuccessPage ';
import ViewBookings from './Components/ViewBookings';

function App() {
  const location = useLocation();

  const noHeaderPaths = ['/','/admin', '/adminLogin', '/adminRegister'];

  return (
    <>
      {!noHeaderPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/vehicles" element={<VehicleSelection />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/autos" element={<AutoList />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminRegister" element={<AdminRegister />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/booking-success" element={<BookingSuccessPage />} />
        <Route path="/viewBookings" element={<ViewBookings />} />
      </Routes>
    </>
  );
}

// Wrap App in Router to provide routing context
function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Root;
