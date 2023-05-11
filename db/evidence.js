const { mongoose } = require("./connectDB.js");
const { Comment } = require("./comments.js");
const { User } = require("./users.js");

const  evidenceSchema = mongoose.Schema({
    codigo: {
        type: String,
        unique: true,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    urlArchivo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comment: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    fecha: {
        type: Number,
        required: true
    }
});

evidenceSchema.statics.getEvidencias = async(filters, pagina, limite) => {
    let salto = (pagina - 1) * limite;
    let evidencias = await Evidence.find(filters).skip(salto).limit(limite);
    console.log("All: \n" + evidencias);
    return evidencias;
}

evidenceSchema.statics.getEvidenciaById = async(codigo) => {
    let evidence = await Evidence.findOne({codigo});
    console.log("Obtained Evidence: \n" + evidence);
    return evidence;
}

evidenceSchema.statics.createEvidencia = async(evidenceData) => {
    let nuevaEvidencia = await Evidence(evidenceData);
    console.log("New Evidence: \n" + nuevaEvidencia);
    return await nuevaEvidencia.save();
}

evidenceSchema.statics.updateEvidencia = async(codigo, evidenceData) => {
    let updatedEvidence = await Evidence.findOneAndUpdate({codigo}, {$set: evidenceData}, {new: true});
    console.log("Updated Evidence: \n" + updatedEvidence);
    return updatedEvidence;
}

evidenceSchema.statics.deleteEvidencia = async(codigo) => {
    let deletedEvidence = await Evidence.findOneAndDelete({codigo});
    console.log("Deleted Evidence: \n" + deletedEvidence);
    return deletedEvidence;
}





let Evidence = mongoose.model("evidence", evidenceSchema);
module.exports = { Evidence };