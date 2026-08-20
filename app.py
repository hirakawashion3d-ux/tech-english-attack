"""TECH ENGLISH ATTACK Flask application."""

import random

from flask import Flask, jsonify, render_template

from questions import questions

app = Flask(__name__)


@app.route("/")
def home():
    """Show the home page."""
    return render_template("index.html")


@app.route("/game")
def game():
    """Show the game page."""
    return render_template("game.html")


@app.route("/result")
def result():
    """Show the result page."""
    return render_template("result.html")


@app.route("/api/questions")
def get_questions():
    """Return questions in a random order without changing the original list."""
    shuffled_questions = random.sample(questions, len(questions))
    return jsonify(shuffled_questions)


if __name__ == "__main__":
    app.run(debug=True)
