let asignaturas = [];
let asignaturasXmostrar = [];
let numDeAsignaturas = 0;
let pagina = 1;
let limite = 2;
let tablaAsignaturas = document.getElementById('tablaAsignaturas');
let btnAnterior = document.getElementById('anteriorPag');
let btnSiguiente = document.getElementById('siguientePag');
let displayPaginador = document.getElementById('paginador');
btnAnterior.addEventListener('click', anteriorPagina);
btnSiguiente.addEventListener('click', siguientePagina);


async function cargaAsignaturas () {
    console.log('cargando asignaturas:'+ pagina + ' ' + limite);
  let asignaturas = await fetch(`http://localhost:4000/api/asignaturas?pagina=${pagina}&limite=${limite}`,{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
  }
    })
  let datos = await asignaturas.json();
    console.log(datos);
    numDeAsignaturas = datos.length;
    muestraAsignaturas(datos);
}

async function muestraAsignaturas(listaXmostrar){
    tablaAsignaturas.innerHTML = listaXmostrar.map(a => `
    <tr>
        <td>${a.codigo}</td>
        <td>${a.nombre}</td>
        <td>${a.areaAsig}</td>
        <td>${a.creditos}</td>
        <td>${a.depto}</td>
        <td>
            <button class="btn btn-dark" type="button" data-toggle="collapse" data-target="#desc${a.nombre}" aria-expanded="false" aria-controls="desc-Asignatura-1">
            <i class="fas fa-info-circle"></i>
            </button>
            <button class="btn btn-dark" type="button" data-target="#agregarAsignatura" data-toggle="modal">
            <i class="fas fa-edit"></i>
        </button>
        </td>
        <div class="collapse" id="desc${a.nombre}">
            <div class="card card-body">
            <p>${a.descripcion}</p>
            </div>
        </div>
    </tr>
    `).join('');
}

function anteriorPagina(){
    if(pagina > 1){
        pagina--;
    }
    displayPaginador.innerHTML = `<li class="page-item active" id="paginador"><a class="page-link" href="#">${pagina}</a></li>`;
    cargaAsignaturas();
}

function siguientePagina(){
    if(pagina < numDeAsignaturas){
        pagina++;
    }
    displayPaginador.innerHTML = `<li class="page-item active" id="paginador"><a class="page-link" href="#">${pagina}</a></li>`
    cargaAsignaturas();
}

cargaAsignaturas();