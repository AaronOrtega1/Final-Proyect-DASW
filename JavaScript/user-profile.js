let users = [];

let userProfile = document.getElementById("profileUser");

async function loadUsers(queryParams = "") {
  let resp = await fetch("/api/users" + queryParams);
  users = await resp.json();
  console.log(
    "🚀 ~ file: user-profile.js:8 ~ loadUsers ~ resp.json():",
    resp.json()
  );

  for (let i = 0; i < users.lenght; i++) {
    if (users[i].userID === "5U0Tk4PkUhf_Z0CcdKHWp") {
      let testUser = users[i];
      console.log(
        "🚀 ~ file: user-profile.js:16 ~ loadUsers ~ testUser:",
        testUser
      );
    }
    showProfile(testUser);
  }
}

/* const currentUser = (user) => user.userID === userID; */

function showProfile(user) {
  if (user.isCoord && !user.isAdmin) {
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
            src="user.imgURL"
            alt="Profile Picture"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="profile-head">
          <h5>${user.fullName}</h5>
          <h6>Coordinador de ${user.department}</h6>
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
                <label>Profession</label>
              </div>
              <div class="col-md-6">
                <p>Coordinadora de ${user.department}</p>
              </div>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  </form>      
  </div>

    `;
  }

  if (!user.isCoord && user.isAdmin) {
  }
}

loadUsers();
