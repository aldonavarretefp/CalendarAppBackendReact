const { response, request } = require("express");
const Evento = require("../models/Evento");

const crearEvento = async (req = request, res = response) => {
    try {
        const { uid } = req;
        const { title, start, end } = req.body;
        const eventoNuevo = new Evento({ title, start, end, user: uid});
        console.log(eventoNuevo);
        const eventoGuardado = await eventoNuevo.save();
        console.log(eventoGuardado);
        return res.status(201).json({
            "ok": true, 
            "msg": "Evento guardado en la DB",
            eventoGuardado
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "ok": true,
            "msg": "Hable con el administrador.",
            error
        })
    }
};
const getEventos = async (req, res = response) => {
    const eventos = await Evento.find()
                            .populate('user', 'name');
    return res.status(201).json({
        "ok": true,
        "msg": "Get eventos",
        eventos
    })
};
const actualizarEvento = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        // Encontrar evento
        const evento = await Evento.findById(id);
        // Verificar que es evento del usuario de la petición.
        if(evento.user.toString() !== req.uid) {
            return res.status(401).json({
                "ok": false,
                "msg": "Usuario no tiene los permisos para actualizar el evento."
            })
        }
        const nuevoEvento = {
            ...req.body,
            user: req.uid
        }
        // Actualizar
        const eventoActualizado = await Evento.findByIdAndUpdate(id, nuevoEvento, {
           new: true
        })

        return res.status(200).json({
            "ok": true, 
            "msg": "Evento actualizado",
            "evento": eventoActualizado
        });
    } catch (error) {
        return res.status(500).json({
            "ok": false,
            "msg": "Hable con el administrador",
            error
        });
    }
};
const borrarEvento = async (req, res = response) => {
    try {
        const { id } = req.params;
        
        const evento = await Evento.findById(id);
        console.log(evento);
        // Verificar si el evento existe.
        if (!evento) {
            return res.status(404).json({
                "ok": false,
                "msg": `No se encontró el evento con el id ${id}`
            });
        }

        // Verificar que es evento del usuario de la petición.
        if(evento.user.toString() !== req.uid) {
            return res.status(401).json({
                "ok": false,
                "msg": "Usuario no tiene los permisos para actualizar el evento."
            })
        }

        await Evento.findByIdAndRemove(id);

        return res.status(200).json({
            "ok": true,
            "msg": "Evento borrado!",
            "evento": evento
        })

    } catch (error) {
        return res.status(500).json({
            "ok": false,
            "msg": "Hablar con el administrador.",
            error
        })
    }
};

module.exports = {
    crearEvento,
    getEventos,
    actualizarEvento,
    borrarEvento
}