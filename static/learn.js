const learnProgressKey = "techEnglishLearnProgress";
const isStaticLearn = window.location.pathname.includes(".html");
const learnRoot = isStaticLearn ? window.location.pathname.split("/learn/")[0] + "/" : "/";
const learningDataUrl = isStaticLearn ? learnRoot + "static/learning.json" : "/api/learning";
let learningData = null;

function learnUrl(moduleId, conceptId = "") {
  if (isStaticLearn) return learnRoot + `learn/${moduleId}/${conceptId ? conceptId + ".html" : "index.html"}`;
  return `/learn/${moduleId}${conceptId ? "/" + conceptId : ""}`;
}
function learnIndexUrl() { return isStaticLearn ? learnRoot + "learn/index.html" : "/learn"; }
function glossaryUrl() { return isStaticLearn ? learnRoot + "glossary.html" : "/glossary"; }

function getLearnProgress() {
  try { return JSON.parse(localStorage.getItem(learnProgressKey)) || { states: {}, bookmarks: [], last: null }; }
  catch (error) { return { states: {}, bookmarks: [], last: null }; }
}
function saveLearnProgress(progress) { localStorage.setItem(learnProgressKey, JSON.stringify(progress)); }
function conceptKey(concept) { return `${concept.module}/${concept.id}`; }
function getState(concept) { return getLearnProgress().states[conceptKey(concept)] || "NEW"; }
function setState(concept, state) {
  const progress = getLearnProgress();
  const order = ["NEW", "READ", "TRIED", "PRACTICED", "MASTERED"];
  const oldState = progress.states[conceptKey(concept)] || "NEW";
  if (order.indexOf(state) > order.indexOf(oldState)) progress.states[conceptKey(concept)] = state;
  progress.last = { module: concept.module, concept: concept.id, title: concept.title, moduleTitle: concept.module_title, minutes: concept.minutes };
  saveLearnProgress(progress);
}

function currentRoute() {
  const marker = "/learn/";
  if (!window.location.pathname.includes(marker)) return { moduleId: "", conceptId: "" };
  let route = window.location.pathname.split(marker)[1].replace(/\.html$/, "");
  route = route.replace(/\/index$/, "");
  if (route === "index") route = "";
  const parts = route.split("/").filter(Boolean);
  return { moduleId: parts[0] || "", conceptId: parts[1] || "" };
}

async function startLearn() {
  document.getElementById("learn-index-link").href = learnIndexUrl();
  document.getElementById("learn-english-link").href = learnUrl("english");
  document.getElementById("glossary-link").href = glossaryUrl();
  const response = await fetch(learningDataUrl);
  learningData = await response.json();
  const route = currentRoute();
  if (!route.moduleId) renderCourseIndex();
  else if (!route.conceptId) renderModule(route.moduleId);
  else renderConcept(route.moduleId, route.conceptId);
}

function renderCourseIndex() {
  const content = document.getElementById("learn-content");
  const cards = learningData.modules.map((module) => {
    const concepts = learningData.concepts.filter((item) => item.module === module.id);
    const readCount = concepts.filter((item) => getState(item) !== "NEW").length;
    return `<a class="learn-module-card" href="${learnUrl(module.id)}"><span>${module.number}</span><div><strong>${module.title}</strong><p>${module.description}</p></div><small>${readCount} / ${concepts.length} READ</small></a>`;
  }).join("");
  const bookmarkKeys = getLearnProgress().bookmarks;
  const savedConcepts = learningData.concepts.filter((concept) => bookmarkKeys.includes(conceptKey(concept)));
  const review = savedConcepts.length ? `<section class="my-review-panel"><p class="section-label">MY REVIEW / SAVED</p>${savedConcepts.map((concept) => `<a href="${learnUrl(concept.module, concept.id)}"><strong>${concept.title}</strong><span>${concept.module_title}</span></a>`).join("")}</section>` : "";
  content.innerHTML = `<p class="eyebrow">UNDERSTAND BEFORE YOU PRACTICE</p><h1 class="learn-main-title">PYTHON<br><span>COURSE</span></h1><p class="learn-lead">知らないConceptを短い説明・コード・視覚化で理解します。すべて最初から開けます。</p>${review}<section class="learn-module-list">${cards}<a class="learn-module-card english-learn-card" href="${learnUrl("english")}"><span>EN</span><div><strong>TECH ENGLISH</strong><p>Pythonと技術文書を読むための英語。</p></div><small>${learningData.concepts.filter((item) => item.module === "english").length} CONCEPTS</small></a></section>`;
}

