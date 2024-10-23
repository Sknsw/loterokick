router.post('/recuperar', async (req, res) => {
    const { email } = req.body;
    
    // Aquí iría la lógica para verificar el email y enviar el enlace de recuperación.
    // Para la demostración, solo enviaremos un mensaje exitoso.
    
    res.status(200).json({ message: 'Se ha enviado un enlace de recuperación al correo electrónico.' });
});
