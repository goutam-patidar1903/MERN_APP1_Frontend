import axios from 'axios';

const API = axios.create({
    baseURL:"https://mern-app-1-backend-alpha.vercel.app"
});

export default API;