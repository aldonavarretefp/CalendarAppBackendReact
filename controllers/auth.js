const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
    try {
        const usuario = new Usuario(req.body);
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(usuario.password, salt);

        await usuario.save();

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        return res.status(201).json({
            "ok": true,
            "msg": "post - crearUsuario",
            "uid": usuario.id,
            "name": usuario.name,
            "email": usuario.email,
            "token": token
        });
    } catch (error) {
        return res.status(500).json({
            "ok": false,
            "msg": error.code === 11000 ? "El usuario ya existe." : "Error desconocido.",
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
        
        // Generar jwt
        const token = await generarJWT(usuario.id, usuario.name);

        return res.status(200).json({
            "ok": true,
            "msg": "Usuario autenticado!",
            "uid": usuario.id,
            "name": usuario.name,
            "token": token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "ok": false,
            "msg": "No se pudo autenticar al usuario",
            error
        })
    }
};
const revalidarToken = async (req, res = response) => {
   
    const { uid, name } = req;
    
    // Generar nuevo token
    const token = await generarJWT(uid, name);

    return res.status(200).json({
        "ok": true,
        "msg": "Token revalidado!",
        "uid": uid,
        "name": name,
        "token": token
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};