const router = require("express").Router();
const {
  validateBodyTeacher,
  validateBodyGroup,
  validateSubject,
  validateStudent,
} = require("../middleware/validateData.js");
const { Student } = require("../db/students.js");
const nanoid = require("nanoid");

router.get("/", async (req, res) => {
  let filter = {};
  let { fullName, email, carreer } = req.query;
  if (fullName) {
    filter.fullName = new RegExp(fullName, "i"); //i = ignore case
  }
  if (email) {
    filter.email = new RegExp(email, "i");
  }
  if (carreer) {
    filter.carreer = new RegExp(carreer, "i");
  }
  let student = await Student.getStudent(filter);
  res.send(student);
});

router.post("/", validateStudent, async (req, res) => {
  let { fullName, email, carreer } = req.body;
  let newStudent = await Student.createStudent({
    studentID: nanoid.nanoid(),
    fullName,
    email,
    carreer,
  });
  res.status(201).send(newStudent);
});

router.get("/:studentID", async (req, res) => {
  let { studentID } = req.params;
  let student = await Student.getStudentByID(studentID);
  res.send(student);
});

router.put("/:studentID", validateStudent, async (req, res) => {
  let { studentID } = req.params;
  let { fullName, email, carreer } = req.body;
  let updatedStudent = await Student.updateStudent(studentID, {
    fullName,
    email,
    carreer,
  });
  res.send(updatedStudent);
});

router.delete("/:studentID", async (req, res) => {
  let { studentID } = req.params;
  let deletedStudent = await Student.deleteStudent(studentID);
  res.send(deletedStudent);
});

module.exports = router;
