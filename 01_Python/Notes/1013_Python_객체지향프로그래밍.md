# Python 객체지향프로그래밍

## 🎯 목표
1. 데코레이터(Decorator)
2. 클래스(Class)와 객체(Object)
3. `__init__` 생성자
4. `self`
5. 인스턴스 변수와 클래스 변수
6. 함수(Function)와 메서드(Method)
7. 인스턴스 메서드, 클래스 메서드, 정적 메서드
8. 접근제어 및 캡슐화
9. property
---
## 1. 데코레이터(Decorator)
- 이미 정의된 함수나 클래스를 수정하지 않고 추가 기능을 덧붙여 주는 파이썬의 문법
- 주요 용도 : 로깅, 권한검사, 실행시간 측정 등
- 주로 `@` 기호를 사용하여 함수 또는 클래스 정의 바로 위에 선언한다.

```Python
def log_decorator(func):
    def wrapper():
        print('[LOG] 함수 시작')
        func()
        print('[LOG] 함수 끝')
    return wrapper

@log_decorator
def greet():
    print('안녕하세요')

greet()
# [LOG] 함수 시작
# 안녕하세요
# [LOG] 함수 끝
```

---
## 2. 클래스(Class)와 객체(Object)
### **클래스**
- 특정 종류의 객체를 생성하기 위한 '설계도' 또는 '틀'
- 데이터(속성)와 기능(메서드)을 하나로 묶어 정의한다.

**클래스가 왜 필요할까?**
1. **캡슐화** : 데이터와 그 데이터를 처리하는 함수(메서드)를 하나의 단위(클래스)로 묶어 데이터의 일관성을 유지하고 외부의 오작동으로부터 보호할 수 있다.
2. **재사용성** : 한 번 정의된 클래스는 여러 객체를 생성하는 데 반복적으로 사용될 수 있고, 상속을 통해 기존 클래스의 기능을 확장할 수 있다.
3. **모듈화** : 논리적인 단위(클래스)로 나누어 관리하므로, 코드를 더 이해하기 쉽고 유지보수가 용이해진다.

### **객체 또는 인스턴스**
- 클래스를 기반으로 메모리에 실제 만들어진 실체
- 클래스에 정의된 속성과 기능을 가진다.

---
## 3. `__init__` 생성자
- 초기화 메서드라고 불린다.
- 클래스의 객체(인스턴스)가 생성될 떄 자동으로 호출된다.
- 객체가 처음 생성될 때 필요한 초기 값 설정을 담당한다.
- `__init__`의 첫 번째 매개변수는 반드시 `self`여야 한다.

```Python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        print(f'{self.name}님, 나이: {self.age}살')

person1 = Person('홍길동') # 홍길동님, 나이: 30살
person2 = Person('김길동') # 김길동님, 나이: 20살
```

---
## 4. `self`
- 현재 호출된 객체(인스턴스) 자신을 가리키는 파이썬의 관례적 이름이다.
- 인스턴스 메서드를 정의할 떄는 반드시 첫 번째 인수로 `self`를 명시해야 한다.
- 메서드를 호출할 때는 파이썬이 자동으로 해당 인스턴스 객체를 `self` 인수에 전달한다.
- 클래스 내부에서 인스턴스 변수에 접근하거나 다른 인스턴스 메서드를 호출할 때 `self.속성명` 또는 `self.메서드명()` 형태로 사용된다.

```Python
class Person:
    def __init__(self, name):
        self.name = name

person1 = Person('홍길동')
person2 = Person('김길동')
print(person1.name) # 홍길동
print(person2.name) # 김길동
```

---
## 5. 인스턴스 변수(Instance Variable)와 클래스 변수(Class Variable)
### **인스턴스 변수**
- `__init__`과 같은 메서드 내부에 정의한다. (`self` 접두사 사용)
- 각 인스턴스(객체) 마다 고유한 값을 가진다.
- 클래스 안에서 `self.변수명`으로 선언한다.

### **클래스 변수**
- 클래스 정의 바로 아래 (모든 메서드 외부)에 정의한다.
- 해당 클래스로 만들어진 모든 인스턴스가 공유하는 값이다.
- 클래스 안에서 `self` 접두사 없이 선언한다.

```Python
class Person:
    species = "Homo sapiens" # 클래스 변수 (모든 인스턴스가 공유)

    def __init__(self, name, age):
        self.name = name # 인스턴스 변수 (각 인스턴스마다 고유)
        self.age = age   # 인스턴스 변수 (각 인스턴스마다 고유)

person1 = Person('홍길동', 30)
person2 = Person('김길동', 20)

print(Person.species)  # Homo sapiens (클래스 변수)
print(person1.species) # Homo sapiens (클래스 변수)
print(person2.species) # Homo sapiens (클래스 변수)
print(person1.name)    # 홍길동 (인스턴스 변수)
print(person2.age)     # 20 (인스턴스 변수)
```

---
## 6. 함수(Function)와 메서드(Method)
|구분|함수(Function)|메서드(Method)|
|--|--------------|-----------|
|정의|클래스 외부에 독립적으로 정의| 클래스 내부에 정의|
|호출|독립적으로 호출 `함수명()`| 인스턴스나 클래스를 통해 호출 `인스턴스.메서드명()`|
|`self`| `self` 인수 없음| 인스턴스 메서드는 첫 번째 인수로 `self` 사용|
|목적| 특정 작업을 수행하는 일반적인 코드 블록 | 객체의 데이터를 조작하거나 객테의 행동을 정의|

