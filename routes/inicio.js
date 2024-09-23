const express = require('express');
const router = express.Router();

// Middleware para verificar la sesión
const verificarSesion = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/');
    }
    next();
};

// Ruta protegida
router.get('/', verificarSesion, (req, res) => {
    res.send('<h1>Hola, Mundo!</h1>');
});

module.exports = router;
