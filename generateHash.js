const bcrypt = require('bcrypt');

const password = 'testpass'; // Cambia esto por la contraseña que deseas hashear
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error('Error al generar el hash:', err);
    } else {
        console.log('Hash generado:', hash);
        // Aquí puedes copiar el hash para almacenarlo en tu base de datos
    }
});
