"""Create the static files used by GitHub Pages."""

import json
import shutil
from pathlib import Path

from questions import all_questions

ROOT = Path(__file__).parent
DOCS = ROOT / "docs"


def make_static_html(template_name, output_name):
    """Copy one Flask template and replace only its URLs for static hosting."""
    html = (ROOT / "templates" / template_name).read_text(encoding="utf-8-sig")
    replacements = {
        "{{ url_for('static', filename='style.css') }}": "static/style.css",
        "{{ url_for('static', filename='game.js') }}": "static/game.js",
        "{{ url_for('home') }}": "index.html",
        "{{ url_for('game') }}": "game.html",
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

    javascript = (ROOT / "static" / "game.js").read_text(encoding="utf-8-sig")
    javascript = javascript.replace(
        'fetch("/api/questions?level=" + level)',
        'fetch("static/questions.json")',
    )
    javascript = javascript.replace('window.location.href = "/result"', 'window.location.href = "result.html"')
    (DOCS / "static" / "game.js").write_text(javascript, encoding="utf-8")
    (DOCS / "static" / "questions.json").write_text(json.dumps(all_questions, ensure_ascii=False), encoding="utf-8")

    make_static_html("index.html", "index.html")
    make_static_html("game.html", "game.html")
    make_static_html("result.html", "result.html")
    print("Created GitHub Pages files in docs/")


if __name__ == "__main__":
    build_site()