---
## 7. 인스턴스 메서드, 클래스 메서드, 정적 메서드
- 클래스 내부에 정의된 메서드는 호출 방식과 사용 목적에 따라 세 가지로 나뉜다.
## 7-1. 인스턴스 메서드 (Instance Method)
- 정의: 첫 번째 매개변수로 `self`를 가진다.
- 목적: 인스턴스 변수(고유 데이터)에 접근하거나 이를 수정하는 등 특정 객체의 상태와 관련된 작업을 수행한다.

## 7-2. 클래스 메서드 (Class Method)
- 정의: `@classmethod` 데코레이터를 사용하고, 첫 번째 매개변수로 클래스 자체를 가리키는 cls를 가진다.
- 목적: 클래스 변수에 접근하거나, 해당 클래스의 새로운 인스턴스를 생성하는 팩토리 역할을 수행한다.

## 7-3. 정적 메서드 (Static Method)
- 정의: `@staticmethod` 데코레이터를 사용하고, self나 cls를 받지 않는다.
- 목적: 클래스나 인스턴스의 상태(변수)에 전혀 의존하지 않는, 클래스에 소속될 뿐인 일반 함수와 같은 역할을 한다.

```Python
class MyClass:
    class_var = 10

    def __init__(self, instance_var):
        self.instance_var = instance_var
    
    # 1. 인스턴스 메서드 (self 사용)
    def instance_method(self):
        print(f'인스턴스 변수: {self.instance_var}')
    
    # 2. 클래스 메서드 (cls 사용)
    @classmethod
    def class_method(cls):
        print(f'클래스 변수: {cls.class_var}')
    
    # 3. 정적 메서드 (self, cls 사용 안함)
    @staticmethod
    def static_method(a, b):
        return a + b

obj = MyClass(20)
obj.instance_method()       # 인스턴스 변수: 20
MyClass.class_method()      # 클래스 변수: 10
obj.class_method()          # 클래스 변수: 10
MyClass.static_method(1, 2) # 3
obj.static_method(1, 2)     # 3
```

---
## 8. 접근제어(Access Control) 및 캡슐화(Encapsulation)
### **접근제어**
|구분|표기|의미|접근 범위|
|--|--|--|------|
|Public(공개)|`self.변수명`|누구나 자유롭게 접근 가능|어디서든|
|Protected(보호)|`_변수명` (언더바 한 개)|내부 사용권장, 외부에서도 접근은 가능|어디서든|
|Private(비공개)|`__변수명` (언더바 두 개)|내부에서만 접근 가능, 외부에서 직접 접근 불가|클래스 내부에서만|

```Python
class Person:
    def __init__(self, name):
        self.name = name # Public(공개)
        self.__hp = 100  # Private(비공개)
        self.__exp = 0   # Private(비공개)

player1 = Character('홍길동')
print(player1.name)     # 홍길동
print(player1.age)      # 100
print(player1.gender)   # error
```

### **캡슐화**
- 객체의 데이터(속성)와 행동(메서드)를 하나로 묶는 것
- 객체 내부의 데이터를 외부에서 직접 접근하는 것을 막는다.
- 데이터는 숨기고, 오직 메서드를 통해서만 조작할 수 있도록 한여 데이터 무결성을 유지한다.

### **Getter / Setter**
- 캡슐화를 구현하는 방법 중 하나
- 객체의 데이터(속성)에 직접 접근하지 않고 메서드를 통해 간접적으로 접근하게 하는 패턴이다.
- **Getter** : 속성 값을 읽어오는 메서드
- **Setter** : 속성 값을 설정/수정하는 메서드 (유효성 검사 로직)

```Python
class Character:
    def __init__(self, name):
        self.name = name # Public(공개)
        self.__hp = 100  # Private(비공개)
    
    # Getter
    def get_hp(self):
        return self.__hp
    
    # Setter
    def set_hp(self, value):
        if value < 0: # 유효성 검사 로직 추가
            print('HP는 음수가 될 수 없습니다')
        else:
            self.__hp -= value

player1 = Character('Player1')
print(player1.get_hp()) # 100

player1.set_hp(20)
print(player1.get_hp()) # 80
```

---
## 9. Property
- Getter와 Setter를 사용할 때, 메서드 호출 방식이 아닌 속성 접근 방식처럼 보이게 만들어주는 기능
- `@property` 데코레이터를 이용해 메서드를 구현한다.
- 캡슐화의 장점 유지가 가능하다.

```Python
class Character:
    def __init__(self, name):
        self.name = name # Public(공개)
        self.__hp = 100  # Private(비공개)
    
    # Getter
    @property
    def hp(self):
        return self.__hp
    
    # Setter
    @hp.setter
    def set_hp(self, value):
        if value < 0: # 유효성 검사 로직 추가
            print('HP는 음수가 될 수 없습니다')
        else:
            self.__hp -= value

player1 = Character('Player1')
print(player1.hp) # 100

player1.set_hp = 20
print(player1.hp) # 80
```