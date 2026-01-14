const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user || user.role !== "MEMBER") {
  window.location.href = "../login/login.html";
}

function getDB() {
  return JSON.parse(localStorage.getItem("db"));
}

const table = document.getElementById("empruntsTable");

function renderMyEmprunts() {
  const db = getDB();
  table.innerHTML = "";

  const myEmprunts = db.emprunts.filter((e) => e.adherentId === user.id);

  if (myEmprunts.length === 0) {
    table.innerHTML = `
      <tr>
        <td colspan="4" class="border p-4 text-center text-gray-500">
          No emprunts found
        </td>
      </tr>
    `;
    return;
  }

  myEmprunts.forEach((e) => {
    const livre = db.livres.find((l) => l.id === e.livreId);

    const today = new Date();
    const retour = new Date(e.dateRetourPrevue);

    let status = "En cours";
    let statusClass = "text-blue-600";

    if (e.rendu) {
      status = "Returned";
      statusClass = "text-green-600";
    } else if (retour < today) {
      status = "Late";
      statusClass = "text-red-600";
    }

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border p-2">${livre?.titre ?? "—"}</td>
      <td class="border p-2">${e.dateEmprunt}</td>
      <td class="border p-2">${e.dateRetourPrevue}</td>
      <td class="border p-2 font-semibold ${statusClass}">
        ${status}
      </td>
    `;

    table.appendChild(row);
  });
}

renderMyEmprunts();
