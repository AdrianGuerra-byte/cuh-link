import axios from 'axios';
import { useAuthStore } from '@/stores/useAuthStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
    (config) => {
        //Se obtiene el Token desde el Store de Zustand
        const token = useAuthStore.getState().token;
        if (token){
            //Si el token existe se añade a los Headers
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;