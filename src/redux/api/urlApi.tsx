// instance axios + baseURL
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
// import { LocalStorageUtil } from '../utils/localStorage/localStorage';

export const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com/',
});

// axiosInstance.interceptors.request.use((config) => {
//   const newConfig = { ...config };
//   newConfig.headers.Authorization = LocalStorageUtil.getItem('token');
//   return config;
// });


