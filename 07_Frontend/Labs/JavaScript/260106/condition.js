if ({}) {
  console.log("truthy");
} else {
  console.log("falsy"); // Falsy : false, 0, "", null, undefined, Nan (6개 고정)
}

console.log("Number.isNaN(0/0): ", Number.isNaN(0 / 0)); // Number.isNaN(0/0):  true
