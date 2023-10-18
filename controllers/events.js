const { response } = require("express");

const crearEvento = async (req, res = response) => {
    return res.status(201).json({
        "ok": true,
        "msg": "Crear evento"
    })
};
const getEventos = async (req, res = response) => {
    return res.status(201).json({
        "ok": true,
        "msg": "Get eventos"
    })
};
const editarEvento = async (req, res = response) => {
    return res.status(201).json({
        "ok": true,
        "msg": "Editar evento"
    })
};
const borrarEvento = async (req, res = response) => {
    return res.status(201).json({
        "ok": true,
        "msg": "Borrar evento"
    })
};

module.exports = {
    crearEvento,
    getEventos,
    editarEvento,
    borrarEvento
}