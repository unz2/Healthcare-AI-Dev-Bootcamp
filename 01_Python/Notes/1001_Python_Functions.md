# Python 함수

## 🎯 목표
1. 반복문(for)
2. 반복문(while)
3. 반복문 탈출(break)
4. 현재 반복 건너뛰기(continue)
5. 리스트 컴프리헨션(List Comprehension)
6. 집합 컴프리헨션(Set Comprehension)
7. 딕셔너리 컴프리헨션(Dictionary Comprehension)
---

## 1. 반복문(for)
- `for` : 시퀀스(리스트, 문자열 등)의 항목을 반복하거나, 정해진 횟수만큼 반복한다.
- `for` 문의 `in` 뒤에는 반드시 iterable 객체가 와야 한다.
```Python
# 문자열 반복
for str in 'Hi':
    print(str)
# H
# i

# 리스트 반복
for fruit in ['apple', 'banana', 'kiwi']:
    print(fruit)
# apple
# banana
# kiwi

# 튜플 반복
for num in (1, 2, 3):
    print(num)
# 1
# 2
# 3

# 딕셔너리 반복
person = {'name':'홍길동', 'age':20}
for key in person:
    print(key, person[key])
# name 홍길동
# age 20

# 집합 반복
for num in {10, 20, 30}:
    print(num)
# 10
# 20
# 30

# zip 반복
names = ['길동', '철수', '영희']
scores = [85, 92, 73]
for name, score in zip(names, scores):
    print(name, score)
# 길동 85
# 철수 92
# 영희 73

# 범위 반복
for i in range(3):
    print(i)
# 0
# 1
# 2

#enumerate 반복
names = ['Kim', 'Lee', 'Park']
for i, name in enumerate(name, start=1):
    print(i, name)
# 1 Kim
# 2 Lee
# 3 Park
```

### **중첩 for문**
```Python
# 구구단 2단
for i in range(2, 3):
    for j in range(1, 10):
        print(f'{i} x {j} = {i*j}')
# 2 x 1 = 2
# 2 x 2 = 4
# 2 x 3 = 6
# 2 x 4 = 8
# 2 x 5 = 10
# 2 x 6 = 12
# 2 x 7 = 14
# 2 x 8 = 16
# 2 x 9 = 18
```

---
## 2. 반복문(while)
- `while` : 조건이 True인 동안 반복한다.
- 조건이 False가 되면 종료한다.

```Python
money = 2000

while money > 0:
    print('음료 구매')
    money -= 1000

# 음료 구매
# 음료 구매
# 2번만 실행(반복)되고, 종료 된다.
```

---
## 3. 반복문 탈출(break)
- `break` 문은 반복문 내부에서 실행될 때, 현재 실행 중인 반복문을 **즉시 종료** 한다.

```Python
# for 문에서 break
for i in range(1, 10):
    if i == 3:
        print('3에서 탈출!')
        break
    print(i)

# 1
# 2
# 3에서 탈출!


# while 문에서 break
x = 1
while True:
    if x > 2:
        print('3에서 탈출!')
        break
    print(x)
    x += 1

# 1
# 2
# 3에서 탈출!
```

---
## 현재 반복 건너뛰기(continue)
- `continue` 문은 반복 문 내부에서 실행될 때, 해당 반복문의 **남은 코드 블록 실행을 건너뛰고,** 다음 반복의 처음으로 돌아간다.

```Python
# for 문에서 continue
for i in range(1, 6):
    if i % 2 == 0:
        continue
    print(i)

# 1
# 3
# 5


# while 문에서 continue
x = 0
while x < 5:
    x += 1
    if x % 2 == 0:
        continue
    print(x)


# 1
# 3
# 5
```

---
## 5. 리스트 컴프리헨션(List Comprehension)
- 리스트를 생성하는 간결하고 효울적인 방법
- 기존 리스트나 iterable 객체 기반으로 새로운 리스트를 만들거나, 특정 조건에 맞는 요소만 추출할 때 유용하다.

**기본 문법**  
`[표현식 for 변수 in 이터러블]`  
**조건 포함 문법**  
`[표현식 for 변수 in 이터러블 if 조건]`  
`[참일 떄 표현식 if 조건 else 거짓일 떄 표현식 for 변수 in 이터러블]`

```Python
# 기본 문법
squares = [x**2 for x in range(1, 6)]
print(squares) # [1, 4, 9, 16, 25]

# 조건 포함 문법
evens = [x for x in range(10) if x % 2 == 0]
print(evens) # [0, 2, 4, 6, 8]

# 중첩 for 문
gugudan = [f'{i} x {j} = {i*j}' for i in range(2, 3) for j in range(1, 10)]
print(gugudan) # ['2 x 1 = 2', '2 x 2 = 4' ...]

# 문자열 처리
text = 'hello'
upper_chars = [c.upper() for c in text]
print(upper_chars) # ['H', 'E', 'L', 'L', 'O']

# 실용 예제
patients = [
    {'name' : '홍길동', 'age' : 25},
    {'name' : '김길동', 'age' : 30},
    {'name' : '박길동', 'age' : 15},
]

adults = [p['name'] for p in patients if p['age'] >= 20]
print(adults) # ['홍길동', '김길동']
```

---
## 6. 집합 컴프리헨션(Set Comprehension)
- 리스트 컴프리헨션과 동일한 문법 구조를 사용하고, 중괄호 `{}` 를 사용한다.
- 집합의 특성상 중복된 요소를 자동으로 제거하여 유일한 값들로 이루어진 집합을 생성한다.

```Python
evens = {x for x in range(10) if x % 2 == 0}
print(evens) # {0, 2, 4, 6, 8}
```

---
## 7. 딕셔너리 컴프리헨션(Dictionary Comprehension)
- 리스트 컴프리헨션과 동일한 문법 구조를 사용하고, 중괄호 `{}` 를 사용한다.
- 단, 각 항목이 `key : value` 쌍의 형태로 구성되어야 한다.

```Python
squares = {x: x**2 for x in range(5)}
print(squares) # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```