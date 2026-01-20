# FastAPI & LLM

> 🗓️ **2026-01-19**  
> ✍🏼 **작성자 : unz**

---

## 📝 목차

1. LLaMA란?
2. Hugging Face 및 주요 라이브러리
3. 환경 구축 및 모델 다운로드
4. 생성 파라미터 및 프롬프트 제어
5. FastAPI 연동
6. GPT 연동

---

## 1. LLaMA란?

> Large Language Model Meta AI  
> Meta에서 개발한 오픈소스 대형 언어 모델(LLM)

- 비교적 적은 파라미터 수로도 거대 모델에 필적하는 성능을 내도록 설계
- 지시, 질의응답, 대화에 최적화
- CPU 환경에서도 실습, 서빙 가능
- 보통 양자화(GGUF)형태로 사용

```
양자화: 모델의 숫자 정밀도를 낮춰서 메모리 사용량과 연산량을 줄이는 기법
```

## 2. Hugging Face 및 주요 라이브러리

- **Hugging Face**
  - 인공지능 모델, 데이터셋, 데모 앱을 공유하는 중앙 플랫폼
  - 전 세계 개발자들이 최신 모델을 공유하며, 이를 쉽게 가져다 쓸 수 있는 API를 제공한다.
- **transformers**
  - Hugging Face에서 유지 관리하는 파이썬 라이브러리
  - 최신 NLP 모델을 불러오고 학습시키며 추론하는 통합 인터페이스 제공
  - 모델 아키텍처 구현과 가중치 다운로드를 자동화 해준다.

## 3. 환경 구축 및 모델 다운로드

**1) 패키지 설치**

```bash
# Hugging Face 허브와 트랜스포머 설치
$ pip install transformers huggingface_hub


# LLaMA를 로컬(CPU/GPU)에서 구동하기 위한 바인딩 라이브러리
$ pip install llama-cpp-python
```

**2) 모델 다운로드**  
토큰 발행: https://huggingface.co/settings/tokens

```bash
# 생성한 토큰 입력
$ hf auth login

# GGUF 모델 다운로드
# 특정 저장소의 GGUF 파일을 로컬 디렉토리에 다운로드
$ huggingface-cli download \
  bartowski/Llama-3.2-1B-Instruct-GGUF \
  Llama-3.2-1B-Instruct-Q4_K_M.gguf \
  --local-dir ./models
```

### 3-1. 모델 로드

```python
llm = Llama(
    model_path="./models/Llama-3.2-1B-Instruct-Q4_K_M.gguf",
    n_ctx=4096,  # Context Window 크기
    n_threads=2, # CPU 코어 사용 수
    verbose=False,
    chat_format="llama-3",
)
```

## 4. 생성 파라미터 및 프롬프트 제어

### 4-1. 시스템 프롬프트 (System Prompt)란?

> LLM에 부여되는 최상위 지시사항

- 모델의 역할, 행동 원칙, 응답 스타일, 제약 조건을 규정한다.
- 일반적으로 사용자 프롬프트보다 우선순위가 높고, 대화 전반에 걸쳐 일관되게 적용된다.

```python
SYSTEM_PROMPT = (
    "You are a concise assistant. "
    "Always reply in the same language as the user's input."
    "Do not change the language. "
    "Do not mix languages."
)
```

### 4-2. Temperature (온도)란?

> 모델의 출력 확률 분포를 조정하여 답변의 무작위성을 제어하는 수치

- Low(0.1 ~ 0.3): 매우 결정적이고 사실적인 답변 생성
- Medium(0.7 ~ 0.8): 일반적인 대화에 적합한 균형 잡힌 답변
- High(1.0 이상): 창의적이고 예측 불가능한 답변

## 5. FastAPI 연동

