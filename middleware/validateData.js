const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const { User } = require("../db/users.js");
const { Areas } = require("../db/areasAsig.js");

function validateBodyUser(req, res, next) {
  let {
    fullName,
    department,
    status,
    userName,
    passWord,
    isCoord,
    isAdmin,
    email,
    imgURL,
  } = req.body;
  if (
    fullName &&
    department &&
    status &&
    userName &&
    passWord &&
    isCoord &&
    isAdmin &&
    email &&
    imgURL !== undefined
  ) {
    next();
    return;
  }
  res.status(400).send('Falta el ' + fullName + department + status+ userName + passWord + isCoord+ isAdmin+ email + imgURL);
  //{ error: "Missing atributes, please check" }
}

function validateBodyGroup(req, res, next) {
  let { group, department, status, professor, period, year } = req.body;
  if (
    group &&
    department &&
    status &&
    professor &&
    period &&
    year !== undefined
  ) {
    next();
    return;
  }
  res.status(400).send({ error: "Missing atributes, please check" });
}

async function validateSubject(req, res, next) {
  let { codigo, nombre, areaAsig, creditos, coordinador, descripcion } = req.body;
  let missing = [];
  if (!codigo && !req.params.codigo) {
    missing.push("codigo");
  } else if (!codigo && req.params.codigo) {
    codigo = req.params.codigo;
  }
  if (!nombre) missing.push("nombre");
  if (!areaAsig) missing.push("area");
  if (!creditos) missing.push("creditos");
  if (!coordinador) missing.push("coordinador");
  if (!descripcion) missing.push("descripcion");

  codigo = codigo.toUpperCase();
  console.log(codigo);

  if (missing.length > 0) {
    res.status(400).send({ error: "Faltan atributos: " + missing.join(", ") });
    console.log("Faltan atributos: " + missing.join(", "));
    return;
  }

  next();
}

function validarToken(req, res, next) {
  let token = req.get("x-token");
  if (!token) {
    res.status(401).send({ error: "No estas autenticado" });
    return;
  }

  jwt.verify(token, config.jwtSecret, (error, decoded) => {
    if (error) {
      res.status(401).send({ erro: error.message });
      return;
    }

    req.username = decoded.userName;
    next();
  });
}

function validateView(req, res, next) {
  let { profesores, materias, coordinadorId } = req.body;
  if (profesores && materias && coordinadorId !== undefined) {
    next();
    return;
  }
  res.status(400).send({ error: "Missing atributes, please check" });
}

module.exports = {
  validateBodyUser,
  validateBodyGroup,
  validateSubject,
  validarToken,
  validateView,
};
