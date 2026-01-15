# FastAPI CURD & ORM

> 🗓️ **2026-01-14**  
> ✍🏼 **작성자 : unz**

---

## 📝 목차

1. HTTPException란?
2. FastAPI를 활용한 CRUD
3. ORM란?
4. SQLAlchemy란?
5. SQLAlchemy 기초 핵심 개념

---

## 1. HTTPException 이란?

> FastAPI에서 클라리언트에게 HTTP 오류 응답을 보낼 때 사용하는 예외 클래스

- API 호출 시 데이터가 없거나 권한이 없는경우
- 단순한 에러메시지가 아닌 표준 HTTP 상태 코드와 상세 내용을 전달하기 위해 사용한다.

```python
from fastapi import HTTPException, status

raise HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail=f"Item Not Found (id: {item_id})"
)
```

## 2. FastAPI를 활용한 CRUD

```python
from fastapi import FastAPI, Path, HTTPException, status
from pydantic import BaseModel

app = FastAPI()

items = [
    {"id": 1, "name": "apple", "price": 100},
    {"id": 2, "name": "banana", "price": 80},
    {"id": 3, "name": "cherry", "price": 50},
]


class ItemCreateRequest(BaseModel):
    name: str
    price: int


class ItemResponse(BaseModel):
    id: int
    name: str
    price: int


# Create: 상품 등록 API
@app.post("/items", status_code=status.HTTP_201_CREATED)
def create_item_api(body: ItemCreateRequest) -> ItemResponse:
    # 데이터 저장
    new_item = {
        "id": len(items) + 1,
        "name": body.name,
        "price": body.price,
    }
    items.append(new_item)
    return new_item


# Read: 전체 상품 조회 API
@app.get("/items")
def get_items_api() -> list[ItemResponse]:
    return items


# Read: 단일 상품 조회 API
@app.get("/items/{item_id}")
def get_item_api(item_id: int) -> ItemResponse:
    for item in items:
        if item["id"] == item_id:
            return item

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail=f"Item Not Found (id: {item_id})"
    )


class ItemUpdateRequest(BaseModel):
    name: str | None = None
    price: int | None = None


# Update: 상품 수정 API
# PATCH: Partial Update -> 부분 수정
# PUT: Replace -> 대체
@app.patch("/items/{item_id}", status_code=status.HTTP_200_OK)
def update_item_api(item_id: int, body: ItemUpdateRequest) -> ItemResponse:
    for item in items:
        if item["id"] == item_id:
            if body.name:
                item["name"] = body.name
            if body.price:
                item["price"] = body.price
            return item

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail=f"Item Not Found (id: {item_id})"
    )

# Delete: 상품 삭제 API
@app.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item_api(item_id: int) -> None:
    for item in items:
        if item["id"] == item_id:
            items.remove(item)
            return

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail=f"Item Not Found (id: {item_id})"
    )

```

### 2-1. 왜 데이터베이스가 필요할까?

- 메모리(list/dict) 기반 CRUD의 한계
  - **서버 재시작 시 데이터 소멸**
  - **데이터 공유 불가**
  - **복잡한 쿼리 한계**

## 3. ORM(Object Relational Mapping)이란?

> 객체와 관계형 데이터베이스를 연결해주는 기술

- SQL 쿼리문을 직접 작성하지 않고 Python 클래스와 메서드를 사용해 DB를 조작한다.
  - Item 클래스 ↔ items 테이블
  - item.name ↔ name 컬럼

## 4. SQLAlchemy란?

> Python에서 가장 많이 사용되는 ORM 라이브러리

- SQL 쿼리 없이 Python 코드로 DB 조작 가능
- SQL Injection 같은 공격을 원천적으로 차단하는 구조

### 4-1. SQLAlchemy 설치

```bash
pip install sqlalchemy
```

## 5. SQLAlchemy 기초 핵심 개념

- **Engine**
  - DB와 연결되는 통로
  - 어떤 DB를 사용할지, 연결 설정은 어떻게 할지를 담당한다.
- **Model(Base)**
  - DB의 테이블 구조를 정의하는 파이썬 클래스
  - 클래스의 변수가 곧 테이블의 컬럼이 된다.
- **Session**
  - DB와의 구체적인 작업 단위
  - 데이터를 저장하거나 조회할 때 세션을 통해 명령을 내린다.

