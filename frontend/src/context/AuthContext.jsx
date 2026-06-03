import { useState } from 'react';
import API from './api';
import { AuthContext } from './authContext';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            return null;
        }

        try {
            return JSON.parse(storedUser);
        } catch {
            localStorage.removeItem('user');
            return null;
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //Centralized login handler using API network
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await API.post('/users/login', { email, password });

            //Save user data with JWT payload
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            return response.data; //Return data back for successful navigation loop
        } catch (error) {
            const fallbackError = error.response?.data?.message || 'Authentication failed';
            setError(fallbackError);
            throw new Error(fallbackError, { cause: error });
        } finally {
            setLoading(false);
        }
    };

    //Centralized registration handler
    const register = async (name, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await API.post('/users/register', { name, email, password });

            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            return response.data;
        } catch (error) {
            const fallbackError = error.response?.data?.message || 'Registration failed';
            setError(fallbackError);
            throw new Error(fallbackError, { cause: error });
        } finally {
            setLoading(false);
        }
    };

    //Centralized logout handler
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setError(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout, setError }}>
            {children}
        </AuthContext.Provider>
    );
};