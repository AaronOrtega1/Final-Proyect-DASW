let groups = [];

let groupsList = document.getElementById("nav-tabGroups");

async function loadGroups(queryParams = "") {
  let resp = await fetch("/api/groups" + queryParams);
  groups = await resp.json();
  showGroups(groups);
}

function showGroups(list) {
  groupsList.innerHTML = list.map(
    (grp) => /*HTML*/ `
    <a
    class="nav-item nav-link active"
    id="nav-home-tab"
    data-toggle="tab"
    href="#nav-home"
    role="tab"
    aria-controls="nav-home"
    aria-selected="true"
    >Materia Equis 1</a>
  
  `
  );
}
