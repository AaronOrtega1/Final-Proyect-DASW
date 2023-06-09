let asignaturasXmostrar = [];
let numDeAsignaturas = 0;
let pagina = 1;
let limite = 4;
let tablaAsignaturas = document.getElementById("tablaAsignaturas");
let btnAnterior = document.getElementById("anteriorPag");
let btnSiguiente = document.getElementById("siguientePag");
let displayPaginador = document.getElementById("paginador");
let searchBarNavBar = document.getElementById("searchBar");
let searchButtonNavBar = document.getElementById("buscarNavBar");
let filteredSearch = document.getElementById("filteredSearch");
let filtroBusqueda = document.getElementById("filtroBusqueda");
let filteredSearchButton = document.getElementById("filteredSearchButton");
let addGroup = document.getElementById("addGroup");
let postSubject = document.getElementById("postSubject");

let Metodo = "POST";
let Hanger = "";

let codigoAsignatura = document.getElementById("CodigoA");
let nombreAsignatura = document.getElementById("nombreAsignatura");
let descripcionAsignatura = document.getElementById("descripcionAsignatura");
let areaAsignatura = document.getElementById("AreaA");
let coordAsignatura = document.getElementById("listaCoordinadores");
let creditosAsignatura = document.getElementById("NoCreditos");

let deleteSubject = document.getElementById("deleteSubject");

deleteSubject.addEventListener("click", eliminarAsignatura);
postSubject.addEventListener("click", agregarAsignatura);
searchButtonNavBar.addEventListener("click", buscarAsignaturaXcodigo);
filteredSearchButton.addEventListener("click", buscarAsignaturaXfiltro);
btnAnterior.addEventListener("click", anteriorPagina);
btnSiguiente.addEventListener("click", siguientePagina);

deleteSubject.style.display = "none";

let coordinadores = [];

let role = "admin";

async function cargaAsignaturas() {
  console.log("cargando asignaturas:" + pagina + " " + limite);
  let asignaturas = await fetch(
    `/api/asignaturas?pagina=${pagina}&limite=${limite}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let datos = await asignaturas.json();
  console.log(datos);
  totalAsignaturas();

  let listaCoordinadores = await fetch(`/api/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": localStorage.token,
    },
  });
  let datosCoordinadores = await listaCoordinadores.json();
  console.log(datosCoordinadores);
  coordinadores = datosCoordinadores;

  if (role != "admin" || role == null) {
    role = "user";
    let btnAgregarAsignatura = document.getElementById("agregarElemento");
    btnAgregarAsignatura.style.display = "none";
  } else {
    let btnAgregarAsignatura = document.getElementById("agregarElemento");
    btnAgregarAsignatura.style.display = "block";
  }

  muestraAsignaturas(datos);
}

async function muestraAsignaturas(listaXmostrar) {
  tablaAsignaturas.innerHTML = listaXmostrar
    .map(
      (a) => /*HTML*/ `
    <tr>
        <td>${a.codigo}</td>
        <td>${a.nombre}</td>
        <td>${a.areaAsig}</td>
        <td>${a.coordinador}</td>
        <td>${a.creditos}</td>
        <td>
            <button class="btn btn-dark" type="button" data-toggle="collapse" data-target="#desc-${
              a.codigo
            }" aria-expanded="false" aria-controls="#desc-${a.codigo}">
            <i class="fas fa-info-circle"></i>
            </button>
            <button class="btn btn-dark" type="button" name="editButton" data-target="#agregarAsignatura" data-toggle="modal" onclick="funcionPut('${
              a.codigo
            }')">
            <i class="fas fa-edit"></i>
        </button>
        </td>
        <div class="collapse" id="desc-${a.codigo}">
            <div class="card card-body">
            <p>${a.descripcion}</p>
            <ul>
                ${
                  a.grupos
                    ? a.grupos
                        .map(
                          (g) => `
                <li>  <button class="btn btn-light" type="button" data-toggle="collapse" data-target="#desc-${g.groupID}" aria-expanded="false" aria-controls="#desc-${g.groupID}">
                <i class="fas fa-info-circle">Grupo ${g.professor}</i>
                </button>
                <div class="collapse" id="desc-${g.groupID}">
                    <div class="card card-body">
                    <p>Profesor: ${g.professor}</p>
                    <p>Periodo: ${g.period}</p>
                    <p>Año: ${g.year}</p>
                </div>
            </div>
                `
                        )
                        .join("")
                    : ""
                }
                
            </ul>
            </div>
        </div>
    </tr>
    `
    )
    .join("");

  if (role != "admin" || role == null) {
    let btnsEditar = document.getElementsByName("editButton");
    for (let i = 0; i < btnsEditar.length; i++) {
      btnsEditar[i].style.display = "none";
    }
  }
}

function anteriorPagina() {
  if (pagina > 1) {
    pagina--;
  }
  displayPaginador.innerHTML = `<li class="page-item active" id="paginador"><a class="page-link" href="#">${pagina}</a></li>`;
  cargaAsignaturas();
}

function siguientePagina() {
  if (pagina < numDeAsignaturas / limite) {
    pagina++;
  }
  displayPaginador.innerHTML = `<li class="page-item active" id="paginador"><a class="page-link" href="#">${pagina}</a></li>`;
  cargaAsignaturas();
}

