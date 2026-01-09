# 머신러닝 심화 (Feature Engineering)

> 🗓️ **2025-11-07**  
> ✍🏼 **작성자 : unz**

## 📝 목차

1. Feature Engineering
2. Feature Generation
3. Feature Selection
4. Anomaly Detection

---

## 1. Feature Engineering

> 원시 데이터로부터 모델의 예측 능력을 향상시킬 수 있는 새로운 Feature을 생성, 선택, 변형하는 과정

- **Feature Generation** : 기존 변수들을 조합하거나 변형하여 새로운 변수를 만드는 과정
- **Feature Selection** : 수많은 변수 중 모델 성능에 기여도가 높은 핵심 변수만을 추려내는 과정
- **Anomaly Detection** : 데이터의 일반적인 패턴에서 벗어난 값(이상치)을 찾아내어 처리하는 과정

### 1-1. Feature Engineering이 필요한 이유

- **모델 성능 향상** : 알고리즘 자체의 개선보다 잘 정제된 데이터가 성능에 더 큰 영향을 미칩니다.
- **노이즈 제거** : 불필요하거나 중복된 정보를 제거하여 모델이 데이터의 본질적인 패턴에 집중하게 합니다.
- **해석 가능성 증대** : 복잡한 데이터를 직관적인 특성으로 변환하여 분석 결과를 이해하기 쉽게 만듭니다.

## 2. Feature Generation

**왜 새로운 Feature를 만들까?**

> 원본 Feature만으로는 비선형 관계나 숨겨진 패턴을 포착하기 어렵기 때문에  
> 사람이 명시적으로 관계를 정의해주면 모델은 훨씬 빠르게 학습할 수 있다.

### 2-1. Binning

> 연속형 변수를 특정 기준에 따라 범주형 변수로 변환하는 기법

- Equal Width Binning: 같은 너비로 구간 나누기 (예: [0-10], [10-20], [20-30])
- Equal Frequency Binning: 각 구간에 동일한 데이터 개수가 들어가도록 구간 나누기
- Custom Binning: 도메인 지식에 따라 임의로 경계값을 설정

언제 사용 할까?

- 비선형 관계를 단순화할 때
- 이상치의 영향을 줄일 때
- 해석 사능성을 높일 때

```python
# 데이터 생성
ages = np.array([22, 25, 35, 45, 52, 58, 67, 72]).reshape(-1, 1)

# Equal Width Binning
kbd_width = KBinsDiscretizer(n_bins=3, encode='ordinal', strategy='uniform')
age_binned_width = kbd_width.fit_transform(ages)
print("Equal Width:", age_binned_width.ravel())

# Equal Frequency Binning
kbd_freq = KBinsDiscretizer(n_bins=3, encode='ordinal', strategy='quantile')
age_binned_freq = kbd_freq.fit_transform(ages)
print("Equal Frequency:", age_binned_freq.ravel())

# Custom Binning
df = pd.DataFrame({'age': ages.ravel()})
df['age_group'] = pd.cut(df['age'], bins=[0, 30, 60, 100], labels=['청년', '중년', '노년'])
print("Custom Binning:", df['age_group'].values)

# Equal Width: [0. 0. 0. 1. 1. 2. 2. 2.]
# Equal Frequency: [0. 0. 0. 1. 1. 2. 2. 2.]
# Custom Binning: ['청년', '청년', '중년', '중년', '중년', '중년', '노년', '노년']
```

### 2-2. Polynomial Features

> 입력 값의 제곱이나 서로 다른 변수 간의 곱을 새로운 Feature로 추가하여 모델에 비선형성을 부여하는 기법

- 비선형 관계를 학습 가능하지만, feature 수가 늘어나면서 계산 비용 증가와 Overfitting 위험이 있다.

```python
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
import numpy as np

# 비선형 데이터 생성
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 7, 16, 29, 46])  # y = 2x² - 3x + 2

# 1차 (선형) 모델
model_linear = LinearRegression()
model_linear.fit(X, y)
print("선형 모델 R²:", model_linear.score(X, y))

# 2차 다항식 피처 생성
poly = PolynomialFeatures(degree=2)
X_poly = poly.fit_transform(X)
print("변환된 피처:", X_poly[0])  # [1, x, x²]

# 2차 다항식 모델
model_poly = LinearRegression()
model_poly.fit(X_poly, y)
print("다항식 모델 R²:", model_poly.score(X_poly, y))

# 선형 모델 R²: 0.9557661927330173
# 변환된 피처: [1. 1. 1.]
# 다항식 모델 R²: 1.0
```

