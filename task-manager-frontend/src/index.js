import React from 'react';
import ReactDOM from 'react-dom/client'; // Nota: usamos 'react-dom/client' para React 18
import App from './App';
import './index.css';

// Obtén el contenedor raíz del DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza el componente principal (App) en el contenedor raíz
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
