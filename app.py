"""TECH ENGLISH ATTACK Flask application."""

import random

from flask import Flask, jsonify, render_template, request

from questions import all_questions
from sentence_questions import sentence_questions
from python_lessons import python_lessons

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


@app.route("/python-training")
def python_training():
    return render_template("python_training.html")


@app.route("/progress")
def progress():
    return render_template("progress.html")


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


@app.route("/api/python-lessons")
def get_python_lessons():
    """Return Python lessons filtered by skill and exercise type."""
    skill = request.args.get("skill")
    exercise_type = request.args.get("type")
    selected_lessons = python_lessons

    if skill in ["variables", "if", "for", "functions", "lists"]:
        selected_lessons = [lesson for lesson in selected_lessons if lesson["skill"] == skill]
    if exercise_type in ["type", "fill", "predict", "fix", "build"]:
        selected_lessons = [lesson for lesson in selected_lessons if lesson["type"] == exercise_type]

    return jsonify(random.sample(selected_lessons, len(selected_lessons)))

if __name__ == "__main__":
    app.run(debug=True)
