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
  adherents: [
    {
      id: 2,
      nom: "Member",
      prenom: "User",
      email: "member@example.com",
      dateInscription: "2026-01-01",
    },
  ],
  emprunts: [],
};

if (localStorage.getItem("db") === null) {
  localStorage.setItem("db", JSON.stringify(db));
}
