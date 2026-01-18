let a = 10;
let b = 3;

console.log("a + b: ", a + b); // a + b:  13
console.log("a - b: ", a - b); // a - b:  7
console.log("a * b: ", a * b); // a * b:  30
console.log("a / b: ", a / b); // a / b:  3.3333333333333335
console.log("Math.floor(a / b): ", Math.floor(a / b)); // Math.floor(a / b):  3
console.log("a % b: ", a % b); // a % b:  1

console.log("10 > 5: ", 10 > 5); // 10 > 5:  true
console.log("10 < 5: ", 10 < 5); // 10 < 5:  false
console.log("10 >= 10: ", 10 >= 10); // 10 >= 10:  true
console.log("10 <= 5: ", 10 <= 5); // 10 <= 5:  false

let result1 = 10 > 5;
console.log("result: ", result1); // result:  true

let result2 = 1 == 2;
console.log("result: ", result2); // result:  false

console.log('10 == "10": ', 10 == "10"); // 10 == "10":  true
console.log('10 === "10": ', 10 === "10"); // 10 === "10":  false

let age = 20;
let hasId = true;

console.log("age >= 19 && hasId: ", age >= 19 && hasId); // age >= 19 && hasId:  true
console.log("age < 19 || hasId: ", age < 19 || hasId); // age < 19 || hasId:  true
console.log("!hasId: ", !hasId); // !hasId:  false

let firstName = "Gildong";
let lastName = "Hong";

console.log(firstName + "" + lastName); // GildongHong
console.log("Mr." + lastName); // Mr.Hong

// Template Literal
console.log(`Hello, ${firstName}`); // Hello, Gildong
