const router = require("express").Router();
const bcrypt = require("bcryptjs");
const {
  validateBodyUser,
  validateBodyGroup,
  validarToken,
} = require("../middleware/validateData.js");
const { User } = require("../db/users.js");
const nanoid = require("nanoid");

router.get("/", validarToken, async (req, res) => {
  let filter = [];
  let {
    fullName,
    department,
    status,
    userName,
    passWord,
    isCoord,
    isAdmin,
    email,
    imgURL,
  } = req.query;

  if (fullName) {
    filter.fullName = new RegExp(fullName, "i"); //i = ignore case
  }
  if (department) {
    filter.department = new RegExp(department, "i");
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
  if (isCoord !== undefined) {
    filter.isCoord = isCoord == "true" ? true : false;
  }
  if (isAdmin !== undefined) {
    filter.isAdmin = isAdmin == "true" ? true : false;
  }
  if (email) {
    filter.email = new RegExp(email, "i");
  }
  if (imgURL) {
    filter.imgURL = new RegExp(imgURL, "i");
  }
  let user = await User.getUser(filter);
  res.send(user);
});

router.post("/", validarToken, validateBodyUser, async (req, res) => {
  let {
    fullName,
    department,
    status,
    userName,
    passWord,
    isCoord,
    isAdmin,
    email,
    imgURL,
  } = req.body;

  let hash = bcrypt.hashSync(passWord, 10);

  let newUser = await User.createUser({
    userID: nanoid.nanoid(),
    fullName,
    department,
    status,
    userName,
    passWord: hash,
    isCoord,
    isAdmin,
    email,
    imgURL,
  });

  res.status(201).send(newUser);
});

router.get("/:userID", validarToken, async (req, res) => {
  let { userID } = req.params;
  let user = await User.getUserByID(userID);
  res.send(user);
});

router.put("/:userID", validarToken, validateBodyUser, async (req, res) => {
  let { userID } = req.params;
  let {
    fullName,
    department,
    status,
    userName,
    passWord,
    isCoord,
    isAdmin,
    email,
    imgURL,
  } = req.body;

  let hash = bcrypt.hashSync(passWord, 10);
  let updatedUser = await User.updateUser(userID, {
    fullName,
    department,
    birthDate,
    status,
    userName,
    passWord: hash,
    isCoord,
    isAdmin,
    email,
    imgURL,
  });
  res.send(updatedUser);
});

router.delete("/:userID", validarToken, async (req, res) => {
  let { userID } = req.params;
  let deletedUser = await User.deleteUser(userID);
  res.send(deletedUser);
});

module.exports = router;
