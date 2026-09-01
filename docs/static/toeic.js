const toeicProgressKey = "techEnglishToeicProgress";
const isStaticToeic = window.location.pathname.includes(".html");
const toeicRoot = isStaticToeic ? window.location.pathname.split("/toeic/")[0] + "/" : "/";
const toeicDataUrl = isStaticToeic ? toeicRoot + "static/toeic.json" : "/api/toeic";
let toeicData = null;

function toeicIndexUrl() {
  return isStaticToeic ? toeicRoot + "toeic/index.html" : "/toeic";
}

function toeicLessonUrl(lessonId) {
  return isStaticToeic ? toeicRoot + `toeic/${lessonId}.html` : `/toeic/${lessonId}`;
}

function getToeicProgress() {
  const emptyProgress = { completed: [], steps: {}, interpretations: {}, lastLesson: null };
  try {
    return { ...emptyProgress, ...(JSON.parse(localStorage.getItem(toeicProgressKey)) || {}) };
  } catch (error) {
    return emptyProgress;
  }
}

function saveToeicProgress(progress) {
  localStorage.setItem(toeicProgressKey, JSON.stringify(progress));
}

function currentLessonId() {
  const marker = "/toeic/";
  if (!window.location.pathname.includes(marker)) return "";
  let route = window.location.pathname.split(marker)[1].replace(/\.html$/, "");
  if (route === "index") route = "";
  return route;
}

async function startToeic() {
  document.getElementById("toeic-index-link").href = toeicIndexUrl();
  const response = await fetch(toeicDataUrl);
  if (!response.ok) throw new Error("TOEIC data could not be loaded");
  toeicData = await response.json();
  const lessonId = currentLessonId();
  if (lessonId) renderLesson(lessonId);
  else renderDashboard();
}

function renderDashboard() {
  const progress = getToeicProgress();
  const completedCount = progress.completed.length;
  const totalCount = toeicData.lessons.length;
  const percent = Math.round((completedCount / totalCount) * 100);
  const lastLesson = toeicData.lessons.find((lesson) => lesson.id === progress.lastLesson);
  const continueLesson = lastLesson || toeicData.lessons.find((lesson) => !progress.completed.includes(lesson.id)) || toeicData.lessons[0];
  const monthCards = toeicData.months.map((month) => {
    const lessons = toeicData.lessons.filter((lesson) => lesson.month === month.month);
    const monthCompleted = lessons.filter((lesson) => progress.completed.includes(lesson.id)).length;
    const lessonLinks = lessons.map((lesson) => {
      const status = progress.completed.includes(lesson.id) ? "COMPLETE" : (progress.steps[lesson.id] ? `STEP ${progress.steps[lesson.id]}` : "NEW");
      return `<a href="${toeicLessonUrl(lesson.id)}"><span>WEEK ${String(lesson.week).padStart(2, "0")}</span><strong>${escapeText(lesson.sentence)}</strong><small>${status}</small></a>`;
    }).join("");
    return `<details class="toeic-month-card" ${month.month === 1 && completedCount === 0 ? "open" : ""}>
      <summary><span>MONTH ${String(month.month).padStart(2, "0")}</span><div><strong>${month.title}</strong><small>${monthCompleted} / ${lessons.length} COMPLETE</small></div></summary>
      <p>${month.goal}</p><div class="toeic-week-list">${lessonLinks}</div>
    </details>`;
  }).join("");

  document.getElementById("toeic-content").innerHTML = `
    <section class="toeic-goal-hero">
      <p class="eyebrow">ONE YEAR READING GOAL</p>
      <h1><span>${toeicData.goal.start_score}</span><b>→</b>${toeicData.goal.target_score}</h1>
      <p>短い英文を分解し、自分で意味を作り、最後は英語の順番で場面を思い浮かべます。</p>
      <div class="toeic-goal-stats"><div><strong>${toeicData.goal.months}</strong><span>MONTHS</span></div><div><strong>${totalCount}</strong><span>LESSONS</span></div><div><strong>${completedCount}</strong><span>COMPLETE</span></div></div>
      <div class="toeic-progress-track"><span style="width:${percent}%"></span></div><small>${percent}% / 週4回を目安に、同じ英文を何度も見返して構いません。</small>
    </section>
    <a class="toeic-continue" href="${toeicLessonUrl(continueLesson.id)}"><span>CONTINUE</span><strong>${escapeText(continueLesson.sentence)}</strong><b>START →</b></a>
    <section class="toeic-method"><p class="section-label">EVERY LESSON / 4 STEPS</p><div><span>01</span><strong>EXAMPLE</strong><small>まず英文を見る</small></div><div><span>02</span><strong>BREAK DOWN</strong><small>単語とかたまり</small></div><div><span>03</span><strong>YOUR JAPANESE</strong><small>自分で解釈する</small></div><div><span>04</span><strong>ENGLISH IMAGE</strong><small>英文で場面を描く</small></div></section>
    <section class="toeic-months">${monthCards}</section>
    <p class="toeic-course-note">このコースは500点から600点を目指す読解練習です。スコア到達を保証するものではありません。公式問題集の演習と組み合わせて使ってください。</p>`;
}