async function buscarAsignaturaXcodigo() {
  let codigo = searchBarNavBar.value;
  let asignaturas = await fetch(`/api/asignaturas/${codigo}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let datos = await asignaturas.json();
  if (asignaturasXmostrar.length == 0) {
    asignaturasXmostrar.push(datos);
  } else {
    asignaturasXmostrar = [];
    asignaturasXmostrar.push(datos);
  }
  console.log(asignaturasXmostrar);
  muestraAsignaturas(asignaturasXmostrar);
}

async function buscarAsignaturaXfiltro() {
  let filtro = filtroBusqueda.value;
  console.log(filtro);
  if (filtro == "Coordinador") {
    filtro = "coordinador";
  } else if (filtro == "Creditos") {
    filtro = "creditos";
    filteredSearch.value = parseInt(filteredSearch.value);
  } else if (filtro == "Nombre") {
    filtro = "nombre";
  } else {
    filtro = "areaAsig";
  }
  console.log(filtro + " " + filteredSearch.value);
  let asignaturas = await fetch(
    `/api/asignaturas?${filtro}=${filteredSearch.value}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let datos = await asignaturas.json();
  console.log(datos);
  muestraAsignaturas(datos);
}

function limpiarCampos() {
  codigoAsignatura.value = "";
  nombreAsignatura.value = "";
  descripcionAsignatura.value = "";
  coordAsignatura.value = "";
  creditosAsignatura.value = "";
  codigoAsignatura.disabled = false;
  deleteSubject.style.display = "none";
  cargaParametros();
}

async function agregarAsignatura() {
  let nombreAsig = nombreAsignatura.value;
  let codigoAsig = codigoAsignatura.value;
  let areaAsig = areaAsignatura.value;
  let CoordinadorAsig = coordAsignatura.value;
  let creditosAsig = creditosAsignatura.value;
  let descripcionAsig = descripcionAsignatura.value;
  if (
    !nombreAsig ||
    !codigoAsig ||
    !areaAsig ||
    !CoordinadorAsig ||
    !creditosAsig ||
    !descripcionAsig
  ) {
    alert("Por favor llene todos los campos");
  } else if (
    isNaN(creditosAsig) ||
    creditosAsig < 1 ||
    creditosAsig > 40 ||
    creditosAsig % 1 != 0
  ) {
    alert("Este no es un numero de creditos valido");
  } else if (codigoAsig.length != 6) {
    alert("El codigo de la asignatura debe tener 6 caracteres");
  } else {
    let asignatura = {
      nombre: nombreAsig,
      codigo: codigoAsig,
      areaAsig: areaAsig,
      coordinador: CoordinadorAsig,
      creditos: creditosAsig,
      descripcion: descripcionAsig,
    };

    if (Metodo == "PUT") {
      callPUT(asignatura);
      return;
    }

    Metodo = "POST";

    let response = await fetch("/api/asignaturas", {
      method: "POST",
      headers: {
        "x-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(asignatura),
    })
      .then((res) => {
        if (res.status == 201) {
          alert("Se ha agregado la asignatura");
        } else {
          alert(
            "No se ha podido agregar la asignatura:\n" +
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
        alert("No se ha podido agregar la asignatura");
      });

    cargaAsignaturas();
  }
}

function funcionPost() {
  let bannerModal = document.getElementById("bannerModal");
  bannerModal.innerHTML = "Añadir Asignatura";
  Metodo = "POST";
  limpiarCampos();
}

function funcionPut(uuid) {
  let bannerModal = document.getElementById("bannerModal");
  bannerModal.innerHTML = "Editar Asignatura";
  console.log(uuid);
  Metodo = "PUT";
  cargaParametros();
  editarAsignatura(uuid);
}

async function totalAsignaturas() {
  let asignaturas = await fetch(`/api/asignaturas`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let datos = await asignaturas.json();
  console.log(datos.length);
  numDeAsignaturas = datos.length;
}

async function editarAsignatura(uuid) {
  codigoAsignatura.disabled = true;
  deleteSubject.style.display = "block";
  codigoAsignatura.ariaReadOnly = true;
  console.log("entro a editar: " + uuid);
  let asignatura = await fetch(`/api/asignaturas/${uuid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let datos = await asignatura.json();
  console.log(datos);
  $("#nombreAsignatura").val(datos.nombre);
  $("#CodigoA").val(datos.codigo);
  $("#AreaA").val(datos.areaAsig);
  $("#listaCoordinadores").val(datos.listaCoordinadores);
  $("#NoCreditos").val(datos.creditos);
  $("#descripcionAsignatura").val(datos.descripcion);

  Metodo = "PUT";
  Hanger = datos.codigo;
}

async function callPUT(newAsignatura) {
  let response = await fetch(`/api/asignaturas/${newAsignatura.codigo}`, {
    method: "PUT",
    headers: {
      "x-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAsignatura),
  })
    .then((res) => {
      if (res.status == 200) {
        alert("Se ha editado la asignatura");
      } else {
        alert(
          "No se ha podido editar la asignatura:\n" +
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
      alert("No se ha podido editar la asignatura");
    });
  Metodo = "POST";
  cargaAsignaturas();
}

async function eliminarAsignatura() {
  let uuid = Hanger;
  let response = await fetch(`/api/asignaturas/${uuid}`, {
    method: "DELETE",
    headers: {
      "x-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("Se ha eliminado la asignatura con codigo: " + uuid);
      }
    })
    .catch((error) => {
      console.log(error);
      alert("No se ha podido eliminar la asignatura");
    });
  Metodo = "POST";
  cargaAsignaturas();
}

async function cargaParametros() {
  try {
    const response = await fetch("/api/asignaturas/areas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    areaAsignatura.innerHTML = data
      .map((area) => `<option value="${area.nombre}">${area.nombre}</option>`)
      .join("");
  } catch (error) {
    console.error(error);
  }

  let sonCoord = coordinadores.filter((coord) => coord.isCoord === true);
  coordAsignatura.innerHTML = sonCoord
    .map(
      (coord) => `<option value="${coord.fullName}">${coord.fullName}</option>`
    )
    .join("");
}

cargaAsignaturas();
