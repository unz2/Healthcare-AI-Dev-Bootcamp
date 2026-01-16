# HTML CSS 기초

> 🗓️ **2026-01-02**  
> ✍🏼 **작성자 : unz**

## 📝 목차

1. Position
2. Flex
3. Media Query
4. Grid
5. Bootstrap(UI 프레임워크)

---

## 1. Position

> 요소가 문서 내에서 배치되는 방식과 최종 위치를 결정하는 속성

### 1-1. Static

- 모든 HTML 요소의 기본값
- HTML 코드에 작성된 순서대로 배치된다.
- `top`, `bottom`, `left`, `right`, `z-index` 속성이 적용되지 않는다.
- 일반적인 문서 흐름(Normal Flow)을 따른다.

### 1-2. Relative

- 기준점 : 본인이 원래 있던 자리 기준으로 위치 이동
- 원래 자신이 있어야 할 자리를 유지하면서, 그 자리를 기준으로 이동한다.
- 요소가 이동하더라도 원래 차지하던 공간은 비어있는 상태로 유지된다.

### 1-3. Absolute

- 기준점 : 가장 가까운 static이 아닌 부모 요소 기준으로 이동
- 일반적인 문서 흐름에서 완전히 제외(Float)된다.
- 기준이 되는 부모가 없다면 `<body>`를 기준으로 이동한다.

### 1-4. Fixed

- 기준점 : 브라우저의 뷰포트(Viewport) 기준으로 이동
- 스크롤을 내려도 항상 화면의 같은 위치에 고정된다.

## 2. Flex

> 1차원 레이아웃 모델, 요소들 사이의 공간 배분과 정렬하는 속성  
> 정렬하고자 하는 요소를 감싸는 부모 요소에 선언한다.

- `flex` : block 특성의 flex container 정의
- `inline flex` : inline 특성의 flex container 정의

### 2-1. Flex-direction (축 방향)

- Main Axis : `flex-direction`에 의해 결정되는 방향
- Cross Axis : 주축과 수직을 이루는 방향

<img src="./images/flex_direction.png" width="600px" />

### 2-2. Flex-wrap (줄바꿈 여부)

- nowarp(기본값) : 부모 요소보다 자식요소가 크면 자식 요소 크기를 줄여 강제로 한줄에 배치한다.
- warp : 부모 요소보다 자식요소가 크면 다음줄로 내려서 여러줄로 배치한다.

### 2-3. Justify-content (Main Axis 정렬)

> Main Axis 기준으로 요소들을 어떻게 배치할지 결정

- `flex-start`: 시작점 정렬
- `flex-end`: 끝점 정렬
- `center`: 가운데 정렬
- `space-between`: 양 끝을 붙이고 사이 간격을 동일하게 배분
- `space-around`: 요소 양옆에 동일한 여백 배분

### 2-4. Align-items & Align-content (Cross Axis 정렬)

> Align-items: 한 줄 내에서 Cross Axis 기준 정렬  
> Align-content: 여러 줄이 생겼을 때, 줄들 사이의 간격과 정렬을 결정 (flex-wrap: wrap 상태에서만 작동)

- `flex-start`: 시작점 정렬
- `flex-end`: 끝점 정렬
- `center`: 가운데 정렬
- `space-between`: 양 끝을 붙이고 사이 간격을 동일하게 배분
- `space-around`: 요소 양옆에 동일한 여백 배분

## 3. Media Query

> 단말기의 유형이나 화면 해상도에 따라 서로 다른 CSS를 적용하게 하는 것

```CSS
/* 기본 모바일 스타일 (세로 한 줄 레이아웃) */
.container {
  display: flex;
  flex-direction: column;
}

/* 태블릿 이상 (가로 폭 768px 이상) */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
    justify-content: space-between;
  }
}

/* 데스크탑 이상 (가로 폭 1024px 이상) */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

## 4. Grid

> 2차원(행과 열) 레이아웃 시스템

- 화면 전체의 구조 설계하느 데 최적화
- 행과 열을 동시에 제어할 수 있다.
- 컨텐츠 크기에 구애받지 않고 부모 요소에 전체 틀을 먼저 정의한다.
- 복잡한 중첩 `<div>` 없이도 정교한 배치가 가능하다.

### 4-1. Grid 속성

- `grid-template-rows` : 그리드의 행 개수와 각 행의 높이를 정의
- `grid-template-columns` : 그리드의 열 개수와 각 열의 너비를 정의
- `grid-auto-rows` : 정의되지 않은 행이 추가될 때의 기본 높이를 설정
- `grid-auto-columns` : 정의되지 않은 열이 추가될 때의 기본 너비를 설정
- `gap` : 셀 사이 간격 설정

### 4-2. 단위와 함수

- `px`, `%`, `vw`, `vh` : 고정 또는 비율 기반 크기
- `fr` : 남은 공간을 비율로 분할
- `auto` : 컨텐츠 크기에 맞게 자동 조절
- `repeat()` : 동일한 패턴을 반복할 때 사용
- `minmax(min, max)` : 최소/최대 크기 범위 지정
- `auto-fill` : 설정된 너비에 맞춰 가능한 많은 컬럼을 채워 넣음 (빈 공간이 생겨도 컬럼 유지)
- `auto-fit` : 컬럼들을 채우되, 남는 공간이 있다면 컬럼들이 넓어져서 전체 너비를 꽉 채움

```CSS
/* 첫 번쨰 열은 300px 고정, 두 번째 열은 컨테이너 절방, 마지막 열은 남은 공간 전부 차지 */
grid-template-columns: 300px 50% 1fr;

/* 전체 남은 공간을 1:2 비율로 분할 */
grid-template-columns: 1fr 2fr;

/* 콘텐츠 크기에 맞게 자동 조절 */
grid-template-rows: auto 1fr;

/* 1fr짜리 열 4개 */
grid-template-columns: repeat(4, 1fr);

/* 최소 200px, 최대 1fr */
grid-template-columns: minmax(200px, 1fr) 2fr;
```

## 5. Bootstrap(UI 프레임워크)

> Twitter에서 개발한 HTML, CSS, JavaScript 오픈소스 UI 프레임 워크  
> https://getbootstrap.com/

- 12개의 가상 칸을 나누어 사용하며, 행과 열 클래스(Grid)로 배치한다.
- 반응형 웹 디자인을 모바일 퍼스트 방식으로 지원

### 5-1. 핵심 구성 요소

### Grid System

- 12-column grid
- Flexbox 기반
- 반응형 브레이크포인트 제공

```CSS
<div class="container">
  <div class="row">
    <div class="col-2 bg-primary">왼쪽</div>
    <div class="col-4 bg-secondary">오른쪽</div>
  </div>
</div>
```

### UI Components

- 미리 스타일링된 UI Components 제공
- Button, Navbar, Card, Modal, Form, Dropdown 등

```CSS
<!-- Card -->
<div class="container">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">제목</h5>
      <div class="card-text">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      </div>
      <a href="#" class="btn btn-success">이동</a>
    </div>
  </div>
</div>
```

### Utility Classes

- CSS를 직접 작성하지 않고 클래스 조합으로 스타일 제어

```CSS
<!-- Button -->
<div class="container">
  <button class="btn btn-primary">확인</button>
  <button class="btn btn-danger">취소</button>
  <button class="btn btn-outline-secondary">확인</button>
</div>
```

### JavaScript Plugins

- JS 기반 인터랙션 제공
- Modal, Tooltip, Collapse, Carousel, Toast 등

```CSS
 <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
 <span class="navbar-toggler-icon"></span>
 </button>
```
