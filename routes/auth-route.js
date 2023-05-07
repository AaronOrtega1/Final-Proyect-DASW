const route = require("express").Router();
const { Teacher } = require("../db/teacher.js");
const jwt = require("jsonwebtoken");
const config = require("../config/config.js");

//Validar que los datos que nos pasen sean los correctos
route.post("/", async (req, res) => {
  console.log(req.body);
  let user = await Teacher.getTeacherByUserName(req.body.username);
  if (!user) {
    res.send("Usuario no existe");
    return;
  }

  //Todo: comparar con usando bcrypt
  if (user.passWord != req.body.password) {
    res.status(404).send("Nombre de usuario o Contraseña invalida");
    return;
  }

  let token = jwt.sign({ username: user.userName },
                         config.jwtSecret, 
                         {expiresIn: 60 * 15},);
  res.send( {token} );
});

module.exports = route;
