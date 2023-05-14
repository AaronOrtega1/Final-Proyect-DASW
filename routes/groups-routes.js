const router = require("express").Router();
const {
  validateBodyGroup,
  validarAdmin,
} = require("../middleware/validateData.js");
const { Groups } = require("../db/groups.js");
const nanoid = require("nanoid");

router.get("/", async (req, res) => {
  let filter = {};
  let { group, department, status, professor, period, year } = req.query;
  if (group) {
    filter.group = new RegExp(group, "i"); //i = ignore case
  }
  if (department) {
    filter.department = new RegExp(department, "i");
  }
  if (status !== undefined) {
    filter.status = status == "true" ? true : false;
  }
  if (professor) {
    filter.professor = new RegExp(professor, "i");
  }
  if (period) {
    filter.period = new RegExp(period, "i");
  }
  if (year) {
    filter.year = year;
  }

  let group2 = await Groups.getGroup(filter);
  res.send(group2);
});

router.post("/", validateBodyGroup, validarAdmin, async (req, res) => {
  /*   if (!req.user.isCoord) {
    res.status(401).send("Unauthorized");
    return;
  } */
  let { group, department, status, professor, period, year } = req.body;
  let newGroup = await Groups.createGroup({
    groupID: nanoid.nanoid(),
    group,
    department,
    status,
    professor,
    period,
    year,
  }).catch((err) => {
    console.log(err);
  });
  res.status(201).send(newGroup);
});

router.get("/:groupID", async (req, res) => {
  let { groupID } = req.params;
  let group = await Groups.getGroupByID(groupID);
  res.send(asignatura);
});

router.put("/:groupID", validateBodyGroup, async (req, res) => {
  if (!req.user.isCoord) {
    res.status(401).send("Unauthorized");
    return;
  }

  let { groupID } = req.params;
  let { group, department, status, professor, period, year } = req.body;
  let updatedGroup = await Groups.updateGroup(groupID, {
    group,
    department,
    status,
    professor,
    period,
    year,
  });
  res.send(updatedGroup);
});

router.delete("/:groupID", async (req, res) => {
  let { groupID } = req.params;
  let deletedGroup = await Groups.deleteGroup(groupID);
  res.send(deletedGroup);
});

module.exports = router;
