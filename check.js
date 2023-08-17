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
const tries = []; // 시도했던 값

function ballStrikeCheck() {
  const value = $("#input").val(); // 유저가 입력한 값

  if (value.length !== 3) {
    input.classList.add("redBorder");
    alert("세자리 숫자를 입력해주세요");
    return;
  }
  if (!Number(value)) {
    input.classList.add("redBorder");
    alert("숫자만 입력해주세요");
    return;
  }
  // 중복된 숫자가 있는가
  if (new Set(value).size != 3) {
    input.classList.add("redBorder");
    alert("중복되지 않게 입력해 주세요.");
    return;
  }
  // 이미 시도한 값은 아닌가
  if (tries.includes(value)) {
    input.classList.add("redBorder");
    alert("이미 시도한 값입니다.");
    return;
  }
  //input 테두리 원상복구
  input.classList.remove("redBorder");
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
    localStorage.setItem("attemp", attemp);
    localStorage.setItem("result", answer);
    const div = document.createElement("div");
    div.textContent = `${attemp}번만에 맞히셨습니다. 게임을 종료합니다.`;
    record.append(div);
    setTimeout(function () {
      window.location.href = "congrats.html";
    }, 1000);
    return;
  }

  document.getElementById("input").value = ""; // 검사 마쳤으니 입력창 비우기
  tries.push(value);

  return;
}
