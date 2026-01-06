# JavaScript 기초

> 🗓️ **2026-01-05**  
> ✍🏼 **작성자 : unz**

## 📝 목차

1. JavaScript란?
2. JavaScript 실행 방법
3. Node.js 란?
4. 변수

---

## 1. JavaScript란?

> 웹 브라우저에서 동작하는 프로그래밍 언어

- 웹 페이지에 동적인 기능을 추가하기 위해 사용된다.
- 인터프리터 언어
- 동적 타입 언어 (변수 타입을 미리 선언하지 않음)
- 이벤트, 객체 기반

## 2. JavaScript 실행 방법

### 2-1. 브라우저 개발자 도구 (Console)

- 브라우저 개발자 도구의 Console 탭에서 JavaScript 코드를 즉시 실행할 수 있다.
- Chrome : `F12` 또는 `Cmd + Option + I`
- 별도 설치 없이 즉시 실행 결과를 확인 가능하다.

### 2-2. `<script>` 태그

- HTML 문서 내부에 직접 코드를 작성하는 방법
- 간단한 예제나 테스트용
- `<body>` 태그 하단에 작성

```html
<!DOCTYPE html>
<html lang="en">
  <head> </head>
  <body>
    <script>
      console.log("Hello, JavaScript!");
    </script>
  </body>
</html>
```

### 2-3. HTML 파일과 JS 파일 분리

- JavaScript 코드를 별도의 `.js` 파일로 분리하여 관리하는 방법
- 코드 가독성 향상
- 유지보수 용이

```html
<!DOCTYPE html>
<html lang="en">
  <head> </head>
  <body>
    <script src="app.js"></script>
  </body>
</html>
```

```js
// app.js
console.log("Hello, JavaScript!");
```

### 2-4. Node.js 실행

- 브라우저 밖(내 컴퓨터 운영체제)에서 JavaScript를 실행하는 방법
- 터미널(CMD)에서 실행한다.
- 명령어 : `node 파일명.js`

## 3. Node.js 란?

> JavaScript를 브라우저가 아닌 일반 PC 환경에서도 실행할 수 있게 해주는 JavaScript 런타임 환경

- **고성능** : 구글의 V8 엔진을 사용하여 처리 속도가 매우 빠르다.
- **이벤트 기반 비동기 I/O** : 수많은 요청을 동시에 처리할 수 있어 서버 개발에 유리하다.
- **방대한 생태계 (NPM)** : 전 세계 개발자들이 만든 수많은 라이브러리를 사용 가능하다.
- **통일성** : 프론트엔드와 백엔드 모두 JavaScript 하나로 개발 가능하다.

### 3-1. Node.js 설치

- macOS : `brew install node`
- windows : https://nodejs.org/ko/download/current
- 설치 확인 : 터미널에 `node -v` 입력하여 버전 번호가 나오면 설치 성공

## 4. 변수

> 데이터(값)을 저장하기 위한 공간  
> 컴퓨터 메모리에 값을 저장하고, 나중에 그 이름을 불러서 값을 다시 사용하기 위해 사용한다.

### 4-1. let (변할 수 있는 변수)

- 한 번 선언한 뒤에 값을 재할당 할 수 있다.
- 값이 계속 바뀔 가능성이 있는 데이터를 담을 떄 사용한다.

```js
let height = 150; // 초기값 설정
console.log(height); // 150

height = 160; // 값 변경 가능
console.log(height); // 160
```

### 4-2. const (변하지 않는 상수)

- 한 번 값을 할당하면 재할당이 불가능하다.
- 선언 시 반드시 초기값을 할당해야 한다.
- 보안사 안전하고 실수를 방지하기 위해, 값이 바뀌면 안되는 데이터에 사용한다.

```js
const PI = 3.14;
PI = 3.15;
console.log(PI); // error 발생
```
