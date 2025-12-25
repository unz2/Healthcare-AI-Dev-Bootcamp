# NoSQL과 Python ORM 기초
> 🗓️ **2025-10-24**  
✍🏼 **작성자 : unz**
---
## 📋 목차
1. NoSQL이란?
2. MongoDB란?
3. Python과 DB 연동 라이브러리
4. ORM이란?
5. Tortoise ORM

---

## 1. NoSQL이란?
- Not Only SQL
- 관계형 데이터베이스(RDBMS)의 한계를 극복하기 위해 등장한 데이터베이스 시스템

### 1-1. NoSQL의 특징
- **스키마 없음** : 고정된 테이블 구조가 없어 않아 필드를 자유롭게 추가 가능하다.
- **높은 확장성** : 서버 여러 대로 쉽게 확장 가능하다. (수평 확장)
- **유연한 저장** : JSON, Key-Value, 그래프 등 다양한 구조를 지원한다.
- **빠른 속도** : 관계 계산보다 읽기/쓰기 중심의 속도에 강점이 있다.

### 1-2. NoSQL의 대표 유형
|유형|특징|예시 DB|
|--|--|--|
|문서형(Document)|JSON 문서 구조로 저장|MongoDB|
|키-값형(Key-Value)| Key와 Value 값의 쌍으로 저장|Redis, DynamoDB|
|열 지향형(Column-Family)| 행마다 다른 컬럼을 가질 수 있는 구조로 저장|Cassandra|
|그래프형(Graph)|관계를 노드와 간선으로 표현|Neo4j|

## 2. MongoDB란?
- 문서(Document) 단위로 데이터를 저장하는 비관계형 데이터베이스
- JSON 구조로 데이터를 저장 (BSON 형식)
- 하나의 문서가 곧 하나의 행(row)의 역할
- 스키마를 자유롭게 변경 가능 (필드 투가, 제거 등)

## 2-1. 컬렉션(Collection)
- RDB의 테이블에 대응하는 개념
- 문서마다 필드 구성이 달라도 허용된다.

> SQL의 테이블(Table) → 컬렉션(Collection)  
행(Row) → 문서(Document) 개념을 사용한다.

```json
// 환자(patients) 컬렉션 예시
{
  "_id": "671f84a82a01",
  "name": "홍길동",
  "birth_date": "1999-01-01",
  "gender": "M",
  "phone": "010-1234-5678",
  "diseases": ["고혈압", "당뇨"], 
  "created_at": "2025-10-24T09:00:00"
}

// 의사(doctors) 컬렉션 예시
{
  "_id": "671f84b42e1a",
  "name": "박의사",
  "specialty": "내과",
  "available_days": ["월", "수", "금"], 
  "created_at": "2025-10-22T14:30:00"
}

// 예약(appointments) 컬렉션 예시
{
  "_id": "671f84c3a913",
  "patient": {
    "id": "671f84a82a01",
    "name": "홍길동"
  },
  "doctor": {
    "id": "671f84b42e1a",
    "name": "박의사"
  },
  "reserved_at": "2025-10-26T10:00:00",
  "note": "초진, 기침 및 발열 증상",
  "status": "예약완료"
}

// 1:N 중첩 구조 확장형 (한 환자에 여러 예약 내장)
{
  "name": "홍길동",
  "birth_date": "1999-01-01",
  "appointments": [
    {
      "doctor": "박의사",
      "reserved_at": "2025-10-26T10:00:00",
      "note": "초진, 기침 및 발열 증상",
    },
    {
      "doctor": "최의사",
      "reserved_at": "2025-10-27T10:30:00",
      "note": "재진, 감기",
    }
  ]
}
```

## 3. Python과 DB 연동 라이브러리
1. RDB용 ORM: SQLAlchemy
    - 가장 널리 쓰이는 ORM(관계형 DB용)
    - 기본적으로 동기(Synchronous) 방식으로 동작

2. 비동기 RDB용: Tortoise ORM
    - 비동기 처리를 기본으로 설계된 ORM

3. NoSQL용: PyMongo / Beanie
    - PyMongo: MongoDB와 연동하는 가장 기본적인 저수준 드라이버
    - Beanie: Pydantic 기반의 비동기 MongoDB ODM

## 4. ORM이란?
- Object-Relational Mapping
- 객체(Object)와 RDB의 테이블(Relational)을 자동으로 매핑해주는 기술
- SQL 쿼리 대신 Python 객체로 DB를 조작한다.

### 4-1. ORM의 장점과 단점
|장점|단점|
|--|--|
|SQL 없이도 데이터 조작 가능| SQL 구조를 이해하지 못하면 한계|
|유지보수 편리|복잡한 쿼리는 SQL보다 성능이 느릴 수 있음|
|코드로 DB 구조 정의|내부 작동 원리를 이해해야 효율적 사용 가능|

## 5. Tortoise ORM
- Django ORM 스타일의 간결한 문법
- 동기(비async) 지원 → FastAPI와 궁합 최고
- SQLite, MySQL, PostgreSQL 등 지원
- 마이그레이션 도구: Aerich
---
- 설치 : `pip install tortoise-orm aiomysql aerich`
- `aiomysql`: MySQL과의 비동기 통신을 위한 드라이버
- `aerich`: Tortoise ORM 전용 마이그레이션 도구
---
### 프로젝트 구조 에시
```
tortoise_mysql_demo/
├─ config.py      # DB 연결 설정
├─ models.py      # 데이터베이스 테이블 정의
└─ app.py         # 실행 로직
```

### 5-1. Tortoise ORM의 기본 구조
|단계|구성 요소|설명|
|--|--|--|
|모델(Model) 정의|`class Patient(models.Model)`|Python 클래스로 테이블 구조 정의|
|초기화(Init)|`await Tortoise.init(config=...)`|DB연결 및 모델 로딩
|스키마(Schema) 생성|`await Tortoise.generate_schemas()`|모델 기반 테이블 생성|
|데이터(CRUD) 조작|`await Model.create() / .get() / .filter()`|ORM 메서드로 데이터 입출력|
|마이그레이션(Optional)|`aerich migrate / upgrade`|모델 변경사항 DB에 반영|

### 5-2. 관계 필드
- ForeignKeyField: N:1 관계를 설정합니다.
- OneToOneField: 1:1 관계를 설정합니다.
- ManyToManyField: N:M 관계를 설정하며 별도의 중간 테이블을 생성합니다.

### 5-3. 제약 조건
부모 레코드가 삭제될 때 자식 레코드의 동작을 결정하는 것
||||
|-|-|-|
|`CASCADE`|부모 삭제 시 자식도 삭제|
|`PROTECT`|자식이 존재하면 부모 삭제 불가|
|`SET_NULL`|부모 삭제 시 FK → NULL|
|`SET_DEFAULT`|부모 삭제 시 FK → 기본값|
|`SET(func)`|부모 삭제 시 FK → 함수 결과|
|`RESTRICT`|참조 중이면 삭제 제한|

----
## 동기(Sync) vs 비동기(Async)

동기 (Synchronous)
- 한 작업이 끝나야 다음 작업이 시작된다.
- DB 응답을 기다리는 동안 CPU는 아무것도 하지 않고 대기한다. (I/O Blocking).

비동기 (Async)
- 작업을 요청한 후 응답을 기다리지 않고 다른 작업을 수행한다.
- await 키워드를 만나면 I/O가 처리되는 동안 이벤트 루프가 다른 태스크를 처리한다.