const db = {
  users: [
    {
      id: 1,
      username: "admin",
      password: "admin",
      role: "ADMIN",
    },
    {
      id: 2,
      username: "member",
      password: "member",
      role: "MEMBER",
    },
  ],
  livres: [],
  auteurs: [],
  categories: [],
  adherents: [],
  emprunts: [],
};

if (localStorage.getItem("db") === null) {
  localStorage.setItem("db", JSON.stringify(db));
}
