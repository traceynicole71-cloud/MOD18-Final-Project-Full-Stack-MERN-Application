import axios from 'axios';
//Create reusable API instance using Vite config
const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

//Request interceptor
API.interceptors.request.use(
    (config) => {
        const storedUser = localStorage.getItem('user');
//Look for stored user
        if (storedUser) {
            const { token } = JSON.parse(storedUser);
//If token exists, attach it to bearer
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;
