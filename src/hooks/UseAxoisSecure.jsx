import axios from 'axios';
import {  useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAxiosSecure = () => {
  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: 'http://localhost:3000',
    });
    

    // Request interceptor যোগ করো
    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('edu-token');
      console.log(token)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return instance;
  }, []); // শুধু একবারই তৈরি হবে

  return axiosSecure;
};

export default useAxiosSecure;
