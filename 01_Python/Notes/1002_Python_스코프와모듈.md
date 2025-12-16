# Python 스코프와 모듈

## 🎯 목표
1. 전역변수와 지역변수
2. 스코프(LEGB)
렉시컬 스코핑
3. 모듈과 패키지
4. 리스트 컴프리헨션 변수 스코프
5. pip 패키지 배포
---

## 1. 전역변수(Global Variable)와 지역변수(Local Variable)

**전역변수**
- 함수 외부, 파일의 최상위 레벨에서 정의되어 프로그램 전체에서 접근 가능한 변수이다.

**지역변수**
- 함수 내부에서 정의된다.
- 해당 함수가 호출되어 실행되는 동안에만 존재하고, 함수가 끝나면 소멸된다.

```Python
def test():
    a = 10
    print(a)

test() # 10
print(a) # error!
```
---
## 1-1. global
- 함수 내부에서 전역변수를 참조하는 것은 가능하지만, 값을 변경하려면 해당 변수 이름 앞에 `global` 키워드를 명시해야한다.

```Python
count = 11

def inc():
    global count
    count = 99

inc()
print(count) # 99
```
---
## 1-2. 전역변수의 문제점
- 전역변수는 프로그램의 모든 곳에서 접근 가능하고 수정할 수 있는 변수
- 어느 곳에서든 전역변수를 수정할 수 있기 때문에, 한 함수에서 전역변수를 변경하면 예상치 못한 곳에서 오류가 발생할 수 있다.
- 함수들이 전역변수에 의존하게 되면 해당 함수는 독립적으로 작동할 수 없게 된다. (단위 테스트를 어렵게하고, 코드 재사용성이 떨어짐)
- 멀티 스레딩이나 멀티 프로세싱 환경에서 여러 실행 흐름이 동시에 전역변수에 접근하여 수정할 경우, 데이터 경쟁이 발생하여 데이터 불일치 문제가 생길 수 있다.

---
## 2. 스코프 탐색 규칙 (LEGB)
### **스코프(Scope)란?**
- 변수나 이름이 유효한 영역 또는 범위

### **스코프 탐색 규칙 (LEGB)**
- **L**ocal: 현재 함수 내
- **E**nclosing: 현재 함수를 감싸는(포함하는) 상위 함수 내 (중첩 함수에서 사용)
- **G**lobal: 현재 모듈(파일)의 최상위 레벨
- **B**uilt-in: Python이 기본적으로 제공하는 이름 (ex. print, len, int 등)

---

## 3. 렉시컬 스코핑(Lexical Scoping / 정적 스코핑)
- 변수의 범위(Scope)가 함수가 정의된 시점과 소스 코드의 물리적 위치에 의해 결정되는 규칙
- 파이썬은 렉시컬 스코핑을 따른다.
```Python
x = 10 # Global
def outer():
    x = 20 # Enclosing
    def inner():
        # 여기에서 x 를 찾을 때
        # Local : inner 내부에 x가 정의되어 있지 않음
        # Enclosing : outer에 x = 20 이 정의되어있음 → 20 사용
        print(x)
    return inner

f = outer()
f() # 20
```
---

## 4. nonlocal
- 중첩 함수 내에서 외부(Enclosing) 스코프의 변수에 접근 가능하다.
- 하지만, 재할당(`=`)을 시도하면 해당 변수를 자동으로 새로운 지역(Local)변수로 간주한다.
- 따라서, `nonlocal` 키워드는 중첩 함수가 가장 가까운 외부 스코프의 변수에 값을 재할당할 수 있도록 한다.

 ```Python
 # nonlocal 사용하지 않았을 때
def outer():
    x = 10
    def inner():
        x = 20
        print('inner:', x)
    inner()
    print('outer:', x)

outer()
# inner: 20
# outer: 10


# nonlocal 사용했을 떄
def outer():
    x = 10
    def inner():
        nonlocal x
        x = 20
        print('inner:', x)
    inner()
    print('outer:', x)

outer()
# inner: 20
# outer: 20
 ```

 ---
## 5. Python 함수 호출과 콜 스택(Call Stack)

### **콜 스택이란?**
- 메모리 영역 중 하나로, 후입선출(LIFO) 원칙에 따라 데이터를 저장하는 스택 구조
- 파이썬은 콜 스택을 사용하여 현재 실행 위치, 함수가 종료된 후 돌아가야할 주소, 함수 내의 지역 변수 정보를 관리한다.
- 함수가 호출될 때마다 콜 스택에 **스택 프레임** 데이터 블록이 하나씩 쌓인다.

스택 프레임에 포함되는 정보
- 반환 주소 : 함수 실행이 끝났을 때 프로그램이 실행을 재개해야할 코드 위치
- 지역 변수 : 함수 내에서 정의된 변수들의 값
- 매개 변수 : 함수에 전달된 인자들의 값

