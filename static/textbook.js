const textbookProgressKey = "techEnglishTextbookProgress";
const isStaticTextbook = window.location.pathname.includes(".html");
const textbookRoot = isStaticTextbook ? window.location.pathname.split("/textbook/")[0] + "/" : "/";
const textbookDataUrl = isStaticTextbook ? textbookRoot + "static/textbook.json" : "/api/textbook";
let textbookData = null;

function textbookUrl(level = "", lesson = "") {
  if (isStaticTextbook) {
    if (!level) return textbookRoot + "textbook/index.html";
    return textbookRoot + `textbook/${level}/${lesson ? lesson + ".html" : "index.html"}`;
  }
  return `/textbook${level ? "/" + level : ""}${lesson ? "/" + lesson : ""}`;
}

function getTextbookProgress() {
  const empty = { completed: [], steps: {}, interpretations: {}, last: null };
  try { return { ...empty, ...(JSON.parse(localStorage.getItem(textbookProgressKey)) || {}) }; }
  catch (error) { return empty; }
}

function saveTextbookProgress(progress) {
  localStorage.setItem(textbookProgressKey, JSON.stringify(progress));
}

function currentTextbookRoute() {
  const marker = "/textbook/";
  if (!window.location.pathname.includes(marker)) return { level: "", lesson: "" };
  let route = window.location.pathname.split(marker)[1].replace(/\.html$/, "").replace(/\/index$/, "");
  if (route === "index") route = "";
  const parts = route.split("/").filter(Boolean);
  return { level: parts[0] || "", lesson: parts[1] || "" };
}

async function startTextbook() {
  document.getElementById("textbook-index-link").href = textbookUrl();
  const response = await fetch(textbookDataUrl);
  if (!response.ok) throw new Error("Textbook data could not be loaded");
  textbookData = await response.json();
  const route = currentTextbookRoute();
  if (!route.level) renderTextbookIndex();
  else if (!route.lesson) renderTextbookLevel(route.level);
  else renderTextbookLesson(route.level, route.lesson);
}

function renderTextbookIndex() {
  const progress = getTextbookProgress();
  const cards = textbookData.levels.map((level) => {
    const lessons = textbookData.lessons.filter((lesson) => lesson.level === level.id);
    const complete = lessons.filter((lesson) => progress.completed.includes(lesson.id)).length;
    return `<a class="textbook-level-card level-${level.id}" href="${textbookUrl(level.id)}"><span>${level.number} / ${level.english_title}</span><strong>${level.title}</strong><p>${level.description}</p><small>${complete} / ${lessons.length} COMPLETE</small></a>`;
  }).join("");
  const lastLesson = textbookData.lessons.find((lesson) => lesson.id === progress.last);
  const continueCard = lastLesson ? `<a class="textbook-continue" href="${textbookUrl(lastLesson.level, lastLesson.id)}"><span>CONTINUE</span><strong>${lastLesson.title}</strong><b>→</b></a>` : "";
  document.getElementById("textbook-content").innerHTML = `
    <p class="eyebrow">START ENGLISH FROM ZERO</p><h1 class="textbook-title">ENGLISH<br><span>TEXTBOOK</span></h1>
    <p class="learn-lead">Theやisが分からなくても大丈夫。単語から始め、小学・中学・高校の順で英文を読めるようにします。</p>
    ${continueCard}<section class="textbook-level-grid">${cards}</section>
    <section class="textbook-study-flow"><p class="section-label">HOW TO STUDY</p><div><b>1</b><span>WORDS</span><small>先に単語</small></div><div><b>2</b><span>GRAMMAR</span><small>つながり</small></div><div><b>3</b><span>EXAMPLE</span><small>例文</small></div><div><b>4</b><span>YOUR JAPANESE</span><small>自分で解釈</small></div><div><b>5</b><span>ENGLISH IMAGE</span><small>英語で場面</small></div></section>`;
}

