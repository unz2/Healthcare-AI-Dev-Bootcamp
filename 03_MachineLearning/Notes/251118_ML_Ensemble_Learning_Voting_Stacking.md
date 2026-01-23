# 머신러닝 심화 (앙상블 학습 - Voting & Stacking)

> 🗓️ **2025-11-18**  
> ✍🏼 **작성자 : unz**

## 📝 목차

1. Voting
2. Voting 방식
3. Stacking
4. 앙상블 기법 비교

---

## 1. Voting이란?

> 서로 다른 알고리즘을 가진 분류기(Classifier)들을 결합하여, 각 분류기가 투표한 결과 중 가장 많이 득표한 결과를 최종 예측값으로 결정하는 방식

- 서로 다른 알고리즘을 사용하여 각 모델이 데이터의 서로 다른 특성을 학습하게 한다.
- 각 모델을 독립적으로 학습하고, 모든 모델을 동시에 학습할 수 있다.

### 1-1. 학습 과정

1. 동일한 학습 데이터셋을 준비한다.
2. 서로 다른 알고리즘을 가진 여러 모델을 독립적으로 학습시킨다.
3. 테스트 데이터에 대해 각 모델이 예측을 수행한다.
4. 투표 방식(Hard/Soft)에 따라 최종 예측값을 산출한다.

### 1-2. Bagging과 Voting 차이점

| 항목      | Bagging                        | Voting                         |
| --------- | ------------------------------ | ------------------------------ |
| 알고리즘  | 같은 알고리즘 모델 결합        | 서로 다른 알고리즘 모델 결합   |
| 데이터셋  | Bootstrap 샘플 사용            | 전체 데이터셋을 동일하게 사용  |
| 핵심 원리 | 샘플링을 통해 모델의 분산 감소 | 다른 관점의 모델들이 서로 보완 |

## 2. Voting 방식

### 2-1. Hard Voting

- 다수결 투표
- 각 분류기가 예측한 결과값(Label) 중 다수결로 가장 많이 나온 클래스 최종 선택
- 각 모델이 하나의 클래스만 선택
- 예측의 신뢰도는 고려하지 않음
- 동점 방지를 위해 홀수

```
예시) 강아지 / 고양이 분류
모델 1 Logistic Regression (고양이)
모델 2 Decision Tree       (강아지)
모델 3 SVM                 (고양이)
모델 4 KNN                 (고양이)
모델 5 Naive Bayes         (강아지)

투표 결과: 강아지 2표, 고양이 3표
→ 최종 예측: 고양이
```

### 2-2. Soft Voting

- 가중치 투표
- 각 분류기가 예측한 클래스별 확률의 평균을 구한 뒤, 확률이 가장 높은 클래스 최종 선택
- 각 모델의 신뢰도(확률) 반영
- Hard Voting보다 일반적으로 성능이 우수
- 높은 확률로 예측한 모델의 영향력이 큼

```
예시) 강아지 / 고양이 분류
모델 1 Logistic Regression 강아지 0.30, 고양이 확률 0.70 (고양이)
모델 2 Random Forest       강아지 0.45, 고양이 확률 0.55 (고양이)
모델 3 SVM                 강아지 0.52, 고양이 확률 0.48 (강아지)

강아지 평균: (0.30 + 0.45 + 0.52) / 3 = 0.423
고양이 평균: (0.70 + 0.55 + 0.48) / 3 = 0.577
→ 최종 예측: 고양이
```

### 2-3. 하이퍼파라미터 튜닝

- 모델마다 다른 가중치를 부려하여 성능이 좋은 모델의 영향력을 높일 수 있다.

```python
# 모델 정의
lr = LogisticRegression(max_iter=1000, random_state=42)
rf = RandomForestClassifier(n_estimators=100, random_state=42)
svc = SVC(probability=True, random_state=42)

# 가중치 있는 경우 (Random Forest에 더 높은 가중치)
voting_weighted = VotingClassifier(
    estimators=[('lr', lr), ('rf', rf), ('svc', svc)],
    voting='soft',
    weights=[1, 3, 1]  # RF에 3배 가중치
)
```

