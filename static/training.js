const skillNames = {
  variables: "VARIABLES",
  if: "IF",
  for: "FOR",
  functions: "FUNCTIONS",
  lists: "LISTS"
};
const exerciseTypes = ["type", "fill", "predict", "fix", "build"];
const storageKey = "techEnglishPythonProgress";
const isStaticSite = window.location.pathname.endsWith("python-training.html");
const lessonsUrl = isStaticSite ? "static/python_lessons.json" : "/api/python-lessons";

let allLessons = [];
let sessionLessons = [];
let lessonIndex = 0;
let currentAttempts = 0;
let currentHintUsed = false;
let questionFinished = false;
let sessionAttempts = 0;
let sessionCorrect = 0;
let sessionHints = 0;
let sessionXp = 0;
let selectedSkill = "variables";
let isChallenge = false;
let sessionSkillStats = {};

const skillScreen = document.getElementById("skill-screen");
const lessonScreen = document.getElementById("lesson-screen");
const completeScreen = document.getElementById("complete-screen");
const skillMap = document.getElementById("skill-map");
const answerInput = document.getElementById("code-answer");
const feedback = document.getElementById("training-feedback");
const hintButton = document.getElementById("hint-button");
const showAnswerButton = document.getElementById("show-answer-button");
const checkButton = document.getElementById("check-button");
const nextButton = document.getElementById("next-button");

startTrainingPage();

async function startTrainingPage() {
  renderSkillMap();
  try {
    const response = await fetch(lessonsUrl);
    if (!response.ok) throw new Error("Could not load Python lessons");
    allLessons = await response.json();
  } catch (error) {
    skillMap.innerHTML = '<p class="load-error">LESSON DATA COULD NOT BE LOADED</p>';
  }
}

function getProgress() {
  const emptyProgress = { totalXp: 0, totalTraining: 0, skills: {} };
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || emptyProgress;
  } catch (error) {
    return emptyProgress;
  }
}

function getSkillAccuracy(skillData) {
  if (!skillData || skillData.attempts === 0) return 0;
  return Math.round((skillData.correct / skillData.attempts) * 100);
}

function getStars(skillData) {
  if (!skillData || skillData.attempts === 0) return "☆☆☆☆☆";
  const accuracy = getSkillAccuracy(skillData);
  let filledStars = 1;
  if (accuracy >= 90) filledStars = 5;
  else if (accuracy >= 75) filledStars = 4;
  else if (accuracy >= 60) filledStars = 3;
  else if (accuracy >= 40) filledStars = 2;
  return "★".repeat(filledStars) + "☆".repeat(5 - filledStars);
}

function renderSkillMap() {
  const progress = getProgress();
  skillMap.innerHTML = "";
  Object.keys(skillNames).forEach((skill) => {
    const skillData = progress.skills[skill];
    const button = document.createElement("button");
    button.className = "skill-card";
    button.type = "button";
    button.innerHTML = `<span>${skillNames[skill]}</span><strong>${getStars(skillData)}</strong><small>${getSkillAccuracy(skillData)}% ACCURACY</small>`;
    button.addEventListener("click", () => beginSession(skill, false));
    skillMap.appendChild(button);
  });
}

function shuffle(items) {
  const copiedItems = [...items];
  for (let index = copiedItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copiedItems[index], copiedItems[randomIndex]] = [copiedItems[randomIndex], copiedItems[index]];
  }
  return copiedItems;
}

function chooseMixedLessons(lessons, count) {
  const chosen = [];
  exerciseTypes.forEach((exerciseType) => {
    const matches = shuffle(lessons.filter((lesson) => lesson.type === exerciseType));
    if (matches.length > 0) chosen.push(matches[0]);
  });
  const remaining = shuffle(lessons.filter((lesson) => !chosen.includes(lesson)));
  return shuffle(chosen.concat(remaining.slice(0, count - chosen.length)));
}

