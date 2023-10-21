const { Schema, model } = require("mongoose");


const EventoSchema = Schema({
    title: {
        type: String, 
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    notes: {
        type: String
    },
    end: {
        type: Date,
        required: true
    },
    // Nombre del otro esquema.
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

}); 

module.exports = model("Evento", EventoSchema);