# FastAPI 기초

> 🗓️ **2026-01-12**  
> ✍🏼 **작성자 : unz**

---

## 📝 목차

1. FastAPI란?
2. 자동 API 문서화
3. Path Parameter
4. Query Parameter
5. Path + Query Parameter 같이 쓰기

---

## 1. FastAPI란?

> Python 기반 고성능 웹 API 프레임워크

### 1-1. 주요 특징

- **매우 빠른 성능**

  - Starlette(비동기 웹 프레임워크) 와 Pydantic(데이터 검증) 기반
  - `async` / `await`를 활용한 비동기 I/O 처리에 최적화
  - 대량의 API 요청 처리, 실시간 서비스에 적합하다.

- **자동 API 문서 생성**

  - OpenAPI(Swagger) 표준 자동 지원
  - `/docs` : Swagger UI
  - `/redoc` : ReDoc

- **타입 힌트 기반 설계**
  - Python Type Hint를 적극 활용
  - 함수 시그니처만으로 요청 데이터 검증, 응답 스키마 정의 가능

### 1-2. 주요 용도

- 백엔드 API 서버
  - 웹 / 모바일 서비스 백엔드
  - 프론트엔드(React, Vue, Next.js)와 연동
- 머신러닝·딥러닝 모델 서빙
  - 모델 추론 API 구현에 적합
  - PyTorch, TensorFlow, scikit-learn과 연계
  - Client → FastAPI → ML Model → Prediction

### 1-3. 웹 프레임 워크 비교

|   항목    |  FastAPI  |   Flask   |  Django   |
| :-------: | :-------: | :-------: | :-------: |
|   성능    | 매우 빠름 |   보통    |   보통    |
|  비동기   | 완전 지원 |  제한적   | 부분 지원 |
| API 문서  |   자동    | 직접 구현 | 직접 구현 |
| 타입 힌트 | 적극 활용 |   선택    |  제한적   |
| 사용 목적 | API 중심  | 소규모 웹 | 풀스택 웹 |

### 1-4. 개발 환경 준비

```bash
# 가상환경 생성 (.venv라는 이름의 폴더 생성)
python -m venv .venv

# 가상환경 활성화 (macOS / Linux)
source .venv/bin/activate

# 가상환경 활성화 (Windows)
.venv\Scripts\activate

# fastapi 및 표준 의존성 설치 (uvicorn 등 포함)
pip install "fastapi[standard]"
```

> Unix 기반 시스템(macOS, Linux)에서는 파일이나 폴더 이름이 마침표(.)로 시작하면 숨김 상태로 처리된다.  
> 가상환경 폴더에는 외부에서 다운로드한 라이브러리 파일들이 들어있기 때문에, 프로젝트 폴더를 깔끔하게 유지하기 위해 관례적으로 숨김 폴더로 만든다.

### 1-5. FastAPI 기본구조

```python
from fastapi import FastAPI

# 1. FastAPI 인스턴스 생성
app = FastAPI()

# 2. 경로 오퍼레이션 데코레이터 정의
@app.get("/")
def root_api():
    # 3. 경로 오퍼레이션 함수 작성
    return {"message": "Hello FastAPI"}
```

### 1-6. Decorator

> Python에서 @ 기호로 시작하는 문법

- FastAPI에서의 역할 : 특정 함수가 어떤 HTTP Method와 어떤 URL 경로에 반응해야 하는지를 프레임워크에 알려주는 연결 고리 역할
  - HTTP Method: get, post, put, patch, delete
  - 경로(Path): /users, /orders, ...
- `@app.get("/")` : 브라우저가 서버의 / 경로로 GET 요청을 보내면 아래 함수를 실행하라는 의미

### 1-7. FastAPI 개발 서버 실행

- **기본 실행**
  - 루트 디렉토리에 `main.py` 파일이 있고, 그 안에 `app = FastAPI()` 객체가 선언되어있는 경우

```bash
fastapi dev
```

- **특정 위치의 앱 실행**
  - 특정 파일 내의 특정 변수를 가리켜야 할 때 -e (entry point) 옵션 사용

```bash
# path_param.py 파일 내의 app 객체를 실행할 경우
fastapi dev path_param.py

# 모듈 경로로 명시하는 경우 파일명:app 객체명
fastapi dev -e path_param:app
```

## 2. 자동 API 문서화

