import axios from 'axios';
import {  useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAxiosSecure = () => {
  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: 'https://ph-project-12-server.vercel.app',
    });
    

    
    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('edu-token');
      console.log(token)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return instance;
  }, []); 


  // axiosSecure.interceptors.response.use(res=>{
  //   return res;
  // },error=>{
  //   console.log("inside res interceptor", error)
  // })


  return axiosSecure;
};

export default useAxiosSecure;