```python
import asyncio
from llama_cpp import Llama
from fastapi import FastAPI, Body
from fastapi.responses import StreamingResponse


# 모델 로드
llm = Llama(
    model_path="./models/Llama-3.2-1B-Instruct-Q4_K_M.gguf",
    n_ctx=4096,
    n_threads=2,
    verbose=False,
    chat_format="llama-3",
)

# 시스템 프롬프트
SYSTEM_PROMPT = (
    "You are a concise assistant. "
    "Always reply in the same language as the user's input."
    "Do not change the language. "
    "Do not mix languages."
)

app = FastAPI()


@app.post("/chats")
async def generate_chat_api(user_input: str = Body(...)):

    async def event_generator():
        response = llm.create_chat_completion(
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_input},
            ],
            max_tokens=256,
            temperature=0.7,
            stream=True, # 모델이 답변을 생성되는 대로 토큰을 보낸다
        )
        for chunk in response:
            token = chunk["choices"][0]["delta"].get("content")
            if token: # 추출된 토큰이 있으면
                yield token # 즉시 클라이언트로 전송
                await asyncio.sleep(0) # 이벤트 루츠에 제어권을 양보하여 다른 작업 병행될 수 있게함

    return StreamingResponse(event_generator(), media_type="text/event-stream")

```

### 5-1. yield

> 함수를 Generator로 만드는 키워드

- **일반 함수(`return`)**
  - 호출되면 실행을 시작하여 `return`을 통해 결과값을 반환하고 메모리에서 사라짐
- **제너레이터 함수(`yield`)**
  - 호출되면 함수 내부의 코드를 즉시 실행하지 않고 제너레이터 객체 반환
  - `next()` 함수를 호출할 때마다 다음 `yield` 지점까지 실행

```python
def power_of_two():
    n = 0
    while True:
        yield 2**n
        n += 1

# 1. 제너레이터 객체 생성
gen = power_of_two()

# 2. 데이터 하나씩 꺼내기 (next() 함수 사용)
print(next(gen)) # 1 출력
print(next(gen)) # 2 출력
print(next(gen)) # 4 출력
print(next(gen)) # 8 출력
print(next(gen)) # 16 출력

# 3. for문을 사용하여 5회 출력
for _ in range(5):
    print(next(gen))
# 32
# 64
# 128
# 256
# 512
```

### 5-2. yield를 사용하는 이유

- 메모리 효율성
  - 약 100만 개의 숫자를 담은 리스트를 만들면 메모리를 엄청나게 점유한다.
  - `yield`를 사용하면 필요할 때만 값을 하나씩 생성하므로 메모리 사용량이 적다.
- 무한한 데이터 스트림 처리
  - 끝이 없는 데이터(센서 데이터, 실시간 로그 등)를 다룰 때 전체를 리스트에 담는 것은 불가능하지만
  - `yield`는 하나씩 받아 처리할 수 있다.

## 6. GPT 연동

```bash
# OpenAI 라이브러리 설치
pip install openai
```

```python
from fastapi import FastAPI, Body
from fastapi.responses import StreamingResponse
from openai import AsyncOpenAI
from pydantic import BaseModel
from config import settings

client = AsyncOpenAI(api_key=settings.openai_api_key)
app = FastAPI()


class ResultSchema(BaseModel):
    result: str
    confidence: float


@app.post("/chat-gpt")
async def chat_gpt_api(user_input: str = Body(...)):
    # OpenAI의 stream 기능을 사용하여 답변을 조금씩 가져옴
    async def event_generator():
        async with client.responses.stream(
            model="gpt-5-mini", input=user_input, text_format=ResultSchema
        ) as stream:
            async for event in stream:
                if event.type == "response.output_text.delta":
                    yield event.delta
                elif event.type == "response.completed":
                    break

    # 최종적으로 클라이언트에게 스트리밍 방식으로 응답 전송
    return StreamingResponse(event_generator(), media_type="text/plain")
```

### 6-1. Pydantic 사용하여 환경변수 파일 처리하기

1. 라이브러리 설치

```bash
pip install pydantic-settings
```

2. 기본 사용법

- 프로젝트 루트 디렉토리에 .env 파일을 만들고, 이를 읽어올 파이썬 클래스를 정의한다.

```python
# .env 파일
OPENAI_API_KEY="#"
```

```python
# config.py 파일
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    openai_api_key: str # 환경변수명과 동일하게 변수 정의 (타입 지정 필수)

    class Config: # 참조할 환경변수 파일 경로 지정
        env_file = ".env"

# 객체를 생성하는 시점에 환경변수를 읽고 검증함
settings = Settings()
```

```python
# main.py 파일
from config import settings

client = AsyncOpenAI(api_key=settings.openai_api_key)
```
