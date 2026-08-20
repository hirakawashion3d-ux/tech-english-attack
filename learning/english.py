"""Technical English concepts connected to Python code."""

english_modules = [
    {"id": "code-words", "title": "CODE WORDS"},
    {"id": "action-words", "title": "ACTION WORDS"},
    {"id": "error-words", "title": "ERROR WORDS"},
    {"id": "document-phrases", "title": "DOCUMENT PHRASES"},
    {"id": "python-sentences", "title": "PYTHON SENTENCES"},
]

WORDS = {
    "code-words": [("value", "値", "return value"), ("variable", "変数", "player_hp = 100"), ("function", "関数", "def update():"), ("argument", "引数", "print(score)"), ("parameter", "仮引数", "def move(speed):"), ("list", "リスト", "items = []"), ("index", "位置番号", "items[0]"), ("length", "長さ", "len(items)")],
    "action-words": [("return", "返す", "return score"), ("append", "追加する", "items.append(key)"), ("remove", "削除する", "items.remove(key)"), ("create", "作る", "enemy = {}"), ("update", "更新する", "update_player()"), ("check", "確認する", "if file_exists:"), ("store", "保存する", "score = 100"), ("execute", "実行する", "run_game()")],
    "error-words": [("invalid", "無効な", "invalid value"), ("missing", "不足している", "missing argument"), ("unexpected", "予期しない", "unexpected indent"), ("required", "必須の", "required parameter"), ("failed", "失敗した", "operation failed"), ("cannot", "できない", "cannot import"), ("not-found", "見つからない", "file not found"), ("out-of-range", "範囲外", "index out of range")],
    "document-phrases": [("returns-a-list", "リストを返す", "This function returns a list."), ("must-be-integer", "整数でなければならない", "The argument must be an integer."), ("returns-none", "見つからなければNone", "Returns None if the object is not found."), ("is-optional", "任意です", "This parameter is optional."), ("does-not-exist", "存在しない", "The file does not exist."), ("takes-two", "2つの引数を受け取る", "The function takes two arguments."), ("is-deprecated", "非推奨です", "This method is deprecated."), ("checks-whether", "〜かどうか確認する", "The program checks whether the file exists.")],
    "python-sentences": [("add-enemy", "敵をリストへ追加する", "Add the enemy to the list."), ("update-position", "位置を更新する", "Update the player's position."), ("create-variable", "変数を作る", "Create a variable called score."), ("return-score", "スコアを返す", "Return the current score."), ("remove-object", "オブジェクトを削除する", "Remove the object from the list."), ("open-file", "ファイルを開く", "Open the file for reading."), ("loop-until", "条件が偽まで繰り返す", "Loop until the condition is false."), ("call-method", "メソッドを呼ぶ", "Call the update method.")],
}


def make_english_concepts():
    concepts = []
    for module in english_modules:
        for index, (concept_id, meaning, example) in enumerate(WORDS[module["id"]]):
            word = concept_id.replace("-", " ")
            concepts.append({
                "id": f"{module['id']}-{concept_id}", "module": "english", "english_module": module["id"],
                "module_title": module["title"], "number": index + 1,
                "title": word.upper(), "summary": f"{word} は技術文書で「{meaning}」を表します。",
                "example": example, "explanation": f"コードや文書の中で {word} を見つけ、動作や条件を読み取ります。",
                "output": meaning, "why": "技術英語を動作とコードに結び付けると、ドキュメントを単語の暗記だけでなく処理として読めます。",
                "mistake": "一般英語の意味だけで決めず、関数・引数・戻り値のどれを説明しているか確認します。",
                "bad_code": "", "game_example": example,
                "english": [{"word": word, "meaning": meaning}], "try_code": example,
                "practice_skill": "variables", "minutes": 2, "type": "english",
            })
    return concepts


english_concepts = make_english_concepts()
