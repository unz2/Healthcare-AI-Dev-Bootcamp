# FastAPI Request & Response

> 🗓️ **2026-01-13**  
> ✍🏼 **작성자 : unz**

---

## 📝 목차

1. Type Hint
2. Pydantic
3. Request Body
4. Response Model
5. 상태 코드(HTTP Status Code)

---

## 1. Type Hint 란?

> 변수나 함수 인자, 반환 값의 타입을 명시적으로 선언하는 방법

- `:` 뒤에 타입을 지정한다.
- FastAPI는 Type Hint를 기반으로 데이터 검증과 문서 자동 생성을 수행한다.

```python
name: str = "apple"
price: int = 1000
ratio: float = 0.5
is_active: bool = True
```

### 1-1. 함수에서의 Type Hints

- 함수의 파라미터와 반환 값에 타입을 지정한다.

```python
# 파라미터 name은 str, age는 int 반환값이 str type임을 명시
def greet(name: str, age: int) -> str:
    return f"{name}, {age}살"
```

### 1-2. 컬렉션 타입 Type Hints

- 리스트(list), 딕셔너리(dict), 튜플(tuple) 등 여러 요소를 담는 객체 내부의 요소 타입을 지정할 때 사용
- 중첩 표현 가능

```python
# 문자열로 이루어진 리스트
names: list[str] = ["a", "b"]

# 키는 문자열, 값은 정수인 딕셔너리
scores: dict[str, int] = {"math": 90}

# 문자열로 이루어진 집합
tags: set[str] = {"python", "fastapi", "backend"}

# 키는 문자열, 값은 정수 또는 문자열인 딕셔너리의 리스트
users: list[dict[str, int | str]] = [
    {"id": 1, "name": "alex"},
    {"id": 2, "name": "bob"},
]
```

### 1-3. Optional Type Hints

- 값이 있을 수도 있고, 없을 수도 있는 경우에 사용

```python
# 문자열이거나 값이 없거나, 기본값은 None
name: str | None = None
```

## 2. Pydantic이란?

> 데이터 검증(Validation) 및 설정 관리 라이브러리

- FastAPI는 내부적으로 Pydantic을 사용하여 들어오는 요청 데이터를 검증하고, Python 객체로 반환한다.
  - Request Body(JSON) 검증
  - Response 구조 명확화
- 데이터가 지정된 타입으로 변환될 수 있는지 확인한다
  - 문자열 "100"을 `int` 타입 필드에 넣으면 자동으로 100 으로 변환

### 2-1. Pydantic의 기본 구조

- BaseModel 상속
- 타입 힌트 = 검증 규칙
- JSON ↔ Python 객체 자동 변환

```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: int
    description: str | None = None  # 선택사항 (기본값 None)
    tax: float = 0.1  # 기본값 설정
```

## 3. Request Body 란?

> 클라이언트가 서버로 데이터를 보낼 때, HTTP 본문(Body)에 실어 보내는 데이터

```python
# 클라이언트에서 보낸 데이터가 서버로 들어올때 데이터 검증
class UserSignUpRequest(BaseModel):
    username: str
    email: str
    password: str

@app.post("/users/sign-up")
def sign_up_api(body: UserSignUpRequest):
    return {"message": f"User {body.username} created successfully."}
```

## 4. Response Model 이란?

> 서버가 클라이언트에게 응답을 보낼 때, 어떤 구조로 데이터를 보낼지 정의하는 것

- 응답 스키마 고정
- 데이터 검증(Validation)
- 보안상 중요한 정보를 응답에서 제외할 떄 유용하다.

```python
# 서버에서 클라이언트로 데이터를 보낼때 데이터 검증
class UserSignUpResponse(BaseModel):
    username: str
    email: str
    # password 필드 제외

@app.post("/users/sign-up")
def sign_up_api(body: UserSignUpRequest) -> UserSignUpResponse:
    # 실제 DB에는 password가 있지만, response_model에 의해 username과 email만 노출
    return {"user_name": body.username, "email": body.email}
```

## 4. 상태 코드(HTTP Status Code)란?

> 서버가 클라이언트의 요청에 대한 처리 결과를 3자리 숫자로 알려주는 규약

```python
@app.post("/users/sign-up"", status_code=201)
def sign_up_api(body: UserSignUpRequest) -> UserSignUpResponse:
    return {"user_name": body.username, "email": body.email}
```

|       기능       |   Method    | 상태 코드 |
| :--------------: | :---------: | :-------: |
|       생성       |    POST     |    201    |
|    전체 조회     |     GET     |    200    |
|    단일 조회     |     GET     |    200    |
|       수정       | PUT / PATCH |    200    |
|       삭제       |   DELETE    |    204    |
|    자원 없음     |    모든     |    404    |
| 데이터 검증 실패 |    모든     |    422    |
