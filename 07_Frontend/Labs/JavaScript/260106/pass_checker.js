// 합격 판정기
// 합격 조건 : 점수 70점 이상, 출석률 80 이상, 과제 체출 여부 true
// 단, 점수가 90점 이상이면 출석률 무시하고 합격

const score = 60;
const attendance = 90;
const submitted = true;

// if (score >= 90 && submitted) {
//   console.log("합격");
// } else if (score >= 70 && attendance >= 80 && submitted) {
//   console.log("합격");
// } else {
//   console.log("불합격");
// }

if (submitted && ((score >= 70 && attendance >= 80) || score >= 90)) {
  console.log("합격");
} else {
  console.log("불합격");
}
