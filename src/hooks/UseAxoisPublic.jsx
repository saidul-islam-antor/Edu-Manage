// src/hooks/useAxiosPublic.js
import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: `https://ph-project-12-server.vercel.app`,  // তোমার backend URL
  // public requests এর জন্য withCredentials:false থাকতেই পারে
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
