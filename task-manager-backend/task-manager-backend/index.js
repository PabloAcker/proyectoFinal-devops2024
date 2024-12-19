const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Configura la conexión a PostgreSQL
const pool = new Pool({
    user: 'postgres', // Cambia esto por tu usuario de PostgreSQL
    host: 'localhost',
    database: 'taskmanager',
    password: 'admin123', // Cambia esto por tu contraseña
    port: 5432,
});

// CRUD Routes

// Obtener todas las tareas
app.get('/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener las tareas');
    }
});

// Crear una nueva tarea
app.post('/tasks', async (req, res) => {
    const { title, description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
            [title, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al crear la tarea');
    }
});

// Actualizar una tarea
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const result = await pool.query(
            'UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *',
            [title, description, completed, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar la tarea');
    }
});

// Eliminar una tarea
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar la tarea');
    }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));

app.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Tarea no encontrada');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener la tarea');
    }
});

app.get('/tasks/completed', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks WHERE completed = true');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener tareas completadas');
    }
});

app.get('/tasks/pending', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks WHERE completed = false');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener tareas pendientes');
    }
});

app.get('/tasks/count', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM tasks');
        res.json({ totalTasks: result.rows[0].count });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al contar las tareas');
    }
});

app.get('/tasks/search/:title', async (req, res) => {
    const { title } = req.params;
    try {
        const result = await pool.query('SELECT * FROM tasks WHERE title ILIKE $1', [`%${title}%`]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al buscar tareas por título');
    }
});

