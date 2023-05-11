//const { Groups } = require("../db/groups");

let asignaturas = [];
let asignaturasXmostrar = [];
let numDeAsignaturas = 0;
let pagina = 1;
let limite = 2;
let tablaAsignaturas = document.getElementById('tablaAsignaturas');
let btnAnterior = document.getElementById('anteriorPag');
let btnSiguiente = document.getElementById('siguientePag');
let displayPaginador = document.getElementById('paginador');
let searchBarNavBar = document.getElementById('searchBar');
let searchButtonNavBar = document.getElementById('buscarNavBar');
let filteredSearch = document.getElementById('filteredSearch');
let filtroBusqueda = document.getElementById('filtroBusqueda');
let filteredSearchButton = document.getElementById('filteredSearchButton');
let addGroup = document.getElementById('addGroup');
let postSubject = document.getElementById('postSubject');
postSubject.addEventListener('click', agregarAsignatura);
searchButtonNavBar.addEventListener('click', buscarAsignaturaXcodigo);
filteredSearchButton.addEventListener('click', buscarAsignaturaXfiltro);
btnAnterior.addEventListener('click', anteriorPagina);
btnSiguiente.addEventListener('click', siguientePagina);
addGroup.style.display = 'none';


async function cargaAsignaturas () {
    console.log('cargando asignaturas:'+ pagina + ' ' + limite);
  let asignaturas = await fetch(`http://localhost:3000/api/asignaturas?pagina=${pagina}&limite=${limite}`,{
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
        <td>${a.depto}</td>
        <td>${a.creditos}</td>
        <td>
            <button class="btn btn-dark" type="button" data-toggle="collapse" data-target="#desc-${a.codigo}" aria-expanded="false" aria-controls="#desc-${a.codigo}">
            <i class="fas fa-info-circle"></i>
            </button>
            <button class="btn btn-dark" type="button" data-target="#agregarAsignatura" data-toggle="modal">
            <i class="fas fa-edit"></i>
        </button>
        </td>
        <div class="collapse" id="desc-${a.codigo}">
            <div class="card card-body">
            <p>${a.descripcion}</p>
            <ul>
                ${a.grupos ? a.grupos.map(g => `
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
                `).join(''): ''}
                
            </ul>
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

async function buscarAsignaturaXcodigo(){
    let codigo = searchBarNavBar.value;
    let asignaturas = await fetch(`http://localhost:3000/api/asignaturas/${codigo}`,{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
    })
    let datos = await asignaturas.json();
    if(asignaturasXmostrar.length == 0){
        asignaturasXmostrar.push(datos);
    }else{
        asignaturasXmostrar = [];
        asignaturasXmostrar.push(datos);
    }
    console.log(asignaturasXmostrar)
    muestraAsignaturas(asignaturasXmostrar);
}

async function buscarAsignaturaXfiltro(){
    let filtro = filtroBusqueda.value;
    console.log(filtro);
    if(filtro == 'Departamento'){
        filtro = 'depto';
    }else if(filtro == 'Creditos'){
        filtro = 'creditos';
        filteredSearch.value = parseInt(filteredSearch.value);
    }else if(filtro == 'Nombre'){
        filtro = 'nombre';
    }else{
        filtro ='areaAsig';
    }
    console.log(filtro + ' ' + filteredSearch.value);
    let asignaturas = await fetch(`http://localhost:3000/api/asignaturas?${filtro}=${filteredSearch.value}`,{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
    })
    let datos = await asignaturas.json();
    console.log(datos);
    muestraAsignaturas(datos);
}

async function agregarAsignatura(){
    let nombreAsignatura = document.getElementById('nombreAsignatura').value;
    let codigoAsignatura = document.getElementById('CodigoA').value;
    let areaAsignatura = document.getElementById('AreaA').value;
    let deptoAsignatura = document.getElementById('Depto').value;
    let creditosAsignatura = document.getElementById('NoCreditos').value;
    let descripcionAsignatura = document.getElementById('descripcionAsignatura').value;
    if(!nombreAsignatura || !codigoAsignatura || !areaAsignatura || !deptoAsignatura || !creditosAsignatura || !descripcionAsignatura){
        alert('Por favor llene todos los campos');
    }else{
        let asignatura = {
            nombre: nombreAsignatura,
            codigo: codigoAsignatura,
            areaAsig: areaAsignatura,
            depto: deptoAsignatura,
            creditos: creditosAsignatura,
            descripcion: descripcionAsignatura
        }

        let response = await fetch('http://localhost:3000/api/asignaturas',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(asignatura)
    }).then(res => {
        if(res.ok){
            alert('Se ha agregado la asignatura');
        }
    }).catch(error => {
        console.log(error);
    });


    
    }
    

}

cargaAsignaturas();