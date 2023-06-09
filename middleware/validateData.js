const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const { User } = require("../db/users.js");
const { Areas } = require("../db/areasAsig.js");
const validAdmins = require("../public/JavaScript/Tokens/validAdmins.js");
const { decode } = require("punycode");

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
    status !== undefined &&
    userName &&
    passWord &&
    isCoord !== undefined &&
    isAdmin !== undefined &&
    email &&
    imgURL !== undefined
  ) {
    next();
    return;
  }
  res
    .status(400)
    .send(
      "Falta el " +
        fullName +
        department +
        status +
        userName +
        passWord +
        isCoord +
        isAdmin +
        email +
        imgURL
    );
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
  let { codigo, nombre, areaAsig, creditos, coordinador, descripcion } =
    req.body;
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

function validarAdmin(req, res, next) {
  let token = req.get("x-token");
  if (validAdmins.includes(token)) {
    next();
    return;
  } else {
    res.status(401).send({ error: "No tienes permisos de administrador" });
    console.log("No tienes permisos de administrador");
    return;
  }
}

function validarToken(req, res, next) {
  let token = req.get("x-token");
  if (!token) {
    res.status(401).send({ error: "No estas autenticado" });
    return;
  }

  jwt.verify(token, config.jwtSecret, (error, decoded) => {
    if (error) {
      res.status(401).send({ error: error.message });
      return;
    }

    req.username = decoded.userName;
    req.userID = decoded.userID;
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

function validateEvidence(req, res, next) {
  let { titulo, urlArchivo, descripcion, userId, comment,} = req.body;
  if (titulo && urlArchivo && descripcion && userId && comment !== undefined) {
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
  validarAdmin,
  validateEvidence
};
