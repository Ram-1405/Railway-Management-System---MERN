import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/login', data);
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token); 
      navigate('/trains/:origin/:destination');
    } catch (error) {
      console.error('Login error:', error.response.data);
      navigate('/signups');
    }
  };

  return (  
    <div className="d-flex justify-content-start" style={{backgroundColor:'black',color:'whitesmoke'}}>
      <div className="container-fluid outer">
        <div style={{marginTop:'11%',justifyContent:'center',alignContent:'center',color:'white',fontWeight:'bolder'}}>
        <h1>Welcome to Railways</h1>
        <p style={{fontSize:'20px'}}>Log in to manage your bookings and explore travel options with ease.<br/>
        Enjoy a seamless experience for all your railway needs.</p>
        </div>
      </div>
      <div className='inner2' style={{justifyContent:'center',width:'537px',padding:'10px',
      margin:'0px 0px 0px 0px'
       }}>
        <form onSubmit={handleSubmit(onSubmit)}>
       <h1 style={{textAlign:'center',marginTop:'70px',fontWeight:'lighter'}}>Login</h1>
      <div className="row mb-3 my-5">
        <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email: </label>
        <div className="col-sm-10 mx-3">
          <input style={{background:'transparent',border:'0px',
          color:'white',borderBottom:'2px solid white', width:'300px'}}
            type="email"
            className="form-control"
            id="inputEmail"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
      </div>
      <div className="row mb-3 my-5">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password: </label>
        <div className="col-sm-10 mx-3">
          <input style={{background:'transparent',border:'0px',
          color:'white',borderBottom:'2px solid white', width:'300px'}}
            type="password"
            className="form-control"
            id="inputPassword"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
      </div>
      <button type="submit" style={{width:'400px',marginTop:'50px'}} className="btn btn-danger">Login</button>
      </form>
      </div>
    
    </div>
    
  );
};

export default LoginForm;
