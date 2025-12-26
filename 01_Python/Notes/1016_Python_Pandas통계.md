# Python Pandas와 통계

## 🎯 목표
1. 수치형(Numerical) 변수와 범주형(Categorical) 변수
2. 범주형 변수가 머신러닝에서 중요한 이유
3. 범주형 변수를 수치형으로 변환해야 하는 이유
4. 범주형 변수 인코딩 방법

---

## 1. 수치형(Numerical) 변수와 범주형(Categorical) 변수

### 1-1. 수치형 변수
- 양적 측정이 가능하고 산술 연산이 의미가 있는 데이터
- 숫자의 크기 차이가 곧 실제 값의 차이를 나타낸다.
- 연속형 : 일정 범위 내에서 무한한 값을 가진다. (키, 몸무게, 가격)
- 이산형 : 개수를 셀 수 있는 정수 형태의 값 (자녀 수, 자동차 사고 횟수)

### 1-2. 범주형 변수
- 수치가 아닌 범주나 그룹을 나타내는 데이터
- 숫자로 표시되어 있더라도 산술 연산이 무의미하다.
- 명목형 : 순서나 우열이 없는 그룹 (성별, 혈액형)
- 순서형 : 범주 간에 논리적인 순서나 등급이 존재하는 경우 (학점, 만족도, 계급)

## 2. 범주형 변수가 머신러닝에서 중요한 이유
- 머신러닝 모델이 예측하고자 하는 많은 현실 문제와 밀접하게 연관되어 있다.
- 수치적으로 설명되지 않는 복잡한 패턴을 포함하고 있는 경우가 많다.
- 모델이 학습해야 하는 결정 경계를 풍부하게 만든다.
> 예시) Titanic dataset의 `sex`, `embarked`, `class` 는 생존률에 큰 차이를 만든다.

## 3. 범주형 변수를 수치형으로 변환해야 하는 이유
- 대부분의 머신러닝 알고리즘(선형 회귀, SVM, 신경망 등)은 내부 연산을 수행하기 위해 입력값으로 실수를 요구한다.
- 따라서, 텍스트 형태의 데이터를 그대로 넣으면 오류가 발생한다.
- 이를 적절한 숫자 표현으로 바꾸는 과정(Encoding)이 필수적이다.

## 4. 범주형 변수 인코딩 방법
### 4-1. 순서형 변수 인코딩
- 직접 매핑 : 사용자가 사전(Dictionary)을 정의하여 숫자를 직접 부여하는 방식
- 레이블 인코딩 : 사이킷런의 LabelEncoder 사용하여 인코딩 하는 방식
```Python
import pandas as pd
from sklearn.preprocessing import LabelEncoder

# 예시 데이터 생성
data = {
    'Size': ['Medium', 'High', 'Low', 'Medium'], # 순서형
    'Color': ['Red', 'Blue', 'Green', 'Red'],    # 명목형
    'Gender': ['Male', 'Female', 'Female', 'Male'] # 명목형 (이진)
}
df = pd.DataFrame(data)

# 1. 직접 매핑
size_map = {'Low': 0, 'Medium': 1, 'High': 2}
df['Size_Map'] = df['Size'].map(size_map)


# 2. 레이블 인코딩
le = LabelEncoder()
df['Color_Label'] = le.fit_transform(df['Color'])
print(df[['Color', 'Color_Label']]) # 알파벳 순서로 0, 1, 2 부여됨
```

### 4-2. 명목형 변수 인코딩
- 원-핫 인코딩 : 범주 개수만큼 열을 만드는 방식

```Python
import pandas as pd

# 예시 데이터 생성
data = {
    'Size': ['Medium', 'High', 'Low', 'Medium'], # 순서형
    'Color': ['Red', 'Blue', 'Green', 'Red'],    # 명목형
    'Gender': ['Male', 'Female', 'Female', 'Male'] # 명목형 (이진)
}
df = pd.DataFrame(data)

# 원-핫 인코딩 (One-Hot Encoding)
df_encoded = pd.get_dummies(df, columns=['Color', 'Gender'], drop_first=True)
```

> **더미 변수의 함정 & 다중공산성**  
예시) 성별 변수의 열을 2개 다 만들면 남성의 경우 Gender_Male = 1이면 반드시 Gender_Female = 0 이라는 결과가 나온다.  
즉, 한 열이 다른 열을 완벽하게 설명하게 된다.

|Gender|Gender_Male|Gender_Female|
|:--:|:--:|:--:|
|Male|1|0|
|Female|0|1|


> 이처럼 독립 변수들 간에 강한 상관관계가 생기는 것을 **다중공산성(Multicollinearity)** 이라고 하며, 회귀 모델의 계수 추정을 불안정하게 만든다.  
해결책 : `drop_first=True`를 사용하면 범주가 n개라면 n-1개의 열만 생성한다.  
마지막 하나는 나머지 열이 모두 0일 때 자동으로 설명되기 때문이다.

|Gender|Gender_Male|
|:--:|:--:|
|Male|1|
|Female|0|