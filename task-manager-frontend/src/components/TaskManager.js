import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const API_URL = 'http://localhost:5000/tasks'; // URL del backend

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null); // Para editar tareas

    // Obtener todas las tareas
    const fetchTasks = async () => {
        try {
            const response = await axios.get(API_URL);
            setTasks(response.data);
        } catch (err) {
            console.error('Error fetching tasks:', err);
        }
    };

    // Crear una nueva tarea
    const createTask = async (task) => {
        try {
            await axios.post(API_URL, task);
            fetchTasks();
        } catch (err) {
            console.error('Error creating task:', err);
        }
    };

    // Actualizar una tarea existente
    const updateTask = async (id, task) => {
        try {
            await axios.put(`${API_URL}/${id}`, task);
            fetchTasks();
        } catch (err) {
            console.error('Error updating task:', err);
        }
    };

    // Cambiar el estado de una tarea
    const toggleTaskCompletion = async (id, completed) => {
        try {
            await axios.put(`${API_URL}/${id}`, { completed });
            fetchTasks();
        } catch (err) {
            console.error('Error toggling task completion:', err);
        }
    };

    // Eliminar una tarea
    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchTasks();
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="task-manager">
            <h1>TODO List - Proyecto Final Devops 2024</h1>
            <TaskForm
                onSubmit={(task) =>
                    currentTask ? updateTask(currentTask.id, task) : createTask(task)
                }
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
            />
            <TaskList
                tasks={tasks}
                deleteTask={deleteTask}
                setCurrentTask={setCurrentTask}
                toggleTaskCompletion={toggleTaskCompletion}
            />
        </div>
    );
};

export default TaskManager;
