import axios from 'axios';

const API_URL = "http://localhost:3000/api/auth"

export const signup = async (userData) => {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
}

export const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
}

export const forgetPassword = async (userData) => {
    const response = await axios.post(`${API_URL}/forgot-password`, userData);
    return response.data;
}

export const getQuestion = async (userData) => {
    const response = await axios.post(`${API_URL}/get-question`,userData)
    return response.data;
}

export const resetPassword = async(userData) => {
    const response = await axios.post(`${API_URL}/reset-password`,userData)
    return response.data
}