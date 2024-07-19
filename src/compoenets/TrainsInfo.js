import React, { useState, useEffect } from 'react';
import axios from './axiosInsta';

export default function TrainsInfo(props) {
    const [seats, setSeats] = useState('1');
    const [totalPrice, setTotalPrice] = useState(props.basePrice);

    useEffect(() => {
        setTotalPrice(props.basePrice * seats);
    }, [seats, props.basePrice]);

    const book = async () => {
        const confirmBooking = window.confirm(`Do you want to confirm booking for ${seats} seat(s) at a total price of ${totalPrice}?`);
        if (confirmBooking) {
            try {
                const response = await axios.put('/newbooking', {
                    trainNumber: props.trainNumber,
                    seatsBooked: seats
                });
                alert('Booking confirmed');
                setSeats('1');
                props.setSearch(true);
            } catch (err) {
                if (err.response) {
                    if (err.response.status === 500) {
                        alert('Server error. Please try again.');
                    } else if (err.response.status === 400) {
                        alert('Bad request. Please check the booking details.');
                    } else {
                        alert(`Error: ${err.response.status}. Please try again.`);
                    }
                } else {
                    alert('Network error. Please check your internet connection.');
                }
            }
        }
    };

    return (
        <div className='container' style={{ width: '500px', height: '285px', 
        marginTop: '2%', fontWeight: 'bolder', borderRadius: '20px', marginLeft: '29%',zIndex:'2', 
        padding: '30px', backgroundColor: 'white', opacity: '0.8' }}>
            <div className="d-flex justify-content-between">
                <p>TrainName: {props.name}</p>
                <p>TrainNumber: {props.trainNumber}</p>
            </div>
            <div className="d-flex justify-content-between">
                <p>Origin: {props.origin}</p>
                <p>Destination: {props.destination}</p>
            </div>
            
            <div className="d-flex justify-content-between">
                <p>DepartureTime: {props.departureTime}</p>
                <p>ArrivalTime:{props.arrivalTime}</p>
                </div>
                <p>ArrivalDate:{props.arrivalDate}</p>
                <div className="d-flex justify-content-between">
                <p>Price:{totalPrice}</p>
                <label style={{ marginLeft: '248px' }}>Seats:</label>
                <input
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                    type='number'
                    min='1'
                    style={{ width: '50px', height: '20px' }}
                />
            </div>
            <button onClick={book} className="btn btn-primary" style={{ marginLeft: "175px", width: '80px' }}>Book</button>
        </div>
    );
}
