let users = [];
let role = sessionStorage.getItem("role");
let token = localStorage.getItem("token");
let userProfile = document.getElementById("profileUser");

async function loadUsers(queryParams = "") {
  console.log("cargando usuario...");
  let resp = await fetch("/api/users/myProfile", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "x-token": token,
    },
  });
  user = await resp.json();
  console.log("🚀 ~ file: user-profile.js:9 ~ loadUsers ~ user:", user);
  showProfile(user);
}

/* const currentUser = (user) => user.userID === userID; */

function showProfile(user) {
  console.log("🚀 ~ file: user-profile.js:26 ~ showProfile ~ user:", user);
  userProfile.innerHTML = /*HTML*/ `
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
  <a class="navbar-brand" href="./profesorPerfil.html">DASW</a>
  <button
    class="navbar-toggler d-lg-none"
    type="button"
    data-toggle="collapse"
    data-target="#collapsibleNavId"
    aria-controls="collapsibleNavId"
    aria-expanded="false"
    aria-label="Toggle navigation"
  ></button>
  <div class="collapse navbar-collapse" id="collapsibleNavId">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        <div class="form-group m-1">
          <input
            type="text"
            class="form-control"
            name="searchBar"
            id="searchBar"
            aria-describedby="helpId"
            placeholder="Buscar elemento"
          />
        </div>
      </li>
      <li class="nav-item">
        <div class="m-1">
          <a
            name="buscar"
            id="buscar"
            class="btn btn-dark border border-white"
            href="#"
            role="button"
            >Buscar</a
          >
        </div>
      </li>
    </ul>
    <div>
      <a
        name="btnRegProf"
        id=""
        class="btn btn-dark"
        href="coordinador.html"
        role="button"
        ><i class="fa fa-book"></i> Registrar Prof</a
      >
    </div>
    <div>
      <a
        name="btnCoord"
        id=""
        class="btn btn-dark"
        href="administracion_coordinadores.html"
        role="button"
        ><i class="fa fa-edit"></i> Coordinadores</a
      >
    </div>
    <div>
      <a
        name=""
        id=""
        class="btn btn-dark"
        href="asignaturas.html"
        role="button"
        ><i class="fas fa-list"></i> Asignaturas</a
      >
    </div>
    <div>
      <a
        name=""
        id=""
        class="btn btn-dark"
        href="profesorPerfil.html"
        role="button"
        ><i class="fas fa-user"></i
      ></a>
    </div>
  </div>
</nav>

<div class="container emp-profile">
  <form method="post">
    <div class="row">
      <div class="col-md-4">
        <div class="profile-img">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
            alt=""
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="profile-head">
          <h5>${user.fullName}</h5>
          <h6></h6>
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active"
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
                >About</a
              >
            </li>
            <!--                 <li class="nav-item">
              <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
            </li> -->
          </ul>
        </div>
      </div>
      <div class="col-md-2"></div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="profile-work">
          <p>WORK LINK</p>
          <a href="./gruposCargo.html">Grupos a Cargo</a><br />
        </div>
      </div>
      <div class="col-md-8">
        <div class="tab-content profile-tab" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home profesorProfile"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div class="row">
              <div class="col-md-6">
                <label>User Id</label>
              </div>
              <div class="col-md-6">
                <p>${user.userID}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Name</label>
              </div>
              <div class="col-md-6">
                <p>${user.fullName}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Email</label>
              </div>
              <div class="col-md-6">
                <p>${user.email}</p>
              </div>
            </div>
            <div class="row">
            <div class="col-md-6">
              <label>Departamento</label>
            </div>
            <div class="col-md-6">
              <p>${user.deparment}</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>
  
  `;

  if (role != "admin" || role == null) {
    let btnRegProf = document.getElementsByName("btnRegProf");
    let btnCoord = document.getElementsByName("btnCoord");
    for (let i = 0; i < btnRegProf.length; i++) {
      btnRegProf[i].style.display = "none";
    }
    for (let i = 0; i < btnCoord.length; i++) {
      btnCoord[i].style.display = "none";
    }
  }
}

loadUsers();
