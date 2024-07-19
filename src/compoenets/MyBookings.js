import React, { useState, useEffect } from 'react';
import axios from './axiosInsta';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`/bookings?page=${page}&limit=1`);

      if (response.data.length === 0) {
        setHasMore(false);
        if (bookings.length === 0) {
          setError('No Bookings Yet!');
        }
        return;
      }

      if (response.data.length < 1) {
        setHasMore(false);
      }
      if(response.data.length>=bookings.length){
        setHasMore(false);
      }
      setBookings(prevBookings => [...prevBookings, ...response.data]);
      setPage(prevPage => prevPage + 1);
      setError(null);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('User not authenticated');
      } else {
        alert('Error in retrieving bookings');
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const rem = async (index, Booking_Id) => {
    try {
      const response = await axios.delete(`/bookings/${Booking_Id}`);
      if (response.status === 200) {
        const updatedBookings = [...bookings];
        updatedBookings.splice(index, 1);
        setBookings(updatedBookings);
        alert(response.data.msg);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('User not authenticated');
      } else if (err.response && err.response.status === 500) {
        alert('Internal Server Error');
      } else {
        alert("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <>
      <div className='container-fluid imgdiv'>
        {error && <p>{error}</p>}

        <h1 style={{color:'white',textAlign:'center'}}>My Bookings</h1>
        <div
          id="scrollableDiv"
          style={{
            height: '90%', 
            width:'100%',
            overflow: 'auto', 
            padding: '20px'
          }}
        >
          
          <InfiniteScroll
            dataLength={bookings.length}
            next={fetchBookings}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p style={{ textAlign: 'center',color:'black',
              fontFamily:'serif',fontSize:'20px',fontWeight:'bolder'
             }}>You have seen all bookings</p>}
            scrollableTarget="scrollableDiv" // Specify the ID of the scrollable container
          >
            {bookings.length > 0 && bookings.map((booking, index) => (
              <div className="inner" key={index}>
                <div style={{ width: '500px', height: '250px', marginTop: '2%', fontWeight: 'bolder', borderRadius: '20px', marginLeft: '29%', padding: '30px', backgroundColor: 'white', opacity: '0.8' }}>
                  {booking.trainId && (
                    <>
                      <div className="d-flex justify-content-between">
                        <p>Train Number: {booking.trainId.trainNumber}</p>
                        <p>Train Name: {booking.trainId.name}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>Number of Seats: {booking.seatsBooked}</p>
                        <p>Status: Confirmed</p>
                      </div>
                      <p>Booking_ID: {booking._id}</p>
                      <div className="d-flex justify-content-between">
                        <p>Total Price: {booking.trainId.price * booking.seatsBooked}</p>
                        <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                      </div>
                      <button onClick={() => rem(index, booking._id)} className="btn btn-primary" style={{ marginLeft: "182px", width: '80px' }}>Delete</button>
                    </>
                  )}
                  {!booking.trainId && <p>Invalid booking data</p>}
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}
