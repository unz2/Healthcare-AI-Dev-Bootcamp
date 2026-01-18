const users = {
  name: "홍길동",
  age: 20,
  greet: function () {
    return `안녕하세요, ${this.name}`;
  },
};

console.log(users.name);
console.log(users["age"]);
console.log(users.greet());

const add = (a, b) => a + b;
console.log(add(10, 20)); // 30
