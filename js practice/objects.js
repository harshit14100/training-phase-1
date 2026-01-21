const course={
    courseName: "JavaScript Basics",
    duration: "4 weeks",
    level: "Beginner",
    instructor: "John Doe"
}

console.log("this will run first");

setInterval(()=>{
    console.log("this will run every 2 seconds");
}, 2000)

console.log("this will run before the interval, even though it is written after");

for (const key in course) {

    const element = course[key];
    console.log(key, ":-", course[key]);
}