# 머신러닝 기초
> 🗓️ **2025-10-31**  
✍🏼 **작성자 : unz**
---
## 📝 목차
1. 머신러닝(Machine Learning)이란?
2. 머신러닝의 종류
3. 데이터 분할의 필요성
4. 과적합(Overfitting)
5. 과소적합(Underfitting)
6. 혼동 행렬(Confusion Matrix)
7. 주요 평가 지표
---

## 1. 머신러닝(Machine Learning)이란?
- 데이터를 이용해 컴퓨터를 학습시켜 명시적으로 프로그래밍되지 않은 동작을 수행할 수 있게 하는 인공지능의 한 분야
- 데이터에서 규칙(Pattern)을 스스로 찾아내는 방식

### 1-1. 왜 머신러닝이 필요할까?
1. **복잡한 규칙의 자동화** : 팸 메일 분류나 자율 주행처럼 사람이 일일이 규칙을 만들기 어려운 복잡한 문제를 해결할 수 있디.
2. **데이터의 방대함** : 사람이 분석하기 힘든 빅데이터 속에서 유의미한 통찰(Insight)을 찾아낸다.
3. **변화하는 환경에 대응** : 새로운 데이터가 들어올 때마다 모델을 다시 학습시켜 변화에 유연하게 대응할 수 있다.

## 2. 머신러닝의 종류
|종류|학습 데이터 형태|주요 목표|
|--|--|--|
|지도 학습(Supervised Learning)|문제(Feature)와 정답(Label)이 있음|새로운 문제에 대한 정답 예측
|비지도 학습(Unsupervised Learning)|정답(Label) 없이 문제만 있음|데이터 간의 숨겨진 구조/패턴 발견
|강화 학습(Reinforcement Learning)|상태와 보상(Reward) 체계|보상을 최대화하는 최적의 행동 탐색

### 2-1. 지도학습(Supervised Learning)
- 정답이 있는 데이터를 통해 학습하는 방식
- 입력 값($X$)과 출력 값($Y$)의 관계를 학습하여 새로운 $X$가 들어왔을 때 $Y$를 예측한다.
- **분류(Classification)** : 정해진 범주 중 하나로 분류하는 것(스팸 여부(Yes/No), 강아지/고양이)
- **회귀(Regression)** : 연속적인 숫자 값을 예측하는 것(내일의 기온 예측, 집값 예측)

```Python
# iris 데이터로 종(species) 분류하기
import pandas as pd
from sklearn.datasets import load_iris

iris = load_iris()
df = pd.DataFrame(iris.data, columns=iris.feature_names)
df['species'] = iris.target_names[iris.target]

# iris 데이터 탐색
print(df) # 150개 샘플, feature 4개
print(df.info())
print(df.describe())
print(df.['species'].value_counts()) # 클래스 3종류 (setosa, versicolor, virginica)
```

---
### 2-2. 비지도학습(Unsupervised Learning)
- 정답이 없는 데이터를 분석하여 데이터 내부의 특성이나 구조를 파악하는 방식
- **군집화(Clustering)**: 유사한 특징을 가진 데이터끼리 그룹으로 묶는 것
- **차원 축소(Dimensionality Reduction)**: 데이터의 핵심 정보는 유지하면서 변수의 개수를 줄이는 것

---

### 2-3. 강화학습(Reinforcement Learning)
- 에이전트가 환경과 상호작용하며 특정 행동을 했을 때 받는 '보상(Reward)'을 최대화하는 방향으로 학습하는 방식
- 시행착오를 통해 최적의 전략을 찾아낸다. (알파고, 자율 주행 자동차 등)

## 3. 데이터 분할의 필요성
- 모델이 학습 데이터에만 익숙해지는 것을 방지하기 위해
- 처음 보는 데이터에 대한 성능(일반화 능력)을 확인하기 위해 데이터를 나눈다.
- **Train Set**: 모델을 학습시키는 데 사용 (교과서)
- **Test Set**: 학습된 모델의 최종 성능을 평가하는 데 사용 (시험)

