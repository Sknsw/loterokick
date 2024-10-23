const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/tulotero', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: String,
    email: { type: String, unique: true },
    password: String,
});

module.exports = mongoose.model('User', userSchema);
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    const { nombre, email, password } = req.body;
    const newUser = new User({ nombre, email, password });
    
    try {
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado con éxito.' });
    } catch (error) {
        res.status(400).json({ message: 'Error al registrar el usuario.' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: 'Credenciales inválidas.' });
    }
    
    res.status(200).json({ success: true });
});

module.exports = router;
