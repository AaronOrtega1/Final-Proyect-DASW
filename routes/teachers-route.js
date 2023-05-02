const router = require("express").Router();
const {
  validateBodyTeacher,
  validateBodyGroup,
} = require("../middleware/validateData.js");
const { Teacher } = require("../db/teacher.js");
const nanoid = require("nanoid");

router.get("/", async (req, res) => {
  let filter = {};
  let { fullName, department, birthDate, status, userName, passWord } =
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
  let teacher = await Teacher.getTeacher(filter);
  res.send(teacher);
});

router.post("/", validateBodyTeacher, async (req, res) => {
  let { fullName, department, birthDate, status, userName, passWord } =
    req.body;
  let newTeacher = await Teacher.createTeacher({
    teacherID: nanoid.nanoid(),
    fullName,
    department,
    birthDate,
    status,
    userName,
    passWord,
  });
  res.status(201).send(newTeacher);
});

router.get("/:teacherID", async (req, res) => {
  let { teacherID } = req.params;
  let teacher = await Teacher.getTeacherByID(teacherID);
  res.send(teacher);
});

router.put("/:teacherID", validateBodyTeacher, async (req, res) => {
  let { teacherID } = req.params;
  let { fullName, department, birthDate, status, userName, passWord } =
    req.body;
  let updatedTeacher = await Teacher.updateTeacher(teacherID, {
    fullName,
    department,
    birthDate,
    status,
    userName,
    passWord,
  });
  res.send(updatedTeacher);
});

router.delete("/:teacherID", async (req, res) => {
  let { teacherID } = req.params;
  let deletedTeacher = await Teacher.deleteTeacher(teacherID);
  res.send(deletedTeacher);
});

module.exports = router;
