const router = require("express").Router();
const {
  validateBodyGroup,
  validarAdmin,
  validarToken,
} = require("../middleware/validateData.js");
const { Groups } = require("../db/groups.js");
const { Users } = require("../db/users.js");
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

router.get("/myGroups", validarToken, async (req, res) => {
  try {
    const userID = req.userID;
    console.log(
      "🚀 ~ file: groups-routes.js:39 ~ router.get ~ userID:",
      userID
    );
    const user = await User.findByID(userID);
    console.log("🚀 ~ file: groups-routes.js:45 ~ router.get ~ user:", user);
    const groups = await Groups.find({ professor: user.userID });
    console.log(
      "🚀 ~ file: groups-routes.js:46 ~ router.get ~ groups:",
      groups
    );
    res.status(200).send(groups);
  } catch (error) {
    console.log("🚀 ~ file: groups-routes.js:52 ~ router.get ~ error:", error);
    res.send(500).send("Server Error");
  }
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
  if (!req.user.isAdmin) {
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
