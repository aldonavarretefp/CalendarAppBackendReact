const { Schema, model } = require("mongoose");


const EventoSchema = Schema({
    title: {
        type: String, 
        require: true
    },
    start: {
        type: Date
    },
    notes: {
        type: String
    },
    end: {
        type: Date
    },
    // Nombre del otro esquema.
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}); 

module.exports = model("Evento", EventoSchema);