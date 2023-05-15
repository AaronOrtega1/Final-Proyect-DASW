let groups = [];
let role = sessionStorage.getItem("role");
let groupsList = document.getElementById("tbody-Groups");
let token = localStorage.getItem("token");

async function loadGroups() {
  let resp = await fetch("/api/groups/myGroups", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
  });
  groups = await resp.json();
  showGroups(groups);
}

function showGroups(list) {
  groupsList.innerHTML = list.map(
    (grp) => /*HTML*/ `
    <tr>
      <td><a href="#">${grp.groupID}</a></td>
      <td>${grp.professor}</td>
      <td>${grp.period}</td>
      <td>
        <button class="btn btn-dark" type="button" data-toggle="collapse" data-target="#desc-${grp.groupID}" aria-expanded="false" aria-controls="#desc-${grp.groupID}">
        <i class="fas fa-info-circle"></i>
        </button>
        <button class="btn btn-dark" type="button" name="editButton" data-target="#agregarGrupo" data-toggle="modal" onclick="funcionPut('${grp.groupID}')">
        <i class="fas fa-edit"></i>
        </button>
      </td>
    </tr>
  `
  );
  if (role != "admin" || role == null || role != "coord") {
    let btnsEditar = document.getElementsByName("editButton");
    for (let i = 0; i < btnsEditar.length; i++) {
      btnsEditar[i].style.display = "none";
    }
  }
}

async function addGroup() {
  let grpID = grpId.value;
  let grpName = grpName.value;
  let grpDep = grpDep.value;
  let grpStatus = grpStatus.value;
  let profName = profName.value;
  let grpPeriod = grpPeriod.value;
  let grpYear = grpYear.value;
  if (
    !grpID ||
    !grpName ||
    !grpDep ||
    !grpStatus ||
    !profName ||
    !grpPeriod ||
    !grpYear
  ) {
    alert("Por favor llene todos los campos");
  } else {
    let group = {
      groupID: grpID,
      group: grpName,
      department: grpDep,
      status: grpStatus,
      professor: profName,
      period: grpPeriod,
      year: grpYear,
    };

    if (Metodo == "PUT") {
      callPUT(group);
      return;
    }

    Metodo = "POST";

    let response = await fetch("/api/groups", {
      method: "POST",
      headers: {
        "x-token": sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(group),
    })
      .then((res) => {
        if (res.status == 201) {
          alert("Se ha agregado la group");
        } else {
          alert(
            "No se ha podido agregar la group:\n" +
              "Error: " +
              res.status +
              "\n" +
              "Mensaje: " +
              res.statusText +
              "\n"
          );
        }
      })
      .catch((error) => {
        console.log(error);
        alert("No se ha podido agregar la group");
      });

    cargaAsignaturas();
  }
}

async function callPUT(newAsignatura) {
  let response = await fetch(`/api/groups/${newAsignatura.codigo}`, {
    method: "PUT",
    headers: {
      "x-token": sessionStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAsignatura),
  })
    .then((res) => {
      if (res.status == 200) {
        alert("Se ha editado la group");
      } else {
        alert(
          "No se ha podido editar la group:\n" +
            "Error: " +
            res.status +
            "\n" +
            "Mensaje: " +
            res.statusText +
            "\n"
        );
      }
    })
    .catch((error) => {
      console.log(error);
      alert("No se ha podido editar la group");
    });
  Metodo = "POST";
  loadGroups();
}

function funcionPost() {
  let bannerModal = document.getElementById("modalGroups");
  bannerModal.innerHTML = "Añadir Grupo";
  Metodo = "POST";
  clean();
}

function funcionPut(uuid) {
  let bannerModal = document.getElementById("bannerModal");
  bannerModal.innerHTML = "Editar Grupo";
  console.log(uuid);
  Metodo = "PUT";
  cargaParametros();
  editarAsignatura(uuid);
}

function clean() {
  grpId.value = "";
  grpName.value = "";
  grpDep.value = "";
  profName.value = "";
  grpStatus.value = "";
  grpPeriod.value = "";
  grpYear.value = "";
  codigoAsignatura.disabled = false;
  deleteSubject.style.display = "none";

  cargaParametros();
}

loadGroups();
