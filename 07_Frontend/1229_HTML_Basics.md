# HTML 기초

> 🗓️ **2025-12-29**  
✍🏼 **작성자 : unz**

## 📝 목차

1. HTML(HyperText Markup Language)이란?
2. HTML의 기본 구조와 구성 요소
3. HTML 문서가 브라우저에 표시되는 과정
4. DOM(Document Object Model)이란?
5. HTML 주요 태그
6. HTML 속성

---

## 1. HTML(HyperText Markup Language)이란?

- 웹 페이지를 만들기 위한 표준 마크업 언어
- 웹 브라우저가 텍스트, 이미지, 버튼 등을 화면에 어떻게 배치하고 표시해야하는 지 알려주는 설계도 역할
- **HyperText**: 웹 페이지 내의 링크를 통해 다른 문서로 이동할 수 있는 텍스트
- **Markup**: 태그(`<>`)를 사용하여 문서의 구조(제목, 문단, 목록 등)를 정의하는 방식

```
서버가 HTML 문서를 만들어서 브라우저에 전달
브라우저는 HTML을 읽고 화면의 기본 구조를 그림
서버 → HTML 전달 → 브라우저 → 화면 구조 생성
```

## 2. HTML의 기본 구조와 구성 요소

### 2-1. HTML의 기본 구조

- HTML 문서는 항상 일정한 계층적 구조를 가진다.
- 태그(tag)들의 조합으로 구성
  - 태그는 `<태그이름>` 형태로 작성
  - 각 태그마다 요소의 의미와 역할을 가짐
  - 대부분의 태그는 여는 태그와 닫는 태그로 이루어짐

---

### 2-2. HTML의 구성 요소

`<!DOCTYPE html>`

- 현재 문서가 HTML5 표준을 따르고 있음을 브라우저에 알리는 선언문
- 브라우저가 '쿼크 모드(Quirks mode)'로 동작하지 않고 최신 표준 모드로 웹 페이지를 정확하게 렌더링하도록 돕는다.

`<html>`

- HTML 문서의 루트(Root, 최상위) 요소
- 모든 HTML 태그는 이 안에 포함되어야 한다.
- 보통 `<html lang="ko">`와 같이 언어 설정을 함께 사용한다.

`<head>`

- 문서에 대한 메타데이터(데이터에 관한 데이터)를 포함하는 구역
- 문서 제목(`<title>`), 문자 인코딩(`<meta charset="UTF-8">`), CSS 스타일 시트 링크, 자바스크립트 파일등이 포함된다.
- 이곳에 작성된 내용은 사용자에게 직접적으로 화면에 보이지 않는다.

`<title>`

- 웹 브라우저 탭에 표시되는 문서의 제목
- 사용자가 현재 어떤 페이지를 보고 있는지 명확하게 인지하게 한다.
- 검색 엔진 결과 페이지에서 링크 제목으로 사용된다.

`<body>`

- 실제 브라우저 화면에 나타나는 콘텐츠가 담기는 구역
- 텍스트, 이미지, 동영상, 하이퍼링크, 표 등 모든 시각적 요소가 포함된다.

## 3. HTML 문서가 브라우저에 표시되는 과정

1. 브라우저가 서버에 HTML 요청
2. 서버가 HTML 문서 응답
3. 브라우저가 HTML 코드를 해석 (Parsing)
4. HTML 태그들을 객체 형태로 변환하여 DOM 생성
5. CSS 적용 → 화면 표시

## 4. DOM(Document Object Model)이란?

- 브라우저가 HTML 문서를 해석해 만든 객체 기반 구조
- HTML을 트리 구조로 표현한 것
- 각 태그와 텍스트가 노드(node)
- JavaScript가 화면을 조작할 때 사용하는 대상

## 5. HTML 주요 태그

| 태그                   | 설명              | 역할                            |
| ---------------------- | ----------------- | ------------------------------- |
| `<h1> ~ <h6>`          | Heading           | 제목 태그                       |
| `<p>`                  | Paragraph         | 문단 태그                       |
| `<br>`                 | Break             | 줄바꿈 태그                     |
| `<hr>`                 | Horizontal Rule   | 가로 구분선 태그                |
| `<em>` <br> `<strong>` | Emphasis          | 강조 태그                       |
| `<ul>`                 | Unorderd list     | 순서가 없는 리스트 태그         |
| `<ol>`                 | Ordered list      | 순서가 있는 리스트 태그         |
| `<li>`                 | List item         | `<ul>`과 `<ol>` 자식요소 태그   |
| `<dl>`                 | Description List  | 정의 목록(key: value 형식) 태그 |
| `<dt>`                 | Description Term  | `<dl>` 자식요소 key값 태그      |
| `<dd>`                 | Description Data  | `<dl>` 자식요소 value값 태그    |
| `<blockquote>`         | Blockquote        | 문단 인용 태그                  |
| `<q>`                  | Quote             | 문단안에 문장 인용 태그         |
| `<abbr>`               | Abbreviation      | 약어 태그                       |
| `<pre>` <br> `<code>`  | Preformatted text | HTML 문서상 코드 입력 태그      |

## 6. HTML 속성

- 태그에 추가적인 정보를 제공하거나 동작을 제어하는 설정 값
- 모든 속성은 시작 태그 내에 위치한다.
- `alt`(Alternative Text) 속성은 시각 장애인을 위한 스크린 리더와 이미지 로딩 실패를 대비해 반드시 작성하는 것이 좋다.

이미지 태그 `<img>`의 주요 속성

- `src` : 이미지 파일의 경로(Source) 지정 <span style="background-color:#fff5b1"> 필수 </span>
- `alt` : 이미지를 표시할 수 없을 떄 나타내는 대체 텍스트
- `width`: 이미지 너비 픽셀 단위로 설정
- `height` : 이미지 높이 픽셀 단위로 설정

링크 태그 `<a>`의 주요 속성

- `href` : 연결할 페이지의 URL 주소 지정 <span style="background-color:#fff5b1"> 필수 </span>
- `target` : 링크를 어디서 열지 지정 (`_blank`는 새 탭)
- `title` : 마우스를 올렸을 때 나타나는 툴팁 설명

```HTML
<!-- 가로, 세로 500px의 강아지 사진을 불러오며, 이미지가 없을 시 "귀여운 강아지"라고 표시 -->
<img
  src="[https://example.com/dog.jpg](https://example.com/dog.jpg)"
  alt="귀여운 강아지"
  width="500"
  height="500"
/>

<!-- 새 창(_blank)에서 구글 홈페이지를 여는 링크 -->
<a
  href="[https://www.google.com](https://www.google.com)"
  target="_blank"
  title="구글 새 창에서 열기"
>
  구글 바로가기
</a>

```
