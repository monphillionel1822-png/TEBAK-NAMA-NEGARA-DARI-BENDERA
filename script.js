const flags = [
  { negara: "INDONESIA", img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg" },
  { negara: "JEPANG", img: "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg" },
  { negara: "AMERIKA SERIKAT", img: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" },
  { negara: "PRANCIS", img: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg" },
  { negara: "BRAZIL", img: "https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg" },
  { negara: "AUSTRALIA", img: "https://upload.wikimedia.org/wikipedia/en/b/b9/Flag_of_Australia.svg" },
  { negara: "INGGRIS", img: "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" },
  { negara: "JERMAN", img: "https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg" },
  { negara: "ITALIA", img: "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg" },
  { negara: "KANADA", img: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg" },
  { negara: "SPANYOL", img: "https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg" },
  { negara: "CHINA", img: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg" },
  { negara: "RUSIA", img: "https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg" },
  { negara: "SINGAPURA", img: "https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg" },
  { negara: "MALAYSIA", img: "https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg" },
  { negara: "THAILAND", img: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg" },
  { negara: "FILIPINA", img: "https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg" },
  { negara: "KOREA SELATAN", img: "https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg" },
  { negara: "INDIA", img: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" },
  { negara: "MESIR", img: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg" }
];

let currentFlagIndex;
let usedIndexes = [];
let score = 0;
let highscore = localStorage.getItem("highscore") || 0;
let timer;
let timeLeft = 15;

function showFlag() {
  clearInterval(timer);
  timeLeft = 15;
  document.getElementById("timer").classList.remove("urgent");
  document.getElementById("timer").innerText = "Waktu tersisa: " + timeLeft + " detik";
  timer = setInterval(countdown, 1000);

  if (usedIndexes.length === flags.length) usedIndexes = [];

  do {
    currentFlagIndex = Math.floor(Math.random() * flags.length);
  } while (usedIndexes.includes(currentFlagIndex));

  usedIndexes.push(currentFlagIndex);

  const flag = flags[currentFlagIndex];
  document.getElementById("flag").src = flag.img;
  document.getElementById("answerInput").value = "";
  document.getElementById("message").innerText = "";
  document.getElementById("score").innerText = "Skor: " + score;
  document.getElementById("highscore").innerText = "🏆 Skor Tertinggi: " + highscore;
}

function submitAnswer() {
  clearInterval(timer);
  const answer = document.getElementById("answerInput").value.trim().toUpperCase();
  const correctAnswer = flags[currentFlagIndex].negara.toUpperCase();
  const message = document.getElementById("message");

  if (answer === correctAnswer) {
    message.innerText = "✅ Benar!";
    score += 10;
  } else {
    message.innerText = `❌ Salah! Jawaban: ${correctAnswer}`;
    score -= 5;
  }

  updateHighscore();
  document.getElementById("score").innerText = "Skor: " + score;
  setTimeout(showFlag, 2000);
}

function countdown() {
  timeLeft--;
  document.getElementById("timer").innerText = "Waktu tersisa: " + timeLeft + " detik";
  if (timeLeft <= 5) {
    document.getElementById("timer").classList.add("urgent");
  }

  if (timeLeft <= 0) {
    clearInterval(timer);
    document.getElementById("message").innerText = `⏰ Waktu habis! Jawaban: ${flags[currentFlagIndex].negara}`;
    score -= 5;
    updateHighscore();
    document.getElementById("score").innerText = "Skor: " + score;
    setTimeout(showFlag, 2000);
  }
}

function updateHighscore() {
  if (score > highscore) {
    highscore = score;
    localStorage.setItem("highscore", highscore);
  }
  document.getElementById("highscore").innerText = "🏆 Skor Tertinggi: " + highscore;
}

showFlag();



