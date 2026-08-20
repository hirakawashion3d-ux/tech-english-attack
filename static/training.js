const skillNames = {
  variables: "VARIABLES",
  if: "IF",
  for: "FOR",
  functions: "FUNCTIONS",
  lists: "LISTS"
};
const scoreCourses = {
  "3000": {
    name: "3,000 SCORE COURSE", target: 3000, seconds: 60, timeBonus: 2,
    description: "BASIC / 基礎コード中心"
  },
  "5000": {
    name: "5,000 SCORE COURSE", target: 5000, seconds: 60, timeBonus: 1.5,
    description: "CORE / 全形式をミックス"
  },
  "10000": {
    name: "10,000 SCORE COURSE", target: 10000, seconds: 60, timeBonus: 1,
    description: "ADVANCED / BUILD・FIX中心"
  }
};
const exerciseTypes = ["type", "fill", "predict", "fix", "build"];
const progressStorageKey = "techEnglishPythonProgress";
const courseResultsKey = "techEnglishCourseResults";
const isStaticSite = window.location.pathname.endsWith("python-training.html");
const lessonsUrl = isStaticSite ? "static/python_lessons.json" : "/api/python-lessons";
const requestedCourseId = new URLSearchParams(window.location.search).get("course");
const requestedSkill = new URLSearchParams(window.location.search).get("skill");
const requestedConcept = new URLSearchParams(window.location.search).get("concept");
const requestedLearnModule = new URLSearchParams(window.location.search).get("learn_module");

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

let isCourseAttack = false;
let activeCourseId = "3000";
let courseScore = 0;
let courseCombo = 0;
let courseMaxCombo = 0;
let courseCorrect = 0;
let courseWrong = 0;
let courseEndTime = 0;
let courseTimerId = null;

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
  renderCourseCards();
  renderSkillMap();
  try {
    const response = await fetch(lessonsUrl);
    if (!response.ok) throw new Error("Could not load Python lessons");
    allLessons = await response.json();
    if (scoreCourses[requestedCourseId]) beginCourseAttack(requestedCourseId);
    else if (skillNames[requestedSkill]) beginPracticeSession(requestedSkill, false);
  } catch (error) {
    skillMap.innerHTML = '<p class="load-error">LESSON DATA COULD NOT BE LOADED</p>';
  }
}

function getProgress() {
  const emptyProgress = { totalXp: 0, totalTraining: 0, skills: {} };
  try {
    return JSON.parse(localStorage.getItem(progressStorageKey)) || emptyProgress;
  } catch (error) {
    return emptyProgress;
  }
}

