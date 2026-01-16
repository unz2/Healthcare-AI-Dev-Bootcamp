# FastAPI

> 🗓️ **2026-01-16**  
> ✍🏼 **작성자 : unz**

---

## 📝 목차

1. FastAPI 내부 동작
2. FastAPI 비동기 프로그래밍 주의사항
3. 동기 CRUD에서 비동기 ORM으로 전환

---

## 1. FastAPI 내부 동작

```
🚨 비동기 프로그래밍 시 주의점
"이벤트 루프를 블로킹하면 안된다"

이벤트 루프는 여러 코루틴의 실행 순서를 관리하고 대기 중인 작업을 실행하는 관리자
→ 따라서 이벤트 루프가 멈추면 모든 비동기 작업이 함께 멈춘다.

비동기 함수 안에서 time.sleep()이나 동기 방식의 requests 라이브러리를 사용하면,
이벤트 루프 자체가 멈춰버려 다른 모든 비동기 작업이 중단된다.
```

### 1-1. 동기 엔드포인트 `def`의 처리

- 이벤트 루프에서 직접 실행하지 않고 스레드 풀(Thread Pool)에서 실행한다.
  - 요청이 들어오면 해당 함수를 스레드 풀의 가용 스레드에 할당
  - 함수가 실행되는 동안 이벤트 루프는 다른 비동기 작업을 계속 처리
  - 실행 결과가 나오면 다시 이벤트 루프로 결과를 가져와 응답을 처리

```
스레드 풀(Thread Pool)이란?
- 미리 생성된 일정 수의 스레드 집합
- 이벤트 루프를 블로킹하지 않기 위해 동기 작업을 대신 처리하는 별도의 스레드 모음
- 작업이 들어올 때마다 새로운 스레드를 생성하고 파괴하는 오버헤드를 줄이기 위해 재사용 가능한 스레들을 관리하는 방식
```

### 1-2. 비동기 엔드포인트 `async def`의 처리

- 이벤트 루프에서 직접 실행한다.
- 함수 내부에 `await`가 없는 긴 연산이나 블로킹 I/O 작업이 포함되면 이벤트 루프 자체가 멈출 수 있어 주의

## 2. FastAPI 비동기 프로그래밍 주의사항

- 동기 방식: 스레드 풀 개수 조절
  - 많은 수의 동기 요청이 동시에 들어올 경우 기본 스레드 풀 개수가 부족할 수 있다.
  - 기본값으로 일반적으로 최소 40개 정도의 스레드를 제공한다.
  - 스레드 부족: 요청이 밀림
  - 스레드 과다: 메모리, 컨텍스트 스위칭 비용 증가
- 비동기 방식: 이벤트 루프 블로킹 주의
  - `async def` 안에서 `time.sleep()`이나 동기 방식의 requests 라이브러리 사용하지 않기
  - 비동기 엔드포인트 안에서 I/O 대기가 발생하는 작업은 `await` 처리
- 비동기 엔드포인트 안에서 동기 함수를 써야 한다면?

  - `run_in_threadpool()`을 사용해서 스레드로 위임
  - astAPI에서는 스레드 풀에 동기 작업을 위임할 수 있는 함수 제공

```python
from fastapi.concurrency import run_in_threadpool

def heavy_sync_task(name: str):
    time.sleep(5) # 동기 블로킹 작업
    return f"Hello {name}"

@app.get("/bridge")
async def bridge_endpoint(name: str):
    # 동기 함수를 스레드 풀에서 실행하도록 위임하여 루프 블로킹 방지
    result = await run_in_threadpool(heavy_sync_task, name)
```

## 3. 동기 CRUD에서 비동기 ORM으로 전환

### 3-1. 필요 패키지 설치

- `aiosqlite`: SQLite용 비동기 드라이버
- `greenlet`: SQLAlchemy 비동기 기능을 위한 필수 의존성

```bash
pip install aiosqlite
pip install greenlet
```

### 3-2. 비동기 세션 및 ORM

```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker


# DB 접속정보 (sqlite+aiosqlite 사용)
DATABASE_URL = "sqlite+aiosqlite:///./test.db"

# (동기)create_engine → (비동기)create_async_engine
engine = create_async_engine(DATABASE_URL)

# 비동기 세션팩토리 생성
AsyncSessionFactory = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)

# Dependency 비동기 세션 주입
async def get_async_session():
    async with AsyncSessionFactory() as session:
        yield session
```

```python
# Create: 상품 등록 API
@app.post("/items", status_code=status.HTTP_201_CREATED)
async def create_item_api(
    body: ItemCreateRequest, session=Depends(get_async_session)
) -> ItemResponse:
    # async with AsyncSessionFactory() as session:
    new_item = Item(name=body.name, price=body.price)
    session.add(new_item)  # DB에 저장할 아이템 선별
    await session.commit()  # DB에 반영 (I/0가 발생하는 지점)
    return new_item


# Read: 전체 상품 조회 API
@app.get("/items", status_code=status.HTTP_200_OK)
async def get_items_api() -> list[ItemResponse]:
    async with AsyncSessionFactory() as session:
        stmt = select(Item)
        # items = session.scalars(stmt).all() # 1) DB 조회 2) Item 모델 변환
        result = await session.execute(stmt)  # 1) DB 조회 (I/0가 발생하는 지점)
        items: list[Item] = result.scalars().all()  # 2) Item 모델 변환
        return items

# Update: 상품 수정 API
@app.patch("/items/{item_id}", status_code=status.HTTP_200_OK)
async def update_item_api(item_id: int, body: ItemUpdateRequest) -> ItemResponse:
    async with AsyncSessionFactory() as session:
        stmt = select(Item).where(Item.id == item_id)
        result = await session.execute(stmt) # (I/0가 발생하는 지점)
        item: Item | None = result.scalar()

        if item is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Item Not Found (id: {item_id})",
            )

        if body.name:
            item.name = body.name
        if body.price:
            item.price = body.price
        await session.commit() # (I/0가 발생하는 지점)
        return item

# Delete: 상품 삭제 API
@app.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item_api(item_id: int) -> None:
    async with AsyncSessionFactory() as session:
        stmt = select(Item).where(Item.id == item_id)
        result = await session.execute(stmt)
        item: Item | None = result.scalar()

        if item is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Item Not Found (id: {item_id})",
            )

        await session.delete(item)  # (I/0가 발생하는 지점)
        await session.commit() # (I/0가 발생하는 지점)
```
