const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user || user.role !== "ADMIN") {
  window.location.href = "../login/login.html";
}

document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("currentUser");
  window.location.href = "../login/login.html";
};

const table = document.getElementById("categoriesTable");
const form = document.getElementById("categoryForm");

function getDB() {
  return JSON.parse(localStorage.getItem("db"));
}

function saveDB(db) {
  localStorage.setItem("db", JSON.stringify(db));
}

function renderCategories() {
  const db = getDB();
  table.innerHTML = "";

  db.categories.forEach((cat) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border p-2">${cat.libelle}</td>
      <td class="border p-2">
        <button onclick="deleteCategory(${cat.id})"
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

  db.categories.push({
    id: Date.now(),
    libelle: libelle.value,
  });

  saveDB(db);
  form.reset();
  renderCategories();
});

function deleteCategory(id) {
  const db = getDB();
  db.categories = db.categories.filter((c) => c.id !== id);
  saveDB(db);
  renderCategories();
}

renderCategories();
