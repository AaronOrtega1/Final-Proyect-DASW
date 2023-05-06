const router = require("express").Router();
const { View } = require("../db/administrator-cord-view.js");
const { validateView } = require("../middleware/validateData.js");
const nanoid = require("nanoid");

router.get("/", async(req, res) => {
    let filter  = {};
    let {id,coordinadorId} = req.query;

    if(id) filter.id = new RegExp(id, "i");
    if(coordinadorId) filter.coordinadorId = new RegExp(coordinadorId, "i");

    let views = await View.getView(filter);
    res.status(200).send(views);

});

router.post("/",validateView,async(req, res) => {

    let viewData = req.body;

    let newView =  {
        id: nanoid.nanoid(),
        profesores: viewData.profesores,
        materias: viewData.materias,
        coordinadorId: viewData.coordinadorId
    }

    let viewCreated = await View.createView(newView);
    res.status(201).send(viewCreated);

});


router.put("/:id", validateView,async(req, res) => {
    
    let {id} = req.params;
    let newData = req.body;
    let viewUpdated = await View.updateView(id, newData);
    res.status(200).send(viewUpdated);
    
});

router.delete("/:id", async(req, res) => {
    
    let {id} = req.params;
    let viewDeleted = await View.deleteView(id);
    res.status(200).send(viewDeleted);
    

});

router.get("/:id", async(req, res) => {

    let {id} = req.params;
    let view = await View.getViewById(id);
    res.status(200).send(view);

});

//Res status 404?!?

module.exports = router;

