let users = [];

let userProfile = document.getElementById("containerProfile");

async function loadGroups(queryParams = "") {
  let resp = await fetch("/api/users" + queryParams);
  groups = await resp.json();
  showGroups(groups);
}

const currentUser = (user) => user.userID === userID;

function showProfile(currentUser) {
  if (currentUser.isCoord) {
    userProfile.innerHTML = /*HTML*/ `
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
      name=""
      id=""
      class="btn btn-dark"
      href="coordinador.html"
      role="button"
      ><i class="fa fa-book"></i> Registrar Prof</a
    >
  </div>
  <div>
    <a
      name=""
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

<div class="container emp-profile" id="containerProfile">
<form method="post">
  <div class="row">
    <div class="col-md-4">
      <div class="profile-img">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
          alt=""
        />
        <div class="file btn btn-lg btn-primary">
          Change Photo
          <input type="file" name="file" />
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="profile-head">
        <h5>${currentUser.fullName}</h5>
        <h6>Coordinador de ${currentUser.department}</h6>
        <p class="proile-rating">RANKINGS : <span>8/10</span></p>
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
    <div class="col-md-2">
      <input
        type="submit"
        class="profile-edit-btn"
        name="btnAddMore"
        value="Edit Profile"
      />
    </div>
  </div>
  <div class="row">
    <div class="col-md-4">
      <div class="profile-work">
        <p>WORK LINK</p>
        <a href="./gruposCargo.html">Grupos a Cargo</a><br />
        <p>Dar de alta o algo asi pero en ingles xd</p>
        <a href="./actAsignar.html">Asignación de Profesores</a><br />
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
              <p>Kshiti123</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>Name</label>
            </div>
            <div class="col-md-6">
              <p>Kshiti Ghelani</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>Email</label>
            </div>
            <div class="col-md-6">
              <p>kshitighelani@iteso.mx</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>Phone</label>
            </div>
            <div class="col-md-6">
              <p>123 456 7890</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>Profession</label>
            </div>
            <div class="col-md-6">
              <p>Coordinadora de Equis Materia</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</form>
    
    
    `;
  }

  if (currentUser.isAdmin) {
  }
}
