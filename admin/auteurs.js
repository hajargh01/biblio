const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user || user.role !== "ADMIN") {
  window.location.href = "../login/login.html";
}

document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("currentUser");
  window.location.href = "../login/login.html";
};

const table = document.getElementById("auteursTable");
const form = document.getElementById("auteurForm");

function getDB() {
  return JSON.parse(localStorage.getItem("db"));
}

function saveDB(db) {
  localStorage.setItem("db", JSON.stringify(db));
}

function renderAuteurs() {
  const db = getDB();
  table.innerHTML = "";

  db.auteurs.forEach((auteur) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border p-2">${auteur.nom}</td>
      <td class="border p-2">
        <button onclick="deleteAuteur(${auteur.id})"
          class="bg-red-600 text-white px-2 rounded">
          Delete
        </button>
      </td>
    `;
    table.appendChild(row);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const db = getDB();

  db.auteurs.push({
    id: Date.now(),
    nom: nom.value,
  });

  saveDB(db);
  form.reset();
  renderAuteurs();
});

function deleteAuteur(id) {
  const db = getDB();
  db.auteurs = db.auteurs.filter((a) => a.id !== id);
  saveDB(db);
  renderAuteurs();
}

renderAuteurs();