> FastAPI는 코드를 작성하면 API 문서가 실시간으로 자동 생성된다.

- Swagger UI

  - 접속 경로 : `http://127.0.0.1:8000/docs`
  - 특징 : 부라우저에 직접 API를 테스트해 볼 수 있는 대화형 인터페이스 제공

- ReDoc
  - 접속 경로 : `http://127.0.0.1:8000/redoc`
  - 더 정돈되고 읽기 쉬운 구조로 API 명세서 제공

## 3. Path Parameter

> URL 경로의 일부로 전달되는 변수

```python
@app.get("/users/{user_id}")
def get_user(user_id: int): # user_id가 정수가 아니면 자동으로 422 에러 반환
    return {"user_id": user_id}
```

- `{user_id}` : 경로에서 값을 추출해 변수로 받음
- `(user_id: int)` : 타입 힌트로 검증
  - `/users/3` : 성공
  - `/users/abc` : 422 에러(검증 실패)로 처리
  - Swagger에 타입 정도가 자동으로 반영됨

### 3-1. Path Parameter 주의점

- 같은 prefix에서 라우팅 충돌 가능성 (경로 가로채기)
  - FastAPI는 코드가 작성된 순서대로 경로를 확인한다.
  - `/items/{item_name}`을 만들고, 아래에 `/items/search`를 만들게되면
  - `{item_name}`는 모든 문자열을 받아들이는 경로 매개변수 이므로
  - "search" 라는 문자열을 `{item_name}` 변수 값으로 인식해버린다.
- 해결 방법
  - 고정 경로`(/items/search)`를 먼저 선언
  - 동적 경로`(/items/{item_name})`를 나중에 선언

```python
# 1. 고정 경로를 먼저 선언
@app.get("/items/search")
def search_api():
    return {"msg": "search"}

# 2. 변수가 포함된 경로를 나중에 선언
@app.get("/items/{item_name}")
def get_name(item_name: str = Path(..., max_length=6)):
    return {"item_name": item_name}
```

### 3-2. Path Parameter 고급 옵션

```python
from fastapi import Path

app = FastAPI()

@app.get("/users/{user_id}")
def get_user(user_id: int=Path(..., ge=1, description="user_id 1 이상"))
    return {"user_id": user_id}
```

- 숫자 제약
  - `gt` : > (초과), Greater Than
  - `ge` : >= (이상), Greater than or Equal
  - `lt` : < (미만), Less Than
  - `le` : <= (이하), Less than or Equal
- 문자열 제약
  - `min_length` : 최소 길이 설정
  - `max_length` : 최대 길이 설정
  - `regex` (또는 `pattern`) : 정규 표현식을 이용한 패턴 매칭
- 메타데이터 : Swagger UI에서 개발자가 읽기 편하게 정보를 제공하는 용도
  - `title` : 매개변수의 짧은 제목
  - `description` : 매개변수에 대한 상세 설명
  - `example` : 문서상 보여줄 예시 값
  - `deprecated` : True로 설정하면 문서에서 해당 API가 사용 중단됨 표시
- 필수 값
  - `Path(...)` : Path Parameter의 첫 번째 인자로 전달되는 `...` 는 Required 의미

## 4. Query Parameter

> URL 경로 끝 `?` 뒤에 오는 key-value 집합

- 경로에 고정되지 않고, 선택적으로 사용할 수 있다.
- 함수의 매개변수 중 경로 매개변수가 아닌 것들은 자동으로 쿼리 매개변수로 해석된다.
- 기본값을 설정하기 용이하다.

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/search")
def search(q: str, limit: int = 10):
    return {"q": q, "limit": limit}
```

### 4-1. Query Parameter 선택 값

```python
@app.get("/search")
def search_api(q: str = Query(default="default", min_length=2, max_length=8)):
    return {"msg": f"searched: {q}"}
```

- 기본값 설정 : `Query("default value)`
- 필수값 설정 : `Query(...)`
- 생략 가능 : `Query(None)`
- 다중 값 받기 : `?tags=value&tags=value`

## 5. Path + Query Parameter 같이 쓰기

- Path Parameter: 대상이 누구인지
- Query Parameter: 어떻게 보여줄 것인지

```python
@app.get("/users/{user_id}/posts")
def list_posts_api(user_id: int, limit: int):
    return {"user_id": user_id, "limit": limit}
```
