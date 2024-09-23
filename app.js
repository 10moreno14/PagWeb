const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurar middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieSession({
    name: 'session',
    keys: ['tu_clave_secreta']
}));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'database-1.c7wm4i42u5kj.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'Octubre14.',
    database: 'users'
});

// Rutas
app.use('/api', require('./routes/api'));
app.use('/inicio', require('./routes/inicio'));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://3.144.5.104:${PORT}`);
});