|    방법    |      사용 시기       |            장점             |              단점              |
| :--------: | :------------------: | :-------------------------: | :----------------------------: |
|  Binning   | 연속형을 범주로 변환 |  해석 쉬움<br> 이상치 강건  | 정보 손실<br> 구간 선택 어려움 |
| Polynomial |   비선형 관계 학습   | 표현력 증가<br> 간단한 구현 |   피처 폭발<br> Overfitting    |

## 3. Feature Selection

**왜 Feature를 선택해야 할까?**

- 차원의 저주(Curse of Dimensionality)
  - Feature 수가 증가할수록 데이터 공간이 희소해지고 모델 학습이 어려워진다.
  - Feature가 1000개인데 진짜 중요한 건 10개 뿐 → 불필요한 Feature가 노이즈를 만듦
  - 학습 시간이 너무 오래 걸리고, Overfitting 발생
- 오컴의 면도날(Occam’s Razor) : 불필요하게 복잡한 모델보다 단순한 모델이 일반화 성능이 좋다는 원칙

### 3-1. Filter Method

> 통계적 척도를 사용하여 각 특성과 타겟 변수 간의 연관성을 평가

| 기법                | 주요 용도                         | 특징                               |
| ------------------- | --------------------------------- | ---------------------------------- |
| Correlation         | 변수 간 중복성 확인               | 선형적 관계 측정                   |
| Chi-square          | 범주형 데이터                     | 데이터가 양수여야 함               |
| F-statistic (ANOVA) | 연속형 독립변수 + 범주형 종속변수 | 그룹 간 평균 차이 분석             |
| Mutual Information  | 다목적                            | 비선형 관계도 감지, 계산 비용 높음 |
| Variance Threshold  | 비지도 학습형 선택                | 값이 거의 일정한 변수 제거         |

```python
import pandas as pd
import numpy as np
from sklearn.datasets import load_iris
from sklearn.feature_selection import chi2, SelectKBest, f_classif, mutual_info_classif, VarianceThreshold

# 데이터 로드
iris = load_iris()
X = pd.DataFrame(iris.data, columns=iris.feature_names)
y = iris.target

# 1) Correlation
corr_matrix = X.corr()
df = X.copy()
df['target'] = y
target_corr = df.corr()['target'].sort_values(ascending=False)
print("타겟과의 상관계수:\n", target_corr)

# 2) Chi-square
# 상위 2개 변수 선택
chi2_selector = SelectKBest(chi2, k=2)
X_kbest = chi2_selector.fit_transform(X, y)
print("Chi-2 선택 변수:", X.columns[chi2_selector.get_support()].tolist())

# 3) F-statistic (ANOVA)
f_selector = SelectKBest(f_classif, k=2)
X_f = f_selector.fit_transform(X, y)
print("F-statistic 선택 변수:", X.columns[f_selector.get_support()].tolist())

# 4) Mutual Information
mi = mutual_info_classif(X, y)
mi_series = pd.Series(mi, index=X.columns)
print("Mutual Information 스코어:\n", mi_series.sort_values(ascending=False))

# 5) Variance Threshold
# 분산이 0.2 이하인 변수 제거
selector = VarianceThreshold(threshold=0.2)
X_var = selector.fit_transform(X)
print("선택된 변수:", X.columns[selector.get_support()].tolist())
```

### 3-2. Wrapper Method

> 모델 성능을 기준으로 Feature 조합을 평가

- **Forward Selection** : Feature를 하나씩 추가하며 성능 확인
- **Backward Elimination** : 모든 Feature에서 하나씩 제거하며 성능 확인
- **RFE (Recursive Feature Elimination)** : 모델을 학습시킨 후 중요도가 낮은 변수부터 순차적으로 제거

```python
from sklearn.feature_selection import RFE
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_breast_cancer

# 데이터 로드
cancer = load_breast_cancer()
X, y = cancer.data, cancer.target

# RFE로 피처 선택
model = LogisticRegression(max_iter=10000)
rfe = RFE(estimator=model, n_features_to_select=10)
X_rfe = rfe.fit_transform(X, y)

print("전체 피처 수:", X.shape[1])
print("선택된 피처 수:", X_rfe.shape[1])
print("피처 순위:", rfe.ranking_)
print("선택된 피처:", [cancer.feature_names[i] for i in range(len(rfe.support_)) if rfe.support_[i]])

# 성능 비교
from sklearn.model_selection import cross_val_score
score_all = cross_val_score(model, X, y, cv=5).mean()
score_rfe = cross_val_score(model, X_rfe, y, cv=5).mean()
print(f"전체 피처 정확도: {score_all:.3f}")
print(f"선택된 피처 정확도: {score_rfe:.3f}")
```

### 3-3. Embedded Method

> 모델 학습 과정에서 Feature 선택이 동시에 수행됨

