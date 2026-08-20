"""TECH ENGLISH ATTACK の Flask アプリ本体。

このファイルは、ページを表示する役目と、問題をブラウザへ渡す役目を持ちます。
"""

import random

from flask import Flask, jsonify, render_template

from questions import questions


app = Flask(__name__)


@app.route("/")
def home():
    """Home 画面を表示する。"""
    return render_template("index.html")


@app.route("/game")
def game():
    """WORD MODE のゲーム画面を表示する。"""
    return render_template("game.html")


@app.route("/result")
def result():
    """ゲーム終了後の成績画面を表示する。"""
    return render_template("result.html")


@app.route("/api/questions")
def get_questions():
    """問題をランダムな順番でブラウザへ返す。

    random.sample は元の questions リストを変更せず、シャッフルした新しいリストを返す。
    """
    shuffled_questions = random.sample(questions, len(questions))
    return jsonify(shuffled_questions)


if __name__ == "__main__":
    # debug=True にすると、Python ファイルを保存した時にサーバーが自動で再起動する。
    app.run(debug=True)
