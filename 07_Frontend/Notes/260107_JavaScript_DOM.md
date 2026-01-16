# JavaScript DOM

> 🗓️ **2026-01-07**  
> ✍🏼 **작성자 : unz**

## 📝 목차

1. DOM이란?
2. DOM 선택
3. DOM 내용 변경
4. DOM 스타일 변경
5. DOM 속성 변경
6. 이벤트(Event)
7. 입력값 처리

---

## 1. DOM이란?

> Document Object Model  
> 웹 페이지(HTML 문서)를 브라우저가 이해할 수 있는 객체 형태로 구조화한 것

- HTML의 각 요소(태그)를 트리 구조의 Node로 변환하여 J자바스크립트가 접근, 수정할 수 있게 한다.

### 1-1. JavaScript가 화면을 바꾸는 방식

- 브라우저는 HTML을 읽어 메모리에 DOM 트리를 생성한다.
- 자바스크립트는 이 DOM 트리에 접근하여 특정 노드를 선택하고, 속성을 바꾸거나 요소를 추가하여 화면을 실시간으로 생긴한다.
- 이를 동적 DOM 조작이라고 한다.

## 2. DOM 선택

> 자바스크립트로 화면을 바꾸기 위해 어떤 요소를 바꿀지 선택하는 것

주요 메서드

- `document.getElementById('id')` : 특정 ID를 가진 요소 하나 선택
- `document.getElementsByClassName('class')` : 특정 class 요소 선택
- `document.querySelector('selector')` : CSS 선택자 형식을 사용하여 첫 번쨰로 매칭된 요소 1개 반환(없으면 null)
- `document.querySelectorAll('selector')` : 조건에 맞는 모든 요소를 노드 리스트 형태로 반환(없으면 빈 NodeList)

```js
// ID 선택
const box = document.getElementById("box");
// Class 선택
const container = document.getElementsByClassName("container");

// CSS 선택자 선택
const button = document.querySelector("#button");
const title = document.querySelector(".title");

// 여러 요소 한번에 선택
const boxItem = document.querySelectorAll(".box-item");
```

## 3. DOM 내용 변경

> 선택한 요소의 내용, HTML 구조등을 변경하는 것

- `textContent` : 요소 내부의 텍스트만 가져오거나 변경
- `innerHTML` : 요소 내부의 HTML 태그까지 포함하여 변경
- `value` : 폼 요소에 입력된 값을 가져오거나 변경

```js
const heading = document.querySelector("h1");

// 텍스트 내용 변경
heading.textContent = "Hello JavaScript!";

// HTML 구조 변경
const container = document.querySelector(".container");
container.innerHTML = "<p>HTML 태그와 텍스트 변경</p>";
```

## 4. DOM 스타일 변경

> `style` 속성을 통해 인라인 CSS 조작하는 것

- CSS 속성명은 카멜 케이스(camelCase)로 작성한다.

```js
const box = document.querySelector(".box");

box.style.backgroundColor = "royalblue";
box.style.width = "200px";
box.style.borderRadius = "10px";
```

## 5. DOM 속성 변경

> `setAttribute`, `setAttribute`를 사용해 HTML 태그의 속성을 조작하는 것

```js
const myImg = document.querySelector("img");

// 속성 설정 (이미지 교체)
myImg.setAttribute("src", "new-image.jpg");
myImg.setAttribute("alt", "설명 텍스트");

// 속성 가져오기
const currentSrc = myImg.getAttribute("src");
```

## 6. 이벤트(Event)

> 사용자의 클릭, 키보드 입력, 마우스 이동 페이지 로드 , 창 크기 변경등 브라우저에서 일어나는 모든 동작이나 상태 변화

### 6-1. 이벤트 처리 방식

- EventListener를 등록하여 이벤트를 처리
- 특정 요소에 특정 이벤트가 발생하면 지정한 함수 실행
- [MDN DOM Events](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events)

```js
const button = document.querySelector("#button");

button.addEventListener("click", function () {
  console.log("마우스 클릭 됨");
});
```

### 6-2. EventListener를 사용하는 이유

1. 하나의 요소에 여러 개의 이벤트를 등록할 수 있다.
2. HTML과 자바스크립트 코드를 분리할 수 있어 유지보수가 쉽다.
3. `removeEventListener를` 통해 필요할 때 이벤트를 쉽게 제거할 수 있다.

## 7. 입력값 처리

> 사용자가 `<input>` 태그에 입력한 내용을 가져와서 처리하는 방법

```html
<input id="name" placeholder="이름을 입력하세요" /> <button>확인</button>
```

```js
const input = document.querySelector("#name");
const button = document.querySelector("button");

button.addEventListener("click", function () {
  console.log(input.value);
});
```

```js
// 사용자 입력에 따라 조건문으로 제어하여 화면과 동작을 다르게 처리
const input = document.querySelector("#name");
const preview = document.querySelector("#preview");

input.addEventListener("input", function () {
  if (input.value.length < 2) {
    preview.textContent = "최소 3글자 이상 입력하세요";
  } else {
    preview.textContent = "";
  }
});
```
