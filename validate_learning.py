"""Validate LEARN data before building or publishing the site."""

import ast

from learning import english_concepts, learning_modules, python_concepts

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

    if errors:
        raise ValueError("\n".join(errors))
    return {
        "python_concepts": len(python_concepts),
        "english_concepts": len(english_concepts),
        "modules": len(learning_modules),
    }


if __name__ == "__main__":
    print(validate_learning_data())
