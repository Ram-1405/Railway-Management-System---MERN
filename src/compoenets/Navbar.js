import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">Railways</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signups">Signup</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/trains/:origin/:destination">Find Trains</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/bookings">My Booking</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> 
    </>
  );
}
