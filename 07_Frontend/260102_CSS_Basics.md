# HTML CSS 기초

> 🗓️ **2026-01-02**  
> ✍🏼 **작성자 : unz**

## 📝 목차

1. Position
2. Flex
3. Media Query

---

## 1. Position

> 요소가 문서 내에서 배치되는 방식과 최종 위치를 결정하는 속성

### 1-1. Static

- 모든 HTML 요소의 <span style="background-color:#DCFFE4"> 기본값 </span>
- HTML 코드에 작성된 순서대로 배치된다.
- `top`, `bottom`, `left`, `right`, `z-index` 속성이 적용되지 않는다.
- 일반적인 문서 흐름(Normal Flow)을 따른다.

### 1-2. Relative

- 기준점 : <span style="background-color:#DCFFE4"> 본인이 원래 있던 자리 기준 </span> 으로 위치 이동
- 원래 자신이 있어야 할 자리를 유지하면서, 그 자리를 기준으로 이동한다.
- 요소가 이동하더라도 원래 차지하던 공간은 비어있는 상태로 유지된다.

### 1-3. Absolute

- 기준점 : <span style="background-color:#DCFFE4"> 가장 가까운 static이 아닌 부모 요소 기준 </span> 으로 이동
- 일반적인 문서 흐름에서 완전히 제외(Float)된다.
- 기준이 되는 부모가 없다면 `<body>`를 기준으로 이동한다.

### 1-4. Fixed

- 기준점 : 브라우저의 <span style="background-color:#DCFFE4"> 뷰포트(Viewport) 기준 </span> 으로 이동
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
