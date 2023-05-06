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


viewSchema.statics.getView = async(filters) => {
    let view = await View.find(filters);
    console.log("View: \n" + view);
    return view;
}

viewSchema.statics.getViewById = async(id) => {
    let view = await View.findOne({id});
    console.log("View: \n" + view);
    return view;
}

viewSchema.statics.createView = async(viewData) => {
    let newView = await View(viewData);
    return await newView.save();
}

viewSchema.statics.updateView = async(id, datos) => {
    let viewUpdated = await View.findOneAndUpdate({id}, {$set: datos}, {new: true});
    console.log("View updated: \n" + viewUpdated);
    return viewUpdated;
}

viewSchema.statics.deleteView = async(id) => {
    let viewDeleted = await View.findOneAndDelete({id});
    console.log("View deleted: \n" + viewDeleted);
    return viewDeleted;
}



let View = mongoose.model("View", viewSchema);
module.exports = { View };


