import axios from 'axios';

const api = axios.create({
  baseURL: 'https://68006cfab72e9cfaf7277b8a.mockapi.io/student',
});

export default api;
