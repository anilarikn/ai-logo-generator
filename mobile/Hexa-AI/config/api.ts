import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});
