// import { Evidence } from '../db/evidence.js';

let identificador = "";
let evidences = [];
let pagina = 1;
let limite = 1;
let totalEvidences = 0;
let btnAnterior = document.getElementById("anteriorPag");
let btnSiguiente = document.getElementById("siguientePag");
let displayPaginador = document.getElementById("paginador");
let filteredSearch = document.getElementById("filteredSearch");
let filtroBusqueda = document.getElementById("filtroBusqueda");
let filteredSearchButton = document.getElementById("filteredSearchButton");
let mensajeComentario = document.getElementById("commentContent");
let postCommentButton = document.getElementById("addComment");
let closeModalButton = document.getElementById("closeButton");
let otherCloseButton = document.getElementById("otherClose");
btnAnterior.addEventListener("click", anteriorPagina);
btnSiguiente.addEventListener("click", siguientePagina);
postCommentButton.addEventListener("click", () => postComment(identificador));
postCommentButton.addEventListener("click", () => closeModal());
closeModalButton.addEventListener("click", () => closeModal());
otherCloseButton.addEventListener("click", () => closeModal());
let evidenceSpace = document.getElementById("evidenceData");
let commentSpace = document.getElementById("commentData");
let commentId;
let editButtonModal = document.getElementById("editCommentSend");
editButtonModal.addEventListener("click", () => editComment());
editButtonModal.addEventListener("click", () => closeModalEdit());
let editButtonClose = document.getElementById("EditCloseButton");
editButtonClose.addEventListener("click", () => closeModalEdit());
let editButtonOtherClose = document.getElementById("EditOtherClose");
editButtonOtherClose.addEventListener("click", () => closeModalEdit());

let editMessageModal = document.getElementById("editCommentContent");
let deleteButtonModal = document.getElementById("deleteCommentButton");
deleteButtonModal.addEventListener("click", () => deleteComment());
deleteButtonModal.addEventListener("click", () => closeModalDelete());

