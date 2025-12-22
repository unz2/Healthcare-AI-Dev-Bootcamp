# SQL 기본

## 🎯 목표
1. SQL(Structured Query Language)이란?
2. MySQL
3. CREATE
4. ALTER
5. DROP, TRUNCATE
6. INSERT
7. SELECT
8. UPDATE
9. DELETE
10. 비교 연산자
11. 범위 필터(BETWEEN)
12. 집합 필터(IN / NOT IN)
13. 문자열 패턴 매칭(LIKE)

---

## 1. SQL(Structured Query Language)이란?
- 관계형 데이터베이스 관리 시스템(RDBMS)에서 데이터를 정의, 조작, 제어하기 위해 사용하는 표준 언어
- 국제 표준(ANSI SQL)이 존재하여 대부분의 RDBMS(MySQL, Oracle, PostgreSQL 등)에서 공통적으로 사용된다.

### 1-1. SQL의 구성요소
**DDL (Data Definition Language, 데이터 정의어)**
- 데이터베이스 구조(도메인, 스키마, 테이블, 뷰, 인덱스)를 생성, 수정, 삭제하는 언어
- 명령어: `CREATE`, `ALTER`, `DROP`, `TRUNCATE`

**DML (Data Manipulation Language, 데이터 조작어)**
- 데이터베이스에 저장된 자료들을 조회, 삽입, 수정, 삭제하는 언어
- 명령어: `SELECT`, `INSERT`, `UPDATE`, `DELETE`

**DCL (Data Control Language, 데이터 제어어)**
- 데이터 관리자(DBA)가 사용자에게 데이터베이스에 접근할 수 있는 권한을 부여하거나 회수하는 언어
- 명령어: `GRANT`, `REVOKE`

**TCL (Transaction Control Language, 트랜잭션 제어어)**
- DML에 의한 변경 사항을 확정 짓거나 취소하는 언어
- 명령어: `COMMIT`, `ROLLBACK`, `SAVEPOINT`

## 2. MySQL
- 세계에서 가장 인기 있는 오픈 소스 관계형 데이터베이스 관리 시스템(RDBMS)
- 빠른 속도와 높은 신뢰성을 자랑하며, 웹 애플리케이션 개발에 널리 쓰인다.

### 2-1. MySQL Workbench
- MySQL을 그래픽 사용자 인터페이스(GUI) 환경에서 관리할 수 있게 해주는 시각적 도구

### 2-2. MySQL 설치
1. https://dev.mysql.com/downloads/ 접속
2. MySQL Installer 다운로드
3. 'Developer Default' 선택
4. root 비밀번호 설정
5. 설치 완료 후 Workbench 실행
6. root 계정으로 접속

### 2-3. MySQL Workbench의 주요 영역
|영역|설명|
|--|--|
|Connections|DB 서버 접속 정보|
|Navigator| 스키마, 테이블, 뷰, 저장 프로시저 등을 트리 구조로 확인|
|Query Editor|직접 SQL 쿼리를 작성하고 실행|
|Result Grid|SELECT문 실행 결과 출력|

### 2-4. MySQL의 데이터 타입
### **숫자형**
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-7btt{border-color:inherit;font-weight:bold;text-align:center;vertical-align:top}
.tg .tg-uzvj{border-color:inherit;font-weight:bold;text-align:center;vertical-align:middle}
.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
.tg .tg-0pky{text-align:left;vertical-align:top}
</style>
<table class="tg"><thead>
  <tr>
    <th class="tg-7btt">타입</th>
    <th class="tg-uzvj">타입</th>
    <th class="tg-7btt">범위 / 예시</th>
  </tr></thead>
<tbody>
  <tr>
    <td class="tg-0pky">INT</td>
    <td class="tg-0pky">정수 (기본형)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td class="tg-0pky"><span style="font-weight:400;font-style:normal">-2,147,483,648 ~ 2,147,483,647&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
  </tr>
  <tr>
    <td class="tg-0pky">TINYINT</td>
    <td class="tg-0pky">아주 작은 정수</td>
    <td class="tg-0pky">-128 ~ 127</td>
  </tr>
  <tr>
    <td class="tg-0pky">SMALLINT</td>
    <td class="tg-0pky">작은 정수</td>
    <td class="tg-0pky">약 ±3만</td>
  </tr>
  <tr>
    <td class="tg-0pky">MEDIUMINT</td>
    <td class="tg-0pky">중간 크기 정수</td>
    <td class="tg-0pky"><span style="font-weight:400;font-style:normal">약 ±800만</span></td>
  </tr>
  <tr>
    <td class="tg-0pky">BIGINT</td>
    <td class="tg-0pky">매우 큰 정수</td>
    <td class="tg-0pky"><span style="font-weight:400;font-style:normal">±9경 정도</span></td>
  </tr>
  <tr>
    <td class="tg-0pky">DECIMAL(p,s)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td class="tg-0pky">고정 소수점</td>
    <td class="tg-0pky">`DECIMAL(6,2)` → 9999.99</td>
  </tr>
  <tr>
    <td class="tg-0pky">FLOAT</td>
    <td class="tg-0pky">단정밀도 실수</td>
    <td class="tg-0pky">약 7자리 정밀도</td>
  </tr>
  <tr>
    <td class="tg-0pky">DOUBLE</td>
    <td class="tg-0pky">배정밀도 실수</td>
    <td class="tg-0pky">약 15자리 정밀도</td>
  </tr>
  <tr>
    <td class="tg-0pky">BIT(n)</td>
    <td class="tg-0pky">비트 단위 저장</td>
    <td class="tg-0pky">`BIT(8)` → 8비트(1바이트)</td>
  </tr>
