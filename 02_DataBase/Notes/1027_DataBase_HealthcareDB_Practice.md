# 헬스케어 데이터베이스 실습
> 🗓️ **2025-10-27**  
✍🏼 **작성자 : unz**
---
## 📋 목차
1. 정규화란(Normalization)?
2. 이상 현상(Anomaly)
3. 정규화 단계
4. 인덱스(Index)
5. MySQL 테이블 스키마 생성
6. Python Tortoise ORM 구현
---

## 1. 정규화란(Normalization)?
- 관계형 데이터베이스 설계에서 데이터 중복을 최소화하고, 데이터 무결성을 보장하기 위해 데이터를 구조화하는 프로세스
- 주로 큰 테이블을 작고 잘 정의된 단위로 분할하여 관리하는 과정
- 데이터 구조의 안정성 및 탄력성 확보
- 이상 현상(Anomaly) 제거
- 데이터 중복 저장 방지로 인한 저장 공간 절약

## 2. 이상 현상(Anomaly)
- 정규화가 제대로 되지 않은 데이터베이스에서는 데이터 조작 시 세 가지 이상 현상이 발생한다.

### 2-1. 삽입 이상(Insertion Anomaly)
- 데이터를 삽입할 떄 원하지 않는 정보까지 강제로 삽입
- 특정 정보가 없어서 데이터를 삽입하지 못하는 현상

### 2-2. 갱신 이상(Update Anomaly)
- 중복된 데이터 중 일부만 수정되어 데이터 간 불일치가 발생하는 현상

### 2-3. 삭제 이상(Deletion Anomaly)
- 특정 정보를 삭제할 때 삭제해서는 안될 정보까지 함께 삭제되는 현상

> 하나의 테이블에 모든 데이터가 들어가면 결국 데이터 무결성이 붕괴된다.

## 3. 정규화 단계
### 3-1. 제1정규형 (1NF: First Normal Form)
- 테이블의 모든 도메인이 **원자값**으로만 구성되어야 한다.
- 한 칸에 오직 한 개의 값만 들어가는 것을 의미


**1NF 위반 상태**
|patient_id|blood_pressure|
|:--:|:--:|
|1|120/80|

**1NF 적용 후**
|patient_id|systolic|diastolic|
|:--:|:--:|:--:|
|1|120|80|


### 3-2. 제2정규형 (2NF: Second Normal Form)
- 제1정규형을 만족하면서 기본키가 여러컬럼으로 구성된 경우 **부분 함수적 종속성**을 제거해야한다.
- 기본키의 일부분에만 종속되는 속성이 있으면 안됨

**2NF 위반 상태**
|patient_id|name|birth_date|age|gender|date|systolic|diastolic|
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|1|홍길동|2000-01-01|25|M|2025-10-27|120|80|

**2NF 적용 후 (환자 테이블, 건강지표 테이블 분리)**
|patient_id|name|birth_date|age|gender|
|:--:|:--:|:--:|:--:|:--:|
|1|홍길동|2000-01-01|25|M|

|patient_id|date|systolic|diastolic|
|:--:|:--:|:--:|:--:|
|1|2025-10-27|120|80|

### 3-3. 제3정규형 (3NF: Third Normal Form)
- 제2정규형을 만족하면서 **이행적 함수적 종속성**을 제거해야한다.
- 기본키가 아닌 속성 간의 종속성이 존재하면 안됨
- ($A \to B$ 이고 $B \to C$ 이면 $A \to C$ 가 성립하는 관계 제거)

**3NF 위반 상태**
|patient_id|name|birth_date|age|gender|
|:--:|:--:|:--:|:--:|:--:|
|1|홍길동|2000-01-01|25|M|

**3NF 적용 후 (나이는 생년월일로 계산 가능)**
|patient_id|name|birth_date|gender|
|:--:|:--:|:--:|:--:|
|1|홍길동|2000-01-01|M|

## 4. 인덱스(Index)
- 데이터베이스 테이블의 검색 속도를 향상시키기 위한 색인 객체
- 장점 : `SELECT`문의 검색 속도와 `JOIN` 성능을 향상 시킨다.
- 단점 : 인덱스를 저장하기 위한 추가적인 공간이 필요하다.
- 단점 : `INSERT`, `UPDATE`, `DELETE`시 인덱스도 매번 갱신해야 하므로 쓰기 성능이 저하될 수 있다.

```SQL
-- 인덱스 생성
CREATE INDEX idx_patient_date
ON health_metrics (patient_id, date);
```

