import axios from 'axios';

const API_URL = 'https://task-final-project-backend.onrender.com'; // Adjust as necessary

export const register = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const login = (userData) => axios.post(`${API_URL}/auth/login`, userData);
export const getUserDetails = () => axios.get(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
export const updateUserDetails = (userData) => axios.put(`${API_URL}/auth/me`, userData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
export const getTasks = () => axios.get(`${API_URL}/tasks/`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
export const createTask = (taskData) => axios.post(`${API_URL}/tasks/`, taskData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
export const updateTask = (id, taskData) => axios.put(`${API_URL}/tasks/${id}`, taskData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
export const deleteTask = (id) => axios.delete(`${API_URL}/tasks/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
export const getTaskAnalytics = () => axios.get(`${API_URL}/analytics`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
export const getTaskByShareToken = (token) => axios.get(`${API_URL}/tasks/share/${token}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }); // Add this line
