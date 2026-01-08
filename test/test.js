console.log([1, 2, 3, 4, 5].filter((n) => n % 2 == 0));

console.log([1, 2, 3, 4, 5].map((n) => n * n));

const users = [
  {
    id: 1,
    name: "Otmane",
  },

  {
    id: 2,
    name: "Hajar",
  },
  {
    id: 3,
    name: "Nisrine",
  },
];

const user = users.filter((user) => user.id >= 2);

console.log(user);
