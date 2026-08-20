const staticGlossary = window.location.pathname.endsWith("glossary.html");
const glossaryDataUrl = staticGlossary ? "static/learning.json" : "/api/learning";
const learnBase = staticGlossary ? "learn" : "/learn";
let glossaryEntries = [];

function conceptLink(concept) {
  return staticGlossary ? `${learnBase}/${concept.module}/${concept.id}.html` : `${learnBase}/${concept.module}/${concept.id}`;
}

function makeGlossaryEntries(data) {
  const entries = [];
  data.concepts.forEach((concept) => {
    entries.push({ title: concept.title, meaning: concept.summary, code: concept.example, english: concept.english.map((item) => `${item.word}: ${item.meaning}`).join(" / "), related: concept.module_title, url: conceptLink(concept) });
    concept.english.forEach((term) => entries.push({ title: term.word.toUpperCase(), meaning: term.meaning, code: concept.example, english: concept.title, related: concept.module_title, url: conceptLink(concept) }));
  });
  const unique = new Map();
  entries.forEach((entry) => { if (!unique.has(entry.title.toLowerCase())) unique.set(entry.title.toLowerCase(), entry); });
  return [...unique.values()].sort((a, b) => a.title.localeCompare(b.title));
}

function renderGlossary(query = "") {
  const lowerQuery = query.trim().toLowerCase();
  const matches = glossaryEntries.filter((entry) => !lowerQuery || `${entry.title} ${entry.meaning} ${entry.english} ${entry.related}`.toLowerCase().includes(lowerQuery));
  document.getElementById("glossary-count").textContent = `${matches.length} ENTRIES`;
  document.getElementById("glossary-results").innerHTML = matches.slice(0, 100).map((entry) => `
    <a class="glossary-entry" href="${entry.url}"><strong>${entry.title}</strong><p>${entry.meaning}</p><pre><code>${escapeText(entry.code)}</code></pre><small>${entry.english} / RELATED: ${entry.related}</small></a>`).join("");
}

function escapeText(text) { return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

fetch(glossaryDataUrl).then((response) => response.json()).then((data) => {
  glossaryEntries = makeGlossaryEntries(data);
  renderGlossary();
  document.getElementById("glossary-search").addEventListener("input", (event) => renderGlossary(event.target.value));
}).catch(() => { document.getElementById("glossary-results").innerHTML = '<p class="load-error">GLOSSARY DATA COULD NOT BE LOADED</p>'; });
