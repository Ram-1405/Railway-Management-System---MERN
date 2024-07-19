import axios from "axios"
 const axiosInsta=axios.create({
    baseURL:'http://localhost:5000',
});

axiosInsta.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem('token');
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);
export default axiosInsta;