</tbody></table>

### **문자형**
<table class="tg"><thead>
  <tr>
    <th class="tg-7btt">타입</th>
    <th class="tg-uzvj">타입</th>
    <th class="tg-7btt">특징 / 용도</th>
  </tr></thead>
<tbody>
  <tr>
    <td class="tg-0pky">CHAR(n)</td>
    <td class="tg-0pky">고정 길이 문자열</td>
    <td class="tg-0pky"><span style="font-weight:400;font-style:normal">항상 n바이트, 주민번호 등 고정형 데이터</span></td>
  </tr>
  <tr>
    <td class="tg-0pky"><span style="font-weight:400;font-style:normal">VARCHAR(n)</span></td>
    <td class="tg-0pky"><span style="font-weight:400;font-style:normal">가변 길이 문자열</span></td>
    <td class="tg-0pky">이름, 메모 등</td>
  </tr>
  <tr>
    <td class="tg-0pky">TEXT</td>
    <td class="tg-0pky">긴 텍스트 (최대 65KB)</td>
    <td class="tg-0pky">코멘트, 기사 내용 등</td>
  </tr>
  <tr>
    <td class="tg-0pky">MEDIUMTEXT&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td class="tg-0pky"><span style="font-weight:400;font-style:normal">더 긴 텍스트 (최대 16MB)</span></td>
    <td class="tg-0pky">긴 보고서</td>
  </tr>
  <tr>
    <td class="tg-0pky">LONGTEXT</td>
    <td class="tg-0pky"><span style="font-weight:400;font-style:normal">매우 긴 텍스트 (최대 4GB)</span></td>
    <td class="tg-0pky"><span style="font-weight:400;font-style:normal">로그, 기록 데이터</span></td>
  </tr>
  <tr>
    <td class="tg-0pky">ENUM('a','b'...)</td>
    <td class="tg-0pky">미리 정의된 값 중 하나</td>
    <td class="tg-0pky">성별, 상태 값</td>
  </tr>
  <tr>
    <td class="tg-0pky"><span style="font-weight:400;font-style:normal">SET('a','b'...)</span></td>
    <td class="tg-0pky">여러 값을 동시에 선택 가능</td>
    <td class="tg-0pky">복수 태그 저장</td>
  </tr>
  <tr>
    <td class="tg-0pky">BLOB</td>
    <td class="tg-0pky">이진 데이터</td>
    <td class="tg-0pky">이미지, 파일, 영상 등</td>
  </tr>
</tbody></table>

### **날짜·시간형**
<table class="tg"><thead>
  <tr>
    <th class="tg-7btt">타입</th>
    <th class="tg-uzvj">타입</th>
    <th class="tg-7btt">예시</th>
  </tr></thead>
<tbody>
  <tr>
    <td class="tg-0pky">DATE</td>
    <td class="tg-0pky">연·월·일</td>
    <td class="tg-0pky"><span style="font-weight:400;font-style:normal">2025-10-21</span></td>
  </tr>
  <tr>
    <td class="tg-0pky">TIME</td>
    <td class="tg-0pky"><span style="font-weight:400;font-style:normal">시·분·초</span></td>
    <td class="tg-0pky">12:30:40</td>
  </tr>
  <tr>
    <td class="tg-0pky">DATETIME</td>
    <td class="tg-0pky">날짜 + 시간</td>
    <td class="tg-0pky">2025-10-21 12:30:41</td>
  </tr>
  <tr>
    <td class="tg-0pky">TIMESTAMP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td class="tg-0pky"><span style="font-weight:400;font-style:normal">날짜 + 시간 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
    <td class="tg-0pky">CURRENT_TIMESTAMP &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </td>
  </tr>
  <tr>
    <td class="tg-0pky">YEAR(4)</td>
    <td class="tg-0pky">연도</td>
    <td class="tg-0pky"><span style="font-weight:400;font-style:normal">2025</span></td>
  </tr>
