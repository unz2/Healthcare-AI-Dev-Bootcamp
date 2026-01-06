# JavaScript 기초

> 🗓️ **2026-01-06**  
> ✍🏼 **작성자 : unz**

## 📝 목차

---

## 1. 자료형(Data Types)

> JavaScript는 동적 타입 언어로, 변수 선언 시 값에 따라 자동으로 타입이 결정된다.

### 1-1. Number

> 숫자 데이터를 표현하는 자료형  
> 정수(integer)와 실수(float)를 구분하지 않고 모두 number 타입으로 처리

```js
let a = 10;
let b = 3.14;

console.log(a + b); // 13.14
console.log(typeof a); // number
console.log(typeof b); // number
```

### 1-2. String

> 문자 데이터를 표현하는 자료형  
> 작은따옴표(' '), 큰따옴표(" "), 백틱(`) 사용 가능

```js
let str1 = "Hello";
let str2 = "JavaScript";
let str3 = `Hello, ${str2}`; // Template Literal

console.log(str1); // Hello
console.log(str2); // JavaScript
console.log(str3); // Hello, JavaScript
console.log(typeof str1); // string
console.log(typeof str2); // string
console.log(typeof str3); // string
```

### 1-3. Boolean

> 논리적인 참(true)과 거짓(false)을 표현하는 자료형

```js
let isAdult = true;
let hasTicket = false;

console.log(isAdult); // true
console.log(hasTicket); // false
console.log(typeof isAdult); // boolean
console.log(typeof hasTicket); // boolean
```

### 1-4. null

> 값이 비어있음을 의도적으로 명시하는 자료형

```js
let selectedUser = null;

console.log(selectedUser); // null
console.log(typeof selectedUser); // object
```

### 1-5. undefined

> 값이 할당되지 않은 상태  
> JavaScript 엔진이 자동으로 부여하는 초기값

```js
let score;

console.log(score); // undefined
console.log(typeof score); // undefined
```

### 1-6. null vs undefined

- **null**: 개발자가 의도적으로 값이 없음을 대입한 상태
- **undefined**: 선언은 되었으나 아직 값이 지정되지 않은 최초의 상태

```js
console.log(null == undefined); // true (값의 의미가 비슷함)
console.log(null === undefined); // false (자료형 자체가 다름)
```

## 2. 연산자(Operator)

### 2-1. 산술연산자

- `+` : 덧셈
- `-` : 뺼셈
- `*` : 곱셈
- `**` : 거듭제곱
- `/` : 나눗셈
- `%` : 나머지
- `Math.floor(a / b)` : 몫

```js
let a = 10;
let b = 3;

console.log(a + b); // 13
console.log(a - b); // 7
console.log(a * b); // 30
console.log(a ** b); // 1000
console.log(a / b); // 3.3333333333333335
console.log(a % b); // 1
console.log(Math.floor(a / b)); // 3
```

### 2-2. 비교 연산자

> 두 값을 비교하여 Boolean 값 반환

- `>`, `<`, `>=`, `<=`

```js
console.log(10 > 5); // true
console.log(10 < 5); // false
console.log(10 >= 10); // true
console.log(10 <= 5); // false

let result = 10 > 5;
console.log(result); // true
```

### 2-3. 동등/일치 연산자

> 두 값이 같은지 확인

- `동등(==)`: 자료형이 달라도 값이 같으면 true
- `일치(===)`: 값과 자료형이 모두 같아야 true

```js
console.log('10 == "10": ', 10 == "10"); // 10 == "10":  true
console.log('10 === "10": ', 10 === "10"); // 10 === "10":  false

let result2 = 1 == 2;
console.log("result: ", result2); // result:  false
```

### 2-4. 논리 연산자

- `&&` (AND): 모든 조건이 true일 때 true
- `||` (OR): 하나라도 true이면 true
- `!` (NOT): 값을 반전 (true → false)

```js
let age = 20;
let hasId = true;

console.log(age >= 19 && hasId); // true
console.log(age < 19 || hasId); // true
console.log(!hasId); // false
```

### 2-5. 문자열 연산자

> `+` 기호를 사용하여 문자열을 연결할 수 있다.  
> 숫자와 문자열을 더하면 숫자가 문자열로 변환되어 연결된다.

```js
let firstName = "길동";
let lastName = "홍";
console.log(lastName + firstName); // "홍길동"
console.log("나이: " + 20); // "나이: 20" (문자열 연결)
```

### 2-6. 증감 연산자

- `++var` : 값을 먼저 1 증가시킨 후, 나머지 연산을 수행
- `var++` : 현재 값을 먼저 사용한 후, 나중에 값을 1 증가
- `--var` : 값을 먼저 1 감소시킨 후, 나머지 연산을 수행
- `var--` : 현재 값을 먼저 사용한 후, 나중에 값을 1 감소

```js
let a = 5;
let b = ++a; // a가 6이 되고, b에 6이 할당됨
console.log(a, b); // 6, 6

let x = 5;
let y = x++; // y에 현재 x값인 5가 먼저 할당되고, 그 후 x가 6이 됨
console.log(x, y); // 6, 5
```

### 2-7. 대입 연산자

> 오른쪽의 값을 왼쪽 변수에 할당한다.  
> 산술 연산과 결합하여 복합 대입 연산자를 사용할 수 있다.

| 연산자 |   예시   |  동일 표현  |
| :----: | :------: | :---------: |
|  `=`   | `a = b`  |   `a = b`   |
|  `+=`  | `a += b` | `a = a + b` |
|  `-=`  | `a -= b` | `a = a - b` |
|  `*=`  | `a *= b` | `a = a * b` |
|  `/=`  | `a /= b` | `a = a / b` |
|  `%=`  | `a %= b` | `a = a % b` |

## 3. 조건문

### 3-1. if else 문

- `if` : 조건이 참일때 실행
- `else if` : 앞의 조건이 거짓이고, 새로운 조건이 참일 떄 실행
- `else` : 모든 조건이 거짓일 떄 실행

```js
if (score >= 90 && submitted) {
  console.log("합격");
} else if (score >= 70 && attendance >= 80 && submitted) {
  console.log("합격");
} else {
  console.log("불합격");
}
```

### 3-2. 삼항 연산자(Ternary Operator)

> `if...else` 문을 한 줄로 간결하게 표현할 때 사용한다.

- `조건식 ? 참일 때 : 거짓일 떄`

```js
let age = 20;
let message = age >= 18 ? "성인" : "미성년자";

console.log(message); // 성인
```

### 3-3. Switch 문

> 하나의 변수를 여러가지 값과 비교해야할 때 사용한다.

- `break` 를 생략하면 다음 case문이 연달아 실행되는 현상이 발생한다.
- switch문은 값을 비교할때 일치연산자(`===`)를 사용하므로, 데이터타입까지 정확히 일치해야한다.

```js
let fruit = "사과";

switch (fruit) {
  case "사과":
    console.log("사과는 빨간색입니다.");
    break;
  case "바나나":
    console.log("바나나는 노란색입니다.");
    break;
  default:
    console.log("색깔을 알 수 없는 과일입니다.");
}
```

## 4. Falsy

> Boolean 문맥에서 `false`로 평가되는 값  
> 아래 값 제외한 모든 값은 `true`로 평가

- `false`
- `0`
- `""`
- `null`
- `undefined`
- `NaN`

```js
if ("") {
  console.log("truthy");
} else {
  console.log("falsy");
}
//falsy

if ("0") {
  console.log("truthy");
} else {
  console.log("falsy");
}
//truthy
```

## 5. 반복문(Loops)

> 동일한 코드 블록을 특정 조건이 만족될 때까지 여러 번 실행하도록 하는 제어문

### 5-1. For문

- 반복 횟수가 명확할 때 사용한다.
- `for (초기화; 조건식; 증감식) {...}`

```js
for (i = 0; i < 3; i++) {
  console.log(i, "Hello");
}
```

### 5-2. While문

- 조건식이 `true` 인 동안 계속해서 블록을 실행한다.
- 반복 횟수가 유동적일 때 사용한다.
- `while (조건식) {...}`

```js
let i = 0;

while (i < 3) {
  console.log(i, "Hello");
  i++;
}
```

## 6. 배열(Array)

> 여러 개의 값을 순서대로 저장하는 데이터 구조  
> `[]` 를 사용하여 생성한다.

### 6-1. 배열 순회

> 배열의 각 요소를 하나씩 꺼내어 처리하는 방법

- **for index**: 인덱스를 직접 제어
- **for...of**: 배열의 값(value)에 직접 접근
- **forEach**: 콜백 함수를 통해 각 요소를 처리
- **entries()**: 인덱스와 값을 동시에 얻고 싶을 때 사용

```js
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
```

## 7. 객체(Object)

> key-value 쌍으로 이루어진 데이터 구조

```js
const users = {
  name: "홍길동",
  age: 20,
  greet: function () {
    return `안녕하세요, ${this.name}`;
  },
};

console.log(users.name); // 홍길동
console.log(users["age"]); // 20
console.log(users.greet()); // 안녕하세요, 홍길동
```

## 8. 맵(Map)

> key-value 구조이지만 객체(Object)보다 확장된 자료구조  
> Key로 모든 타입 사용 가능

```js
let userMap = new Map();

userMap.set("name", "Hong");
userMap.set(1, "number key");
userMap.set(true, "boolean key");

console.log(userMap.get("name")); // Hong
```

## 9. 함수(Function)

> 특정 작업을 수행하도록 설계된 독립적인 코드 블록  
> 입력값(parameters) → 처리 → 결과(return)

```js
// 1. 함수 선언문
function add(a, b) {
  return a + b;
}
console.log(add(10, 20)); // 30

// 2. 화살표 함수 (한 줄로 축약 가능)
const add = (a, b) => a + b;
console.log(add(10, 20)); // 30
```
