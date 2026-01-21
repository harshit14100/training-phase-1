document.querySelector('h1').innerHTML ="thats actually working!";
// Change the text of the h1 element to "thats actually working!"

const divs=document.querySelectorAll('div');
// Select all div elements in the document

let a = document.querySelector("a")
// attribute manipulation

a.setAttribute("href","https://www.google.com");
// Set the class attribute of the h1 element to "heading"

console.log(document.querySelector('a').getAttribute("href"));
// Get the href attribute of the a element

a.removeAttribute("href");
// Remove the href attribute from the a element

let b = document.createElement("p");
// Create a new p element

b.innerHTML="hey mai bahr se aaaya hu";
// Set the inner HTML of the p element

document.body.appendChild(b);
// Append the p element to the body of the document

// b.style.color="red";
// Change the color of the p element to red

b.style.fontSize="30px";
// Change the font size of the p element to 30px

b.style.fontWeight="bold";
// Change the font weight of the p element to bold

// b.classList.add("dark");
// Add the class "dark" to the p element

// b.classList.remove("dark");
// Remove the class "dark" from the p element

b.classList.toggle("dark");
// Toggle the class "dark" on the p element