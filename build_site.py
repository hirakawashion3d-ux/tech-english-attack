"""Create the static files used by GitHub Pages."""

import json
import shutil
from pathlib import Path

from questions import all_questions
from sentence_questions import sentence_questions
from python_lessons import python_lessons

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
        "{{ url_for('home') }}": "index.html",
        "{{ url_for('game') }}": "game.html",
        "{{ url_for('python_training') }}": "python-training.html",
        "{{ url_for('progress') }}": "progress.html",
    }
    for old_text, new_text in replacements.items():
        html = html.replace(old_text, new_text)
    (DOCS / output_name).write_text(html, encoding="utf-8")


def build_site():
    """Rebuild the docs folder after editing Python questions or frontend files."""
    if DOCS.exists():
        shutil.rmtree(DOCS)
    (DOCS / "static").mkdir(parents=True)
    shutil.copy2(ROOT / "static" / "style.css", DOCS / "static" / "style.css")
    shutil.copy2(ROOT / "static" / "training.js", DOCS / "static" / "training.js")
    shutil.copy2(ROOT / "static" / "progress.js", DOCS / "static" / "progress.js")

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

    make_static_html("index.html", "index.html")
    make_static_html("game.html", "game.html")
    make_static_html("result.html", "result.html")
    make_static_html("python_training.html", "python-training.html")
    make_static_html("progress.html", "progress.html")
    print("Created GitHub Pages files in docs/")


if __name__ == "__main__":
    build_site()


