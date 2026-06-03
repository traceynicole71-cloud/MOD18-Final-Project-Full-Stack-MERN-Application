import { useState, useCallback } from 'react';
import API from '../context/api';

export const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //Fetch all projects owned by user
    const fetchProjects = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await API.get('/projects');
            setProjects(res.data.data);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to load projects');
        } finally {
            setLoading(false);
        }
    }, []);

    //Create new workpsace
    const createProject = async (name, description) => {
        setLoading(true);
        setError(null);
        try {
            const res = await API.post('/projects', { name, description });
            setProjects((prev) => [...prev, res.data.data]);
            return res.data.data;
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to create project');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    //Delete project workspace
    const deleteProject = async (projectId) => {
        setError(null);
        try {
            await API.delete(`/projects/${projectId}`);
            //Filter out deleted projects from dashboard
            setProjects((prev) => prev.filter((p) => p._id !== projectId));
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to delete project');
            throw error;
        }
    };

    return { projects, loading, error, fetchProjects, createProject, deleteProject };
};