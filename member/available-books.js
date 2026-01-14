const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user || user.role !== "MEMBER") {
  window.location.href = "../login/login.html";
}

function getDB() {
  return JSON.parse(localStorage.getItem("db"));
}

function saveDB(db) {
  localStorage.setItem("db", JSON.stringify(db));
}

const table = document.getElementById("booksTable");

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
      <td class="border p-2">
        ${
          livre.quantite > 0
            ? `<button onclick="borrowBook(${livre.id})"
                class="bg-green-600 text-white px-3 py-1 rounded">
                Borrow
              </button>`
            : `<span class="text-red-600 font-semibold">Unavailable</span>`
        }
      </td>
    `;

    table.appendChild(row);
  });
}

function borrowBook(livreId) {
  const db = getDB();
  const livre = db.livres.find((l) => l.id === livreId);

  if (!livre || livre.quantite <= 0) return;

  db.emprunts.push({
    id: Date.now(),
    adherentId: user.id,
    livreId: livre.id,
    dateEmprunt: new Date().toISOString().split("T")[0],
    dateRetourPrevue: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    rendu: false,
  });

  livre.quantite--;

  saveDB(db);
  renderBooks();
}

renderBooks();
