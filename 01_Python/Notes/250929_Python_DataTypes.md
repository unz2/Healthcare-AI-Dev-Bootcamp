# Python 자료형

## 🎯 목표
1. 반복 가능 객체(Iterable), 시퀀스(Sequence)
2. 리스트(List)
3. 튜플(Tuple)
4. 딕셔너리(Dict)
5. 집합(Set)
6. 얕은 복사 vs 깊은 복사

---

## 1. 반복 가능 객체(Iterable), 시퀀스(Sequence)
**Iterable** : `for` 루프를 사용하여 요소를 하나씩 반복 할 수 있는 객체 
- `list`, `tuple`, `dict`, `set` 

**Sequence** : 반복 가능 객체이면서, 요소들이 정해진 순서를 가지며 정수 인덱스를 통해 접근할 수 있는 객체  
- 요소의 순서가 유지된다.
- 인덱싱(Indexing)으로 접근 가능
- 슬라이싱(Slicing)으로 부분 요소 추출 가능
- `len()` 함수를 사용하여 길이를 알 수 있음
- `list`, `tuple`

> 모든 Sequence는 Iterable 이지만, 모든 Iterable이 Sequence는 아니다.  
`set`과 `dict`은 Iterable 이지만, 순서가 없어 Sequence가 아니다.

---

## 2. 리스트(List)
- 가변(Mutable)
- 시퀀스(Sequence)
- 서로 다른 타입의 요소 포함 가능

```Python
# 자주 사용하는 List 메서드
a = [1, 2]

a.append(x)     # 리스트 끝에 요소 추가
a.insert(i, x)  # i 인덱스에 요소 삽입
a.pop(i)        # i 인덱스의 요소를 꺼내고 리스트에서 제거, 인덱스 생략 시 맨 마지막 요소 pop
a.remove(x)     # 첫 번째로 발견되는 x 값 제거
a.sort()        # 리스트 정렬 (원본 리스트 변경)
a.reverse()     # 역순 출력
a.clear()       # 리스트 모든 요소 삭제
```

---

## 3. 튜플(Tuple)
- 불변(Immutable) 단, 튜플 내부의 가변 객체는 변경 가능
- 시퀀스(Sequence)
- 함수의 안전한 반환 값, 딕셔너리의 키 등 변경되면 안되는 데이터를 저장할 때 사용

```Python
# 자주 사용하는 Tuple 메서드
a = (1, 2)

a.count(x) # 튜플 내에서 값 x가 등장하는 횟수 반환
a.index(x) # 값 x가 처음 등장하는 인덱스 반환

```

---

## 4. 딕셔너리(Dictionary)
- 가변(Mutable)
- Key를 통해 value에 접근
- Key는 반드시 불변 객체여야 함 (`str`, `int`, `tuple` 등)

```Python
# 자주 사용하는 Dictionary 메서드
a = {
    'name' : '홍길동',
    'age' : 20
}

a.keys()            # 딕셔너리의 모든 키를 뷰 객체로 반환
a.values()          # 딕셔너리의 모든 값을 뷰 객체로 반환
a.items()           # 딕셔너리의 모든 (키, 값)쌍을 뷰 객체로 반환
a.get(key, default) # 키에 해당하는 값 반환, 키가 없을 경우 오류 대신 default 값 반환, default 없으면 None 반환
# a['name'] 처럼 인덱싱도 가능하지만, 키가 없을 경우 오류 발생하므로 get 사용하는것이 안전함
a.pop(key)             # key의 값을 꺼내고 딕셔너리에서 제거
a.update({})           # 딕셔너리에 여러 값을 한번에 변경하거나 추가

```

## 5. 집합(Set)
- 가변(Mutable)
- 순서 없음
- 중복 불가 (중복 제거용으로 유용)
- 집합의 요소는 반드시 불변 객체여야 함

```Python
# 자주 사용하는 Set 메서드
a = {1, 2}

a.add(x)            # 요소 추가
a.update(x)         # 한꺼번에 여러 요소 추가
a.remove(x)         # 요소 제거, 제거하려는 요소 없을 때 에러 발생
a.discard(x)        # 요소 제거, 제거하려는 요소 없을 때 에러 발생하지 않음
a.union(x)          # 합집합 | 연산자로도 사용 가능
a.intersection(x)   # 교집합 & 연산자로도 사용 가능
a.difference(x)     # 차집합 - 연산자로도 사용 가능

```

---
## 6. 얕은 복사(Shallow Copy)와 깊은 복사(Deep Copy)
**얕은 복사**
- 최상위 객체만 복사하고, 중첩된 객체는 원본과 사본이 같은 메모리 주소를 참조하게 하는 방식
```Python
a = [[1, 2], 3]
b = a.copy()

b.append(4)
print(a) # [[1, 2], 3]
print(b) # [[1, 2], 3, 4]

b[0][0] = 99
print(a) # [[99, 2], 3]
print(b) # [[99, 2], 3, 4]
```

**깊은 복사**
- 최상위 객체뿐만 아니라 중첩된 모든 객체까지 재귀적으로 복사하여 원본과 사본이 완전히 독립적인 메모리 공간을 갖게 하는 방식

```Python
a = [[1, 2], 3]
b = copy.deepcopy(a)

b.append(4)
print(a) # [[1, 2], 3]
print(b) # [[1, 2], 3, 4]

b[0][0] = 99
print(a) # [[1, 2], 3]
print(b) # [[99, 2], 3, 4]
```