</tbody></table>

- `DATETIME` : 단순 시간 저장 (타임존 영향 X)
- `TIMESTAMP`: 자동으로 서버 타임존에 맞게 변환

## 3. CREATE
```SQL
-- 데이터베이스 생성
CREATE DATABASE hospital;
USE hospital;

-- 환자 테이블 생성
CREATE TABLE patients (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,      -- 환자 ID (기본키)
    name VARCHAR(50) NOT NULL,                      -- 이름
    birth_date DATE,                                -- 생년월일
    gender ENUM('M', 'F') NOT NULL,                 -- 성별
    phone VARCHAR(20) UNIQUE,                       -- 전화번호 (유일값)
    email VARCHAR(100),                             -- 이메일
    address VARCHAR(200),                           -- 주소
    visit_count INT DEFAULT 0,                      -- 방문횟수 (기본값 0)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 등록일+시간
);

-- 의사 테이블 생성
CREATE TABLE doctors (
    doctor_id INT PRIMARY KEY AUTO_INCREMENT,       -- 의사 ID (기본키)
    name VARCHAR(50) NOT NULL,                      -- 이름
    specialty VARCHAR(50) NOT NULL,                 -- 진료과목
    phone VARCHAR(20) UNIQUE,                       -- 전화번호 (유일값)
    email VARCHAR(100),                             -- 이메일
    hire_date DATE                                  -- 입사일
);

-- 예약 테이블 생성
CREATE TABLE appointments (
    app_id INT PRIMARY KEY AUTO_INCREMENT,          -- 진료 예약 ID (기본키)
    patient_id INT,                                 -- 환자 ID (외래키)
    doctor_id INT,                                  -- 의사 ID (외래키)
    app_date DATETIME NOT NULL,                     -- 예약일
    status ENUM('Scheduled','Completed','Cancelled')-- 상태
    note TEXT,                                      -- 진료 메모
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 등록일+시간
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);
```

## 4. ALTER
- `MODIFY` : 컬럼의 데이터 타입, 제약 조건만 바꿀 떄 사용한다. (컬럼 이름은 유지)
- `CHANGE` : 컬럼의 이름과 정의를 모두 바꿀 떄 사용한다.
```SQL
-- 컬럼 데이터 타입 변경
ALTER TABLE patients
MODIFY COLUMN phone VARCHAR(30);

-- 컬럼 데이터 타입 변경 + 컬럼 이름 변경
ALTER TABLE patients
CHANGE COLUMN phone contact_number VARCHAR(30);

-- 컬럼 기본값 변경
ALTER TABLE appointments
MODIFY COLUMN status ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled';

-- 컬럼 추가
ALTER TABLE patients
ADD COLUMN blood_type ENUM('A', 'B', 'O', 'AB');

-- 컬럼 삭제
ALTER TABLE patients
DROP COLUMN blood_type;
```

## 5. DROP, TRUNCATE
- `TRUNCATE` : 테이블의 데이터만 전부 삭제한다. (테이블 구조와 인덱스는 남겨둔다.)
- `DROP` : 테이블 자체를 전부 삭제한다. (테이블의 데이터와 구조 모두 삭제된다.)

```SQL
TRUNCATE TABLE 테이블명;

DROP TABLE 테이블명;
```

## 6. INSERT
```SQL
INSERT INTO patients
(name, birth_date, gender, phone, email, address, visit_count, created_at)
VALUES
('홍길동', '1999-01-01', 'M', '010-1234-5678', 'gildong_h@naver.com', '서울특별시 강남구 역삼동', 0, NOW);
('김철수', '2000-02-02', 'M', '010-5678-1234', 'chulsu12@ngmail.com', '서울특별시 마포구 서교동', 0, NOW);
('이영희', '1980-03-03', 'F', '010-9876-5432', '20_hee_20@naver.com', '서울특별시 송파구 잠실동', 0, NOW);

INSERT INTO doctors
(name, specialty, phone, email, hire_date)
VALUES 
('박의사', '내과', '010-4321-8756', 'dr_park11@hospital.com', '2018-03-01');
('최의사', '정형외과', '010-5432-9876', 'choi_doc01@hospital.com', '2020-07-15');
('강의사', '피부과', '010-3456-7890', 'kang_dr33@hospital.com', '2016-11-20');

INSERT INTO appointments
(patient_id, doctor_id, visit_date, status, note, created_at)
VALUES
(1, 1, '2025-10-22 09:00:00', 'Completed', '감기증상으로 내원', NOW()),
(2, 2, '2025-10-22 10:00:00', 'Scheduled', '넘어지면서 발목 염좌', NOW()),
(3, 3, '2025-10-22 11:00:00', 'Scheduled', '고양이가 할퀴어서 상처', NOW()),
```

