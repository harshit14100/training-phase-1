var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var filteredarr = arr.filter((value) => {
  return value > 2 && value < 9;
});

// console.log(filteredarr);

const users = [
  {
    id: 1,
    name: "Harshit",
    age: 22,
    role: "developer",
    salary: 60000,
    active: true,
  },
  {
    id: 2,
    name: "Aman",
    age: 28,
    role: "designer",
    salary: 50000,
    active: false,
  },
  {
    id: 3,
    name: "Neha",
    age: 25,
    role: "developer",
    salary: 70000,
    active: true,
  },
  {
    id: 4,
    name: "Riya",
    age: 30,
    role: "manager",
    salary: 90000,
    active: true,
  },
  {
    id: 5,
    name: "Karan",
    age: 21,
    role: "intern",
    salary: 20000,
    active: false,
  },
];

// Get all active users
var q1 = users.filter((user) => {
  return user.active;
});

// Get users whose age is greater than 25
var q2 = users.filter((user) => {
  return user.age > 25;
});

//  Get users with role "developer"
var q3 = users.filter((user) => {
  return user.role === "developer";
});

//  Get users with salary above 50000
var q4 = users.filter((user) => {
  return user.salary >= 50000;
});

//  Get inactive users
var q5 = users.filter((user) => {
  return user.active === false;
});

//  Get users whose name starts with "R"
var q6 = users.filter((user) => {
  return user.name.charAt(0) === "R";
});

// Get users who are active developers
var q7 = users.filter((user) => {
  return user.active === true && user.role === "developer";
});

// Get users who are not interns
var q8 = users.filter((user) => {
  return user.role !== "intern";
});


console.log(q8);