함수 호출 과정  
```Python
def outer():
    x = 10
    def inner():
        y = 20
        print(x + y)
    inner()
outer()
```
```
1. 시작
+----------+
|  Global  |  <- 전역 변수, 함수 정의
+----------+

2. outer() 호출
+----------+
|  outer   |  <- 지역 변수 x=10
+----------+
|  Global  |
+----------+

3. inner() 호출
+----------+
|  inner   |  <- 지역 변수 y=20
+----------+
|  outer   |  <- 지역 변수 x=10
+----------+
|  Global  |
+----------+

4. inner 종료 → pop
+----------+
|  outer   |  <- 지역 변수 x=10
+----------+
|  Global  |
+----------+

5. outer 종료 → pop
+----------+
|  Global  |
+----------+

6. 프로그램 종료 → Global도 해제
(빈 스택)
```

---
## 6. 모듈(Module)
- 파이썬 코드를 담고 있는 파일(.py)
- 모듈은 함수, 클래스, 변수 등 실행 가능한 파이썬 정의를 포함한다.
- 코드를 논리적인 단위로 분리하여 재사용성과 유지보수성을 높인다.

```Python
# 모듈 생성 및 사용 예시
# calc.py 파일 생성하면, 이 파일 자체가 모듈이 된다.

def add(a, b):
    return a + b

def sub(a, b):
    return a - b
```

## 6-1. 모듈 import 방법

1. `import module_name`  
모듈 전체를 가져와 모듈 이름(또는 별칭)을 접두사로 붙여 사용한다.
```Python
import calc
print(calc.add(1, 2)) # 3
print(calc.sub(1, 2)) # -1
```

2. `from module_name import name`  
모듈 내 특정 이름(함수, 변수, 클래스)를 가져와 사용한다.  
이때는 접두사 없이 해당 이름을 바로 사용한다.
```Python
from calc import add, sub
print(add(1, 2)) # 3
print(sub(1, 2)) # -1
```

3. `as` 별칭(Alias) 사용  
파이썬에서 자주 쓰이는 라이브러리들은 보통 긴 이름을 줄여서 별칭으로 사용한다.
```Python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import tensorflow as tf
import torch as th
import torch.nn as nn
import torch.optim as optim
```

---
## 7. 패키지(Package)
- 여러 모듈(.py 파일)을 묶어둔 디렉토리
- 큰 프로젝트를 구조적으로 관리할 때 사용한다.

### **패키지 구조**
```Python
my_project/
    math_tools/     # 패키지(폴더)
        __init__.py # 패키지임을 표시 (Python 3.3 이상은 없어도 패키지로 인식)
        calc.py      # 모듈
    main.py

# calc.py
def add(a, b):
    return a + b

def sub(a, b):
    return a - b
```

### **패키지 사용**
```Python
from math_tools import add, sub
print(calc.add(3, 2)) # 5
print(calc.sub(3, 2)) # 1
```

### **__init__.py 사용**
- 이전에는 폴더가 패키지임을 표시하는 파일로 Python 3.3 이후부터는 생략 가능하다.
- 지금은 없어도 패키지로 인식하지만, 보통 초기화 코드나 패키지의 공개API 정리용으로 사용한다.
```Python
# math_tools/__init__.py
from .calc import add, sub

# __init__.py 덕분에 더 짧게 사용 가능
from math_tools import add, sub
print(add(3, 2)) # 5
print(sub(3, 2)) # 1
```
---

## 8. 내장 모듈(Built-in Modules)
- 파이썬 설치 시 기본적으로 포함되어 설치 없이 바로 사용할 수 있는 모듈
```Python
import os       # (Operating System) 운영체제 기능 (파일, 디렉토리 관리, 환경변수 접근 등)
import sys      # (System) 파이썬 인터프리터 관련 (버전, 경로, argv 등)
import pathlib  # (Path Library) 객체지향적으로 파일/폴더 경로 다루기
import shutil   # (Shell Utilities) 파일 복사, 이동, 삭제
import datetime # 날짜, 시간, 날짜와시간, 기간
import time     # 시간 측정, 시간 지연, 시간 형식 변환
import calendar # 달력, 요일 계산
import math     # 수학 함수 (sqrt, sin, cos, pi 등)
import random   # 난수 생성 (choice, shuffle, randint)
```

---

## 9. 외부 패키지(External Packages)
- 특정 목적(웹 개발, 데이터 분석, 머신 러닝 등)을 위해 커뮤니티에서 개발된 패키지
- 파이썬 표준 라이브러리에 포함되어 있지 않아 `pip` 패키지 관리 도구를 사용하여 설치한다.

 ```Python
# 외부 패키지 설치 명령어
pip install requests

import requests
res = requests.get("https://example.com")
print(res.statuscode)
 ```
---

## 10. requirements.txt
- 해당 파이썬 프로젝트가 의존하는 외부 패키지와 버전을 명시적으로 기록해 놓은 텍스트 파일
- 프로젝트를 다른 환경에 배포하거나 공유할 때, 필요한 모든 의존성을 정확하게 재현할 수 있도록 보장한다.

```Python
# requirements.txt 파일 형식
requests==2.28.1     # 정확히 이 버전 사용
pandas>=1.5.3        # 1.5.3 버전 이상 사용
numpy<2.0.0          # 2.0.0 미만 버전 사용
scikit-learn         # 최신 버전 사용

# requirements.txt 파일에 명시된 모든 패키지를 설치하는 명령어
pip install -r requirements.txt

# 현재 환경의 패키지 목록을 requirements.txt 파일로 저장
pip freeze > requirements.txt
```
