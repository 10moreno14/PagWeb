const express = require('express');
const router = express.Router();

// Ruta para la página de inicio (protegida)
router.get('/', (req, res) => {
    // Asegúrate de que el usuario esté autenticado
    if (req.session.user) {
        // Si está autenticado, muestra la página de inicio
        res.sendFile(path.join(__dirname, '../public/hola.html')); // Asegúrate de que la ruta es correcta
    } else {
        // Si no está autenticado, redirige a la página de inicio de sesión
        res.redirect('/');
    }
});

module.exports = router;
