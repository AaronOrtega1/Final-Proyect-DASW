function validateBodyTeacher(req, res, next) {
  let { fullName, department, birthDate, status, userName, passWord } =
    req.body;
  if (
    fullName &&
    department &&
    birthDate &&
    status &&
    userName &&
    passWord !== undefined
  ) {
    next();
    return;
  }
  res.status(400).send({ error: "Missing atributes, please check" });
}

function validateBodyGroup(req, res, next) {
  let { group, department, status, students, professor } = req.body;
  if (group && department && status && students && professor !== undefined) {
    next();
    return;
  }
  res.status(400).send({ error: "Missing atributes, please check" });
}

function validateSubject(req, res, next) {
  let {
    asignaturaCodigo,
    asignaturaNombre,
    asignaturaArea,
    asignaturaCreditos,
    asignaturaDepto,
    asignaturaDescripcion,
  } = req.body;
  let missing = [];
  if (!asignaturaCodigo) missing.push("asignaturaCodigo");
  if (!asignaturaNombre) missing.push("asignaturaNombre");
  if (!asignaturaArea) missing.push("asignaturaArea");
  if (!asignaturaCreditos) missing.push("asignaturaCreditos");
  if (!asignaturaDepto) missing.push("asignaturaDepto");
  if (!asignaturaDescripcion) missing.push("asignaturaDescripcion");

  if (missing.length > 0) {
    res.status(400).send({ error: "Faltan atributos: " + missing.join(", ") });
    return;
  }
  next();
}

function validateStudent(req, res, next) {
  let { fullName, email, carreer } = req.body;
  if (fullName && email && carreer !== undefined) {
    next();
    return;
  }
  res.status(400).send({ error: "Missing atributes, please check" });
}

module.exports = {
  validateBodyTeacher,
  validateBodyGroup,
  validateSubject,
  validateStudent,
};
