const nodemailer = require('nodemailer');

// Configura el transportador
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Puedes usar otros servicios
    auth: {
        user: 'tu_email@gmail.com',
        pass: 'tu_contraseña'
    }
});

router.post('/recuperar', async (req, res) => {
    const { email } = req.body;

    // Verificar que el correo exista en la base de datos

    // Generar un enlace único para la recuperación
    const enlaceRecuperacion = `http://tu-sitio.com/resetear?email=${email}`;

    // Enviar el correo
    const mailOptions = {
        from: 'tu_email@gmail.com',
        to: email,
        subject: 'Recuperación de Contraseña',
        text: `Haz clic en el siguiente enlace para recuperar tu contraseña: ${enlaceRecuperacion}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error al enviar el correo.' });
        }
        res.status(200).json({ message: 'Se ha enviado un enlace de recuperación al correo electrónico.' });
    });
});