function renderTextbookLevel(levelId) {
  const level = textbookData.levels.find((item) => item.id === levelId);
  if (!level) return renderTextbookNotFound();
  const progress = getTextbookProgress();
  const lessons = textbookData.lessons.filter((lesson) => lesson.level === levelId);
  const rows = lessons.map((lesson) => `<a class="textbook-lesson-row" href="${textbookUrl(levelId, lesson.id)}"><span>${String(lesson.number).padStart(2, "0")}</span><div><strong>${lesson.title}</strong><small>${lesson.example}</small></div><b>${progress.completed.includes(lesson.id) ? "COMPLETE" : (progress.steps[lesson.id] ? `STEP ${progress.steps[lesson.id]}` : "NEW")}</b></a>`).join("");
  document.getElementById("textbook-content").innerHTML = `<p class="eyebrow">${level.number} / ${level.english_title}</p><h1 class="textbook-level-title">${level.title}</h1><p class="learn-lead">${level.description}</p><div class="module-progress-line"><strong>${lessons.filter((lesson) => progress.completed.includes(lesson.id)).length} / ${lessons.length}</strong><span>LESSONS COMPLETE</span></div><section class="textbook-lesson-list">${rows}</section>`;
}

function renderTextbookLesson(levelId, lessonId) {
  const level = textbookData.levels.find((item) => item.id === levelId);
  const levelLessons = textbookData.lessons.filter((item) => item.level === levelId);
  const lesson = levelLessons.find((item) => item.id === lessonId);
  if (!level || !lesson) return renderTextbookNotFound();
  const progress = getTextbookProgress();
  const step = Math.max(1, progress.steps[lesson.id] || 1);
  progress.steps[lesson.id] = step;
  progress.last = lesson.id;
  saveTextbookProgress(progress);
  const index = levelLessons.indexOf(lesson);
  const previous = levelLessons[index - 1];
  const next = levelLessons[index + 1];
  const wordCards = lesson.words.map((item) => `<div><strong>${escapeTextbook(item.word)}</strong><span>${escapeTextbook(item.meaning)}</span></div>`).join("");
  const chunks = lesson.chunks.map((item) => `<div class="textbook-chunk"><strong>${escapeTextbook(item.text)}</strong><span>${escapeTextbook(item.meaning)}</span><small>${escapeTextbook(item.job)}</small></div>`).join("");
  const savedText = progress.interpretations[lesson.id] || "";
  document.getElementById("textbook-content").innerHTML = `<article class="textbook-lesson">
    <header><p class="eyebrow">${level.title} / LESSON ${String(lesson.number).padStart(2, "0")}</p><h1>${lesson.title}</h1></header>
    <section class="textbook-section"><p class="section-label">01 / WORDS</p><h2>まず単語を知る</h2><div class="textbook-words">${wordCards}</div><button id="show-grammar" class="learn-run-button" type="button">単語を確認した →</button></section>
    <section id="textbook-grammar" class="textbook-section ${step >= 2 ? "" : "hidden"}"><p class="section-label">02 / GRAMMAR & CONNECTION</p><h2>単語がどうつながる？</h2><p class="textbook-explanation">${escapeTextbook(lesson.grammar)}</p><button id="show-example" class="learn-run-button" type="button">例文で見る →</button></section>
    <section id="textbook-example" class="textbook-section ${step >= 3 ? "" : "hidden"}"><p class="section-label">03 / EXAMPLE</p><h2 class="toeic-sentence">${escapeTextbook(lesson.example)}</h2><p class="toeic-instruction">まだ答えを見ず、知っている単語と文の中心を探します。</p><button id="show-breakdown" class="learn-run-button" type="button">文を分解する →</button></section>
    <section id="textbook-breakdown" class="textbook-section ${step >= 4 ? "" : "hidden"}"><p class="section-label">04 / BREAK DOWN</p><div class="textbook-chunks">${chunks}</div><button id="show-your-japanese" class="learn-run-button" type="button">自分で日本語にする →</button></section>
    <section id="textbook-japanese" class="textbook-section ${step >= 5 ? "" : "hidden"}"><p class="section-label">05 / YOUR JAPANESE</p><h2>自分の言葉で意味を書く</h2><textarea id="textbook-interpretation" rows="4" placeholder="この英文は何を伝えている？">${escapeTextbook(savedText)}</textarea><button id="show-textbook-answer" class="learn-run-button" type="button">保存して解釈例を見る →</button><div id="textbook-answer" class="toeic-model-answer ${step >= 6 ? "" : "hidden"}"><span>INTERPRETATION EXAMPLE</span><p>${escapeTextbook(lesson.translation)}</p></div></section>
    <section id="textbook-image" class="textbook-section textbook-image ${step >= 6 ? "" : "hidden"}"><p class="section-label">06 / ENGLISH IMAGE</p><h2 class="toeic-sentence">${escapeTextbook(lesson.example)}</h2><div class="toeic-scene"><span>SCENE</span><p>${escapeTextbook(lesson.image)}</p></div><button id="complete-textbook" class="start-button small" type="button">${progress.completed.includes(lesson.id) ? "COMPLETED ✓" : "イメージできた →"}</button></section>
    <nav class="concept-navigation"><a class="${previous ? "" : "disabled"}" href="${previous ? textbookUrl(levelId, previous.id) : "#"}">← PREVIOUS</a><a href="${textbookUrl(levelId)}">${level.title}</a><a class="${next ? "" : "disabled"}" href="${next ? textbookUrl(levelId, next.id) : "#"}">NEXT →</a></nav>
  </article>`;
  bindTextbookActions(lesson, next);
}