function getCourseResults() {
  try {
    return JSON.parse(localStorage.getItem(courseResultsKey)) || {};
  } catch (error) {
    return {};
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

function renderCourseCards() {
  const results = getCourseResults();
  const courseGrid = document.getElementById("course-grid");
  courseGrid.innerHTML = "";
  Object.entries(scoreCourses).forEach(([courseId, course]) => {
    const bestScore = results[courseId] ? results[courseId].bestScore : 0;
    const percentage = Math.min(100, Math.round((bestScore / course.target) * 100));
    const button = document.createElement("button");
    button.type = "button";
    button.className = "course-card";
    if (bestScore >= course.target) button.classList.add("achieved");
    button.innerHTML = `
      <span>${course.description}</span>
      <strong>${course.name}</strong>
      <div class="course-progress-track"><span style="width:${percentage}%"></span></div>
      <small>BEST ${bestScore.toLocaleString()} / TARGET ${course.target.toLocaleString()}</small>`;
    button.addEventListener("click", () => beginCourseAttack(courseId));
    courseGrid.appendChild(button);
  });
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
    button.addEventListener("click", () => beginPracticeSession(skill, false));
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

function setHudLabels(first, second, third, fourth) {
  document.getElementById("hud-label-one").textContent = first;
  document.getElementById("hud-label-two").textContent = second;
  document.getElementById("hud-label-three").textContent = third;
  document.getElementById("hud-label-four").textContent = fourth;
}

function beginPracticeSession(skill, challenge) {
  if (allLessons.length === 0) return;
  stopCourseTimer();
  isCourseAttack = false;
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
  setHudLabels("SKILL", "PROGRESS", "SESSION XP", "MODE");
  skillScreen.classList.add("hidden");
  completeScreen.classList.add("hidden");
  lessonScreen.classList.remove("hidden");
  showQuestion();
}

function getCourseLessons(courseId) {
  if (courseId === "3000") return allLessons.filter((lesson) => lesson.difficulty === 1);
  if (courseId === "10000") {
    return allLessons.filter((lesson) => lesson.difficulty === 2 && ["predict", "fix", "build"].includes(lesson.type));
  }
  return allLessons;
}

function beginCourseAttack(courseId) {
  if (allLessons.length === 0) return;
  activeCourseId = courseId;
  isCourseAttack = true;
  isChallenge = false;
  sessionLessons = shuffle(getCourseLessons(courseId));
  lessonIndex = 0;
  courseScore = 0;
  courseCombo = 0;
  courseMaxCombo = 0;
  courseCorrect = 0;
  courseWrong = 0;
  sessionAttempts = 0;
  sessionHints = 0;
  courseEndTime = Date.now() + scoreCourses[courseId].seconds * 1000;
  setHudLabels("SCORE", "TIME", "COMBO", "COURSE");
  skillScreen.classList.add("hidden");
  completeScreen.classList.add("hidden");
  lessonScreen.classList.remove("hidden");
  showQuestion();
  stopCourseTimer();
  courseTimerId = setInterval(updateCourseTimer, 100);
  updateCourseTimer();
}

function stopCourseTimer() {
  if (courseTimerId) clearInterval(courseTimerId);
  courseTimerId = null;
}

function updateCourseTimer() {
  if (!isCourseAttack) return;
  const secondsLeft = Math.max(0, (courseEndTime - Date.now()) / 1000);
  document.getElementById("lesson-progress").textContent = secondsLeft.toFixed(1);
  if (secondsLeft <= 0) finishCourseAttack();
}

function showQuestion() {
  if (lessonIndex >= sessionLessons.length) {
    lessonIndex = 0;
    sessionLessons = shuffle(sessionLessons);
  }
  const lesson = sessionLessons[lessonIndex];
  currentAttempts = 0;
  currentHintUsed = false;
  questionFinished = false;

  if (isCourseAttack) {
    document.getElementById("lesson-skill").textContent = courseScore.toLocaleString();
    document.getElementById("session-xp").textContent = `x${courseCombo}`;
    document.getElementById("active-course").textContent = Number(activeCourseId).toLocaleString();
  } else {
    document.getElementById("lesson-skill").textContent = isChallenge ? "CHALLENGE" : skillNames[lesson.skill];
    document.getElementById("lesson-progress").textContent = `${lessonIndex + 1} / ${sessionLessons.length}`;
    document.getElementById("session-xp").textContent = sessionXp;
    document.getElementById("active-course").textContent = isChallenge ? "CHALLENGE" : "PRACTICE";
  }

  document.getElementById("exercise-type").textContent = lesson.type.toUpperCase();
  document.getElementById("difficulty").textContent = `LEVEL ${lesson.difficulty}`;
  document.getElementById("instruction").textContent = lesson.instruction;
  document.getElementById("learn-this-link").href = learningLinkForLesson(lesson);
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

function learningLinkForLesson(lesson) {
  const moduleBySkill = { variables: "variables", if: "if", for: "for", functions: "functions", lists: "lists" };
  const conceptBySkill = { variables: "what-is-variable", if: "what-is-if", for: "what-is-loop", functions: "what-is-function", lists: "what-is-list" };
  const moduleId = requestedLearnModule || moduleBySkill[lesson.skill] || "start-python";
  const conceptId = requestedConcept || conceptBySkill[lesson.skill] || "what-is-python";
  if (isStaticSite) return `learn/${moduleId}/${conceptId}.html`;
  return `/learn/${moduleId}/${conceptId}`;
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
  const isCorrect = normalizeAnswer(answerInput.value) === normalizeAnswer(lesson.answer);

  if (isCourseAttack) {
    checkCourseAnswer(isCorrect);
    return;
  }
  if (isCorrect) {
    const attemptPenalty = Math.max(0, currentAttempts - 1) * 15;
    const noHintBonus = currentHintUsed ? 0 : 25;
    const earnedXp = Math.max(40, 100 + noHintBonus - attemptPenalty);
    sessionXp += earnedXp;
    sessionCorrect += 1;
    feedback.textContent = `CORRECT  +${earnedXp} XP`;
    feedback.className = "training-feedback correct-text";
    finishPracticeQuestion(true);
    return;
  }

  feedback.textContent = "TRY AGAIN — 自分で修正してみよう";
  feedback.className = "training-feedback wrong-text";
  hintButton.disabled = false;
  if (currentAttempts >= 3) showAnswerButton.classList.remove("hidden");
  answerInput.focus();
}

function checkCourseAnswer(isCorrect) {
  const course = scoreCourses[activeCourseId];
  if (isCorrect) {
    courseCorrect += 1;
    courseCombo += 1;
    courseMaxCombo = Math.max(courseMaxCombo, courseCombo);
    const gainedScore = 100 * courseCombo;
    courseScore += gainedScore;
    courseEndTime += course.timeBonus * 1000;
    questionFinished = true;
    answerInput.disabled = true;
    feedback.textContent = `CORRECT  +${gainedScore.toLocaleString()} / +${course.timeBonus.toFixed(1)} SEC`;
    feedback.className = "training-feedback correct-text";
    document.getElementById("lesson-skill").textContent = courseScore.toLocaleString();
    document.getElementById("session-xp").textContent = `x${courseCombo}`;
    setTimeout(nextCourseQuestion, 240);
    return;
  }

  courseWrong += 1;
  courseCombo = 0;
  document.getElementById("session-xp").textContent = "x0";
  feedback.textContent = "TRY AGAIN — COMBO RESET";
  feedback.className = "training-feedback wrong-text";
  hintButton.disabled = false;
  if (currentAttempts >= 3) showAnswerButton.classList.remove("hidden");
  answerInput.focus();
}

function finishPracticeQuestion(wasCorrect) {
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
  if (isCourseAttack) {
    questionFinished = true;
    answerInput.disabled = true;
    setTimeout(nextCourseQuestion, 900);
  } else {
    finishPracticeQuestion(false);
  }
}

function goToNextLesson() {
  lessonIndex += 1;
  if (lessonIndex < sessionLessons.length) showQuestion();
  else completePracticeSession();
}

function nextCourseQuestion() {
  if (!isCourseAttack) return;
  lessonIndex += 1;
  showQuestion();
}

function setCompleteLabels(first, second, third, fourth) {
  document.getElementById("complete-label-one").textContent = first;
  document.getElementById("complete-label-two").textContent = second;
  document.getElementById("complete-label-three").textContent = third;
  document.getElementById("complete-label-four").textContent = fourth;
}

function completePracticeSession() {
  saveSessionProgress();
  lessonScreen.classList.add("hidden");
  completeScreen.classList.remove("hidden");
  document.getElementById("complete-course").classList.add("hidden");
  document.getElementById("complete-eyebrow").textContent = "TRAINING COMPLETE";
  setCompleteLabels("ACCURACY", "ATTEMPTS", "HINTS", "SKILL XP");
  const accuracy = sessionAttempts === 0 ? 0 : Math.round((sessionCorrect / sessionAttempts) * 100);
  document.getElementById("complete-accuracy").textContent = `${accuracy}%`;
  document.getElementById("complete-attempts").textContent = sessionAttempts;
  document.getElementById("complete-hints").textContent = sessionHints;
  document.getElementById("complete-xp").textContent = sessionXp;
}

function finishCourseAttack() {
  if (!isCourseAttack) return;
  stopCourseTimer();
  isCourseAttack = false;
  questionFinished = true;
  answerInput.disabled = true;
  lessonScreen.classList.add("hidden");
  completeScreen.classList.remove("hidden");
  document.getElementById("complete-course").classList.remove("hidden");
  document.getElementById("complete-eyebrow").textContent = "SCORE ATTACK COMPLETE";
  setCompleteLabels("ACCURACY", "CORRECT", "MAX COMBO", "COURSE SCORE");
  const accuracy = sessionAttempts === 0 ? 0 : Math.round((courseCorrect / sessionAttempts) * 100);
  document.getElementById("complete-accuracy").textContent = `${accuracy}%`;
  document.getElementById("complete-attempts").textContent = courseCorrect;
  document.getElementById("complete-hints").textContent = courseMaxCombo;
  document.getElementById("complete-xp").textContent = courseScore.toLocaleString();
  saveCourseResult();
  showCourseResult();
}

function saveCourseResult() {
  const results = getCourseResults();
  const oldResult = results[activeCourseId] || { bestScore: 0, plays: 0, maxCombo: 0 };
  results[activeCourseId] = {
    bestScore: Math.max(oldResult.bestScore, courseScore),
    plays: oldResult.plays + 1,
    maxCombo: Math.max(oldResult.maxCombo, courseMaxCombo)
  };
  localStorage.setItem(courseResultsKey, JSON.stringify(results));
}

function showCourseResult() {
  const course = scoreCourses[activeCourseId];
  const difference = courseScore - course.target;
  const percentage = Math.min(100, Math.round((courseScore / course.target) * 100));
  document.getElementById("complete-course-name").textContent = course.name;
  document.getElementById("complete-course-status").textContent = `${courseScore.toLocaleString()} / ${course.target.toLocaleString()}`;
  document.getElementById("complete-course-bar").style.width = `${percentage}%`;
  document.getElementById("complete-course-message").textContent = difference >= 0
    ? `COURSE CLEAR  +${difference.toLocaleString()} SCORE`
    : `あと ${Math.abs(difference).toLocaleString()}点でコースクリア`;
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
  localStorage.setItem(progressStorageKey, JSON.stringify(progress));
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
document.getElementById("challenge-button").addEventListener("click", () => beginPracticeSession("mixed", true));
document.getElementById("train-again-button").addEventListener("click", () => {
  stopCourseTimer();
  isCourseAttack = false;
  completeScreen.classList.add("hidden");
  skillScreen.classList.remove("hidden");
  renderCourseCards();
  renderSkillMap();
});
