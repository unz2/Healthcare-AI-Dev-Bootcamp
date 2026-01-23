# Docker 캐싱 및 식별자

> 🗓️ **2026-01-23**  
> ✍🏼 **작성자 : unz**

---

## 📝 목차

1. Redis란?
2. .dockerignore
3. UUID

---

## 1. Redis란?

> Remote Dictionary Server  
> 메모리 내에 데이터를 저장하는 오픈 소스 데이터 구조 저장소

- RAM에 데이터를 저장하여 읽기/쓰기 속도가 빠르다.
- 모든 데이터는 Key-Value 쌍으로 이루어져 있다.
- 데이터베이스 부하를 줄이기 위해 자주 조회되는 데이터를 임시 저장
- Queue, Pub/Sub 같은 메시징 패턴 지원

### 1-1. Redis 주요 명령어

- `SET <key> <value>`: 특정 키에 값 저장
- `GET <key>`: 특정 키의 값 조회
- `DEL <key>`: 특정 키와 값 삭제
- `KEYS *`: 현재 저장된 모든 키 목록 출력
- `LPUSH` / `RPUSH`: 리스트의 왼쪽 또는 오른쪽에 데이터 넣기
- `LPOP` / `RPOP`: 리스트의 왼쪽 또는 오른쪽에서 데이터 꺼내기
- `SUBSCRIBE <channel>`: 특정 채널의 메시지 수신 대기
- `PUBLISH <channel> <message>`: 특정 채널에 메시지 발송

```bash
# redis 접속
docker compose exec redis redis-cli

# 데이터 조작
> SET name alex
OK
> SET age 20
OK

> GET name
"alex"
> GET age
"20"

> KEYS *
1) "name"
2) "age"

> DEL name
(integer) 1
> DEL age
(integer) 1

# 리스트 조작
> LPUSH job_queue job1
(integer) 1
> LPUSH job_queue job2
(integer) 2

> RPOP job_queue
"job1"
> LPOP job_queue
"job2"

# 발행 구독
# [Terminal A] 구독 시작
> SUBSCRIBE chat
Reading messages... (press Ctrl-C to quit)

# [Terminal B] 메시지 발행
> PUBLISH chat_room "Hello!"
(integer) 1
```

## 2. .dockerignore

> Docker 이미지를 빌드할 때, Build Context에서 특정 파일이나 디렉토리를 제외시키기 위해 사용하는 설정 파일

- 불필요한 파일을 제외하여 Docker 데몬으로 전송되는 컨텍스트 크기를 줄인다.
- 최종 이미지에 포함될 필요 없는 파일을 제거한다.
- 비밀번호/API 키 설정 파일이 이미지 내부에 포하모디는 것을 방지한다.

## 3. UUID

> Universally Unique Identifier  
> 네트워크 상에서 중복되지 않는 고유한 아이디를 만들기 위한 128bit 식별자 규격

- 여러 데이터베이스 서버를 사용하는 분산 환경에서 ID 충돌을 방지한다.
- 사용자가 업로드한 파일명을 UUID로 변경하여 파일명 충돌을 방지한다.
- 순차적인 ID는 데이터 유추가 쉽지만, UUID는 유추가 불가능하다.

```bash
python3.13 -i

import uuid
uuid.uuid4()
# UUID('e0c44120-89f6-40b9-b42b-56ea8a58ade7')

uuid.uuid4()
# UUID('516f23e5-47a2-4e04-a66a-05a780aa18d8')
```
