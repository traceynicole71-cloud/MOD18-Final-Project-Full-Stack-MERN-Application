import { createContext, useState, useEffect } from 'react';
import API from './api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Synchronize mounting state with browser storage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Session token parsing error:', error);
                localStorage.removeItem('user'); //Clear corrupted storage object
            }
        }
        setLoading(false);
    }, []);

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
            throw new Error(fallbackError);
        } finally {
            setLoading(false);
        }
    };

    //Centralized registration handler
    const register = async (name, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await API.post('/users.register', { name, email, password });

            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            return response.data;
        } catch (error) {
            const fallbackError = error.response?.data?.message || 'Registration failed';
            setError(fallbackError);
        } finally {
            setLoading(false);
        }
    };

    //Centralized logout handler
    const logout = () => {
        localStorage.removedItem('user');
        setUser(null);
        setError(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout, setError }}>
            {children}
        </AuthContext.Provider>
    );
};