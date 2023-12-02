import axios from 'axios';
import Auth from './auth';

const api = axios.create({
    baseURL: 'https://random-data-api.com/api/v2/',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token') != null ? localStorage.getItem('token') : sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const access_token = await Auth.RefreshAccessToken();
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        return api(originalRequest);
    }
    return Promise.reject(error);
});

export default api;