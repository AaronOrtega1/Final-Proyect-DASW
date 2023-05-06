const { mongoose } = require("./connectDB.js");


const viewSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    profesores: {
        type: Array,
        required: true
    },
    materias: {
        type: Array,
        required: true
    },
    coordinadorId: {
        type: String,
        required: true
    }
});