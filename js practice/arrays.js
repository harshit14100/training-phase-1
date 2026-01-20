var myarr = [1,2,3,5,4];

var arr2 = [6,7,8,9,10];

console.log(myarr.join(arr2)); //  joins 
console.log(myarr);
console.log(arr2);

arr2.slice(2,5); // slices from index 2 to 5 but not including 5
console.log(arr2.slice(2,5)); // this wont affevct the original array

myarr.splice(1,2); // removes 2 elements from index 1
console.log(myarr);

console.log(myarr.concat(arr2)); // concatenates two arrays
// gives us a new array

// spread operator
var arr3 = [...myarr, ...arr2]; // spreads the elements of both arrays into a new array
console.log(arr3);

// flat method
var arr4 = [1,2,[3,4],[5,6], [7,8,[9,10]]];
console.log(arr4.flat(Infinity)); // flattens the array by one level

// conversion of strings and obj to arrays
var str = "hello";
console.log(Array.from(str)); // converts string to array of characters

var obj = {a:1, b:2, c:3};
console.log(Array.from(obj));

console.log(Object.keys(obj)); 