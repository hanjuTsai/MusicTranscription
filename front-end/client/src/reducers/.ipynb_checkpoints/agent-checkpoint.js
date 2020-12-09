import axios from 'axios';

const API_ROOT = 'http://localhost:4000' + '/api';
// const API_ROOT = 'http://140.112.106.205:4000' + '/api';

const agent = axios.create({
  baseURL: API_ROOT,
  withCredentials: true,
});

export default agent;
