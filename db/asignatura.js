const mongoose = require("mongoose");
const config = require("../config/config.js");
const { Groups } = require("./groups.js");
const { User } = require("./users.js");

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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
  },
  creditos: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  grupos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Groups",
    },
  ],
  coordinador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

asignaturaSchema.statics.getAsignaturas = async (filters, pagina, limite) => {
  let salto = (pagina - 1) * limite;
  let asignaturas = await Asignaturas.find(filters)
    .skip(salto)
    .limit(limite)
    .populate({
      path: "grupos",
      model: "Groups",
      select: "professor period year groupID",
    }).populate({
      path: "coordinador",
      model: "User",
      select: "fullName",
    }).populate({
      path: "areaAsig",
      model: "Area",
      select: "nombre",
    });
  console.log(
    "🚀 ~ file: asignatura.js:49 ~ asignaturaSchema.statics.getAsignaturas= ~ asignaturas:",
    asignaturas
  );
  //asignaturas = asignaturas.slice(salto, salto + limite);
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
        grupos[i] = grupo.groupID;
      }
    }
    asignaturaData.grupos = grupos;
  }
  let coordinador = asignaturaData.coordinador || "";
  if (coordinador != "" && coordinador != null) {
    let user = await User.findOne({ userID: coordinador });
    if (user && user.isCoord) {
      asignaturaData.coordinador = user.userID;
    }
  }
  let areaAsig = asignaturaData.areaAsig || "";
  if (areaAsig != "" && areaAsig != null) {
    let area = await Area.findOne({ codigo: areaAsig });
    if (area) {
      asignaturaData.areaAsig = area.codigo;
    }
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
  let asignaturaEliminada = await Asignaturas.findOneAndDelete({ codigo: codigo  });
  console.log("Asignatura Eliminada: \n" + asignaturaEliminada);
  return asignaturaEliminada;
};

asignaturaSchema.statics.update = async function (asignaturaData) {
  let data = await this.updateOne(asignaturaData);
  console.log("🚀 ~ file: asignatura.js:100 ~ data:", data);
  return this;
};

let Asignaturas = mongoose.model("Asignaturas", asignaturaSchema);

Asignaturas.getAsignaturas({});

module.exports = { Asignaturas };
