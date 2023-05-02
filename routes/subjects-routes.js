const router = require("express").Router();
const {Asignaturas} = require("../db/asignatura.js");
const { validateSubject } = require("../middleware/validateData.js");
const {validate} = require("../middleware/validateData.js");
const nanoid = require("nanoid");

router.get("/", async (req, res) => {
    let filter = {};
    let {asignaturaCodigo, asignaturaNombre, asignaturaCreditos, asignaturaDepto, asignaturaArea} = req.query;
    if (asignaturaCodigo) {
        filter.asignaturaCodigo = new RegExp(asignaturaCodigo, "i");
    }
    if (asignaturaNombre) {
        filter.asignaturaNombre = new RegExp(asignaturaNombre, "i");
    }
    if (asignaturaCreditos) {
        filter.asignaturaCreditos = new RegExp(asignaturaCreditos, "i");
    }
    if (asignaturaDepto) {
        filter.asignaturaDepto = new RegExp(asignaturaDepto, "i");
    }
    if(asignaturaArea){
        filter.asignaturaArea = new RegExp(asignaturaArea, "i");
    }
    let asignatura = await Asignaturas.getAsignaturas(filter);
    res.send(asignatura);
});

router.get("/:asignaturaCodigo", async (req, res) => {
    let {asignaturaCodigo} = req.params;
    let asignatura = await Asignaturas.getAsignaturaXcodigo(asignaturaCodigo);
    res.send(asignatura);
});

router.get("/:asignaturaNombre", async (req, res) => {
    let {asignaturaNombre} = req.params;
    let asignatura = await Asignaturas.getAsignaturaXnombre(asignaturaNombre);
    res.send(asignatura);
});

router.post("/", validateSubject, async (req, res) => {
    let {asignaturaCodigo, asignaturaNombre, asignaturaArea,asignaturaCreditos, asignaturaDepto, asignaturaDescripcion, asignaturaGrupos} = req.body;
    let newAsignatura = await Asignaturas.createAsignatura({
        asignaturaCodigo,
        asignaturaNombre,
        asignaturaArea,
        asignaturaCreditos,
        asignaturaDepto,
        asignaturaDescripcion,
        asignaturaGrupos
    });
    res.status(201).send(newAsignatura);
});

router.put("/:asignaturaCodigo", validateSubject, async (req, res) => {
    let {asignaturaCodigo} = req.params;
    let {asignaturaNombre, asignaturaArea, asignaturaCreditos, asignaturaDepto, asignaturaDescripcion, asignaturaGrupos} = req.body;
    let asignatura = await Asignaturas.updateAsignatura(asignaturaCodigo, {
        asignaturaNombre,
        asignaturaArea,
        asignaturaCreditos,
        asignaturaDepto,
        asignaturaDescripcion,
        asignaturaGrupos
    });
    res.send(asignatura);
});

router.delete("/:asignaturaCodigo", async (req, res) => {
    let {asignaturaCodigo} = req.params;
    let asignatura = await Asignaturas.deleteAsignatura(asignaturaCodigo);
    res.send(asignatura);
});

module.exports = router;
