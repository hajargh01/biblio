const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user || user.role !== "ADMIN") {
  window.location.href = "../login/login.html";
}

document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("currentUser");
  window.location.href = "../login/login.html";
};

const adherentSelect = document.getElementById("adherentId");
const livreSelect = document.getElementById("livreId");
const table = document.getElementById("empruntsTable");
const form = document.getElementById("empruntForm");

const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");

const PAGE_SIZE = 5;
let currentPage = 1;

function getDB() {
  return JSON.parse(localStorage.getItem("db"));
}

function saveDB(db) {
  localStorage.setItem("db", JSON.stringify(db));
}

function loadSelects() {
  const db = getDB();

  adherentSelect.innerHTML = db.adherents
    .map((a) => `<option value="${a.id}">${a.nom} ${a.prenom}</option>`)
    .join("");

  livreSelect.innerHTML = db.livres
    .filter((l) => l.quantite > 0)
    .map(
      (l) =>
        `<option value="${l.id}">
          ${l.titre} (Stock: ${l.quantite})
        </option>`,
    )
    .join("");
}

function updatePagination(totalPages) {
  pageInfo.textContent = `Page ${currentPage} / ${totalPages || 1}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}
function renderEmprunts() {
  const db = getDB();
  table.innerHTML = "";

  const totalPages = Math.ceil(db.emprunts.length / PAGE_SIZE);
  currentPage = Math.min(currentPage, totalPages || 1);

  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const empruntsPage = db.emprunts.slice(start, end);

  empruntsPage.forEach((e) => {
    const adherent = db.adherents.find((a) => a.id === e.adherentId);
    const livre = db.livres.find((l) => l.id === e.livreId);

    const adherentName = adherent
      ? `${adherent.nom} ${adherent.prenom}`
      : "Unknown Adherent";
    const livreTitle = livre ? livre.titre : "Unknown Book";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border p-2">${adherentName}</td>
      <td class="border p-2">${livreTitle}</td>
      <td class="border p-2">${e.dateEmprunt}</td>
      <td class="border p-2">${e.dateRetourPrevue}</td>
      <td class="border p-2">${e.rendu ? "Rendu" : "En cours"}</td>
      <td class="border p-2">
        ${
          !e.rendu
            ? `<button onclick="retourLivre(${e.id})"
                class="bg-green-600 text-white px-2 rounded">
                Retour
              </button>`
            : ""
        }
      </td>
    `;
    table.appendChild(row);
  });

  updatePagination(totalPages);
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const db = getDB();
  const livre = db.livres.find((l) => l.id === Number(livreId.value));

  if (livre.quantite <= 0) {
    alert("Ce livre n'est plus disponible");
    return;
  }

  db.emprunts.push({
    id: Date.now(),
    adherentId: Number(adherentId.value),
    livreId: livre.id,
    dateEmprunt: new Date().toISOString().split("T")[0],
    dateRetourPrevue: dateRetour.value,
    rendu: false,
  });

  livre.quantite--;

  saveDB(db);
  form.reset();
  loadSelects();

  currentPage = 1;
  renderEmprunts();
});

function retourLivre(id) {
  const db = getDB();
  const emprunt = db.emprunts.find((e) => e.id === id);

  if (!emprunt || emprunt.rendu) return;

  emprunt.rendu = true;

  const livre = db.livres.find((l) => l.id === emprunt.livreId);
  livre.quantite++;

  saveDB(db);
  loadSelects();
  renderEmprunts();
}

prevBtn.onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    renderEmprunts();
  }
};

nextBtn.onclick = () => {
  const db = getDB();
  const totalPages = Math.ceil(db.emprunts.length / PAGE_SIZE);

  if (currentPage < totalPages) {
    currentPage++;
    renderEmprunts();
  }
};

loadSelects();
renderEmprunts();
