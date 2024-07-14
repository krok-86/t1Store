import axios from 'axios';

export const BASE_URL = 'https://dummyjson.com/';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});



