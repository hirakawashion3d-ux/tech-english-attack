"""Python LEARN curriculum.

The short topic lists are intentionally plain Python data. Add one tuple to a
module to create another Flask page and GitHub Pages page.
"""

from .detailed_examples import DETAILED_EXAMPLES

learning_modules = [
    {"id": "start-python", "number": "00", "title": "START PYTHON", "description": "Pythonとプログラムをゼロから知る。", "practice_skill": "variables"},
    {"id": "variables", "number": "01", "title": "VARIABLES", "description": "値に名前を付けて保存する。", "practice_skill": "variables"},
    {"id": "numbers", "number": "02", "title": "NUMBERS", "description": "数値と計算を使う。", "practice_skill": "variables"},
    {"id": "strings", "number": "03", "title": "STRINGS", "description": "文字列とメッセージを扱う。", "practice_skill": "variables"},
    {"id": "boolean", "number": "04", "title": "BOOLEAN", "description": "TrueとFalseで状態を表す。", "practice_skill": "if"},
    {"id": "if", "number": "05", "title": "IF", "description": "条件によって処理を分ける。", "practice_skill": "if"},
    {"id": "lists", "number": "06", "title": "LISTS", "description": "複数の値を順番に管理する。", "practice_skill": "lists"},
    {"id": "for", "number": "07", "title": "FOR", "description": "同じ処理を繰り返す。", "practice_skill": "for"},
    {"id": "while", "number": "08", "title": "WHILE", "description": "条件がTrueの間、処理を続ける。", "practice_skill": "for"},
    {"id": "functions", "number": "09", "title": "FUNCTIONS", "description": "処理を名前付きでまとめる。", "practice_skill": "functions"},
    {"id": "dictionary", "number": "10", "title": "DICTIONARY", "description": "keyとvalueでデータを整理する。", "practice_skill": "lists"},
    {"id": "import", "number": "11", "title": "IMPORT & MODULES", "description": "別の機能やファイルを読み込む。", "practice_skill": "functions"},
    {"id": "debugging", "number": "12", "title": "ERRORS & DEBUGGING", "description": "エラーを読み、原因を見つける。", "practice_skill": "functions"},
    {"id": "game-logic", "number": "13", "title": "GAME LOGIC", "description": "Python基礎をゲームの動きへつなげる。", "practice_skill": "functions"},
    {"id": "mini-projects", "number": "14", "title": "MINI PROJECTS", "description": "小さなプログラムを段階的に組み立てる。", "practice_skill": "functions"},
]

