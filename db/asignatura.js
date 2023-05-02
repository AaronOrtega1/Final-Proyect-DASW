const mongoose = require("mongoose");
const config = require("../config/config.js");

const asignaturaSchema = mongoose.Schema({
    asignaturaCodigo: {
        type: String,
        unique: true,
        required: true
    },
    asignaturaNombre: {
        type: String,
        required: true
    },
    asignaturaCreditos: {
        type: Number,
        required: true
    },
    asignaturaDepto: {
        type: String,
        required: true
    },
    asignaturaDescripcion: {
        type: String,
        required: true
    },
    asignaturaArea: {
        type: String,
        required: true
    },
    asignaturaGrupos: {
        type: Array
    }
});

asignaturaSchema.statics.getAsignaturas = async (filters) => {
    let asignaturas = await Asignaturas.find(filters);
    console.log("Asignaturas: \n"+asignaturas);
    return asignaturas;
}
asignaturaSchema.statics.getAsignaturaXcodigo = async (asignaturaCodigo) => {
    let asignatura = await Asignaturas.findOne({asignaturaCodigo});
    console.log("Asignatura: \n"+asignatura);
    return asignatura;
}
asignaturaSchema.statics.getAsignaturaXnombre = async (asignaturaNombre) => {
    let asignatura = await Asignaturas.findOne({asignaturaNombre});
    console.log("Asignatura: \n"+asignatura);
    return asignatura;
}
asignaturaSchema.statics.createAsignatura = async (asignaturaData) => {
    let nuevaAsignatura = Asignaturas(asignaturaData);
    console.log("Nueva Asignatura: \n"+nuevaAsignatura);
    return await nuevaAsignatura.save();
}
asignaturaSchema.statics.updateAsignatura = async (Codigo, datos) => {
    let asignaturaActualizada = await Asignaturas.findOneAndUpdate({Codigo}, {$set: datos},{new:true});
    console.log("Asignatura Actualizada: \n"+asignaturaActualizada);
    return asignaturaActualizada;
}
asignaturaSchema.statics.deleteAsignatura = async (Codigo) => {
    let asignaturaEliminada = await Asignaturas.findOneAndDelete({Codigo});
    console.log("Asignatura Eliminada: \n"+asignaturaEliminada);
    return asignaturaEliminada;
}

let Asignaturas = mongoose.model("Asignaturas", asignaturaSchema);

Asignaturas.getAsignaturas({});


module.exports = {Asignaturas};
