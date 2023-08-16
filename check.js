let pick = [];

while (pick.length < 3) {
  const index = Math.floor(Math.random() * 10);

  if (!pick.includes(index)) {
    pick.push(index);
  }
}

const answer = pick.join("");
console.log(answer);

// 한 자리 숫자에 대한 볼, 스트라이크 판단하기.
let attemp = 0;

const button = document.querySelector("button");
const record = document.getElementById("record");
const input = document.querySelector("input");

function ballStrikeCheck() {
  const value = $("#input").val(); // 유저가 입력한 값

  if (value.length !== 3) {
    alert("세자리 숫자를 입력해주세요");
    return;
  }

  if (!Number(value)) {
    alert("숫자만 입력해주세요");
    return;
  }

  attemp++; // 시도 횟수
  // 스트라이크, 볼 검사
  let strike = 0;
  let ball = 0;
  for (let i = 0; i < answer.length; i++) {
    const index = value.indexOf(answer[i]); // answer 가 345 이면, answer[0] = 3 / value.indexOf(3) / value 123.indexOf(3) => 2
    if (index > -1) {
      // 일치하는 숫자 발견
      if (index === i) {
        strike += 1;
      } else {
        // 숫자만 같다면
        ball += 1;
      }
    }
  }

  const div = document.createElement("div");
  div.textContent = `${attemp}번째 시도 : ${value} ${ball}B${strike}S`;
  record.appendChild(div);

  if (strike === 3) {
    const div = document.createElement("div");
    div.textContent = `${attemp}번만에 맞히셨습니다. 게임을 종료합니다.`;
    record.append(div);
    setTimeout(function () {
      location.reload();
      alert("새로운 게임을 시작합니다");
    }, 2000);
    return;
  }

  document.getElementById("input").value = ""; // 검사 마쳤으니 입력창 비우기

  return;
}