```python
# connection.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# 데이터베이스 설정 (SQLite 사용)
DATABASE_URL = "sqlite:///./test.db"

# 엔진(Engine) = SQLAlchemy 사용시 DB와의 연결고리 (Python 객체)
engine = create_engine(DATABASE_URL)

# 세션(Session) = DB 관리
# 세션을 만들 수 있는 세션팩토리
SessionFactory = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)
```

```python
# models.py
from orm import Base
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

# 모델 정의 (DB 테이블)
class Item(Base):
    __tablename__ = "items"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(128))
    price: Mapped[int] = mapped_column(Integer)
```

```python
# orm.py
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass
```

```bash
python -i models.py # 모델 파일 로드 및 인터랙티브 모드 진입

# 초기 설정, 모델 확인
Item # DB 테이블과 매핑되는 모델 클래스
Base # 모델 클래스들이 상속받는 기초 클래스
from connection import engine # DB 엔진 객체 가져오기
engine # 객체 로드 확인

# 스키마 생성
Base.metadata.create_all(bind=engine) # Base를 상속받은 모든 모델을 바탕으로 실제 DB 테이블 생성

# 객체 생성
item = Item(name="apple", price=100) # Item 클래스 인스턴스 생성 (아직 메모리상에만 존재)
item.name # 생성한 객체의 name 속성 확인 → apple
item.price # 생성한 객체의 price 속성 확인 → 100

# 세션을 통한 데이터 저장
from connection import SessionFactory # DB와 상호작용하기 위한 sessionmaker 가져오기
session = SessionFactory() # Session 객체 생성
session.add(item) # 위에서 만든 item 객체를 세션 작업 목록에 추가 (Pending 상태)
session.commit() # 현재 세션의 변경 사항을 실제 DB에 반영
```

## 6. ORM을 활용한 CURD

```python
from fastapi import FastAPI, Path, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import select

from connection import SessionFactory
from models import Item

app = FastAPI()

class ItemCreateRequest(BaseModel):
    name: str
    price: int


class ItemResponse(BaseModel):
    id: int
    name: str
    price: int


# Create: 상품 등록 API
@app.post("/items", status_code=status.HTTP_201_CREATED)
def create_item_api(body: ItemCreateRequest) -> ItemResponse:
    with SessionFactory() as session:
        new_item = Item(name=body.name, price=body.price)
        session.add(new_item)
        session.commit()  # DB에 반영
        return new_item


# Read: 전체 상품 조회 API
@app.get("/items")
def get_items_api() -> list[ItemResponse]:
    with SessionFactory() as session:
        stmt = select(Item)
        items = session.scalars(stmt).all()
        return items


# Read: 단일 상품 조회 API
@app.get("/items/{item_id}")
def get_item_api(item_id: int) -> ItemResponse:
    with SessionFactory() as session:
        stmt = select(Item).where(Item.id == item_id)
        item: Item | None = session.scalar(stmt)

        if item is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Item Not Found (id: {item_id})",
            )
        return item


class ItemUpdateRequest(BaseModel):
    name: str | None = None
    price: int | None = None


# Update: 상품 수정 API
# PATCH: Partial Update -> 부분 수정
@app.patch("/items/{item_id}", status_code=status.HTTP_200_OK)
def update_item_api(item_id: int, body: ItemUpdateRequest) -> ItemResponse:
    with SessionFactory() as session:
        stmt = select(Item).where(Item.id == item_id)
        item: Item | None = session.scalar(stmt)

        if item is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Item Not Found (id: {item_id})",
            )

        # 객체의 값을 변경하고, commit하여 DB에 반영
        if body.name:
            item.name = body.name
        if body.price:
            item.price = body.price
        session.commit()

        return item


class ItemReplaceRequest(BaseModel):
    name: str
    price: int


# Update: 상품 수정 API
# PUT: Replace -> 대체
@app.put("/items/{item_id}", status_code=200)
def replace_item_api(item_id: int, body: ItemReplaceRequest) -> ItemResponse:
    with SessionFactory() as session:
        stmt = select(Item).where(Item.id == item_id)
        item: Item | None = session.scalar(stmt)

        if item is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Item Not Found (id: {item_id})",
            )

        item.name = body.name
        item.price = body.price
        session.commit()
        return item


# Delete: 상품 삭제 API
@app.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item_api(item_id: int) -> None:
    with SessionFactory() as session:
        stmt = select(Item).where(Item.id == item_id)
        item: Item | None = session.scalar(stmt)

        if item is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Item Not Found (id: {item_id})",
            )

        session.delete(item)
        session.commit()
```
