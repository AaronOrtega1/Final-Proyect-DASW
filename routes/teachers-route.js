const router = require("express").Router();
const {validarToken} = require('../middleware/validateData.js');
const bcrypt = require('bcryptjs');
const {
  validateBodyTeacher,
  validateBodyGroup,
} = require("../middleware/validateData.js");
const { Teacher } = require("../db/teacher.js");
const nanoid = require("nanoid");

router.get("/", validarToken, async (req, res) => {
  let filter = {};
  let { fullName, department, birthDate, status, userName, passWord, isCoord } =
    req.query;
  if (fullName) {
    filter.fullName = new RegExp(fullName, "i"); //i = ignore case
  }
  if (department) {
    filter.department = new RegExp(department, "i");
  }
  if (birthDate) {
    filter.birthDate = new RegExp(birthDate, "i");
  }
  if (status !== undefined) {
    filter.status = status == "true" ? true : false;
  }
  if (userName) {
    filter.userName = new RegExp(userName, "i");
  }
  if (passWord) {
    filter.passWord = new RegExp(passWord, "i");
  }
  if (isCoord !== undefined){
    filter.isCoord = isCoord == 'true' ? true:false;
  }
  let teacher = await Teacher.getTeacher(filter);
  res.send(teacher);
});

router.post("/",validarToken, validateBodyTeacher, async (req, res) => {
  let { fullName, department, birthDate, status, userName, passWord, isCoord } =
    req.body;

    let hash = bcrypt.hashSync(passWord,10);

    
  let newTeacher = await Teacher.createTeacher({
    teacherID: nanoid.nanoid(),
    fullName,
    department,
    birthDate,
    status,
    userName,
    passWord: hash,
    isCoord,
  });
  res.status(201).send(newTeacher);
});

router.get("/:teacherID",validarToken, async (req, res) => {
  let { teacherID } = req.params;
  let teacher = await Teacher.getTeacherByID(teacherID);
  res.send(teacher);
});

// router.put("/:teacherID",validarToken, validateBodyTeacher, async (req, res) => {
//   let { teacherID } = req.params;
//   let { fullName, department, birthDate, status, userName, passWord, isCoord } =
//     req.body;

//   let hash = bcrypt.hashSync(passWord,10);
//   let updatedTeacher = await Teacher.updateTeacher(teacherID, {
//     fullName,
//     department,
//     birthDate,
//     status,
//     userName,
//     passWord: hash,
//     isCoord
//   });
//   res.send(updatedTeacher);
// });

router.delete("/:teacherID",validarToken, async (req, res) => {
  let { teacherID } = req.params;
  let deletedTeacher = await Teacher.deleteTeacher(teacherID);
  res.send(deletedTeacher);
});

module.exports = router;
