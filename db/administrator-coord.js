const { mongoose } = require("./connectDB.js");

const administratorSchema = mongoose.Schema({
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
    },
    imageUrl: {
        type: String,
        required: true
    }

});

administratorSchema.statics.getCoordinadores = async(filters) => {
    let coordinadores = await Administrator.find(filters);
    console.log("Coordinadores: \n" + coordinadores);
    return coordinadores;
}

administratorSchema.statics.getCoordinadorById = async(codigo) => {
    let coordinador = await Administrator.findOne({codigo});
    console.log("Coordinador: \n" + coordinador);
    return coordinador;

}

administratorSchema.statics.createCoordinador = async(coordinadorData) => {
    let nuevoCoordinador = await Administrator(coordinadorData);
    return await nuevoCoordinador.save();

}

administratorSchema.statics.updateCoordinador = async(codigo, datos) => {
    let coordinadorActualizado = await Administrator.findOneAndUpdate({codigo}, {$set: datos}, {new: true});
    console.log("Coordinador actualizado: \n" + coordinadorActualizado);
    return coordinadorActualizado;
}

administratorSchema.statics.deleteCoordinador = async(codigo) => {
    let coordinadorEliminado = await Administrator.findOneAndDelete({codigo});
    console.log("Coordinador eliminado: \n" + coordinadorEliminado);
    return coordinadorEliminado;
}


let Administrator = mongoose.model("Administrator", administratorSchema);

module.exports = { Administrator };