function renderModule(moduleId) {
  if (moduleId === "english") { renderEnglishIndex(); return; }
  const module = learningData.modules.find((item) => item.id === moduleId);
  const concepts = learningData.concepts.filter((item) => item.module === moduleId);
  if (!module) { renderNotFound(); return; }
  const rows = concepts.map((concept) => `<a class="learn-concept-row" href="${learnUrl(moduleId, concept.id)}"><span>${String(concept.number).padStart(2, "0")}</span><strong>${concept.title}</strong><small class="state-${getState(concept).toLowerCase()}">${getState(concept)}</small></a>`).join("");
  document.getElementById("learn-content").innerHTML = `<p class="eyebrow">${module.number} / ${module.title}</p><h1 class="learn-module-title">${module.title}</h1><p class="learn-lead">${module.description}</p><div class="module-progress-line"><strong>${concepts.filter((item) => getState(item) !== "NEW").length} / ${concepts.length}</strong><span>CONCEPTS READ</span></div><section class="learn-concept-list">${rows}</section>`;
}

function renderEnglishIndex() {
  const groups = learningData.english_modules.map((module, index) => {
    const concepts = learningData.concepts.filter((item) => item.module === "english" && item.english_module === module.id);
    const links = concepts.map((concept) => `<a class="learn-concept-row" href="${learnUrl("english", concept.id)}"><span>${String(concept.number).padStart(2, "0")}</span><strong>${concept.title}</strong><small>${getState(concept)}</small></a>`).join("");
    return `<section class="english-group"><p class="section-label">0${index + 1} ${module.title}</p>${links}</section>`;
  }).join("");
  document.getElementById("learn-content").innerHTML = `<p class="eyebrow">PYTHON × TECHNICAL ENGLISH</p><h1 class="learn-module-title">TECH ENGLISH</h1><p class="learn-lead">一般英会話ではなく、コード・Error・ドキュメントを読むための英語です。</p>${groups}`;
}

