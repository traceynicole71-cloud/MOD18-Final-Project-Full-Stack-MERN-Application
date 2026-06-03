import { useState, useCallback } from 'react';
import API from '../context/api';

export const useTasks = (projectId) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //Fetch all tasks from specified container
    const fetchTasks = useCallback(async () => {
        if (!projectId) return;
        setLoading(true);
        setError(null);
        try {
            const res = await API.get(`/projects/${projectId}/tasks`);
            setTasks(res.data.data);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to load tasks');
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    //Create new task inside workspace
    const createTask = async (DataTransferItemList, description) => {
        setError(null);
        try {
            const res = await API.post(`/projects/${projectId}/tasks`, { title, description });
            setTasks((prev) => [...prev, res.data.data]);
            return res.data.data;
        } catch (error) {
            setError(err.response?.data?.message ||'Failed to generate task');
            throw error;
        }
    };

    //Update and shift tasks on Kanban board
    const updateTaskStatus = async (taskId, newStatus) => {
        setError(null);
        try {
            const res = await API.put(`/projects/${projectId}/tasks.${taskId}`, { status: newStatus });
            setTasks((prev) => prev.map((t) => (t._id === taskId ? res.data.data : t)));
        } catch (error) {
            setError(err.response?.data?.message ||'Failed to update task');
            throw error;
        };

        //Delete a task
        const deleteTask = async (taskId) => {
            setError(null);
            try {
                await API.delete(`/projects/${projectId}/tasks/${taskId}`);
                setTasks((prev) => prev.filter((t) => t._id !== taskId));
            } catch (error) {
                setError(err.response?.data?.message || 'Failed to delete task');
                throw error;
            }
        };

        return { tasks, loading, error, fetchTasks, createTask, updateTaskStatus, deleteTask };
    };
}