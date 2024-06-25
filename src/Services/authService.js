import axios from 'axios';

const API_URL = 'http://192.168.11.109:3000';

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
