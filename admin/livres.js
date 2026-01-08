const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user || user.role !== "ADMIN") {
  window.location.href = "../login/login.html";
}

document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("currentUser");
  window.location.href = "../login/login.html";
};

const table = document.getElementById("booksTable");
const form = document.getElementById("bookForm");

function getDB() {
  return JSON.parse(localStorage.getItem("db"));
}

function saveDB(db) {
  localStorage.setItem("db", JSON.stringify(db));
}

function renderBooks() {
  const db = getDB();
  table.innerHTML = "";

  db.livres.forEach((livre) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="border p-2">${livre.titre}</td>
      <td class="border p-2">${livre.auteur}</td>
      <td class="border p-2">${livre.anneePublication}</td>
      <td class="border p-2">${livre.quantite}</td>
      <td class="border p-2 space-x-2">
        <button onclick="deleteLivre(${livre.id})"
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

  const livre = {
    id: Date.now(),
    titre: titre.value,
    auteur: auteur.value,
    anneePublication: Number(annee.value),
    quantite: Number(quantite.value),
  };

  db.livres.push(livre);
  saveDB(db);

  form.reset();
  renderBooks();
});

function deleteLivre(id) {
  const db = getDB();
  db.livres = db.livres.filter((l) => l.id !== id);
  saveDB(db);
  renderBooks();
}

function toggleDisponibilite(id) {
  const db = getDB();
  const livre = db.livres.find((l) => l.id === id);
  livre.disponible = !livre.disponible;
  saveDB(db);
  renderBooks();
}

renderBooks();
