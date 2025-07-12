// src/hooks/useAxiosPublic.js
import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: `http://localhost:3000`,  // তোমার backend URL
  // public requests এর জন্য withCredentials:false থাকতেই পারে
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
