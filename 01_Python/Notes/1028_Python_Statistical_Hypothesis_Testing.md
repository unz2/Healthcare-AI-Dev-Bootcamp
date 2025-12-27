# 헬스케어 데이터 통계적 가설 검정 실습
> 🗓️ **2025-10-28**  
✍🏼 **작성자 : unz**
---
## 📋 목차
1. 데이터 불러오기 및 EDA
2. 가설 설정
3. 독립 2집단 평균 비교
4. 상관검정(Correlation Analysis)
5. 카이제곱 검정(Chi-square Test)
6. 변수 유형에 따른 검정법 선택
---

## 1. 데이터 불러오기 및 EDA
> 실습 데이터 : train.csv (당뇨병 데이터)
```Python
import pandas as pd

df = df.read_csv('train.csv')
print(df.shape)
print(df.head)
print(df.info())
print(df.describe())
print(df['Outcome'].values_count())

# 미측정 값 0 → 결측치 처리
# 0을 실제값으로 두면 평균, 상관이 왜곡될 수 있음
zero_cols = ['Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI']
df[zero_cols] = df[zero_cols].replace(0, pd.NA)
```

## 2. 가설 설정
- 통계적 검정은 언제나 두 가지 상반된 가설을 세우는 것에서 시작한다.
- **귀무가설($H_0$)**: "차이가 없다", "효과가 없다", "관련이 없다"는 현상 유지적인 가설
- **대립가설($H_1$)**: "차이가 있다", "효과가 있다", "관련이 있다"는 연구자가 증명하고 싶어 하는 가설

### 2-1. 검정의 원리
- 우리는 귀무가설이 맞다는 전제하에 현재의 데이터가 나타날 확률(p-value)을 계산한다.
- 이 확률이 너무 낮으면(보통 0.05 미만), "귀무가설이 일어날 가능성이 희박하다"고 판단하여 귀무가설을 기각하고 대립가설을 채택한다.

## 3. 독립 2집단 평균 비교
### 3-1. T-test
- 두 집단의 평균(Mean) 차이가 통계적으로 유의미한지를 확인하는 검정 도구

```Python
from scipy.stats import ttest_ind

df_t = df[['Outcome', 'Glucose']].dropna()
g0 = df_t[df_t.Outcome==0]['Glucose']
g1 = df_t[df_t.Outcome==1]['Glucose']

stat, p = ttest_ind(g0, g1, equal_var=False)

if p < 0.05:
    print(f'대립가설 채택, t-stat: {stat}, p-value: {p}')
else:
    print(f'귀무가설 채택, t-stat: {stat}, p-value: {p}')

```
### T-test 해석
- p-value : 귀무가설이 참일 때, 관측된 통계치보다 더 극단적인 값이 나올 확률
- p < 0.05 이면 두 집단의 평균은 통계적으로 유의미한 차이가 있다고 본다.
---

### 3-2. Cohen’s d
- 두 집단 평균의 차이를 표준편차로 나눈 값
- T-test의 한계는 샘플 사이즈가 커지면 아주 작은 차이도 유의미하게 나온다는 점을 보완하기 위해 효과 크기인 Cohen’s d를 사용한다.

```Python
import numpy as np

sd_pooled = np.sqrt((g0.var(ddof=1) + g1.var(ddof=1)) / 2)
d = (g1.mean() - g0.mean()) / sd_pooled)

if d >= 1.0:
    print(f'매우 큰 효과, Cohen's d: {d}')
elif d >= 0.8:
    print(f'큰 효과, Cohen's d: {d}')
elif d >= 0.5:
    print(f'중간 효과, Cohen's d: {d}')
else:
    print(f'작은 효과, Cohen's d: {d}')
```
### Cohen’s d 해석
- 0.2 / 작은 효과 / 차이가 있지만 실생활에선 미미
- 0.5 / 중간 효과 / 확실히 차이를 느끼는 정도
- 0.8 / 큰 효과 / 차이가 꽤 큰 편
- 1.0 / 매우 큰 효과 / 두 집단이 거의 다른 종족처럼 구분 됨

## 4. 상관검정(Correlation Analysis)
### 4-1. Pearson(피어슨) 상관계수 ($r$)
- 두 연속형 변수가 직선적으로 함께 변화하는 정도를 측정한 값
- 의미: 선형적인 관계(직선 관계)의 강도를 측정합니다.

### 4-2. Spearman(스피어만) 상관계수 ($\rho$)
- 데이터가 정규성을 따르지 않거나, 순위(Ranking) 데이터일 때 사용
- 비선형적이라도 단조 증가/감소 관계가 있는지 측정합니다. (이상치에 강함)

```Python
from scipy.stats import pearsonr, spearmanr

pair = df[["BMI",pair = pair.apply(pd.to_"BloodPressure"]].dropna().copy()
pair = df.apply(pd.to_numeric)

r, p = pearsonr(pair["BMI"], pair["BloodPressure"])
rho, p2 = spearmanr(pair["BMI"], pair["BloodPressure"])

print(f'Pearson r: {r}, p: {p}')
print(f'Spearman rho: {rho}, p: {p2}')
```

### 결과 해석
상관계수 범위: $-1$ ~ $+1$

$+1$: 완벽한 양의 상관관계  
$0$: 상관관계 없음  
$-1$: 완벽한 음의 상관관계  
> 상관관계가 있다고 해서 반드시 인과관계가 있는 것은 아니다.

## 5. 카이제곱 검정(Chi-square Test)
- 두 범주형 변수 간 독립성을 확인한다.
- 연속형 변수를 구간화하여 범주형으로 변환하면 카이제곱 검정 적용 가능

```Python
# Glucose 구간화와 교차표
cut = pd.cut(
    df["Glucose"],
    bins=[-float("inf"), 125, float("inf")],
    labels=["정상~전단계","고혈당"], 
    include_lowest=True
)
tab = pd.crosstab(cut, df["Outcome"])
print(tab)

# 독립성 검정
from scipy.stats import chi2_contingency

chi2, p, dof, expected = chi2_contingency(tab.fillna(0))
print("chi2:", chi2,"p-value:", p,"dof:", dof)
```

## 6. 변수 유형에 따른 검정법 선택

|독립변수(X)|종속변수(y)|검정법|예시|
|:--:|:--:|:--:|:--:|
|범주형(2집단)|연속형|T-test|Outcome별 Glucose 평균 비교|
|범주형(3집단 이상)|연속형|ANOVA| BMI그룹별 BloodPressure 비교|
|연속형|연속형|Pearson / Spearman| BMI ↔ BloodPressure 관계|
|범주형|범주형|Chi-square Test|Glucose구간 × Outcome 연관|