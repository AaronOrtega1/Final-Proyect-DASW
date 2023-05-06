const router = require("express").Router();
const { Administrator } = require("../db/administrator-coord.js");
const { validateCoordinator } = require("../middleware/validateData.js");
const nanoid = require("nanoid");

router.get("/", async(req, res) => {
    let filter  = {};
    let {codigo, nombre, rol, materias, departamento, correo, telefono, oficina} = req.query;

    if(codigo) filter.codigo = new RegExp(codigo, "i");
    if(nombre) filter.nombre = new RegExp(nombre, "i");
    if(rol) filter.rol = new RegExp(rol, "i");
    if(materias) filter.materias = new RegExp(materias, "i");
    if(departamento) filter.departamento = new RegExp(departamento, "i");
    if(correo) filter.correo = new RegExp(correo, "i");
    if(telefono) filter.telefono = telefono;
    if(oficina) filter.oficina = new RegExp(oficina, "i");


    let coordinador = await Administrator.getCoordinadores(filter)
    res.status(200).send(coordinador);
});

router.post("/",validateCoordinator,async(req, res) => {
    let coordinadorData = req.body;

    let nuevoCoordinador = {
        codigo: nanoid.nanoid(),
        nombre: coordinadorData.nombre,
        rol: coordinadorData.rol,
        materias: coordinadorData.materias,
        departamento: coordinadorData.departamento,
        correo: coordinadorData.correo,
        telefono: coordinadorData.telefono,
        oficina: coordinadorData.oficina,
        imageUrl: coordinadorData.imageUrl
    }

    let coordinador = await Administrator.createCoordinador(nuevoCoordinador);
    res.status(201).send(coordinador);
});

router.put("/:codigo",validateCoordinator,async(req, res) => {

    let {codigo} = req.params;
    let newData = req.body;

    let updatedCoordinador = await Administrator.updateCoordinador(codigo, newData);

    res.status(200).send(updatedCoordinador);



});

router.delete("/:codigo", async(req, res) => {
    let {codigo} = req.params;

    let deletedCoordinador = await Administrator.deleteCoordinador(codigo);

    res.status(200).send(deletedCoordinador);
});

router.get("/:codigo", async(req, res) => {
    let {codigo} = req.params;
    let coordinador = await Administrator.getCoordinadorById(codigo);
    res.status(200).send(coordinador);
});



module.exports = router;