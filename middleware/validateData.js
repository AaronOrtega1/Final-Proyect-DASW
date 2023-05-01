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

module.exports = { validateBodyTeacher };
