const router = require("express").Router();
const { Asignaturas } = require("../db/asignatura.js");
const { Areas } = require("../db/areasAsig.js");
const { validateSubject, validarToken} = require("../middleware/validateData.js");
const { Grupo } = require("../db/groups.js");
const { validate } = require("../middleware/validateData.js");
const nanoid = require("nanoid");

router.get("/", async (req, res) => {
  let filter = {};
  let { codigo, nombre, areaAsig, creditos, coordinador, pagina, limite } = req.query;
  if (codigo) {
    filter.codigo = new RegExp(codigo, "i");
  }
  if (nombre) {
    filter.nombre = new RegExp(nombre, "i");
  }
  if (creditos) {
    filter.creditos = parseInt(creditos);
  }
  if (coordinador) {
    filter.coordinador = new RegExp(coordinador, "i");
  }
  if (areaAsig) {
    filter.areaAsig = new RegExp(areaAsig, "i");
  }
  if (!pagina) pagina = 1;
  if (!limite) limite = 6;
  if (pagina < 1) pagina = 1;

  let finalPag = parseInt(limite);

  let asignatura = await Asignaturas.getAsignaturas(filter, pagina, finalPag);
  res.send(asignatura);
});

router.get("/areas", async (req, res) => {
  try {
    let areas = await Areas.getAreas({});
    res.send(areas);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener las áreas");
  }
});

router.get("/areas/:codigo", async (req, res) => {
  try {
    let id = req.params.codigo;
    let area = await Areas.getArea(id);
    res.send(area);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el área");
  }
});


router.get("/:codigo", async (req, res) => {
  let codigo = req.params.codigo;
  codigo = codigo.toUpperCase();
  let asignatura = await Asignaturas.getAsignaturaXcodigo(codigo);
  res.send(asignatura);
});

router.post("/", validateSubject, validarToken, async (req, res) => {
  // if (!req.user.isAdmin) {
  //   res.status(401).send("Unauthorized");
  //   return;
  // }
  let { codigo, nombre, areaAsig, creditos, coordinador, descripcion, grupos } =
    req.body;
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
    coordinador,
    descripcion,
    grupos,
  }).catch((err) => {
    console.log(err);
  }
  );
  res.status(201).send(newAsignatura);
  
});

router.put("/:codigo", validateSubject, validarToken, async (req, res) => {
  // if (!req.user.isAdmin) {
  //   res.status(401).send("Unauthorized");
  //   return;
  // }
  let token 

  let codigo = req.params.codigo;
  let { nombre, areaAsig, creditos, coordinador, descripcion, grupos } = req.body;
  codigo = codigo.toUpperCase();
  let compararCodigo = await Asignaturas.getAsignaturaXcodigo(codigo);
  if (!compararCodigo) {
    return res.status(400).send("El codigo no existe");
  }
  let asignatura = await Asignaturas.updateAsignatura(codigo, {
    nombre,
    areaAsig,
    creditos,
    coordinador,
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
