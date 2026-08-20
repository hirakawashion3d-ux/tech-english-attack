"""TECH ENGLISH ATTACK Flask application."""

import random

from flask import Flask, jsonify, render_template, request

from questions import all_questions
from sentence_questions import sentence_questions

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/game")
def game():
    return render_template("game.html")


@app.route("/result")
def result():
    return render_template("result.html")


@app.route("/api/questions")
def get_questions():
    """Return a shuffled question list. level is Basic, Core, Advanced, or mixed."""
    level = request.args.get("level", "mixed")
    selected_questions = all_questions
    if level in ["basic", "core", "advanced"]:
        selected_questions = [question for question in all_questions if question["level"] == level]
    return jsonify(random.sample(selected_questions, len(selected_questions)))


@app.route("/api/sentences")
def get_sentences():
    """Return shuffled sentence questions for the selected level."""
    level = request.args.get("level", "mixed")
    selected_sentences = sentence_questions
    if level in ["basic", "core", "advanced"]:
        selected_sentences = [
            question for question in sentence_questions if question["level"] == level
        ]
    return jsonify(random.sample(selected_sentences, len(selected_sentences)))

if __name__ == "__main__":
    app.run(debug=True)
