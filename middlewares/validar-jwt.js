const { response } = require("express");
const jwt  = require("jsonwebtoken");

const validarJWT = (req = response, res = response, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(400).json({
            "ok": false,
            "msg": "No hay token en la petición."
        })
    }

    try {
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        // Insertando el uid y nombre a la request pasada por referencia.
        req.uid = uid;
        req.name = name;
        
        next();
    } catch (error) {
        return res.status(401).json({
            "ok": false,
            "msg": "Token no valido."
        })
    }

    
};

module.exports = { validarJWT }