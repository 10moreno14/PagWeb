const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');

// Configura tu conexión a la base de datos
const connection = mysql.createConnection({
    host: 'database-1.c7wm4i42u5kj.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'Octubre14.',
    database: 'users'
});

// Middleware para sesiones
router.use(session({
    secret: 'tu_secreto_aqui',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambia a true si usas HTTPS
}));

// Ruta para iniciar sesión
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Intento de login con usuario:', username);

    connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
        if (error) {
            console.error('Error al consultar la base de datos:', error);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (results.length === 0) {
            console.log('Usuario no encontrado:', username);
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const storedHash = results[0].password;
        console.log('Hash almacenado en la BD:', storedHash);

        bcrypt.compare(password, storedHash, (err, result) => {
            if (err) {
                console.error('Error en bcrypt:', err);
                return res.status(500).json({ error: 'Error del servidor' });
            }
            console.log('Resultado de comparación bcrypt:', result);

            if (result) {
                req.session.user = results[0];
                console.log('Login exitoso para usuario:', username);
                return res.redirect('/hola.html'); // Redirige a la página "Hola Mundo"
            } else {
                console.log('Contraseña incorrecta para usuario:', username);
                return res.status(401).json({ error: 'Error en inicio de sesión' });
            }
        });
    });
});

module.exports = router;