function beginSession(skill, challenge) {
  if (allLessons.length === 0) return;
  selectedSkill = skill;
  isChallenge = challenge;
  const availableLessons = challenge ? allLessons : allLessons.filter((lesson) => lesson.skill === skill);
  sessionLessons = chooseMixedLessons(availableLessons, challenge ? 10 : 5);
  lessonIndex = 0;
  sessionAttempts = 0;
  sessionCorrect = 0;
  sessionHints = 0;
  sessionXp = 0;
  sessionSkillStats = {};
  skillScreen.classList.add("hidden");
  completeScreen.classList.add("hidden");
  lessonScreen.classList.remove("hidden");
  showLesson();
}

function showLesson() {
  const lesson = sessionLessons[lessonIndex];
  currentAttempts = 0;
  currentHintUsed = false;
  questionFinished = false;
  document.getElementById("lesson-skill").textContent = isChallenge ? "CHALLENGE" : skillNames[lesson.skill];
  document.getElementById("lesson-progress").textContent = `${lessonIndex + 1} / ${sessionLessons.length}`;
  document.getElementById("session-xp").textContent = sessionXp;
  document.getElementById("exercise-type").textContent = lesson.type.toUpperCase();
  document.getElementById("difficulty").textContent = `LEVEL ${lesson.difficulty}`;
  document.getElementById("instruction").textContent = lesson.instruction;

  const codeSample = document.getElementById("code-sample");
  if (lesson.code) {
    codeSample.querySelector("code").textContent = lesson.code;
    codeSample.classList.remove("hidden");
  } else {
    codeSample.classList.add("hidden");
  }

  answerInput.value = "";
  answerInput.rows = lesson.answer.includes("\n") ? 6 : 3;
  answerInput.disabled = false;
  feedback.textContent = lesson.type === "predict" ? "ENTER THE OUTPUT" : "TYPE YOUR ANSWER";
  feedback.className = "training-feedback";
  document.getElementById("hint-box").classList.add("hidden");
  document.getElementById("explanation-box").classList.add("hidden");
  hintButton.disabled = true;
  showAnswerButton.classList.add("hidden");
  nextButton.classList.add("hidden");
  checkButton.classList.remove("hidden");
  answerInput.focus();
}

function normalizeAnswer(value) {
  const lines = value.replace(/\r\n/g, "\n").replace(/\t/g, "    ").trim().split("\n");
  return lines.map((line) => {
    const leadingSpaces = (line.match(/^ */) || [""])[0];
    let content = line.trim().replace(/'([^']*)'/g, '"$1"');
    content = content.replace(/\s+/g, " ");
    content = content.replace(/\s*(>=|<=|==|!=|\+=|-=|\*=|=|>|<)\s*/g, " $1 ");
    content = content.replace(/,\s*/g, ", ").replace(/\s+:/g, ":");
    return leadingSpaces + content;
  }).join("\n");
}

function checkAnswer() {
  if (questionFinished || answerInput.value.trim() === "") return;
  const lesson = sessionLessons[lessonIndex];
  currentAttempts += 1;
  sessionAttempts += 1;

  if (normalizeAnswer(answerInput.value) === normalizeAnswer(lesson.answer)) {
    const attemptPenalty = Math.max(0, currentAttempts - 1) * 15;
    const noHintBonus = currentHintUsed ? 0 : 25;
    const earnedXp = Math.max(40, 100 + noHintBonus - attemptPenalty);
    sessionXp += earnedXp;
    sessionCorrect += 1;
    feedback.textContent = `CORRECT  +${earnedXp} XP`;
    feedback.className = "training-feedback correct-text";
    finishQuestion(true);
    return;
  }

  feedback.textContent = "TRY AGAIN — 自分で修正してみよう";
  feedback.className = "training-feedback wrong-text";
  hintButton.disabled = false;
  if (currentAttempts >= 3) showAnswerButton.classList.remove("hidden");
  answerInput.focus();
}