TOPICS = {
    "start-python": [("what-is-python", "Pythonって何？"), ("what-is-program", "プログラムって何？"), ("top-to-bottom", "コードは上から動く"), ("print", "print()"), ("print-number", "数字を表示する"), ("print-text", "文字を表示する"), ("change-code", "コードを変更してみる"), ("errors-are-information", "Errorが出ても大丈夫"), ("comment", "コメント #"), ("first-program", "小さなプログラムを動かす")],
    "variables": [("what-is-variable", "変数って何？"), ("assignment", "= は何？"), ("store-number", "数字を保存"), ("store-string", "文字列を保存"), ("print-variable", "変数をprint"), ("update-value", "値を書き換える"), ("calculate-variables", "変数同士を計算"), ("plus-equals", "+="), ("minus-equals", "-="), ("naming", "名前の付け方"), ("snake-case", "snake_case"), ("game-variables", "ゲームで使う変数")],
    "numbers": [("int", "int"), ("float", "float"), ("addition", "+ 足し算"), ("subtraction", "- 引き算"), ("multiplication", "* 掛け算"), ("division", "/ 割り算"), ("floor-division", "// 整数の割り算"), ("remainder", "% 余り"), ("power", "** べき乗"), ("order", "計算順序"), ("comparison", "数値の比較"), ("coordinates", "座標"), ("speed", "speedで移動")],
    "strings": [("what-is-string", "文字列とは"), ("double-quotes", "ダブルクォート"), ("single-quotes", "シングルクォート"), ("store-string", "文字列を変数へ保存"), ("concatenate", "文字列を+でつなぐ"), ("f-string", "f-string"), ("length", "len()"), ("string-index", "文字列のindex"), ("game-message", "ゲームメッセージ")],
    "boolean": [("true", "True"), ("false", "False"), ("comparison", "比較からbooleanを作る"), ("equal", "=="), ("not-equal", "!="), ("greater", ">"), ("less", "<"), ("greater-equal", ">="), ("less-equal", "<="), ("game-state", "ゲーム状態")],
    "if": [("what-is-if", "ifとは"), ("condition", "条件とは"), ("colon", ": の役割"), ("indent", "インデント"), ("comparison", "ifと比較"), ("else", "else"), ("elif", "elif"), ("and", "and"), ("or", "or"), ("not", "not"), ("nested", "入れ子のif"), ("hp-check", "HP判定"), ("game-over", "Game Over判定")],
    "lists": [("what-is-list", "listとは"), ("brackets", "[]で作る"), ("list-index", "index"), ("append", "append"), ("remove", "remove"), ("length", "len()"), ("contains", "in"), ("update", "値を変更"), ("enemy-list", "敵のlist"), ("bullet-list", "弾のlist")],
    "for": [("what-is-loop", "繰り返しとは"), ("for", "for"), ("list-for", "list + for"), ("range", "range"), ("range-five", "range(5)"), ("start-stop", "start / stop"), ("counter", "counter"), ("for-if", "ifとの組み合わせ"), ("bullet-update", "弾を更新"), ("enemy-update", "敵を更新")],
    "while": [("while", "while"), ("while-true", "Trueの間"), ("counter", "counter"), ("break", "break"), ("infinite-loop", "無限ループ"), ("game-loop", "game loop")],
    "functions": [("what-is-function", "functionとは"), ("def", "def"), ("parentheses", "()"), ("call", "関数を呼ぶ"), ("parameter", "parameter"), ("argument", "argument"), ("return", "return"), ("multiple-parameters", "複数parameter"), ("return-value", "戻り値を変数へ"), ("organize-code", "コードをまとめる"), ("player-movement", "player movement"), ("damage", "damage function"), ("spawn", "spawn function")],
    "dictionary": [("what-is-dictionary", "dictionaryとは"), ("key", "key"), ("value", "value"), ("get", "値を取得"), ("update", "値を変更"), ("add", "keyを追加"), ("player-data", "player data"), ("question-data", "question data")],
    "import": [("import", "import"), ("module", "module"), ("standard-library", "standard library"), ("random", "random"), ("random-choice", "random.choice"), ("random-int", "random.randint"), ("another-file", "別ファイルをimport")],
    "debugging": [("what-is-error", "Errorとは"), ("syntax-error", "SyntaxError"), ("name-error", "NameError"), ("type-error", "TypeError"), ("index-error", "IndexError"), ("module-error", "ModuleNotFoundError"), ("traceback", "Traceback"), ("line-number", "行番号"), ("last-line", "最後の行を見る"), ("print-debug", "print debugging"), ("indent-error", "IndentationError"), ("typo", "よくあるtypo")],
    "game-logic": [("position", "position"), ("speed", "speed"), ("input", "inputの考え方"), ("update", "update"), ("enemy", "enemy"), ("bullet", "bullet"), ("list", "listで管理"), ("loop", "loopで更新"), ("screen-bounds", "画面外判定"), ("score", "score"), ("game-over", "game over"), ("function", "functionに分ける"), ("game-loop", "game loop")],
    "mini-projects": [("hp-system", "HP SYSTEM"), ("score-system", "SCORE SYSTEM"), ("number-guess", "NUMBER GUESS"), ("rock-paper-scissors", "ROCK PAPER SCISSORS"), ("enemy-spawn", "ENEMY SPAWN"), ("bullet-list", "BULLET LIST"), ("mini-game-loop", "MINI GAME LOOP")],
}

