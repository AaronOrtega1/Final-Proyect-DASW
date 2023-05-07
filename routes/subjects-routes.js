const router = require("express").Router();
const { Asignaturas } = require("../db/asignatura.js");
const { validateSubject } = require("../middleware/validateData.js");
const { Grupo } = require("../db/groups.js");
const { validate } = require("../middleware/validateData.js");
const nanoid = require("nanoid");

router.get("/", async (req, res) => {
  let filter = {};
  let {
    codigo,
    nombre,
    areaAsig,
    creditos,
    depto,
    pagina,
    limite
  } = req.query;
  if (codigo) {
    filter.codigo = new RegExp(codigo, "i");
  }
  if (nombre) {
    filter.nombre = new RegExp(nombre, "i");
  }
  if (creditos) {
    filter.creditos = new RegExp(creditos, "i");
  }
  if (depto) {
    filter.depto = new RegExp(depto, "i");
  }
  if (areaAsig) {
    filter.areaAsig = new RegExp(areaAsig, "i");
  }
  if(!pagina) pagina = 1;
  if(!limite) limite = 6;
  if(pagina < 1) pagina = 1;

  
  let finalPag = parseInt(limite);
  
  let asignatura = await Asignaturas.getAsignaturas(filter, pagina, finalPag);
  res.send(asignatura);
});

router.get("/:codigo", async (req, res) => {
  let codigo  = req.params.codigo;
  let asignatura = await Asignaturas.getAsignaturaXcodigo(codigo);
  res.send(asignatura);
});

// router.get("/:nombre", async (req, res) => {
//   let  nombre  = req.params.nombre;
//   let asignatura = await Asignaturas.getAsignaturaXnombre(nombre);
//   res.send(asignatura);
// });

router.post("/", validateSubject, async (req, res) => {
  let {
    codigo,
    nombre,
    areaAsig,
    creditos,
    depto,
    descripcion,
    grupos,
  } = req.body;
  codigo = codigo.toUpperCase();
  let compararCodigo = await Asignaturas.getAsignaturaXcodigo(codigo);
  if (compararCodigo) {
    return res.status(400).send("El codigo ya existe");
  }
  let newAsignatura = await Asignaturas.createAsignatura({
    codigo,
    nombre,
    areaAsig,
    creditos,
    depto,
    descripcion,
    grupos,
  });
  res.status(201).send(newAsignatura);
});

router.put("/:codigo", validateSubject, async (req, res) => {
  let codigo = req.params.codigo;
  let {
    nombre,
    areaAsig,
    creditos,
    depto,
    descripcion,
    grupos,
  } = req.body;
  codigo = codigo.toUpperCase();
  let compararCodigo = await Asignaturas.getAsignaturaXcodigo(codigo);
  if (!compararCodigo) {
    return res.status(400).send("El codigo no existe");
  }
  let asignatura = await Asignaturas.updateAsignatura(codigo, {
    nombre,
    areaAsig,
    creditos,
    depto,
    descripcion,
    grupos,
  });
  res.send(asignatura);
});

router.delete("/:codigo", async (req, res) => {
  let codigo = req.params.codigo;
  codigo = codigo.toUpperCase();
  console.log(codigo);
  let compararCodigo = await Asignaturas.getAsignaturaXcodigo(codigo);
  if (!compararCodigo) {
    return res.status(400).send("El codigo no existe");
  }
  let asignatura = await Asignaturas.deleteAsignatura(codigo);
  res.send(asignatura);
});

module.exports = router;