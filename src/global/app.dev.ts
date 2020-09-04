import axios from 'axios';

export default async () => {
  axios.defaults.baseURL = 'http://localhost:8080';
};