function finishQuestion(wasCorrect) {
  const lesson = sessionLessons[lessonIndex];
  if (!sessionSkillStats[lesson.skill]) sessionSkillStats[lesson.skill] = { correct: 0, attempts: 0, xp: 0 };
  const skillStats = sessionSkillStats[lesson.skill];
  skillStats.attempts += currentAttempts;
  if (wasCorrect) skillStats.correct += 1;
  const previousSkillXp = Object.values(sessionSkillStats).reduce((total, item) => total + item.xp, 0);
  skillStats.xp += Math.max(0, sessionXp - previousSkillXp);

  questionFinished = true;
  answerInput.disabled = true;
  checkButton.classList.add("hidden");
  hintButton.disabled = true;
  showAnswerButton.classList.add("hidden");
  nextButton.classList.remove("hidden");
  document.getElementById("session-xp").textContent = sessionXp;
  const explanationBox = document.getElementById("explanation-box");
  explanationBox.querySelector("p").textContent = lesson.explanation;
  explanationBox.classList.remove("hidden");
}

function showHint() {
  if (questionFinished || hintButton.disabled) return;
  const hintBox = document.getElementById("hint-box");
  hintBox.querySelector("p").textContent = sessionLessons[lessonIndex].hint;
  hintBox.classList.remove("hidden");
  if (!currentHintUsed) sessionHints += 1;
  currentHintUsed = true;
}

function showAnswer() {
  if (questionFinished || currentAttempts < 3) return;
  const lesson = sessionLessons[lessonIndex];
  answerInput.value = lesson.answer;
  feedback.textContent = "ANSWER SHOWN — もう一度自分で打ってみよう";
  feedback.className = "training-feedback answer-text";
  finishQuestion(false);
}

function goToNextLesson() {
  lessonIndex += 1;
  if (lessonIndex < sessionLessons.length) showLesson();
  else completeSession();
}

function completeSession() {
  saveSessionProgress();
  lessonScreen.classList.add("hidden");
  completeScreen.classList.remove("hidden");
  const accuracy = sessionAttempts === 0 ? 0 : Math.round((sessionCorrect / sessionAttempts) * 100);
  document.getElementById("complete-accuracy").textContent = `${accuracy}%`;
  document.getElementById("complete-attempts").textContent = sessionAttempts;
  document.getElementById("complete-hints").textContent = sessionHints;
  document.getElementById("complete-xp").textContent = sessionXp;
}

function saveSessionProgress() {
  const progress = getProgress();
  progress.totalXp += sessionXp;
  progress.totalTraining += 1;
  Object.entries(sessionSkillStats).forEach(([skill, sessionData]) => {
    if (!progress.skills[skill]) progress.skills[skill] = { correct: 0, attempts: 0, xp: 0, sessions: 0 };
    progress.skills[skill].correct += sessionData.correct;
    progress.skills[skill].attempts += sessionData.attempts;
    progress.skills[skill].xp += sessionData.xp;
    progress.skills[skill].sessions += 1;
  });
  localStorage.setItem(storageKey, JSON.stringify(progress));
}

answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    const start = answerInput.selectionStart;
    answerInput.value = answerInput.value.slice(0, start) + "    " + answerInput.value.slice(answerInput.selectionEnd);
    answerInput.selectionStart = answerInput.selectionEnd = start + 4;
  }
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") checkAnswer();
});
checkButton.addEventListener("click", checkAnswer);
hintButton.addEventListener("click", showHint);
showAnswerButton.addEventListener("click", showAnswer);
nextButton.addEventListener("click", goToNextLesson);
document.getElementById("challenge-button").addEventListener("click", () => beginSession("mixed", true));
document.getElementById("train-again-button").addEventListener("click", () => {
  completeScreen.classList.add("hidden");
  skillScreen.classList.remove("hidden");
  renderSkillMap();
});
