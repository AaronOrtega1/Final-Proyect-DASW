const router = require("express").Router();
const {
  validateBodyTeacher,
  validateBodyGroup,
} = require("../middleware/validateData.js");
const { Group } = require("../db/groups.js");
const nanoid = require("nanoid");

router.get("/", async (req, res) => {
  let filter = {};
  let { group, department, status, students, professor } = req.query;
  if (group) {
    filter.group = new RegExp(group, "i"); //i = ignore case
  }
  if (department) {
    filter.department = new RegExp(department, "i");
  }
  if (status !== undefined) {
    filter.status = status == "true" ? true : false;
  }
  if (students) {
    filter.students = new RegExp(students, "i");
  }
  if (professor) {
    filter.professor = new RegExp(professor, "i");
  }
  let group2 = await Group.getGroup(filter);
  res.send(group2);
});

router.post("/", validateBodyGroup, async (req, res) => {
  let { group, department, status, students, professor } = req.body;
  console.log(nanoid());
  let newGroup = await Group.createGroup({
    groupID: nanoid.nanoid(),
    group,
    department,
    status,
    students,
    professor,
  });
  res.status(201).send(newGroup);
});

router.get("/:groupID", async (req, res) => {
  let { groupID } = req.params;
  let group = await Group.getGroupByID(groupID);
  res.send(asignatura);
});

router.put("/:groupID", validateBodyGroup, async (req, res) => {
  let { groupID } = req.params;
  let { group, department, status, students, professor } = req.body;
  let updatedGroup = await Group.updateGroup(groupID, {
    group,
    department,
    status,
    students,
    professor,
  });
  res.send(updatedGroup);
});

router.delete("/:groupID", async (req, res) => {
  let { groupID } = req.params;
  let deletedGroup = await Group.deleteGroup(groupID);
  res.send(deletedGroup);
});

module.exports = router;