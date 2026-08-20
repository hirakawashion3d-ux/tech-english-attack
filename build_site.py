"""Create the static files used by GitHub Pages."""

import json
import shutil
from pathlib import Path

from questions import all_questions
from sentence_questions import sentence_questions
from python_lessons import python_lessons
from learning import all_learning_concepts, english_modules, learning_modules

ROOT = Path(__file__).parent
DOCS = ROOT / "docs"


def make_static_html(template_name, output_name):
    """Copy one Flask template and replace only its URLs for static hosting."""
    html = (ROOT / "templates" / template_name).read_text(encoding="utf-8-sig")
    replacements = {
        "{{ url_for('static', filename='style.css') }}": "static/style.css",
        "{{ url_for('static', filename='game.js') }}": "static/game.js",
        "{{ url_for('static', filename='training.js') }}": "static/training.js",
        "{{ url_for('static', filename='progress.js') }}": "static/progress.js",
        "{{ url_for('static', filename='learn.js') }}": "static/learn.js",
        "{{ url_for('static', filename='glossary.js') }}": "static/glossary.js",
        "{{ url_for('home') }}": "index.html",
        "{{ url_for('game') }}": "game.html",
        "{{ url_for('python_training') }}": "python-training.html",
        "{{ url_for('progress') }}": "progress.html",
        "{{ url_for('learn', module_id='english') }}": "learn/english/index.html",
        "{{ url_for('learn') }}": "learn/index.html",
        "{{ url_for('glossary') }}": "glossary.html",
    }
    for old_text, new_text in replacements.items():
        html = html.replace(old_text, new_text)
    (DOCS / output_name).write_text(html, encoding="utf-8")


def write_learn_shell(output_path, prefix):
    """Write one static LEARN route backed by the shared learning JSON."""
    html = (ROOT / "templates" / "learn.html").read_text(encoding="utf-8-sig")
    html = html.replace("{{ url_for('static', filename='style.css') }}", prefix + "static/style.css")
    html = html.replace("{{ url_for('static', filename='learn.js') }}", prefix + "static/learn.js")
    html = html.replace("{{ url_for('home') }}", prefix + "index.html")
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(html, encoding="utf-8")


def build_learning_pages():
    write_learn_shell(DOCS / "learn" / "index.html", "../")
    for module in learning_modules:
        module_id = module["id"]
        write_learn_shell(DOCS / "learn" / module_id / "index.html", "../../")
        module_concepts = [item for item in all_learning_concepts if item["module"] == module_id]
        for concept in module_concepts:
            write_learn_shell(DOCS / "learn" / module_id / f"{concept['id']}.html", "../../")
    write_learn_shell(DOCS / "learn" / "english" / "index.html", "../../")
    for concept in [item for item in all_learning_concepts if item["module"] == "english"]:
        write_learn_shell(DOCS / "learn" / "english" / f"{concept['id']}.html", "../../")


def build_site():
    """Rebuild the docs folder after editing Python questions or frontend files."""
    if DOCS.exists():
        shutil.rmtree(DOCS)
    (DOCS / "static").mkdir(parents=True)
    shutil.copy2(ROOT / "static" / "style.css", DOCS / "static" / "style.css")
    shutil.copy2(ROOT / "static" / "training.js", DOCS / "static" / "training.js")
    shutil.copy2(ROOT / "static" / "progress.js", DOCS / "static" / "progress.js")
    shutil.copy2(ROOT / "static" / "learn.js", DOCS / "static" / "learn.js")
    shutil.copy2(ROOT / "static" / "glossary.js", DOCS / "static" / "glossary.js")

    javascript = (ROOT / "static" / "game.js").read_text(encoding="utf-8-sig")
    javascript = javascript.replace('"/api/questions?level=" + level', '"static/questions.json"')
    javascript = javascript.replace('"/api/sentences?level=" + level', '"static/sentences.json"')
    javascript = javascript.replace('window.location.href = "/result"', 'window.location.href = "result.html"')
    (DOCS / "static" / "game.js").write_text(javascript, encoding="utf-8")
    (DOCS / "static" / "questions.json").write_text(json.dumps(all_questions, ensure_ascii=False), encoding="utf-8")
    (DOCS / "static" / "sentences.json").write_text(
        json.dumps(sentence_questions, ensure_ascii=False), encoding="utf-8"
    )
    (DOCS / "static" / "python_lessons.json").write_text(
        json.dumps(python_lessons, ensure_ascii=False), encoding="utf-8"
    )
    learning_data = {
        "modules": learning_modules,
        "english_modules": english_modules,
        "concepts": all_learning_concepts,
    }
    (DOCS / "static" / "learning.json").write_text(
        json.dumps(learning_data, ensure_ascii=False), encoding="utf-8"
    )

    make_static_html("index.html", "index.html")
    make_static_html("game.html", "game.html")
    make_static_html("result.html", "result.html")
    make_static_html("python_training.html", "python-training.html")
    make_static_html("progress.html", "progress.html")
    make_static_html("glossary.html", "glossary.html")
    build_learning_pages()
    print("Created GitHub Pages files in docs/")


if __name__ == "__main__":
    build_site()


