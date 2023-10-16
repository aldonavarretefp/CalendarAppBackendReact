const { response } = require("express");

const crearUsuario = (req, res = response) => {
    const {name, email, password} = req.body;
    return res.json({
        "ok": true,
        "msg": "post - crearUsuario",
        name,
        email,
        password
    });
}; 
const loginUsuario = (req, res = response) => {
    const {email, password} = req.body;
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