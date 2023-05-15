//Status lo mandare como un true por defecto cuando se cree la cuenta
//ImageURL tambien se enviara por defecto

// const { response } = require("express");

async function login(){
    event.preventDefault();
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    // let userName = document.querySelector("#username").value;
    // let email = document.querySelector("#email").value;
    // let department = document.querySelector("#Hidden").value;
    // let isAdmin = document.querySelector('input[type="radio"][name="isAdmin"]').value;
    // let isCoord = document.querySelector('input[type="radio"][name="isCoord"]').value;

    let newUser = {username, password};
    // let newUser = {fullName, passWord, userName, email, department, isAdmin, isCoord};
    console.log(newUser);
    let resp = await fetch("http://localhost:3000/api/login",{
        method: "POST",
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify(newUser)
    })
    
    let data = await resp.text()

    if (resp.status == 201){
        alert("Inciaste sesion")
        //Se almacena el token
        localStorage.setItem("token",data)
        var token = localStorage.getItem("token");
        console.log(token);
        //loadTasks();
      }else{
        alert(data.error)
      }
async function registrarUsuario(){}
    
}

//login();