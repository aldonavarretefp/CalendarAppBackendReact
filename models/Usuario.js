const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'MONGOOSE: El nombre es obligatorio.']
    },
    email: {
        type: String,
        required: [true, 'MONGOOSE: El email es obligatorio.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'MONGOOSE: El password es obligatorio.']
    }
});

module.exports = model('Usuario', UsuarioSchema);