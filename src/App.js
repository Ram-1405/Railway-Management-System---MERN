import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './compoenets/LoginPage';
import SignupForm from './compoenets/Signup';
import Navbar from './compoenets/Navbar';
import FindTrains from './compoenets/FindTrains';
import MyBookings from './compoenets/MyBookings';


const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signups" element={<SignupForm />} />
        <Route path='/trains/:origin/:destination' element={<FindTrains/>}/>
        <Route path='/bookings' element={<MyBookings/>}/>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
