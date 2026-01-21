const map = new Map();
map.set('name', 'Alice');
map.set('age', 30);
map.set('city', 'New York');

// Accessing values
// console.log(map.get('name')); // Output: Alice
// console.log(map.get('age'));  // Output: 30

for(const [key, value] of map) {
    // console.log(key,  `:-`,value);
}


const users = [
  { id: 1, name: "Harshit", age: 22, role: "developer", salary: 60000, active: true },
  { id: 2, name: "Aman", age: 28, role: "designer", salary: 50000, active: false },
  { id: 3, name: "Neha", age: 25, role: "developer", salary: 70000, active: true },
  { id: 4, name: "Riya", age: 30, role: "manager", salary: 90000, active: true },
  { id: 5, name: "Karan", age: 21, role: "intern", salary: 20000, active: false }
];

const nums = [1, 2, 3, 4, 5];

// Create a map to store user IDs and their corresponding names
// const newnums = users.map(users.salary * 10);
// console.log(newnums); // Output: [15, 25, 35, 45, 55]


// Get an array of user ages
const q1 = users.map((user) => {
    return user.age;
});
// Create a new array with only name and role
var q2 = users.map(({name, role}) => ({name , role}))

// Increase each user’s salary by 10%
var q3 = users.map((user) => {
    return user.salary + (user.salary/10);
})

// Convert all user names to uppercase
var q4 = users.map((user) => {
    return user.name.toUpperCase();
})

// Add a new property isSenior (age > 25)
var q5 = users.map((user) => {
    return {
        ...user,
        isSenior: user.age > 25
    };
})

// Create a string like: "Harshit - developer"
var q6 = users.map((user) => {
    // return console.log(`${user.name} - ${user.role}` )
})

// Add a new field status: "ACTIVE" | "INACTIVE"
var q7 = users.map((user) => {
    return {
        ...user,
        Status: "active"
    };
})

console.log(q7);