function renderLesson(lessonId) {
  const lesson = toeicData.lessons.find((item) => item.id === lessonId);
  if (!lesson) {
    document.getElementById("toeic-content").innerHTML = `<h1 class="learn-module-title">NOT FOUND</h1><a class="back-link" href="${toeicIndexUrl()}">← COURSE</a>`;
    return;
  }
  const progress = getToeicProgress();
  const savedStep = Math.max(1, progress.steps[lesson.id] || 1);
  const month = toeicData.months.find((item) => item.month === lesson.month);
  const lessonIndex = toeicData.lessons.indexOf(lesson);
  const previous = toeicData.lessons[lessonIndex - 1];
  const next = toeicData.lessons[lessonIndex + 1];
  progress.lastLesson = lesson.id;
  progress.steps[lesson.id] = savedStep;
  saveToeicProgress(progress);

  const chunks = lesson.chunks.map((chunk, index) => `<div class="toeic-chunk"><span>${String(index + 1).padStart(2, "0")} / ${escapeText(chunk.role)}</span><strong>${escapeText(chunk.text)}</strong><p>${escapeText(chunk.meaning)}</p></div>`).join("");
  const stepLabels = ["EXAMPLE", "BREAK DOWN", "YOUR JAPANESE", "ENGLISH IMAGE"].map((label, index) => `<span class="${savedStep >= index + 1 ? "active" : ""}">${String(index + 1).padStart(2, "0")} ${label}</span>`).join("");
  const savedInterpretation = progress.interpretations[lesson.id] || "";
  const isComplete = progress.completed.includes(lesson.id);

  document.getElementById("toeic-content").innerHTML = `
    <article class="toeic-lesson">
      <header class="toeic-lesson-title"><p class="eyebrow">MONTH ${String(lesson.month).padStart(2, "0")} / WEEK ${String(lesson.week).padStart(2, "0")} / ${escapeText(month.title)}</p><h1>READ IN<br><span>ENGLISH</span></h1><p>${escapeText(month.goal)}</p></header>
      <nav class="toeic-step-nav">${stepLabels}</nav>
      <section class="toeic-study-step example-step">
        <p class="section-label">01 / EXAMPLE</p><h2 class="toeic-sentence">${escapeText(lesson.sentence)}</h2>
        <p class="toeic-instruction">まだ訳を見ず、知っている単語と「誰が・どうする」を探します。</p>
        <button id="show-breakdown" class="learn-run-button" type="button">単語に分けて見る →</button>
      </section>
      <section id="breakdown-step" class="toeic-study-step ${savedStep >= 2 ? "" : "hidden"}">
        <p class="section-label">02 / BREAK DOWN</p><h2>単語とかたまりを順番に読む</h2><div class="toeic-chunks">${chunks}</div>
        <div class="toeic-reading-point"><strong>READING POINT</strong><p>${escapeText(lesson.point)}</p></div>
        <button id="show-interpretation" class="learn-run-button" type="button">自分で日本語にする →</button>
      </section>
      <section id="interpretation-step" class="toeic-study-step ${savedStep >= 3 ? "" : "hidden"}">
        <p class="section-label">03 / YOUR JAPANESE</p><h2>自分の言葉で意味を書く</h2>
        <p class="toeic-instruction">直訳でなくても構いません。「この文は何を伝えているか」を日本語で書いてください。</p>
        <textarea id="toeic-interpretation" rows="4" placeholder="ここに自分の解釈を入力">${escapeText(savedInterpretation)}</textarea>
        <button id="show-answer" class="learn-run-button" type="button">保存して解釈例を見る →</button>
        <div id="model-answer" class="toeic-model-answer ${savedStep >= 4 ? "" : "hidden"}"><span>INTERPRETATION EXAMPLE</span><p>${escapeText(lesson.translation)}</p><small>言葉が完全一致しなくても、主語・動作・対象・時や条件が合っていればOKです。</small></div>
      </section>
      <section id="image-step" class="toeic-study-step image-step ${savedStep >= 4 ? "" : "hidden"}">
        <p class="section-label">04 / ENGLISH IMAGE</p><p class="toeic-instruction">日本語訳を閉じ、英文の語順のまま一つの場面を頭に描きます。</p>
        <h2 class="toeic-sentence final-sentence">${escapeText(lesson.sentence)}</h2>
        <div class="toeic-scene"><span>SCENE</span><p>${escapeText(lesson.image)}</p></div>
        <button id="complete-lesson" class="start-button small" type="button">${isComplete ? "COMPLETED ✓" : "この英文をイメージできた →"}</button>
      </section>
      <nav class="concept-navigation"><a class="${previous ? "" : "disabled"}" href="${previous ? toeicLessonUrl(previous.id) : "#"}">← PREVIOUS</a><a href="${toeicIndexUrl()}">12 MONTHS</a><a class="${next ? "" : "disabled"}" href="${next ? toeicLessonUrl(next.id) : "#"}">NEXT →</a></nav>
    </article>`;
  bindLessonActions(lesson, next);
}

