const router = require("express").Router();
//const bcrypt = require("bcryptjs");
const {
  validateBodyUser,
  validateBodyGroup,
  validarToken,
} = require("../middleware/validateData.js");
const { User } = require("../db/users.js");
const nanoid = require("nanoid");

router.get("/", validarToken, async (req, res) => {
  let filter = {};
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

router.get("/myProfile", validarToken, async (req, res) => {
  try {
    const userID = req.userID;
    const user = await User.findById(userID);

    res.status(200).send(user);
  } catch (error) {
    console.log("🚀 ~ file: users-route.js:146 ~ router.get ~ error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", validarToken, validateBodyUser, async (req, res) => {
  console.log("Este es el reqbody 1: ", req.body);
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

  //let hash = bcrypt.hashSync(passWord, 10);
  //console.log("Este es el reqbody 2: ",req.body);
  //console.log(hash);
  let newUser = await User.createUser({
    userID: nanoid.nanoid(),
    fullName,
    department,
    status,
    userName,
    passWord,
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

  //let hash = bcrypt.hashSync(passWord, 10);
  let updatedUser = await User.updateUserById(userID, {
    fullName,
    department,
    status,
    userName,
    passWord,
    isCoord,
    isAdmin,
    email,
    imgURL,
  });
  res.status(200).send(updatedUser);
});

router.delete("/:userID", validarToken, async (req, res) => {
  let { userID } = req.params;
  let deletedUser = await User.deleteUserById(userID);
  res.send(deletedUser);
});

module.exports = router;