## 3. Stacking이란?

> 개별 모델이 예측한 데이터를 다시 학습 데이터로 사용하여 최종 메타 모델이 학습하고 예측

- **Base Model**: 1단계에서 학습을 수행하는 다향한 개별 모델들
- **Meta Model**: Base Model들의 예측 결과를 입력 데이터로 받아 최종 예측을 수행하는 모델

### 3-1. 학습 과정

1. 여러 Base Model들이 각각 학습 데이터로 학습한다.
2. 학습된 Base Model들이 예측 결과를 내놓는다.
3. 이 예측 결과들을 수평적으로 결합하여 새로운 데이터셋을 만든다.
4. 최종 Meta Model이 새로운 데이터셋을 사용하여 학습하고 최종 결과를 도출한다.

### 3-2. Out-of-Fold(OOF) 예측

```
Stacking의 가장 큰 문제점은 과적합

Base Model이 학습에 사용했던 데이터를 그대로 예측하여 Meta Model에 주면
Meta Model은 실제 정답을 너무 잘 맞히는 데이터에 익숙해진다.

이를 방지하기 위해 OOF 방식을 사용한다.
```

1. 데이터를 K-Fold로 나눈다.
2. K-1개로 학습하고, 나머지 1개(검증 셋)으로 예측을 수행한다.
3. 이 과정을 K번 반복하여 데이터 전체에 대한 예측값을 만든다.
4. 이렇게 만들어진 예측값들을 메타 모델의 학습 데이터로 사용한다.

### 3-3. 하이퍼파라미터 튜닝

```python
# Base Models (Level 0)
base_models = [
    ('dt', DecisionTreeClassifier(random_state=42)),
    ('rf', RandomForestClassifier(n_estimators=50, random_state=42)),
    ('svc', SVC(probability=True, random_state=42))
]

# Meta Model (Level 1)
meta_model = LogisticRegression(max_iter=1000, random_state=42)

# Stacking Classifier
stacking_clf = StackingClassifier(
    estimators=base_models,
    final_estimator=meta_model,
    cv=5  # 5-Fold for Out-of-Fold predictions
    passthrough=True # 원본 특성도 Meta Model에 전달
)
```

## 4. 앙상블 기법 비교

| 구분              | **Bagging**                        | **Boosting**                    | **Voting**                         | **Stacking**                                |
| :---------------- | :--------------------------------- | :------------------------------ | :--------------------------------- | :------------------------------------------ |
| **핵심 개념**     | 병렬로 학습하여 평균/다수결로 결정 | 순차적으로 학습하며 오차를 보완 | 서로 다른 모델들의 결과로 **투표** | 모델들의 예측값을 메타 모델의 입력으로 사용 |
| **목표**          | 분산(Variance) 감소 (과적합 방지)  | 편향(Bias)감소 (정확도 향상)    | 전체적인 예측 성능 및 안정성 향상  | 예측 성능의 극한까지 최적화                 |
| **데이터 활용**   | 중복 허용 샘플링 (Bootstrap)       | 틀린 데이터에 가중치 부여       | 동일한 데이터를 모든 모델에 사용   | 데이터를 나누어 기초/메타 모델 학습         |
| **모델 관계**     | 주로 같은 유형의 모델 (독립적)     | 주로 같은 유형의 모델 (의존적)  | **서로 다른 유형**의 모델 조합     | **서로 다른 유형**의 모델을 계층화          |
| **장점**          | 학습 속도가 빠르고 이상치에 강함   | 예측 성능이 매우 뛰어남         | 개별 모델의 단점을 상호 보완함     | 복잡한 데이터에서 최고의 성능 발휘          |
| **대표 알고리즘** | Random Forest                      | XGBoost, LightGBM               |                                    |                                             |
