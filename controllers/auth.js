const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/Usuario");

const crearUsuario = async (req, res = response) => {
    const {name, email, password} = req.body;
    try {
        
        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        return res.status(201).json({
            "ok": true,
            "msg": "post - crearUsuario",
            "uid": usuario.id,
            "name": usuario.name,
            "email": usuario.email
        });
    } catch (error) {

        return res.status(500).json({
            "ok": false,
            "msg": "No se ha podido crear al usuario.",
            errorMsg: error.code === 11000 ? "El email ya existe." : "Error desconocido.",
            error
        });
    }
}; 
const loginUsuario = async (req, res = response) => {
    
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        
        if(!usuario) {
            return res.status(400).json({
                "ok": false,
                "msg": "Usuario no existe."
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);
        
        if(!validPassword) {
            return res.status(400).json({
                "ok": false,
                "msg": "El password es incorrecto."
            });
        }

        return res.status(200).json({
            "ok": true,
            "msg": "Usuario autenticado!",
            "uid": usuario.id,
            "name": usuario.name,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "ok": false,
            "msg": "No se pudo autenticar al usuario",
            error
        })
    }

    return res.json({
        "ok": true,
        "msg": "post - loginUsuario",
        email,
        password
    });
};
const revalidarToken = (req, res = response) => {
    
    return res.json({
        "ok": true,
        "msg": "get - revalidarToken"
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};