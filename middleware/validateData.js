function validateBodyTeacher(req, res, next) {
  let { fullName, department, birthDate, status, userName, passWord, isCoord } =
    req.body;
  if (
    fullName &&
    department &&
    birthDate &&
    status &&
    userName &&
    passWord &&
    isCoord !== undefined
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
    codigo,
    nombre,
    areaAsig,
    creditos,
    depto,
    descripcion,
  } = req.body;
  let missing = [];
  if (!codigo && !req.params.codigo){
    missing.push("codigo");
  }else if (!codigo && req.params.codigo){
    codigo = req.params.codigo;
  }
  if (!nombre) missing.push("nombre");
  if (!areaAsig) missing.push("area");
  if (!creditos) missing.push("creditos");
  if (!depto) missing.push("departamento");
  if (!descripcion) missing.push("descripcion");

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
