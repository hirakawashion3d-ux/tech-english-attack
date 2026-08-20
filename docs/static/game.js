const settings = {
  standard: { seconds: 60, name: "WORD ATTACK" },
  sprint: { seconds: 30, name: "SPRINT MODE" },
  marathon: { seconds: 120, name: "MARATHON MODE" },
  boss: { seconds: 60, name: "BOSS MODE" },
  review: { seconds: 60, name: "REVIEW MODE" }
};
const mode = new URLSearchParams(window.location.search).get("mode") || "standard";
const gameSettings = settings[mode] || settings.standard;

let questions = [], questionIndex = 0, score = 0, combo = 0, maxCombo = 0;
let correct = 0, wrong = 0, wrongWords = [], canAnswer = false, gameEnded = false;
let endTime = 0, timerId = null;

const timeElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const comboElement = document.getElementById("combo");
const numberElement = document.getElementById("question-number");
const wordElement = document.getElementById("word");
const feedbackElement = document.getElementById("feedback");
const choicesElement = document.getElementById("choices");

aSyncStart();

async function aSyncStart() {
  try {
    document.getElementById("mode-name").textContent = gameSettings.name;
    if (mode === "review") {
      const lastResult = JSON.parse(sessionStorage.getItem("techEnglishAttackResult") || "null");
      questions = lastResult ? lastResult.wrongWords : [];
      if (questions.length === 0) throw new Error("No review data");
    } else {
      const response = await fetch("static/questions.json");
      questions = await response.json();
      if (mode === "boss") questions.sort(() => Math.random() - 0.5);
    }
    endTime = Date.now() + gameSettings.seconds * 1000;
    showQuestion();
    timerId = setInterval(updateTimer, 100);
  } catch (error) {
    wordElement.textContent = "NO REVIEW DATA";
    feedbackElement.textContent = "PLAY STANDARD MODE FIRST";
  }
}

function updateTimer() {
  const secondsLeft = Math.max(0, (endTime - Date.now()) / 1000);
  timeElement.textContent = secondsLeft.toFixed(1);
  if (secondsLeft <= 0) endGame();
}

function showQuestion() {
  if (gameEnded) return;
  if (questionIndex >= questions.length) {
    questionIndex = 0;
    questions.sort(() => Math.random() - 0.5);
  }
  const question = questions[questionIndex];
  numberElement.textContent = String(questionIndex + 1).padStart(2, "0");
  wordElement.textContent = question.word;
  feedbackElement.textContent = "CHOOSE THE MEANING";
  feedbackElement.className = "feedback";
  choicesElement.innerHTML = "";
  canAnswer = true;
  question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.innerHTML = `<span>${String.fromCharCode(65 + index)}</span>${choice}`;
    button.addEventListener("click", () => answerQuestion(choice, question, button));
    choicesElement.appendChild(button);
  });
}

function answerQuestion(choice, question, selectedButton) {
  if (!canAnswer || gameEnded) return;
  canAnswer = false;
  const buttons = choicesElement.querySelectorAll("button");
  buttons.forEach((button) => { button.disabled = true; });
  if (choice === question.answer) {
    correct += 1; combo += 1; maxCombo = Math.max(maxCombo, combo); score += 100;
    selectedButton.classList.add("correct");
    feedbackElement.textContent = "+100 SCORE";
    feedbackElement.className = "feedback correct-text";
    setTimeout(nextQuestion, 250);
  } else {
    wrong += 1; combo = 0; wrongWords.push(question);
    selectedButton.classList.add("wrong");
    buttons.forEach((button) => { if (button.textContent.includes(question.answer)) button.classList.add("correct"); });
    feedbackElement.textContent = `ANSWER: ${question.answer}`;
    feedbackElement.className = "feedback wrong-text";
    setTimeout(nextQuestion, 700);
  }
  scoreElement.textContent = score;
  comboElement.textContent = combo;
}

function nextQuestion() { if (!gameEnded) { questionIndex += 1; showQuestion(); } }

function endGame() {
  if (gameEnded) return;
  gameEnded = true; clearInterval(timerId); canAnswer = false;
  const totalAnswers = correct + wrong;
  const accuracy = totalAnswers === 0 ? 0 : Math.round((correct / totalAnswers) * 100);
  const result = { score, correct, wrong, accuracy, maxCombo, wrongWords, mode };
  sessionStorage.setItem("techEnglishAttackResult", JSON.stringify(result));
  const bestScore = Number(localStorage.getItem("techEnglishAttackBestScore") || 0);
  if (score > bestScore) localStorage.setItem("techEnglishAttackBestScore", score);
  localStorage.setItem("techEnglishAttackGamesPlayed", Number(localStorage.getItem("techEnglishAttackGamesPlayed") || 0) + 1);
  const bestAccuracy = Number(localStorage.getItem("techEnglishAttackBestAccuracy") || 0);
  if (accuracy > bestAccuracy) localStorage.setItem("techEnglishAttackBestAccuracy", accuracy);
  window.location.href = "result.html";
}
