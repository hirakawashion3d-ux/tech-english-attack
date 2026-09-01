"""Validate LEARN data before building or publishing the site."""

import ast

from learning import english_concepts, learning_modules, python_concepts
from toeic_lessons import toeic_goal, toeic_lessons, toeic_months

REQUIRED_KEYS = {
    "id", "module", "title", "summary", "example", "explanation", "why",
    "mistake", "game_example", "english", "try_code", "practice_skill",
}


def validate_learning_data():
    module_ids = {module["id"] for module in learning_modules}
    page_ids = set()
    errors = []

    for concept in python_concepts:
        page_id = (concept["module"], concept["id"])
        if page_id in page_ids:
            errors.append(f"Duplicate page: {page_id}")
        page_ids.add(page_id)
        if concept["module"] not in module_ids:
            errors.append(f"Unknown module: {concept['module']}")
        missing_keys = REQUIRED_KEYS - concept.keys()
        if missing_keys:
            errors.append(f"{page_id} missing {sorted(missing_keys)}")
        if concept["id"] == "index":
            errors.append(f"Reserved static filename used: {page_id}")
        try:
            ast.parse(concept["example"])
        except SyntaxError as error:
            errors.append(f"Invalid example in {page_id}: {error.msg}")

    english_ids = [concept["id"] for concept in english_concepts]
    if len(english_ids) != len(set(english_ids)):
        errors.append("Duplicate English concept id")
    if len(python_concepts) < 100:
        errors.append("Python Concept count is below 100")

    toeic_ids = [lesson["id"] for lesson in toeic_lessons]
    if len(toeic_ids) != len(set(toeic_ids)):
        errors.append("Duplicate TOEIC lesson id")
    if len(toeic_months) != 12 or len(toeic_lessons) != 48:
        errors.append("TOEIC course must contain 12 months and 48 lessons")
    if toeic_goal["start_score"] != 0 or toeic_goal["target_scores"] != [500, 600]:
        errors.append("TOEIC goal must start at zero and target 500 or 600")
    for month in toeic_months:
        month_lessons = [lesson for lesson in toeic_lessons if lesson["month"] == month["month"]]
        if len(month_lessons) != 4:
            errors.append(f"TOEIC month {month['month']} must contain 4 lessons")
    for lesson in toeic_lessons:
        if not lesson["sentence"].endswith(".") or len(lesson["chunks"]) < 3:
            errors.append(f"Incomplete TOEIC lesson: {lesson['id']}")

    if errors:
        raise ValueError("\n".join(errors))
    return {
        "python_concepts": len(python_concepts),
        "english_concepts": len(english_concepts),
        "modules": len(learning_modules),
        "toeic_lessons": len(toeic_lessons),
    }


if __name__ == "__main__":
    print(validate_learning_data())