function bindLessonActions(lesson, next) {
  document.getElementById("show-breakdown").addEventListener("click", () => revealStep(lesson, 2, "breakdown-step"));
  document.getElementById("show-interpretation").addEventListener("click", () => revealStep(lesson, 3, "interpretation-step"));
  document.getElementById("show-answer").addEventListener("click", () => {
    const value = document.getElementById("toeic-interpretation").value.trim();
    const progress = getToeicProgress();
    progress.interpretations[lesson.id] = value;
    saveToeicProgress(progress);
    revealStep(lesson, 4, "model-answer");
    document.getElementById("image-step").classList.remove("hidden");
  });
  document.getElementById("complete-lesson").addEventListener("click", (event) => {
    const progress = getToeicProgress();
    if (!progress.completed.includes(lesson.id)) progress.completed.push(lesson.id);
    progress.steps[lesson.id] = 4;
    progress.lastLesson = next ? next.id : lesson.id;
    saveToeicProgress(progress);
    event.currentTarget.textContent = "COMPLETED ✓";
    if (next) window.setTimeout(() => { window.location.href = toeicLessonUrl(next.id); }, 450);
  });
}

function revealStep(lesson, step, elementId) {
  const progress = getToeicProgress();
  progress.steps[lesson.id] = Math.max(progress.steps[lesson.id] || 1, step);
  saveToeicProgress(progress);
  const element = document.getElementById(elementId);
  element.classList.remove("hidden");
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function escapeText(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

startToeic().catch(() => {
  document.getElementById("toeic-content").innerHTML = '<p class="load-error">TOEIC COURSE DATA COULD NOT BE LOADED</p>';
});
