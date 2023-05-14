const route = require("express").Router();
const { User } = require("../db/users");
const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const bcrypt = require("bcryptjs");
const validAdmins = require("../JavaScript/Tokens/validAdmins.js");

//Validar que los datos que nos pasen sean los correctos
route.post("/", async (req, res) => {
  console.log(req.body);
  let user = await User.getUserByUserName(req.body.username);
  if (!user) {
    res.status(404).send("Usuario no existe");
    return;
  }

  //Todo: comparar con usando bcrypt
  //let contra = bcrypt.hashSync(req.body.password, 10);
  if (user.passWord != req.body.password) {
    res.status(404).send("Nombre de usuario o Contraseña invalida");
    return;
  }

  let token = jwt.sign({ username: user.userName }, config.jwtSecret, {
    expiresIn: 60 * 120,
  });
  res.status(201).send(token);
  if (user.isAdmin) {
    console.log("Bienvenido Admin");
    validAdmins.push(token);
    let role = "admin";
    res.send({ token, role });
    return;
  }

  res.send({ token });
});

module.exports = route;