## 7. SELECT
```SQL
SELECT  컬럼명1, 컬럼명, ...
FROM 테이블명
[WHERE 조건]
[ORDER BY 정렬기준 ASC/DESC]
[LIMIT 개수];
```
- `*` : 모든 컬럼을 조회
- WHERE : 조건 지정
- ORDER BY : 정렬 기준 (ASC : 오름차순(기본값), DESC : 내림차순)
- LIMIT : 출력 개수 제한

```SQL
-- 조회(SELECT)
SELECT * FROM patients;
SELECT name, gender FROM doctors;

-- 조건 검색(WHERE)
SELECT * FROM patients WHERE gender = 'F';
SELECT * FROM appointments WHERE visit_date > '2025-10-22 09:00';

-- 정렬(ORDER BY)
SELECT * FROM doctors ORDER BY hire_date; -- ASC (기본값)
SELECT * FROM appointments ORDER BY visit_date DESC;

-- 결과 제한(LIMIT)
SELECT * FROM patients LIMIT 3;
```

## 8. UPDATE
```SQL
UPDATE 테이블명
SET 컬럼1 = 값1, 컬럼2 = 값2, ...
WHERE 조건;
```
- SET : 변경할 컬럼과 변경할 값을 지정
- WHERE : 조건 지정 (*조건 지정하지 않으면 모든 행이 수정됨 주의!)

```SQL
-- 단일 컬럼 수정
UPDATE patients 
SET phone = '010-9999-7777'
WHERE patient_id = 1;

-- 여러 컬럼 동시 수정
UPDATE patients
SET address = '서울특별시 서초구 서초동'
    email = 'patient01@naver.com'
WHERE patient_id = 1;

-- 일괄 업데이트
UPDATE appointments
SET status = 'Completed'
WHERE visit_date < NOW();

-- 방문 횟수 증가
UPDATE patients
SET visit_count = visit_count + 1
WHERE name = '홍길동';

-- 진료 메모 수정
UPDATE appointments
SET note = '넘어지면서 발목 염좌 - 물리치료 예약'
WHERE app_id = 2;

-- 진료 일정 변경
UPDATE appointments
SET visit_date = '2025-10-23 11:00:00'
WHERE patient_id = 3;

```

## 9. DELETE
```SQL
DELETE FROM 테이블명
WHERE 조건;
```
- WHERE : 조건 지정 (*조건 지정하지 않으면 테이블의 모든 데이터 삭제됨 주의!)

```SQL
-- 특정 환자 정보 삭제
DELETE FROM patients
WHERE patient_id = 2;

-- 특정 환자 진료 기록 삭제
DELETE FROM appointments
WHERE app_id = 2;
```

## 10. 비교 연산자
|구분| `=` |`IS`|
|:--:|--|--|
|비교대상| 일반 값(숫자, 문자 등)|`NULL`, `TRUE`, `FALSE` 같은 특수 값|
|의미|값이 같은가?| 이 값이 그 상태인가?
|예시| `WHERE age = 30`| `WHERE phone IS NULL`|
|잘못된 예시|`WHERE phone = NULL`||
* SQL에서 `NULL`은 **값이 없음** 을 의미

## 11. 범위 필터(BETWEEN)
```SQL
SELECT * FROM appointments
WHERE visit_date >= '2025-10-22 00:00:00'
  AND visit_date <  '2025-10-23 00:00:00';

SELECT * FROM appointments
WHERE visit_date BETWEEN '2025-10-22 00:00:00' AND '2025-10-23 00:00:00';
```

## 12. 집합 필터(IN / NOT IN)
- 리스트 안에 값이 있는지 확인

```SQL
SELECT * FROM doctors
WHERE specialty IN ('피부과');

SELECT * FROM appointments
WHERE status NOT IN ('Cancelled');

```

## 13. 문자열 패턴 매칭(LIKE)
- `%` : 0개 이상의 문자
- `_` : 정확히 1개의 문자

```SQL
-- 성이 '김'인 환자 조회
SELECT * FROM patients
WHERE name LIKE '김%'

-- 3글자 이름 가운데 글자가 '영'인 환자 조회
SELECT * FROM patients
WHERE name LIKE '_영_'

-- 진료과목이 '외과'로 끝나는 의사
SELECT * FROM doctors
WHERE specialty LIKE '%외과'

-- 메모에 '염좌'가 포함된 예약
SELECT * FROM appointments
WHERE note LIKE '%염좌%'
```