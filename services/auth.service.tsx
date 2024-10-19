import { jwtDecode } from 'jwt-decode';
import api from '../src/config/axiosConfig';

export const login = async (username: string, password: string) => {
    try {
        const response = await api.post('auth/login', { username, password });

        if (response.data.access_token) {
            localStorage.setItem('access_token', JSON.stringify(response.data.access_token));
            return true;
        }
    } catch (error) {
        console.error("Error", error);
        return false;
    }
};

export const register = async (username: string, password: string) => {
    return api.post('auth/register', { username, password });
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('access_token');
    return user ? jwtDecode(user) : null;
};

export const logout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
};
