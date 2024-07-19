import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/signups', data);
      localStorage.setItem('token', res.data.token); 
      console.log('Signup Successful', res.data);
      navigate('/trains/:origin/:destination');
    } catch (error) {
      console.error('Signup error:', error.response.data);
      if (error.response.data.msg === 'User already exists') {
        // Redirect to login page if user already exists
        navigate('/login');
      }
    }
  };

  return (
    <div className="d-flex justify-content-start" style={{ backgroundColor: 'black', color: 'whitesmoke' }}>
      <div className="container-fluid outer">
        <div style={{ marginTop: '11%', justifyContent: 'center', alignContent: 'center', color: 'white', fontWeight: 'bolder' }}>
          <h1>Welcome to Railways</h1>
          <p style={{ fontSize: '20px' }}>
            Log in to manage your bookings and explore travel options with ease.<br />
            Enjoy a seamless experience for all your railway needs.
          </p>
        </div>
      </div>
      <div className="inner2" style={{ justifyContent: 'center', width: '537px', padding: '10px', margin: '0' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 style={{ textAlign: 'center', marginTop: '33px', fontWeight: 'lighter' }}>Signup</h1>
          <div className="row mb-3 my-5">
            <label htmlFor="inputUsername" className="col-sm-2 col-form-label">Username</label>
            <div className="col-sm-10 mx-3">
              <input
                style={{ background: 'transparent', border: '0px',
                  color:'white', borderBottom: '2px solid white', width: '300px' }}
                type="text"
                className="form-control"
                id="inputUsername"
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>
          </div>
          <div className="row mb-3 my-5">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10 mx-3">
              <input
                style={{ background: 'transparent', 
                  color:'white', border: '0px', borderBottom: '2px solid white', width: '300px' }}
                type="email"
                className="form-control"
                id="inputEmail"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
          </div>
          <div className="row mb-3 my-5">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10 mx-3">
              <input
                style={{ background: 'transparent', border: '0px', 
                  color:'white', borderBottom: '2px solid white', width: '300px' }}
                type="password"
                className="form-control"
                id="inputPassword"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
          </div>
          <button type="submit" style={{ width: '400px', marginTop: '50px' }} className="btn btn-danger">Signup</button>
        </form>
      </div>
    </div>
  );
}
