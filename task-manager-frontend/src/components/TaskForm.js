import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, currentTask, setCurrentTask }) => {
    const [task, setTask] = useState({ title: '', description: '', completed: false });

    useEffect(() => {
        if (currentTask) {
            setTask(currentTask);
        } else {
            setTask({ title: '', description: '', completed: false });
        }
    }, [currentTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(task);
        setTask({ title: '', description: '', completed: false });
        setCurrentTask(null); // Resetear el formulario
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Título"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Descripción"
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                required
            />
            <button type="submit">{currentTask ? 'Actualizar' : 'Crear'}</button>
        </form>
    );
};

export default TaskForm;
