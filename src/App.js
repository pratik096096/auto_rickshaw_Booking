
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <Header />
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
        <Route path="/booking-success" element={<BookingSuccessPage  />} />
      </Routes>
    </Router>
  );
}

export default App;
