const mongoose = require("mongoose");
const config = require("../config/config.js");

const areaSchema = mongoose.Schema({
    codigo: {
        type: Number,
        unique: true,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
});

areaSchema.statics.getAreas = async (filters) => {
    let areas = await Areas.find(filters);
    console.log("Areas: ", areas);
    return areas;
}

areaSchema.statics.getAreaXcodigo = async (codigo) => {
    let area = await Areas.findOne({ codigo: codigo });
    console.log("Area: ", area);
    return area;
}

areaSchema.statics.createArea = async (area) => {
    let newArea = await Areas.create(area);
    console.log("Area creada: ", newArea);
    return newArea;
}
let Areas = mongoose.model("Areas", areaSchema);

Areas.getAreas({});

module.exports = { Areas };
