const mongoose = require("mongoose");
const config = require("../config/config.js");

const coordinadorSchema = mongoose.Schema({
    codigo: {
        type: String,
        unique: true,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    materias: {
        type: Array,
        required: true
    },
    departamento: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    oficina: {
        type: String,
        required: true
    }

});

coordinadorSchema.statics.getCoordinadores = async(filters) => {
    let coordinadores = await Coordinador.find(filters);
    console.log("Coordinadores: \n" + coordinadores);
    return coordinadores;
}

coordinadorSchema.statics.getCoordinadorById = async(codigo) => {
    let coordinador = await Coordinador.findOne({codigo});
    console.log("Coordinador: \n" + coordinador);
    return coordinador;

}

coordinadorSchema.statics.createCoordinador = async(coordinadorData) => {
    let nuevoCoordinador = Coordinador(coordinadorData);
    return await nuevoCoordinador.save();

}

coordinadorSchema.statics.updateCoordinador = async(codigo, datos) => {
    let coordinadorActualizado = await Coordinador.findOneAndUpdate({codigo}, {$set: datos}, {new: true});
    console.log("Coordinador actualizado: \n" + coordinadorActualizado);
    return coordinadorActualizado;
}

coordinadorSchema.statics.deleteCoordinador = async(codigo) => {
    let coordinadorEliminado = await Coordinador.findOneAndDelete({codigo});
    console.log("Coordinador eliminado: \n" + coordinadorEliminado);
    return coordinadorEliminado;
}


let Coordinador = mongoose.model("Coordinador", coordinadorSchema);

module.exports = { Coordinador };