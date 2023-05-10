const mongoose = require("mongoose");
const config = require("../config/config.js");
const { Groups } = require("./groups.js");

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
  grupos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Groups'
  }],
});

asignaturaSchema.statics.getAsignaturas = async (filters,  pagina, limite) => {
  let salto = (pagina - 1) * limite;
  let asignaturas = await Asignaturas.find(filters).skip(salto).limit(limite)
  .populate({path: 'grupos', model: 'Groups', select: 'professor period year groupID'}); // 'professor period year
  //asignaturas = asignaturas.slice(salto, salto + limite);
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
  let grupos = asignaturaData.grupos || [];
  if (grupos && grupos.length > 0) {
    for (let i = 0; i < grupos.length; i++) {
      const grupo = await Groups.findOne({ groupID: grupos[i] });
      if (grupo) {
        grupos[i] = grupo._id;
      }
    }
    asignaturaData.grupos = grupos;
  }
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

