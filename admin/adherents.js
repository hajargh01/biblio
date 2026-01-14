const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user || user.role !== "ADMIN") {
  window.location.href = "../login/login.html";
}

document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("currentUser");
  window.location.href = "../login/login.html";
};

const table = document.getElementById("adherentsTable");
const form = document.getElementById("adherentForm");

function getDB() {
  return JSON.parse(localStorage.getItem("db"));
}

function saveDB(db) {
  localStorage.setItem("db", JSON.stringify(db));
}

function renderAdherents() {
  const db = getDB();
  table.innerHTML = "";

  db.adherents.forEach((a) => {
    const userAcc = db.users.find((u) => u.id === a.id);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border p-2">${a.nom}</td>
      <td class="border p-2">${a.prenom}</td>
      <td class="border p-2">${a.email}</td>
      <td class="border p-2">${userAcc ? userAcc.username : "—"}</td>
      <td class="border p-2">${a.dateInscription}</td>
      <td class="border p-2">
        <button onclick="deleteAdherent(${a.id})"
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
  const id = Date.now();

  db.adherents.push({
    id: id,
    nom: nom.value,
    prenom: prenom.value,
    email: email.value,
    dateInscription: new Date().toISOString().split("T")[0],
  });

  db.users.push({
    id: id,
    username: username.value,
    password: password.value,
    role: "MEMBER",
  });

  saveDB(db);
  form.reset();
  renderAdherents();
});

function deleteAdherent(id) {
  const db = getDB();
  db.adherents = db.adherents.filter((a) => a.id !== id);
  db.users = db.users.filter((u) => u.id !== id);
  saveDB(db);
  renderAdherents();
}

renderAdherents();
