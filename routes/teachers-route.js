const router = require("express").Router();
const { validateTeacherBody } = require("../middleware/validateData.js");
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

router.post("/", validateTeacherBody, async (req, res) => {
  let { fullName, department, birthDate, status, userName, passWord } =
    req.body;
  console.log(nanoid());
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

module.exports = router;
