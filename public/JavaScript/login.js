//Status lo mandare como un true por defecto cuando se cree la cuenta
//ImageURL tambien se enviara por defecto

// const { response } = require("express");

async function login() {
  event.preventDefault();
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  let datos = { username, password };
  console.log(datos);
  let resp = await fetch("/api/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  let data = await resp.text();

  if (resp.status == 201) {
    alert("Inciaste sesion");
    //Se almacena el token
    localStorage.setItem("token", data);
    var token = localStorage.getItem("token");
    console.log(token);
    window.location.href = "administracion_coordinadores.html";
  } else {
    alert(data.error);
  }
}

async function registrarUsuario() {
  event.preventDefault();
  let fullName = document.querySelector("#fullName").value;
  let userName = document.querySelector("#username").value;
  let passWord = document.querySelector("#password").value;
  let email = document.querySelector("#email").value;
  let department = document.querySelector("#departamento").value;
  let isCoordRadios = document.querySelectorAll('input[name="isCoord"]');
  let isCoord;
  isCoordRadios.forEach((radio) => {
    if (radio.checked) {
      isCoord = radio.value;
    }
  });

  let newUser = { fullName, userName, passWord, email, department, isCoord };
  console.log(newUser);

  let token = localStorage.getItem("token");

  let resp = await fetch("/api/users", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-token": token,
    },
    body: JSON.stringify({
      fullName: fullName,
      department: department,
      status: "true",
      userName: userName,
      passWord: passWord,
      isCoord: isCoord,
      isAdmin: "false",
      email: email,
      imgURL:
        "https://www.aprendemas.com/co/blog/images/2021/10/profesor_mal_tips.jpg",
    }),
  });

  let data = await resp.json();

  if (resp.status == 201) {
    alert("Usuario registrado correctamente");
    window.location.href = "index.html";
  } else {
    alert(data.error);
  }
}

//login();
