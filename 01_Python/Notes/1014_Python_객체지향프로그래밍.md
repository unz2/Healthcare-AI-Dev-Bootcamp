# Python 객체지향프로그래밍

## 🎯 목표
1. 상속(Inheritance)
2. 오버라이딩(Overriding)
3. 다형성(Polymorphism)

---

## 1. 상속(Inheritance)
- 새로운 클래스를 만들 때 기존 클래스의 기능을 물려받는 것
- 부모 클래스의 속성과 메서드를 자식 클래스가 그대로 사용 가능하다.

### **상속을 사용하는 이유**
1. 코드 재사용성 향상 : 상속을 하지 않으면 자식 클래스 동일한 동작을 자식 클래스 각각 따로 정의해야하지만, 부모 클래스에 정의 후 상속 받아 사용하면 재사용성이 향상된다.
2. 유지보수 : 부모 클래스에 정의한 내용을 수정, 추가하면 모든 자식 클래스에 반영할 수 있다.

```Python
class Animal:
    def __init__(self, name):
        self.name = name

    def move(self):
        print(f'{self.name}가 움직입니다.')

class Dog(Animal): # Animal 클래스 상속
    def bark(self):
        print(f'{self.name}: 멍멍')

class Cat(Animal): # Animal 클래스 상속
    def meow(self):
        print(f'{self.name}: 야옹')

dog1 = Dog('강아지')
dog1.move() # 강아지가 움직입니다.
dog1.bark() # 강아지: 멍멍

cat1 = Cat('고양이')
cat1.move() # 고양이가 움직입니다.
cat1.meow() # 고양이: 야옹
```

---
## 2. 오버라이딩(Overriding)
- 부모 클래스의 메서드를 자식 클래스에서 재정의하여 동작을 변경하는 것
- 이름은 같지만 내용을 다르게 구현한다.

### **`super()`**
- 자식 클래스에서 부모 클래스의 메서드나 속성에 접근할 때 사용한다.
- 자식 클래스만의 새로운 속성을 추가하면서도, 부모의 초기화 로직을 그대로 사용하고 싶을 때 사용한다.

```Python
class Animal:
    def __init__(self, name):
        self.name = name

    def move(self):
        print(f'{self.name}가 움직입니다.')

class Bird(Animal):
    def __init__(self, name, color):
        super().__init__(name) # 부모의 생성자 호출하여 name 속성 초기화
        self.color = color # 자식 클래스만의 고유 속성 추가
    
    def move(self): # 부모 클래스 move 메서드 오버라이딩
        super().move() # super()를 사용해 부모의 move 메서드 재사용
        print(f'{self.color} {self.name}가 하늘을 날아갑니다.')

bird = Bird('새', '파란색')
bird.move()
# 새가 움직입니다.
# 파란색 새가 하늘을 날아갑니다.
```

---

## 3. 다형성(Polymorphism)
- 같은 이름의 메서드를 호출해도 객체 타입에 따라 동작이 달라짐

```Python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def move(self):
        print(f'{self.name}가 움직입니다.')

class Dog(Animal):
    def move(self):
        super().move()
        print(f'{self.name}가 운동장에서 움직입니다.')

class Cat(Animal):
    def move(self):
        print(f'{self.name}가 캣타워에서 움직입니다.')

class Bird(Animal):
    def move(self):
        print(f'{self.name}가 하늘을 날아갑니다.')

animals = [Dog('강아지'), Cat('고양이'), Bird('새')]

for animal in animals:
    animal.move()

# 강아지가 움직입니다.
# 강아지가 운동장에서 움직입니다.
# 고양이가 캣타워에서 움직입니다.
# 새가 하늘을 날아갑니다.
```

---
