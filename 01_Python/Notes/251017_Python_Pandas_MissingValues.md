# Python Pandas와 결측치

## 🎯 목표
1. 데이터 준비 및 확인
2. 조건부 필터링
3. 그룹별 분석
4. 결측치 채우기 전략
5. 결과 검증 및 시각화

---
## 1. 데이터 준비 및 확인
```Python
import seaborn as sns
import pandas as pd

# 데이터 로드
df = sns.load_dataset("titanic")
```
주요 컬럼
- 수치형 : `age` , `fare` , `sibsp` , `parch`
- 범주형 :  `sex` , `class` , `embarked` , `embark_town` , `who` , `deck` , `alive`
- target : `survived`


```Python
# 결측치 현황 확인
null_info = (df.isnull()
             .mean()
             .sort_values(ascending=False)
             .to_frame("null_ratio"))
print(null_info)

#              null_ratio
# deck           0.772166
# age            0.198653
# embarked       0.002245
# embark_town    0.002245
```
결측치가 있는 컬럼
- `deck`, `age`, `embarked`, `embark_town` 에 결측치 확인

## 2. 조건부 필터링
```Python
# 남성만 추출
df_male = df[df["sex"] == "male"]

# 1등석 여성만 추출
df_f1 = df[(df["sex"] == "female") & (df["class"] == "First")]

# 요금이 50 초과인 3등석 승객
df_rich3 = df[(df["fare"] > 50) & (df["class"] == "Third")]
```

## 3. 그룹별 분석

### 3-1. Groupby
- 데이터를 특정 기준(그룹)으로 묶어 통계량을 계산한다.
```Python
# 성별 평균 나이
df.groupby("sex")["age"].mean()

# 선실등급별 중앙 요금
df.groupby("class")["fare"].median()

# 성별 x 등급별 평균 나이 (표 형태로 보기)
df.groupby(["sex", "class"])["age"].mean().unstack()
```

### 3-2. Pivot_table & 
- 엑셀의 피벗과 유사하게 집계와 레이아웃 변경을 동시에 수행한다.

```Python
# Pivot Table 예시
pd.pivot_table(df, values="age", index="sex", columns="class", aggfunc="mean")
```

Pivot_table 인자

|인자|의미|
|--|--|
|data|피벗할 원본 데이터 프레임|
|values|요약하고 싶은 값이 들어있는 열|
|index|행으로 그룹화할 기준|
|columns|열로 그룹화할 기준|
|aggfunc|어떤 방식으로 요약할지(집계 함수)|


### 3-3. Crosstab
- 범주형 변수 간의 교차 빈도표를 만든다.
```Python
# 클래스 x 출항지 빈도표
pd.crosstab(df["class"], df["embark_town"])

# 비율로 보기
pd.crosstab(df["class"], df["embark_town"], normalize="index").round(2)
```

## 4. 결측치 채우기 전략
### 4-1. age: 성별 × 등급별 중앙값으로 채우기
- 나이는 한쪽 꼬리가 긴 분포로 평균보다 중앙값이 더 안정적이다.
```Python
df_imp = df.copy()

# 그룹별 중앙값 계산 (transform을 사용하여 원래 크기에 맞게 확장)
age_median = df_imp.groupby(["sex", "class"])["age"].transform("median")

# age 결측치를 해당 그룹의 중앙값으로 채우기
df_imp["age"] = df_imp["age"].fillna(age_median)

# 전/후 비교 (분포의 중심이 그룹 맥락을 반영해 이동/안정화되는지 확인)
print(df[["age"]].describe())
print(df_imp[["age"]].describe())

# 시각화 비교
sns.kdeplot(df["age"], label="orig", fill=True)
sns.kdeplot(df_imp["age"],label="imputed", fill=True)
```

### 4-2. embark_town: 등급별 최빈값으로 채우기
- 범주형 변수는 평균이 의미 없으므로, 가장 자주 등장하는 값을 사용한다.
```Python
# 1등석에서 비어 있으면 'Cherbourg'로 채우기
mask1 = (df_imp["class"] == "First") & (df_imp["embark_town"].isna())
df_imp.loc[mask1, "embark_town"] = "Cherbourg"

# 2, 3등석에서 비어 있으면 'Southampton'으로 채우기
mask2 = (df_imp["class"] == "Second") & (df_imp["embark_town"].isna())
df_imp.loc[mask2, "embark_town"] = "Southampton"

mask3 = (df_imp["class"] == "Third") & (df_imp["embark_town"].isna())
df_imp.loc[mask3, "embark_town"] = "Southampton"
```

### 4-3. deck: Unknown 카테고리 생성
- `deck`는 결측 비율이 매우 높고, 추정이 불확실하다.
- 잘못된 추청은 오히려 모델 성능을 해치므로 명시적으로 `"Unknown"`을 부여하여 정보 손실을 드러낸다.
```Python
df_imp["deck"] = df_imp["deck"].astype("category")
df_imp["deck"] = df_imp["deck"].cat.add_categories(["Unknown"])
df_imp["deck"] = df_imp["deck"].fillna("Unknown")
```

## 5. 결과 검증 및 시각화
- 그룹별 분포 패턴이 합리적으로 유지되는지 육안 점검
- 결측치 채우기 전후로 왜곡이 심해지지 않았는지 확인
```Python
import matplotlib.pyplot as plt

# 시각화 비교 (Boxplot)
sns.boxplot(data=df, x="class", y="age")
plt.title("Before Imputation")
plt.show()

sns.boxplot(data=df_imp, x="class", y="age")
plt.title("After Imputation")
plt.show()
```