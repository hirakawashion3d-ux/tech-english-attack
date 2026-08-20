const skillNames = {
  variables: "VARIABLES",
  if: "IF",
  for: "FOR",
  functions: "FUNCTIONS",
  lists: "LISTS"
};
const scoreCourses = [
  { id: "3000", name: "3,000 SCORE COURSE", target: 3000 },
  { id: "5000", name: "5,000 SCORE COURSE", target: 5000 },
  { id: "10000", name: "10,000 SCORE COURSE", target: 10000 }
];
const progressStorageKey = "techEnglishPythonProgress";
const courseResultsKey = "techEnglishCourseResults";

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch (error) {
    return fallback;
  }
}

function getAccuracy(skillData) {
  if (!skillData || skillData.attempts === 0) return 0;
  return Math.round((skillData.correct / skillData.attempts) * 100);
}

function getStars(skillData) {
  if (!skillData || skillData.attempts === 0) return "☆☆☆☆☆";
  const accuracy = getAccuracy(skillData);
  const filled = accuracy >= 90 ? 5 : accuracy >= 75 ? 4 : accuracy >= 60 ? 3 : accuracy >= 40 ? 2 : 1;
  return "★".repeat(filled) + "☆".repeat(5 - filled);
}

const progress = readStorage(progressStorageKey, { totalXp: 0, totalTraining: 0, skills: {} });
const courseResults = readStorage(courseResultsKey, {});
document.getElementById("total-xp").textContent = progress.totalXp;
document.getElementById("total-training").textContent = progress.totalTraining;

let totalCorrect = 0;
let totalAttempts = 0;
Object.values(progress.skills).forEach((skillData) => {
  totalCorrect += skillData.correct;
  totalAttempts += skillData.attempts;
});
const totalAccuracy = totalAttempts === 0 ? 0 : Math.round((totalCorrect / totalAttempts) * 100);
document.getElementById("python-accuracy").textContent = `${totalAccuracy}%`;

const courseList = document.getElementById("progress-courses");
scoreCourses.forEach((course) => {
  const result = courseResults[course.id] || { bestScore: 0, plays: 0, maxCombo: 0 };
  const percentage = Math.min(100, Math.round((result.bestScore / course.target) * 100));
  const card = document.createElement("article");
  card.className = "course-card";
  if (result.bestScore >= course.target) card.classList.add("achieved");
  card.innerHTML = `
    <span>${result.bestScore >= course.target ? "COURSE CLEAR" : `${result.plays} PLAYS / MAX COMBO ${result.maxCombo}`}</span>
    <strong>${course.name}</strong>
    <div class="course-progress-track"><span style="width:${percentage}%"></span></div>
    <small>BEST ${result.bestScore.toLocaleString()} / TARGET ${course.target.toLocaleString()}</small>`;
  courseList.appendChild(card);
});

const skillList = document.getElementById("progress-skills");
Object.keys(skillNames).forEach((skill) => {
  const skillData = progress.skills[skill];
  const row = document.createElement("article");
  row.className = "progress-skill-row";
  row.innerHTML = `<div><strong>${skillNames[skill]}</strong><span>${skillData ? skillData.xp : 0} XP</span></div><p>${getStars(skillData)}</p><strong>${getAccuracy(skillData)}%</strong>`;
  skillList.appendChild(row);
});
