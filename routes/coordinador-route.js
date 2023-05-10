const router = require("express").Router();
const { Teacher } = require("../db/teacher.js");
// const {validateBodyTeacher} = require('../middleware/validateData.js');
const nanoid = require("nanoid");

router.post("/", async (req, res) => {
  if (
    req.query.fullName &&
    req.query.department &&
    req.query.birthDate &&
    req.query.status &&
    req.query.userName &&
    req.query.passWord &&
    req.query.isCoord
  ) {
    let {
      fullName,
      department,
      birthDate,
      status,
      userName,
      passWord,
      isCoord,
    } = req.query;
    let newProfessor = await Teacher.createTeacher({
      teacherID: nanoid.nanoid(),
      fullName,
      department,
      birthDate,
      status,
      userName,
      passWord,
      isCoord,
    });
    console.log("Profesor Creado");
    res.status(201).send(newProfessor);
  } else {
    res.send("Error faltan atributos");
  }
});

module.exports = router;
