let numbers = [10, 20, 30, "one", "two"];

console.log("numbers[0]: ", numbers[0]); // 10
console.log("numbers[1]: ", numbers[1]); // 20
console.log("numbers[3]: ", numbers[3]); // one

// 1. For index
for (let i = 0; i <= numbers.length; i++) {
  console.log(numbers[i]);
}

// 2. For...of
for (const num of numbers) {
  console.log(num);
}

// 3. forEach
numbers.forEach((num) => {
  console.log(num);
});

// 4. entries()
for (const [i, num] of numbers.entries()) {
  console.log(i, num);
}
