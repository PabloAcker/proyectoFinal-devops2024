import React from 'react';
import './TaskList.css'; // Archivo de estilos específico para TaskList

const TaskList = ({ tasks, deleteTask, setCurrentTask, toggleTaskCompletion }) => {
    return (
        <div className="task-list">
            <h2>Lista de Tareas</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        <h3 onClick={() => toggleTaskCompletion(task.id, !task.completed)}>
                            {task.title}
                        </h3>
                        <p>{task.description}</p>
                        <div className="task-actions">
                            <button onClick={() => setCurrentTask(task)} className="edit-btn">
                                ✏️
                            </button>
                            <button onClick={() => deleteTask(task.id)} className="delete-btn">
                                🗑️
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
