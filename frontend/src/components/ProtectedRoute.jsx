import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contextAuthContext';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#1e1f29] flex items-center justify-center">
                <div className="nimate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff79c6]"></div>
            </div>
        );
    }
    //If no active session, reroute to user login
    if (!user) {
        return <Navigate to="/login" replace/>
    }
    return children;
}