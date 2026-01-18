// 계산기
// 1. 숫자 두 개 변수 할당

const a = 10;
const b = 5;

// 2. 산술 연산자 변수 할당
const operator = "/";

// 3. operator에 따라서 계산해서 결과 출력

if (operator === "+") {
  console.log("a + b: ", a + b);
} else if (operator === "-") {
  console.log("a - b: ", a - b);
} else if (operator === "*") {
  console.log("a * b: ", a * b);
} else if (operator === "/") {
  console.log("a / b: ", a / b);
} else {
  console.log("지원하지 않는 연산자 입니다.");
}
