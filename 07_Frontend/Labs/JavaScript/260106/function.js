function add(a, b) {
  return a + b;
}

let result = add(1, 2);
console.log("result: ", result);

function even() {
  for (let i = 1; i < 11; i++) {
    if (i % 2 == 0) {
      console.log(i);
    }
  }
}

even();