async function loadEvidences() {
  console.log("Loading evidences...⏳");
  evidences = await fetch(`/api/evidence?pagina=${pagina}&limite=${limite}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await evidences.json();
  evidences = data;
  console.log(data);
  numberOfEvidences();
  showEvidences(data);
  showComments(data);
}

async function showEvidences(evidences) {
  evidenceSpace.innerHTML = "";
  let evidencesToShow = evidences;
  evidencesToShow.forEach((e) => {
    const user = e.userId;
    identificador = e.codigo;
    console.log(identificador);
    console.log(user);
    const item = document.createElement("div");
    item.setAttribute("class", "d-flex justify-content-center row");
    item.setAttribute("id", "evidenceItem");
    item.innerHTML = `
        <div class="d-flex flex-column col-md-8">
            <div class="d-flex flex-row align-items-center text-left comment-top p-2 bg-white border-bottom px-4">
                <div class="profile-image"><img class="rounded-circle" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" width="70"></div>
                <div class="d-flex flex-column ml-3">
                      <div class="d-flex flex-row align-items-center align-content-center post-title" id="fechaPublicacion">
                        <h6 class="mr-2">${e.fecha}</h6>
                    </div>
                    <div class="d-flex flex-row post-title">
                        <h3>${e.titulo}</h3><span class="ml-2"></span></div>
                    <div class="d-flex flex-row align-items-center align-content-center post-title" id="nombreProfesor">
                        <h5 class="mr-2">${user.fullName}</h5>
                    </div>
                </div>
            </div>
            <div id="descripcionEvidencia" class="d-flex flex-row align-items-center text-left comment-top p-2 bg-white border-bottom px-4">
                <div class="commented-section mt-2">
                    <div class="d-flex flex-row align-items-center commented-user">
                        <h5 class="mr-2">Descripcion</h5><span class="dot mb-1"></span></div>
                    <div class="comment-text-sm" id ="descripcionEvidencia"><span>${e.descripcion}</span></div>
                    <div id = "urlEvidencia" style="margin-top: 20px;">
                        <h5>Archivos</h5>
                        <a href="${e.urlArchivo}">${e.urlArchivo}</a>
                    </div>
                </div>

            </div>
        </div>
        `;
    evidenceSpace.append(item);
  });
}

async function showComments(evidences) {
  commentSpace.innerHTML = "";
  evidences.forEach((c) => {
    const commentsToShow = c.comment;
    console.log(commentsToShow);
    commentsToShow.forEach((comment) => {
      const item = document.createElement("div");
      item.setAttribute("class", "d-flex justify-content-center row");
      item.setAttribute("id", "commentItem");
      item.innerHTML = `
            
            <div class="col-md-12 col-lg-10">
            <div class="card text-dark" id="comentarioEvidencias">
              <div class="card-body p-4">
                <div class="d-flex flex-start justify-content-between">
                  <div>
                    <img class="rounded-circle shadow-1-strong me-3" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="avatar" width="60" height="60" />
                    <div class="d-flex flex-column justify-content-between ml-3">
                      <div>
                        <h6 class="fw-bold mb-1" id="autorComentario">${comment.idUser.fullName} </h6>
                        <div class="d-flex align-items-center mb-3">
                          <p class="mb-0" id="fechaComentario">${comment.fecha}</p>
                        </div>
                        <p class="mb-0" id="mensajeComentario">${comment.mensaje}</p>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-center">
                    <button type="button" class="btn btn-sm btn-danger me-2" id="deleteCommentButton" data-comment-id="${comment.codigo}" onclick="getCommentCode(${comment.codigo})" data-target="#deleteComment" data-toggle="modal">
                      Delete
                    </button>
                    <button type="button" class="btn btn-sm btn-primary" id="editCommentButton" data-comment-id="${comment.codigo}" onclick="getCommentCode(${comment.codigo})" data-target="#editComment" data-toggle="modal">
                    Edit</button>                 
                    </div>
                </div>
              </div>
            </div>
          </div>
          
            `;
      commentSpace.append(item);
    });
  });
  // Add event listeners for all edit buttons
  document.querySelectorAll("#editCommentButton").forEach((item) => {
    item.addEventListener("click", () => {
      const commentId = item.dataset.commentId;
      getCommentCode(commentId);
    });
  });

  document.querySelectorAll("#deleteCommentButton").forEach((item) => {
    item.addEventListener("click", () => {
      const commentId = item.dataset.commentId;
      getCommentCode(commentId);
    });
  });
}
function anteriorPagina() {
  if (pagina > 1) {
    pagina--;
  }
  displayPaginador.innerHTML = `<li class="page-item active" id="paginador"><a class="page-link" href="#">${pagina}</a></li>`;
  loadEvidences();
}

function siguientePagina() {
  if (pagina < totalEvidences) {
    pagina++;
  }
  displayPaginador.innerHTML = `<li class="page-item active" id="paginador"><a class="page-link" href="#">${pagina}</a></li>`;
  loadEvidences();
}

async function numberOfEvidences() {
  let evidences = await fetch(`/api/evidence`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let datos = await evidences.json();
  console.log(datos.length);
  totalEvidences = datos.length;
}

async function postComment(codigoEvidencia) {
  let comentario = mensajeComentario.value;
  let idUser = "645ed94370e215a722eaf3bb";

  let commentData = {
    mensaje: comentario,
    idUser: idUser,
  };

  let response;
  let commentId;

  try {
    response = await fetch(`/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    if (response.ok) {
      const data = await response.json();
      commentId = data._id;
      alert("Comment added!");
    }
  } catch (err) {
    console.log(err);
    alert("Error adding comment");
    return;
  }

  let evidenceResponse = await fetch(`/api/evidence/${codigoEvidencia}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!evidenceResponse.ok) {
    console.log("Error retrieving evidence data");
    return;
  }

  const evidenceData = await evidenceResponse.json();
  evidenceData.comment.push(commentId);

  console.log(evidenceData);

  let evidence = await fetch(`/api/evidence/${codigoEvidencia}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(evidenceData),
  });

  if (evidence.ok) {
    alert("New comment added to the evidence!");
  } else {
    console.log("Error adding comment to evidence");
  }

  loadEvidences();
}

async function closeModal() {
  mensajeComentario.value = "";
  $("#newComment").modal("hide");
}

async function getCommentCode(id) {
  commentId = id;
  console.log(commentId);
}

async function editComment() {
  let comentario = editMessageModal.value;

  let commentData = {
    mensaje: comentario,
  };

  let response;

  try {
    response = await fetch(`/api/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    if (response.ok) {
      alert("Comment edited!");
    }
  } catch (err) {
    console.log(err);
    alert("Error editing comment");
    return;
  }

  loadEvidences();
}

async function closeModalEdit() {
  editMessageModal.value = "";
  $("#editComment").modal("hide");
}

async function deleteComment() {
  let response;

  try {
    response = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Comment deleted!");
    }
  } catch (err) {
    console.log(err);
    alert("Error deleting comment");
    return;
  }

  loadEvidences();
}

async function closeModalDelete() {
  $("#deleteComment").modal("hide");
}

loadEvidences();
