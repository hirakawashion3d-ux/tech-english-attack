const skillNames = {
  variables: "VARIABLES",
  if: "IF",
  for: "FOR",
  functions: "FUNCTIONS",
  lists: "LISTS"
};
const storageKey = "techEnglishPythonProgress";

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || { totalXp: 0, totalTraining: 0, skills: {} };
  } catch (error) {
    return { totalXp: 0, totalTraining: 0, skills: {} };
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

const progress = getProgress();
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

const skillList = document.getElementById("progress-skills");
Object.keys(skillNames).forEach((skill) => {
  const skillData = progress.skills[skill];
  const row = document.createElement("article");
  row.className = "progress-skill-row";
  row.innerHTML = `<div><strong>${skillNames[skill]}</strong><span>${skillData ? skillData.xp : 0} XP</span></div><p>${getStars(skillData)}</p><strong>${getAccuracy(skillData)}%</strong>`;
  skillList.appendChild(row);
});
