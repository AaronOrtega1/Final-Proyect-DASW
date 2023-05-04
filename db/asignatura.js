const mongoose = require("mongoose");
const config = require("../config/config.js");

const asignaturaSchema = mongoose.Schema({
  codigo: {
    type: String,
    unique: true,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  areaAsig: {
    type: String,
    required: true,
  },
  creditos: {
    type: Number,
    required: true,
  },
  depto: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  grupos: {
    type: Array,
  },
});

asignaturaSchema.statics.getAsignaturas = async (filters) => {
  let asignaturas = await Asignaturas.find(filters);
  console.log("Asignaturas: \n" + asignaturas);
  return asignaturas;
};

asignaturaSchema.statics.getAsignaturaXcodigo = async (codigo) => {
  let asignatura = await Asignaturas.findOne({ codigo });
  console.log("Asignatura: \n" + asignatura);
  return asignatura;
};

asignaturaSchema.statics.getAsignaturaXnombre = async (nombre) => {
  let asignatura = await Asignaturas.findOne({ nombre });
  console.log("Asignatura: \n" + asignatura);
  return asignatura;
};

asignaturaSchema.statics.createAsignatura = async (asignaturaData) => {
  let nuevaAsignatura = Asignaturas(asignaturaData);
  console.log("Nueva Asignatura: \n" + nuevaAsignatura);
  return await nuevaAsignatura.save();
};

asignaturaSchema.statics.updateAsignatura = async (codigo, datos) => {
  let asignaturaActualizada = await Asignaturas.findOneAndUpdate(
    codigo,
    { $set: datos },
    { new: true }
  );
  console.log("Asignatura Actualizada: \n" + asignaturaActualizada);
  return asignaturaActualizada;
};

asignaturaSchema.statics.deleteAsignatura = async (codigo) => {
  let asignaturaEliminada = await Asignaturas.findOneAndDelete(codigo);
  console.log("Asignatura Eliminada: \n" + asignaturaEliminada);
  return asignaturaEliminada;
};

let Asignaturas = mongoose.model("Asignaturas", asignaturaSchema);

/* Asignaturas.getAsignaturas({}); */


module.exports = { Asignaturas };
