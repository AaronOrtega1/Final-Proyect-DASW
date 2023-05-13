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
let bannerModal = document.getElementById('bannerModal');
let Metodo = 'POST';
let Hanger = '';

let codigoAsignatura = document.getElementById('CodigoA');
let nombreAsignatura = document.getElementById('nombreAsignatura');
let descripcionAsignatura = document.getElementById('descripcionAsignatura');
let areaAsignatura = document.getElementById('AreaA');
let deptoAsignatura = document.getElementById('Depto');
let creditosAsignatura = document.getElementById('NoCreditos');

let deleteSubject = document.getElementById('deleteSubject');

deleteSubject.addEventListener('click', eliminarAsignatura);
postSubject.addEventListener('click', agregarAsignatura);
searchButtonNavBar.addEventListener('click', buscarAsignaturaXcodigo);
filteredSearchButton.addEventListener('click', buscarAsignaturaXfiltro);
btnAnterior.addEventListener('click', anteriorPagina);
btnSiguiente.addEventListener('click', siguientePagina);

addGroup.style.display = 'none';
deleteSubject.style.display = 'none';

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
    totalAsignaturas();
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
            <button class="btn btn-dark" type="button" data-target="#agregarAsignatura" data-toggle="modal" onclick="funcionPut('${a.codigo}')">
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
    if(pagina < numDeAsignaturas/limite){
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

function limpiarCampos() {
    codigoAsignatura.value = '';
    nombreAsignatura.value = '';
    descripcionAsignatura.value = '';
    areaAsignatura.value = '';
    deptoAsignatura.value = '';
    creditosAsignatura.value = '';
    codigoAsignatura.disabled = false;
    deleteSubject.style.display = 'none';
}

async function agregarAsignatura(){
    let nombreAsig = nombreAsignatura.value;
    let codigoAsig = codigoAsignatura.value;
    let areaAsig = areaAsignatura.value;
    let deptoAsig = deptoAsignatura.value;
    let creditosAsig = creditosAsignatura.value;
    let descripcionAsig = descripcionAsignatura.value;
    if(!nombreAsig || !codigoAsig || !areaAsig || !deptoAsig || !creditosAsig || !descripcionAsig){
        alert('Por favor llene todos los campos');
    }else if(isNaN(creditosAsig) || creditosAsig < 1 || creditosAsig > 40 || creditosAsig % 1 != 0){
        alert('Este no es un numero de creditos valido');
    }else if(codigoAsig.length != 6){
        alert('El codigo de la asignatura debe tener 6 caracteres');
    }else{
        let asignatura = {
            nombre: nombreAsig,
            codigo: codigoAsig,
            areaAsig: areaAsig,
            depto: deptoAsig,
            creditos: creditosAsig,
            descripcion: descripcionAsig
        }

    if(Metodo == 'PUT'){
        callPUT(asignatura);
        return;
    }

    Metodo = 'POST';

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
        alert('No se ha podido agregar la asignatura');
    });

    cargaAsignaturas();
    
    }
    

}

async function totalAsignaturas(){
    let asignaturas = await fetch(`http://localhost:3000/api/asignaturas`,{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
    })
    let datos = await asignaturas.json();
    console.log(datos.length);
    numDeAsignaturas = datos.length;
}

function funcionPost(){
    bannerModal.innerHTML = 'Añadir Asignatura';
    limpiarCampos();
}

function funcionPut(uuid){
    bannerModal.innerHTML = 'Editar Asignatura';
    console.log(uuid);
    editarAsignatura(uuid);
}

async function editarAsignatura(uuid){
    codigoAsignatura.disabled = true;
    deleteSubject.style.display = 'block';
    codigoAsignatura.ariaReadOnly = true;
    console.log("entro a editar: "+uuid);
    let asignatura = await fetch(`http://localhost:3000/api/asignaturas/${uuid}`,{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
    })
    let datos = await asignatura.json();
    console.log(datos);
    $('#nombreAsignatura').val(datos.nombre);
    $('#CodigoA').val(datos.codigo);
    $('#AreaA').val(datos.areaAsig);
    $('#Depto').val(datos.depto);
    $('#NoCreditos').val(datos.creditos);
    $('#descripcionAsignatura').val(datos.descripcion);

    Metodo = 'PUT'; 
    Hanger = datos.codigo;

}

async function callPUT(newAsignatura){
    let response = await fetch(`http://localhost:3000/api/asignaturas/${newAsignatura.codigo}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAsignatura)
    }).then(res => {
        if(res.ok){
            alert('Se ha editado la asignatura');
        }
    }).catch(error => {
        console.log(error);
        alert('No se ha podido editar la asignatura');
    });
    Metodo = 'POST';
    cargaAsignaturas();
}

async function eliminarAsignatura(){
    let uuid = Hanger;
    let response = await fetch(`http://localhost:3000/api/asignaturas/${uuid}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if(res.ok){
            alert('Se ha eliminado la asignatura con codigo: ' + uuid);
        }
    }).catch(error => {
        console.log(error);
        alert('No se ha podido eliminar la asignatura');
    });
    Metodo = 'POST';
    cargaAsignaturas();
}


cargaAsignaturas();