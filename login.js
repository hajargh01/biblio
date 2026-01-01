const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("error");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const db = JSON.parse(localStorage.getItem("db"));

  const user = db.users.find(
    (u) => u.username === username && u.password === password,
  );

  if (user === undefined) {
    errorMsg.classList.remove("hidden");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  if (user.role === "ADMIN") {
    window.location.href = "admin-dashboard.html";
  } else {
    window.location.href = "member-dashboard.html";
  }
});