---
## 5. MySQL 테이블 스키마 생성
```SQL
-- 1. 환자 정보 테이블
CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    gender CHAR(1) NOT NULL,
    birth_date DATE
);

-- 2. 건강 지표 테이블
CREATE TABLE health_metrics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    date DATE NOT NULL,
    weight DECIMAL(5,2),
    height DECIMAL(5,2),
    systolic SMALLINT,
    diastolic SMALLINT,
    glucose SMALLINT,
    heart_rate SMALLINT,
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- 3. 약물 정보 테이블
CREATE TABLE drugs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    drug_code VARCHAR(20) UNIQUE NOT NULL,
    drug_name VARCHAR(200) NOT NULL,
    drug_company VARCHAR(200),
    company_phone VARCHAR(30)
);

-- 4. 처방 내역 테이블
CREATE TABLE treatments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    drug_id INT NOT NULL,
    date DATE NOT NULL,
    dose VARCHAR(50),
    prescription VARCHAR(200),
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (drug_id) REFERENCES drugs(id)
);

-- 환자별 최신 건강 상태 최근 3건 조회
SELECT
    p.id AS patient_id,
    p.name,
    h.date,
    h.systolic,
    h.diastolic,
    h.glucose,
    h.heart_rate
FROM patients p
INNER JOIN health_metrics h 
    ON p.id = h.patient_id
WHERE p.id = 1
ORDER BY h.date DESC 
LIMIT 3;

-- 환자 처방 내역 + 약물 정보 조회
SELECT
    t.id AS treatment_id,
    p.name AS patient_name,
    t.date,
    d.drug_name,
    d.drug_company,
    t.dose,
    t.prescription
FROM treatments t
JOIN patient p
    ON p.id = t.patient_id
JOIN drugs d
    ON d.id = t.drug_id
ORDER BY t.date DESC;

-- 성별 평균 혈압/혈당 분석
SELECT p.gender, 
       ROUND(AVG(h.systolic), 1) AS avg_systolic,
       ROUND(AVG(h.diastolic), 1) AS avg_diastolic,
       ROUND(AVG(h.glucose), 1) AS avg_glucose
FROM patients p
JOIN health_metrics h
    ON p.id = h.patient_id
GROUP BY p.gender;

-- 약물별 처방 건수
SELECT
    d.drug_name,
    COUNT(t.id) AS n_prescriptions
FROM treatments t
JOIN drugs d
    ON d.id = t.drug_id
GROUP BY d.drug_id, d.drug_name
ORDER BY n_prescriptions DESC;
```

## 6. Python Tortoise ORM 구현
```Python
from tortoise import fields, models

# 1. 환자 정보 테이블
class Patient(models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100, index=True)
    gender = fields.CharField(max_length=1)
    birth_date = fields.DateField(null=True)

# 2. 건강 지표 테이블
class HealthMetric(models.Model):
    id = fields.IntField(pk=True)
    patient = fields.ForeignKeyField("models.Patient", related_name="metrics", on_delete=fields.CASCADE)
    date = fields.DateField()
    weight = fields.DecimalField(max_digits=5, decimal_places=2, null=True)
    height = fields.DecimalField(max_digits=5, decimal_places=2, null=True)
    systolic = fields.SmallIntField(null=True)
    diastolic = fields.SmallIntField(null=True)
    glucose = fields.SmallIntField(null=True)
    heart_rate = fields.SmallIntField(null=True)

# 3. 약물 정보 테이블
class Drug(models.Model):
    id = fields.IntField(pk=True)
    drug_code = fields.CharField(max_length=20, unique=True)
    drug_name = fields.CharField(max_length=200, index=True)
    drug_company = fields.CharField(max_length=200, null=True)
    company_phone = fields.CharField(max_length=30, null=True)

# 4. 처방 내역 테이블
class Treatment(models.Model):
    id = fields.IntField(pk=True)
    patient = fields.ForeignKeyField("models.Patient", related_name="treatments", on_delete=fields.CASCADE)
    drug = fields.ForeignKeyField("models.Drug", related_name="treatments", on_delete=fields.RESTRICT)
    date = fields.DateField()
    dose = fields.CharField(max_length=50, null=True)
    prescription = fields.CharField(max_length=200, null=True)
```

```Python
from models import Patient, HealthMetric, Treatment

# 환자별 최신 건강 상태 최근 3건 조회
async def latest_metrics(patient_id: int, limit: int = 3):
    rows = (HealthMetric
            .filter(patient_id=patient_id)
            .select_related("patient")
            .order_by("-date")
            .limit(limit))

    for r in await rows:
        print(r.patient.id, r.patient.name, r.date, r.systolic, r.diastolic, r.glucose, r.heart_rate)

# 처방 및 약물 정보 조인 조회
async def treatments_with_drug_and_patient():
    rows = (Treatment
            .all()
            .select_related("patient", "drug")
            .order_by("-date"))

    for t in await rows:
        print(t.id, t.date, t.patient.name, t.drug.drug_name, t.drug.drug_company, t.dose, t.prescription)
```