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
      <td class="border p-2">${livre.category || "—"}</td>
      <td class="border p-2">${livre.anneePublication}</td>
      <td class="border p-2">${livre.quantite}</td>
      <td class="border p-2 space-x-2">
        <button
          onclick="changeQuantite(${livre.id}, -1)"
          class="bg-gray-400 text-white px-2 rounded"
        >
          −
        </button>

        <button
          onclick="changeQuantite(${livre.id}, 1)"
          class="bg-green-600 text-white px-2 rounded"
        >
          +
        </button>

        <button
          onclick="deleteLivre(${livre.id})"
          class="bg-red-600 text-white px-2 rounded"
        >
          Delete
        </button>
      </td>
    `;

    table.appendChild(row);
  });
}

const auteurId = document.getElementById("auteurId");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const db = getDB();

  const auteur = db.auteurs.find((a) => a.id === Number(auteurId.value));
  const category = db.categories.find((c) => c.id === Number(categoryId.value));

  if (!auteur) {
    alert("Veuillez sélectionner un auteur");
    return;
  }

  if (!category) {
    alert("Veuillez sélectionner une catégorie");
    return;
  }

  const livre = {
    id: Date.now(),
    titre: titre.value,
    auteurId: auteur.id,
    auteur: auteur.nom,
    categoryId: category.id,
    category: category.libelle,
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

function changeQuantite(id, delta) {
  const db = getDB();
  const livre = db.livres.find((l) => l.id === id);

  if (!livre) return;

  livre.quantite += delta;

  // Prevent quantity from going below 0
  if (livre.quantite < 0) {
    livre.quantite = 0;
  }

  saveDB(db);
  renderBooks();
}

function renderAuteurs() {
  const db = getDB();
  const select = document.getElementById("auteurId");

  select.innerHTML = `<option value="">Sélectionner un auteur</option>`;

  db.auteurs.forEach((auteur) => {
    const option = document.createElement("option");
    option.value = auteur.id;
    option.textContent = auteur.nom;
    select.appendChild(option);
  });
}

function renderCategories() {
  const db = getDB();
  const select = document.getElementById("categoryId");

  select.innerHTML = `<option value="">Sélectionner une catégorie</option>`;

  db.categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.libelle;
    select.appendChild(option);
  });
}

renderAuteurs();
renderCategories();

renderBooks();