- **Lasso (L1 Regularization)** : 불필요한 Feature의 가중치를 0으로 만들어 변수를 자동 선택
- **Ridge (L2 Regularization)** : 모든 Feature의 가중치를 작게 만들어 과적합 방지
- **Tree-based Importance** : 결정 트리 계열 모델이 노드 분할 시 사용하는 지표(Gini 등)를 기준으로 중요도 산출
- **ElasticNet** : Lasso와 Ridge 장점 결합

```python
from sklearn.linear_model import Lasso
from sklearn.tree import DecisionTreeClassifier
import numpy as np

# 데이터 로드
X, y = load_breast_cancer(return_X_y=True)

# Lasso
lasso = Lasso(alpha=0.01)
lasso.fit(X, y)
lasso_coef = np.abs(lasso.coef_)
print("Lasso - 0인 계수:", np.sum(lasso_coef == 0))

# Tree-based Importanc
rf = DecisionTreeClassifier(max_depth=5, random_state=42)
rf.fit(X, y)
importances = rf.feature_importances_

# 상위 10개 중요 피처
indices = np.argsort(importances)[::-1][:10]
print("Top 10 중요 피처:")
for i in indices:
    print(f"{cancer.feature_names[i]}: {importances[i]:.4f}")
```

## 4. Anomaly Detection

**왜 이상치 탐지가 필요할까?**

- 이상치는 평균과 표준편차를 왜곡시켜 모델의 일반화 성능을 저해한다.
- 모델이 이상치에 맞춰지면 예측 성능이 크게 떨어지고, 잘못된 의사결정으로 이어진다.
- 연봉 예측 모델에서 한 명의 잘못된 데이터(9999억원) → 전체 예측이 비정상적으로 높아짐

### 4-1. 이상치(Anomaly)란?

- Point Anomaly: 개별 데이터 포인트 하나가 전체 분포에서 크게 벗어난 경우 (예: 키 250cm)
- Contextual Anomaly: 특정 상황(맥락)에서만 이상치인 경우. (예: 여름 기온 영하 20도)
- Collective Anomaly: 개별로는 정상일 수 있으나 그룹으로 모였을 때 비정상적인 패턴을 보이는 경우 (예: 특정 시간대 트래픽 급증)
- Types
  - Global : 전체 데이터 기준
  - Local : 주변 데이터 기준

> 이상치 vs 에러  
> 이상치 : 진짜 데이터지만 희귀함 (발견 가치 있음)  
> 에러 : 측정 오류 (제거해야 함)

### 4-2. 주요 탐지 기법

### Z-Score

- 표준편차 기반 탐지
- 일반적으로 평균으로부터 표준편차의 $|Z| > 3$ 값을 이상치로 판단
- 장점 : 간단하고 직관적, 빠른 계산, 해석 쉬움
- 단점 : 데이터가 정규분포를 따른다고 가정, 평균/분산에 민감, 다변량 탐지 어려움
- 사용 시기 : 데이터가 대략 정규 분포를 따를 때, 빠른 1차 필터링이 필요할 때

```
Z = (x - mean) / std
Outlier : |Z| > 3
```

### IQR (Interquartile Range)

- 사분위수 기반 탐지
- 장점 : 분포 가정 불필요, 중앙값 기반, Box plot 직관적
- 단점 : 다변량 탐지 어려움, 극단값에 둔감할 수 있음
- 사용 시기 : 데이터 분포를 모를 때, 중앙값 기반 탐지를 원할 때, Box plot으로 시각화할 떄

```
Q1 (25 percentile): 하위 25%
Q3 (75 percentile): 하위 75%
IQR = Q3 - Q1

Lower = Q1 - 1.5 × IQR
Upper = Q3 + 1.5 × IQR
Outlier: x < Lower or x > Upper
```

### DBSCAN

- 밀도 기반 클러스터링을 통해 어느 군집에도 속하지 않는 노이즈 포인트를 탐지
- 장점 : 다변량 탐지 가능, 군집 모양 자유, 군집 개수 지정 불필요
- 단점 : 파라미터 조정 필요, 고차원에서 성능 저하, 밀도 변화 대응 어려움

```
밀도가 높은 지역 = 정상 데이터
밀도가 낮은 지역 = 이상치
군집에 속하지 못한 점 = Outlier
```

### LOF (Local Outlier Factor)

- 주변 데이터와의 밀도를 비교하여 상대적으로 고립된 정도를 수치화
- 장점 : Local 이상치 탐지, 다양한 밀도 대응, DBSCAN보다 유연
- 단점 : 계산 비용 높음, K 선택 필요, 고차원 성능 저하

```
LOF(x) = (주변 이웃 평균 밀도) / (x의 밀도)
LOF > 1: 주변보다 밀도 낮음 (이상치 가능)
LOF ≈ 1: 주변과 비슷한 밀도 (정상)
```