function renderConcept(moduleId, conceptId) {
  const concepts = learningData.concepts.filter((item) => item.module === moduleId);
  const concept = concepts.find((item) => item.id === conceptId);
  if (!concept) { renderNotFound(); return; }
  setState(concept, "READ");
  const index = concepts.indexOf(concept);
  const previous = concepts[index - 1];
  const next = concepts[index + 1];
  const english = concept.english.map((item) => `<div><strong>${item.word}</strong><span>${item.meaning}</span></div>`).join("");
  const isBookmarked = getLearnProgress().bookmarks.includes(conceptKey(concept));
  const projectSection = concept.type === "project" ? `<section class="learn-section"><p class="section-label">PROJECT STEPS</p><h2>小さく組み立てる</h2><ol class="step-list"><li>必要な変数を作る。</li><li>値を変更する処理を書く。</li><li>print()で途中の値を確認する。</li><li>ifやfunctionで処理を整理する。</li></ol><details><summary>FULL CODE</summary><pre class="learn-code"><code>${escapeHtml(concept.example)}</code></pre></details></section>` : "";
  const englishLearnSection = concept.type === "english" ? `<section class="learn-section"><p class="section-label">SEE IN CODE / SEE IN ENGLISH</p><pre class="learn-code"><code>${escapeHtml(concept.game_example)}</code></pre><h2>BREAK IT DOWN</h2><div class="concept-english">${english}</div><p class="learn-text">英文を「何が」「どうする」「何を」の短いまとまりに分け、Pythonの動作と結び付けます。</p></section>` : "";
  document.getElementById("learn-content").innerHTML = `
    <article class="concept-article">
      <header class="concept-title"><p class="eyebrow">${concept.module_title} / ${String(concept.number).padStart(2, "0")}</p><h1>${concept.title}</h1><button id="bookmark-button" class="learn-small-button" type="button">${isBookmarked ? "SAVED" : "★ SAVE"}</button></header>
      <section class="learn-section"><p class="section-label">WHAT IS IT?</p><p class="learn-text">${concept.summary}</p></section>
      <section class="learn-section"><p class="section-label">FIRST EXAMPLE</p><pre class="learn-code"><code>${escapeHtml(concept.example)}</code></pre><p class="learn-text">${concept.explanation}</p></section>
      <section class="learn-section"><p class="section-label">VISUAL EXPLANATION</p><div class="visual-value"><span>CODE</span><strong>→</strong><span>VALUE / ACTION</span></div></section>
      <section class="learn-section"><p class="section-label">HOW PYTHON READS IT</p><div class="python-reading"><div><strong>NAME / KEYWORD</strong><span>何を扱うか</span></div><div><strong>OPERATOR</strong><span>何をするか</span></div><div><strong>VALUE / BLOCK</strong><span>使う値や処理</span></div></div></section>
      <section class="learn-section"><p class="section-label">RUN IT / TRY IT</p><textarea id="learn-code-input" class="learn-code-input" rows="${concept.example.includes("\n") ? 6 : 4}" spellcheck="false">${escapeHtml(concept.try_code)}</textarea><button id="run-learn-code" class="learn-run-button" type="button">RUN</button><pre class="learn-output"><span>OUTPUT</span><code id="learn-output">RUNを押して確認</code></pre><p class="safe-run-note">安全なブラウザ内ミニ実行環境です。サーバーではコードを実行しません。</p></section>
      <section class="learn-section"><p class="section-label">STEP BY STEP</p><ol class="step-list"><li>Pythonがコードを上から読みます。</li><li>名前と現在の値を確認します。</li><li>右側の式や条件を処理します。</li><li>結果を保存するか、OUTPUTへ表示します。</li></ol></section>
      <section class="learn-section before-after"><div><span>BEFORE</span><code>実行前の値</code></div><strong>→</strong><div><span>AFTER</span><code>実行後の値</code></div></section>
      <section class="learn-section why-section"><p class="section-label">WHY?</p><h2>なぜ使うの？</h2><p class="learn-text">${concept.why}</p></section>
      <section class="learn-section mistake-section"><p class="section-label">COMMON MISTAKE</p><pre class="learn-code bad-code"><code>${escapeHtml(concept.bad_code || "綴りや記号を確認")}</code></pre><p class="learn-text">${concept.mistake}</p></section>
      <section class="learn-section"><p class="section-label">IN A GAME</p><pre class="learn-code"><code>${escapeHtml(concept.game_example)}</code></pre><p class="learn-text">HP、Score、敵、弾などの状態や動きを同じ考え方で作れます。</p></section>
      <section class="learn-section"><p class="section-label">TECH ENGLISH</p><div class="concept-english">${english}</div></section>
      ${englishLearnSection}
      ${projectSection}
      <section class="learn-finish"><button id="understood-button" class="learn-small-button" type="button">UNDERSTOOD</button><a class="start-button small" href="${practiceUrl(concept)}">PRACTICE THIS <span>→</span></a></section>
      <nav class="concept-navigation"><a class="${previous ? "" : "disabled"}" href="${previous ? learnUrl(moduleId, previous.id) : "#"}">← PREVIOUS</a><a href="${learnUrl(moduleId)}">MODULE</a><a class="${next ? "" : "disabled"}" href="${next ? learnUrl(moduleId, next.id) : "#"}">NEXT →</a></nav>
    </article>`;
  bindConceptActions(concept);
}