MODULE_EXAMPLES = {
    "start-python": ["print(\"Hello, Python!\")", "print(10)", "# This is a comment\nprint(\"START\")"],
    "variables": ["player_hp = 100\nprint(player_hp)", "score = 0\nscore += 100\nprint(score)", "player_name = \"Reimu\""],
    "numbers": ["speed = 5\nplayer_x = 100 + speed", "damage = 25 * 2\nprint(damage)", "remainder = 10 % 3\nprint(remainder)"],
    "strings": ["player_name = \"Reimu\"", "message = f\"Hello {player_name}\"\nprint(message)", "print(len(\"GAME\"))"],
    "boolean": ["is_alive = True", "is_game_over = player_hp <= 0", "has_key = key_count > 0"],
    "if": ["if player_hp <= 0:\n    print(\"GAME OVER\")", "if score >= 100:\n    print(\"CLEAR\")\nelse:\n    print(\"KEEP GOING\")", "if has_key and door_is_locked:\n    print(\"OPEN\")"],
    "lists": ["bullets = []\nbullets.append(\"bullet\")", "enemies = [\"slime\", \"bat\"]\nprint(enemies[0])", "items.remove(\"key\")"],
    "for": ["for enemy in enemies:\n    print(enemy)", "for number in range(5):\n    print(number)", "for bullet in bullets:\n    bullet_x += speed"],
    "while": ["running = True\nwhile running:\n    print(\"GAME RUNNING\")\n    break", "count = 0\nwhile count < 3:\n    count += 1"],
    "functions": ["def add_score(score, amount):\n    return score + amount", "def take_damage(hp, damage):\n    return hp - damage", "def spawn_enemy(enemies, enemy):\n    enemies.append(enemy)\n    return enemies"],
    "dictionary": ["player = {\"hp\": 100, \"speed\": 5}", "player[\"hp\"] = 80", "print(player[\"speed\"])"],
    "import": ["import random\nenemy_x = random.randint(0, 800)", "import random\nitem = random.choice(items)", "from questions import all_questions"],
    "debugging": ["print(player_hp)  # 値を確認", "items = []\nprint(items[0])  # IndexError", "print(score)  # NameErrorなら綴りを確認"],
    "game-logic": ["player_x += player_speed", "for bullet in bullets:\n    bullet[\"y\"] -= 5", "if player_hp <= 0:\n    running = False"],
    "mini-projects": ["player_hp = 100\ndamage = 20\nplayer_hp -= damage", "score = 0\nscore += 100", "while running:\n    update_game()"],
}

MODULE_EXAMPLES.update(DETAILED_EXAMPLES)


def make_concepts():
    """Expand the readable topic lists into complete concept dictionaries."""
    modules_by_id = {module["id"]: module for module in learning_modules}
    concepts = []
    for module_id, topics in TOPICS.items():
        module = modules_by_id[module_id]
        examples = MODULE_EXAMPLES[module_id]
        for index, (concept_id, title) in enumerate(topics):
            example = examples[index % len(examples)]
            concepts.append({
                "id": concept_id,
                "module": module_id,
                "module_title": module["title"],
                "number": index + 1,
                "title": title,
                "summary": f"{title}は、{module['description']}ために理解したい基本Conceptです。短いコードで動きを確かめます。",
                "example": example,
                "explanation": f"Pythonは上から順番に読み、{title}のルールに従って値や処理を扱います。名前・記号・値を分けて読むのがコツです。",
                "output": "コード内のprint()が、現在の値をOUTPUTへ表示します。",
                "why": f"{title}を使うと、コードの目的が分かりやすくなり、ゲームの処理を小さく整理できます。",
                "mistake": "記号の抜け、名前の綴り、引用符、コロン、インデントを1つずつ確認します。",
                "bad_code": example.replace(":", "", 1) if ":" in example else example.replace(" = ", "  ", 1),
                "game_example": example,
                "english": [
                    {"word": "value", "meaning": "値"},
                    {"word": "update", "meaning": "更新する"},
                    {"word": title.split()[0].lower(), "meaning": title},
                ],
                "try_code": example,
                "practice_skill": module["practice_skill"],
                "minutes": 3,
                "type": "project" if module_id == "mini-projects" else "python",
            })
    return concepts


python_concepts = make_concepts()
mini_projects = [concept for concept in python_concepts if concept["type"] == "project"]
