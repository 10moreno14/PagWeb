const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Configura tu conexión a la base de datos
const connection = mysql.createConnection({
    host: 'database-1.c7wm4i42u5kj.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'Octubre14.',
    database: 'users'
});

// Ruta para iniciar sesión
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
        if (error) {
            console.error('Error al consultar la base de datos:', error);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const storedHash = results[0].password;
        bcrypt.compare(password, storedHash, (err, result) => {
            if (result) {
                // Iniciar sesión
                req.session.user = results[0];
                return res.json({ success: true });
            } else {
                return res.status(401).json({ error: 'Error en inicio de sesión' });
            }
        });
    });
});

module.exports = router;
