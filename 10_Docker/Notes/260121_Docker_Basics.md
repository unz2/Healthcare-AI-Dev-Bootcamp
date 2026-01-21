# Docker 기초

> 🗓️ **2026-01-21**  
> ✍🏼 **작성자 : unz**

---

## 📝 목차

1. Docker란?
2. Docker Desktop 설치
3. Docker의 기본 흐름
4. Docker Compose

---

## 1. Docker란?

> 애플리케이션을 컨테이너라는 표준화된 유닛으로 패키징하여 어디서나 동일하게 실행할 수 있도록 돕는 오픈소스 플랫폼

- **컨테이너(Container)**
  - 코드와 그 실행에 필요한 모든 라이브러리, 설정 파일을 하나로 묶은 소프트웨어 유닛
- **이미지(Image)**
  - 컨테이너를 실행하기 위한 설계도(템플릿)
  - 변경할 수 없는 파일, 이 이미지를 실행하면 컨테이너가 된다.
- **Docker Hub**
  - 전 세계 사람들이 만들어 놓은 이미지를 공유하는 저장소(마켓 플레이스)

### 1-1. Docker 사용하는 이유

- 개발, 테스트, 운영 환경을 동일하게 유지할 수 있다.
- 여러 애플리케이션을 한 서버에서 실행해도 서로 영향을 주지 않는다.
- 가상머신보다 가볍고 빠르며 자원을 적게 소모한다.

## 2. Docker Desktop 설치

- 설치 파일 다운로드: https://www.docker.com/products/docker-desktop/
- 설치 완료 후 터미널에서 `docker --version` 을 입력하여 정상 설치 확인

## 3. Docker의 기본 흐름

| 순서                        | 설명                                                                      |
| --------------------------- | ------------------------------------------------------------------------- |
| **Dockerfile 작성**         | 앱 실행에 필요한 패키지, 설정, 소스코드 등을 명시한 설계도를 만든다.      |
| **Dockerfile → Image 빌드** | Dockerfile을 바탕으로 실행 가능한 바이너리 파일 묶음인 이미지를 생성한다. |
| **Image → Container 실행**  | 생성된 이미지를 바탕으로 독립된 격리 공간인 컨테이너를 띄운다.            |
| **컨테이너에서 앱 동작**    | 컨테이너 내부 환경에서 애플리케이션이 실제로 구동된다.                    |
| **컨테이너 종료/삭제**      | 사용이 끝난 컨테이너를 멈추고 시스템 자원을 회수하기 위해 삭제한다.       |

### 3-1. Dockerfile

> 도커 이미지를 만들기 위한 텍스트 파일 기반의 설계도

- 어떤 운영체제를 사용할지, 어떤 라이브러리를 설치할지, 어떤 명령어를 실행할지를 순차적으로 기록한다.

```docker
# 베이스 이미지 지정 (Python 3.13 환경)
FROM python:3.13-slim

# 작업 디렉토리 설정
WORKDIR /app

# 소스 코드 복사
COPY . .

# 의존성 파일 설치
RUN pip install -r requirements.txt

# 앱 실행 명령 (FastAPI) -> 컨테이너 시작 시 실행
CMD ["fastapi", "dev", "--host", "0.0.0.0"]
```

### 3-2. 이미지 빌드 & 실행 명령어

**이미지 빌드**

```bash
# -t: 이미지에 이름(태그) 부여
# . : 현재 디렉토리의 Dockerfile을 사용함
docker build -t fastapi .
```

**이미지 목록 확인**

```bash
# 로컬 시스템에 저장된 모든 도커 이미지 확인
docker images
```

**컨테이너 실행**

```bash
# -p: 호스트포트 컨테이너 포트 연결
docker run -p 8000:8000 fastapi

# -d: 백그라운드 실행 (Detached)
# --rm: 컨테이너 종료 시 자동으로 삭제
docker run -p 8000:8000 -d —rm fastapi
```

**컨테이너 상태 조회**

```bash
# 실행 중인 컨테이너 확인
docker ps

# 종료된 컨테이너를 포함한 모든 상태 확인
docker ps -a
```

**컨테이너 중단, 재시작, 삭제**

```bash
# 컨테이너 중단 (123은 컨테이너 ID 앞부분)
docker stop 123

# 중지된 컨테이너 재시작 (123은 컨테이너 ID 앞부분)
docker start 123

# 여러 개의 컨테이너를 ID로 한꺼번에 삭제 가능
docker rm 123 2e6 8a2 8d2
```

## 4. Docker Compose

> 여러 개의 컨테이너를 하나의 서비스로 정의하고 관리할 수 있게 해주는 도구

- 한 번에 일괄적으로 다수의 컨테이너를 실행/중지 가능
- 컨테이너 실행 구조를 코드로 정의
- 컨테이너 실행 순서 관리 & 일괄 실행
- 자동 네트워크 구성 → 멀티 컨테이너 환경을 위한 도구

### 4-1. docker-compose.yml

> YAML 형식을 사용하여 인프라를 코드로 정의하는 것

```yml
services:
  api:
    build: .
    ports:
      - "8000:8000"
    depends_on:
      - db

  db:
    image: mysql:8.4
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: app_db
    ports:
      - "3306:3306"
```

### 4-2. Docker Compose 주요 명령어

**서비스 시작**

```bash
# docker-compose.yml에 정의된 모든 컨테이너를 생성하고 백그라운드에서 실행
docker compose up -d
```

**서비스 종료**

```bash
# 컨테이너를 멈추고 생성된 네트워크 등의 자원까지 삭제
docker compose down
```
