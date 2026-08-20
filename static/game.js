// WORD MODE のゲーム進行を担当する JavaScript。
// 問題データは Python の /api/questions から受け取る。

const GAME_SECONDS = 60;

let questions = [];
let questionIndex = 0;
let score = 0;
let combo = 0;
let maxCombo = 0;
let correct = 0;
let wrong = 0;
let wrongWords = [];
let canAnswer = false;
let gameEnded = false;
let endTime = 0;
let timerId = null;

const timeElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const comboElement = document.getElementById("combo");
const numberElement = document.getElementById("question-number");
const wordElement = document.getElementById("word");
const feedbackElement = document.getElementById("feedback");
const choicesElement = document.getElementById("choices");

async function startGame() {
  try {
    const response = await fetch("/api/questions");
    questions = await response.json();
    endTime = Date.now() + GAME_SECONDS * 1000;
    showQuestion();
    timerId = setInterval(updateTimer, 100);
  } catch (error) {
    wordElement.textContent = "LOAD ERROR";
    feedbackElement.textContent = "ページを再読み込みしてください";
  }
}

function updateTimer() {
  const secondsLeft = Math.max(0, (endTime - Date.now()) / 1000);
  timeElement.textContent = secondsLeft.toFixed(1);

  if (secondsLeft <= 0) {
    endGame();
  }
}

function showQuestion() {
  if (gameEnded) return;

  // 全問出たら、同じ問題セットをもう一度ランダムに使う。
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
    correct += 1;
    combo += 1;
    maxCombo = Math.max(maxCombo, combo);
    score += 100;
    selectedButton.classList.add("correct");
    feedbackElement.textContent = "+100 SCORE";
    feedbackElement.className = "feedback correct-text";
    setTimeout(nextQuestion, 250);
  } else {
    wrong += 1;
    combo = 0;
    wrongWords.push({ word: question.word, answer: question.answer });
    selectedButton.classList.add("wrong");
    buttons.forEach((button) => {
      if (button.textContent.includes(question.answer)) button.classList.add("correct");
    });
    feedbackElement.textContent = `ANSWER: ${question.answer}`;
    feedbackElement.className = "feedback wrong-text";
    setTimeout(nextQuestion, 700);
  }

  scoreElement.textContent = score;
  comboElement.textContent = combo;
}

function nextQuestion() {
  if (gameEnded) return;
  questionIndex += 1;
  showQuestion();
}

function endGame() {
  if (gameEnded) return;
  gameEnded = true;
  clearInterval(timerId);
  canAnswer = false;

  const totalAnswers = correct + wrong;
  const accuracy = totalAnswers === 0 ? 0 : Math.round((correct / totalAnswers) * 100);
  const result = { score, correct, wrong, accuracy, maxCombo, wrongWords };
  sessionStorage.setItem("techEnglishAttackResult", JSON.stringify(result));

  const bestScore = Number(localStorage.getItem("techEnglishAttackBestScore") || 0);
  if (score > bestScore) localStorage.setItem("techEnglishAttackBestScore", score);

  window.location.href = "/result";
}

startGame();