function bindTextbookActions(lesson, next) {
  [["show-grammar", 2, "textbook-grammar"], ["show-example", 3, "textbook-example"], ["show-breakdown", 4, "textbook-breakdown"], ["show-your-japanese", 5, "textbook-japanese"]].forEach(([buttonId, step, sectionId]) => {
    document.getElementById(buttonId).addEventListener("click", () => revealTextbookStep(lesson, step, sectionId));
  });
  document.getElementById("show-textbook-answer").addEventListener("click", () => {
    const progress = getTextbookProgress();
    progress.interpretations[lesson.id] = document.getElementById("textbook-interpretation").value.trim();
    saveTextbookProgress(progress);
    revealTextbookStep(lesson, 6, "textbook-answer");
    document.getElementById("textbook-image").classList.remove("hidden");
  });
  document.getElementById("complete-textbook").addEventListener("click", (event) => {
    const progress = getTextbookProgress();
    if (!progress.completed.includes(lesson.id)) progress.completed.push(lesson.id);
    progress.steps[lesson.id] = 6;
    progress.last = next ? next.id : lesson.id;
    saveTextbookProgress(progress);
    event.currentTarget.textContent = "COMPLETED ✓";
    if (next) window.setTimeout(() => { window.location.href = textbookUrl(lesson.level, next.id); }, 450);
  });
}

function revealTextbookStep(lesson, step, sectionId) {
  const progress = getTextbookProgress();
  progress.steps[lesson.id] = Math.max(progress.steps[lesson.id] || 1, step);
  saveTextbookProgress(progress);
  const section = document.getElementById(sectionId);
  section.classList.remove("hidden");
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function escapeTextbook(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderTextbookNotFound() {
  document.getElementById("textbook-content").innerHTML = `<h1 class="learn-module-title">NOT FOUND</h1><a class="back-link" href="${textbookUrl()}">← TEXTBOOK</a>`;
}

startTextbook().catch(() => {
  document.getElementById("textbook-content").innerHTML = '<p class="load-error">TEXTBOOK DATA COULD NOT BE LOADED</p>';
});