function practiceUrl(concept) {
  const base = isStaticLearn ? learnRoot + "python-training.html" : "/python-training";
  return `${base}?skill=${encodeURIComponent(concept.practice_skill)}&concept=${encodeURIComponent(concept.id)}&learn_module=${encodeURIComponent(concept.module)}`;
}

function bindConceptActions(concept) {
  document.getElementById("bookmark-button").addEventListener("click", (event) => {
    const progress = getLearnProgress();
    const key = conceptKey(concept);
    if (progress.bookmarks.includes(key)) progress.bookmarks = progress.bookmarks.filter((item) => item !== key);
    else progress.bookmarks.push(key);
    saveLearnProgress(progress);
    event.currentTarget.textContent = progress.bookmarks.includes(key) ? "SAVED" : "★ SAVE";
  });
  document.getElementById("understood-button").addEventListener("click", (event) => { setState(concept, "PRACTICED"); event.currentTarget.textContent = "PRACTICED"; });
  document.getElementById("run-learn-code").addEventListener("click", () => {
    document.getElementById("learn-output").textContent = simulatePython(document.getElementById("learn-code-input").value);
    setState(concept, "TRIED");
  });
}

function simulatePython(code) {
  const variables = {};
  const output = [];
  const lines = code.replace(/\r/g, "").split("\n");
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const printMatch = line.match(/^print\((.+)\)$/);
    if (printMatch) { output.push(readSimpleValue(printMatch[1], variables)); continue; }
    const updateMatch = line.match(/^([A-Za-z_]\w*)\s*([+\-])=\s*(-?\d+(?:\.\d+)?)$/);
    if (updateMatch && typeof variables[updateMatch[1]] === "number") {
      variables[updateMatch[1]] += (updateMatch[2] === "+" ? 1 : -1) * Number(updateMatch[3]); continue;
    }
    const assignMatch = line.match(/^([A-Za-z_]\w*)\s*=\s*(.+)$/);
    if (assignMatch) { variables[assignMatch[1]] = readSimpleValue(assignMatch[2], variables, true); continue; }
    if (/^(if|for|while|def|else|elif)\b/.test(line)) continue;
    return "この例はVisual Traceで確認し、PRACTICE THISで実行練習してください。";
  }
  if (output.length) return output.join("\n");
  const entries = Object.entries(variables);
  return entries.length ? entries.map(([name, value]) => `${name} = ${formatValue(value)}`).join("\n") : "実行できる代入またはprint()を入力してください。";
}

function readSimpleValue(text, variables, calculate = false) {
  const value = text.trim();
  if (/^["'].*["']$/.test(value)) return value.slice(1, -1);
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  if (value === "True") return true;
  if (value === "False") return false;
  if (value === "[]") return [];
  if (Object.prototype.hasOwnProperty.call(variables, value)) return variables[value];
  if (calculate) {
    const match = value.match(/^([A-Za-z_]\w*|-?\d+)\s*([+\-*\/])\s*([A-Za-z_]\w*|-?\d+)$/);
    if (match) {
      const left = Object.prototype.hasOwnProperty.call(variables, match[1]) ? variables[match[1]] : Number(match[1]);
      const right = Object.prototype.hasOwnProperty.call(variables, match[3]) ? variables[match[3]] : Number(match[3]);
      if (match[2] === "+") return left + right; if (match[2] === "-") return left - right;
      if (match[2] === "*") return left * right; if (match[2] === "/") return left / right;
    }
  }
  return value;
}
function formatValue(value) { return Array.isArray(value) ? "[]" : String(value); }
function escapeHtml(text) { return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function renderNotFound() { document.getElementById("learn-content").innerHTML = `<h1 class="learn-module-title">NOT FOUND</h1><a class="back-link" href="${learnIndexUrl()}">← PYTHON COURSE</a>`; }

startLearn().catch(() => { document.getElementById("learn-content").innerHTML = '<p class="load-error">LEARNING DATA COULD NOT BE LOADED</p>'; });