```Python
# iris 데이터 Train/Test 나누기
from sklearn.model_selection import train_test_split

iris = load_iris()
df = pd.DataFrame(iris.data, columns=iris.feature_names)
df['species'] = iris.target_names[iris.target]

X = df.drop('species', axis=1)
y = df['species']

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2, # train 80% / test 20% 로 설정
    random_state=42 # 실행할 때마다 동일한 결과를 재현하기 위해 난수 시드 고정
)

print("Train 크기:", X_train.shape) # Train 크기: (120, 4)
print("Test 크기:", X_test.shape)   # Test 크기: (30, 4)
```

## 4. 과적합(Overfitting)
- 모델이 Train 데이터에 너무 과하게 최적화된 상태
- Test 데이터에서는 성능이 떨어지는 상황

### 4-1. 과적합 해결방법
- **데이터 양 늘리기**
- **모델의 복잡도 낮추기**
- **정규화 적용하기(L1, L2)**

## 5. 과소적합(Underfitting)
- 모델이 너무 단순하여 데이터의 기본적인 패턴조차 학습하지 못한 상태
- Train, Test 데이터 둘 다 성능이 떨어짐

### 5-1. 과적합 해결방법
- **더 많은 특징(Feature) 추가**
- **더 복잡한 모델 사용하기**
- **학습 시간(Epoch) 늘리기**

## 6. 혼동 행렬(Confusion Matrix)
- 모델의 예측 결과를 4가지 관점으로 분류한 표

||실제 Positive|실제 Negative|
|:--:|:--:|:--:|
|**예측 Positive**|<span style="background-color:#C3F3D9">TP (True Positive)</span>|<span style="background-color:#FFE6E6">FP (False Positive)</span>|
|**예측 Negative**|<span style="background-color:#FFE6E6">FN (False Negative)</span>|<span style="background-color:#C3F3D9">TN (True Negative)</span>|

### 암진단 시스템 예시

||실제 Positive (암)|실제 Negative (정상)|
|:--:|:--:|:--:|
|**예측 Positive (암)**|TP 80 (암을 암으로 진단)|FP 10 (정상을 암으로 오진)|
|**예측 Negative (정상)**|FN 20 (암을 정상으로 오진)|TN 890 (정상을 정상으로 진단)|

## 7. 주요 평가 지표
||||
|--|--|--|
|**정확도 (Accuracy)**|전체 데이터 중 맞게 예측한 비율| $\frac{TP+TN}{TP+TN+FP+FN}$
|**정밀도 (Precision)**|모델이 Positive라고 예측한 것 중 실제 Positive인 비율|$\frac{TP}{TP+FP}$|
|**재현율 (Recall)**|실제 Positive인 것 중 모델이 Positive라고 맞춘 비율|$\frac{TP}{TP+FN}$|
|**F1-Score**|정밀도와 재현율의 조화 평균|$2*\frac{Precision * Recall}{Precision + Recall}$|

### 암진단 시스템 예시
```
Accuracy 
✓ (80 + 890) / 1000 = 0.97(97%)
✓ 데이터가 균형잡힌 경우
✓ 모든 클래스가 동등하게 중요

* 정확도의 함정
데이터 불균형(암환자 1%, 정상 99%) 시
→ 모두 정상이라고 예측하면 정확도는 99% 이지만 실제 암환자는 하나도 못 찾음

Precision
✓ 80/(80+10) = 0.889(88.9%)
✓ False Positive 비용이 큰 경우
✓ 예: 정상을 스팸으로 오분류 방지

Recall
✓ 80/(80+20) = 0.8(80%)
✓ False Negative 비용이 큰 경우
✓ 예: 암 환자를 놓치지 않기

F1-Score
✓ 2 × (0.889 × 0.8) / (0.889 + 0.8) = 0.842(84.2%)
✓ Precision과 Recall 둘 다 중요
✓ 불균형 데이터셋
```