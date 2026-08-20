"""Practice data for Python Training.

Edit this list, run ``python build_site.py``, and the same lessons will be
available in both Flask and GitHub Pages.
"""

python_lessons = [
    # VARIABLES
    {
        "skill": "variables", "type": "type",
        "instruction": "表示されたコードをそのまま入力してください。",
        "code": "player_x = 100", "answer": "player_x = 100",
        "hint": "player_x は変数名、= は代入です。",
        "explanation": "player_xという変数に数値100を代入しています。", "difficulty": 1,
    },
    {
        "skill": "variables", "type": "fill",
        "instruction": "scoreを0で初期化してください。", "code": "score = ___", "answer": "0",
        "hint": "initialize = 初期化する", "explanation": "数値0を代入して初期値を決めます。", "difficulty": 1,
    },
    {
        "skill": "variables", "type": "predict",
        "instruction": "What will be printed?", "code": "score = 10\nscore = score + 5\nprint(score)", "answer": "15",
        "hint": "printed = 表示される", "explanation": "10に5を足した値がscoreへ入り、15が表示されます。", "difficulty": 1,
    },
    {
        "skill": "variables", "type": "fix",
        "instruction": "文字列の引用符を修正してください。", "code": "player_name = Hero", "answer": "player_name = \"Hero\"",
        "hint": "文字列は引用符で囲みます。", "explanation": "Pythonの文字列はダブルクォートまたはシングルクォートで囲みます。", "difficulty": 1,
    },
    {
        "skill": "variables", "type": "build",
        "instruction": "Create a variable called score and set it to 0.", "answer": "score = 0",
        "hint": "create = 作る / set = 設定する", "explanation": "scoreという変数に数値0を代入しています。", "difficulty": 1,
    },
    {
        "skill": "variables", "type": "type",
        "instruction": "表示されたコードをそのまま入力してください。", "code": "player_score += 100", "answer": "player_score += 100",
        "hint": "+= は加算して同じ変数へ戻します。", "explanation": "+= は現在の値に加算し、同じ変数へ代入します。", "difficulty": 2,
    },
    {
        "skill": "variables", "type": "fill",
        "instruction": "livesを1減らしてください。", "code": "lives ___ 1", "answer": "-=",
        "hint": "decrease = 減らす", "explanation": "-= は値を減らして同じ変数へ戻す演算子です。", "difficulty": 2,
    },
    {
        "skill": "variables", "type": "predict",
        "instruction": "What is the output?", "code": "speed = 4\nspeed *= 2\nprint(speed)", "answer": "8",
        "hint": "*= 2 は2倍にします。", "explanation": "4に2を掛けた8が表示されます。", "difficulty": 2,
    },
    {
        "skill": "variables", "type": "fix",
        "instruction": "変数名の間違いを修正してください。", "code": "score = 50\nprint(socre)", "answer": "score = 50\nprint(score)",
        "hint": "1行目と2行目の変数名を比べます。", "explanation": "変数名は同じ綴りで参照する必要があります。", "difficulty": 2,
    },
    {
        "skill": "variables", "type": "build",
        "instruction": "Increase the player's score by 100.", "answer": "player_score += 100",
        "hint": "increase = 増やす / score = 得点", "explanation": "+= を使うと加算と再代入を短く書けます。", "difficulty": 2,
    },

    # IF
    {
        "skill": "if", "type": "type", "instruction": "表示された条件分岐を入力してください。",
        "code": "if score >= 100:\n    print(\"CLEAR\")", "answer": "if score >= 100:\n    print(\"CLEAR\")",
        "hint": "コロンと4つのスペースに注目します。", "explanation": "条件が真のとき、インデントされた処理を実行します。", "difficulty": 1,
    },
    {
        "skill": "if", "type": "fill", "instruction": "scoreが100以上になる演算子を入力してください。",
        "code": "if score ___ 100:", "answer": ">=", "hint": "以上 = greater than or equal to",
        "explanation": ">= は左の値が右の値以上かを調べます。", "difficulty": 1,
    },
    {
        "skill": "if", "type": "predict", "instruction": "What will be printed?",
        "code": "lives = 0\nif lives == 0:\n    print(\"GAME OVER\")", "answer": "GAME OVER",
        "hint": "== は値が等しいかを調べます。", "explanation": "livesは0なので条件が真になります。", "difficulty": 1,
    },
    {
        "skill": "if", "type": "fix", "instruction": "Syntax Errorを修正してください。",
        "code": "if score > 10\n    print(\"CLEAR\")", "answer": "if score > 10:\n    print(\"CLEAR\")",
        "hint": "if文の行末を確認します。", "explanation": "ifの条件の後ろにはコロンが必要です。", "difficulty": 1,
    },
    {
        "skill": "if", "type": "build", "instruction": "scoreが100以上ならCLEARと表示してください。",
        "answer": "if score >= 100:\n    print(\"CLEAR\")", "hint": "以上は >= / 表示は print()",
        "explanation": "if文の中は4つのスペースでインデントします。", "difficulty": 2,
    },
    {
        "skill": "if", "type": "type", "instruction": "表示されたif/elseを入力してください。",
        "code": "if hp > 0:\n    print(\"ALIVE\")\nelse:\n    print(\"DEAD\")", "answer": "if hp > 0:\n    print(\"ALIVE\")\nelse:\n    print(\"DEAD\")",
        "hint": "elseにもコロンが必要です。", "explanation": "条件が偽の場合はelse側を実行します。", "difficulty": 2,
    },
    {
        "skill": "if", "type": "fill", "instruction": "modeがplayと等しいか比較してください。",
        "code": "if mode ___ \"play\":", "answer": "==", "hint": "代入は =、比較は == です。",
        "explanation": "== は左右の値が等しいかを比較します。", "difficulty": 1,
    },
    {
        "skill": "if", "type": "predict", "instruction": "What is the output?",
        "code": "speed = 3\nif speed <= 5:\n    print(\"SLOW\")\nelse:\n    print(\"FAST\")", "answer": "SLOW",
        "hint": "<= は以下です。", "explanation": "3は5以下なのでSLOWが表示されます。", "difficulty": 2,
    },
    {
        "skill": "if", "type": "fix", "instruction": "比較演算子を修正してください。",
        "code": "if score = 100:\n    print(\"MAX\")", "answer": "if score == 100:\n    print(\"MAX\")",
        "hint": "値の比較には記号を2つ使います。", "explanation": "ifの比較には=ではなく==を使います。", "difficulty": 1,
    },
    {
        "skill": "if", "type": "build", "instruction": "If lives is 0, print GAME OVER.",
        "answer": "if lives == 0:\n    print(\"GAME OVER\")", "hint": "is 0 = 0と等しい / print = 表示する",
        "explanation": "==で値を比較し、真の場合だけ文字列を表示します。", "difficulty": 2,
    },

    # FOR
    {
        "skill": "for", "type": "type", "instruction": "表示されたループを入力してください。",
        "code": "for i in range(3):\n    print(i)", "answer": "for i in range(3):\n    print(i)",
        "hint": "range(3)は0, 1, 2を作ります。", "explanation": "forは値を1つずつ取り出して処理します。", "difficulty": 1,
    },
    {
        "skill": "for", "type": "fill", "instruction": "5回繰り返すrangeを書いてください。",
        "code": "for i in ___:\n    print(i)", "answer": "range(5)", "hint": "rangeに繰り返し回数を渡します。",
        "explanation": "range(5)は0から4までの5個の数を作ります。", "difficulty": 1,
    },
    {
        "skill": "for", "type": "predict", "instruction": "How many times is HIT printed?",
        "code": "for i in range(4):\n    print(\"HIT\")", "answer": "4",
        "hint": "range(4)の要素数を考えます。", "explanation": "ループは4回実行されます。", "difficulty": 1,
    },
    {
        "skill": "for", "type": "fix", "instruction": "for文のSyntax Errorを修正してください。",
        "code": "for i in range(3)\n    print(i)", "answer": "for i in range(3):\n    print(i)",
        "hint": "for文の行末を確認します。", "explanation": "for文のヘッダー末尾にはコロンが必要です。", "difficulty": 1,
    },
    {
        "skill": "for", "type": "build", "instruction": "Print the numbers from 0 to 2 with a for loop.",
        "answer": "for i in range(3):\n    print(i)", "hint": "from 0 to 2 = 0から2 / range(3)",
        "explanation": "range(3)を順番に取り出して表示します。", "difficulty": 2,
    },
    {
        "skill": "for", "type": "type", "instruction": "リストを読むループを入力してください。",
        "code": "for enemy in enemies:\n    print(enemy)", "answer": "for enemy in enemies:\n    print(enemy)",
        "hint": "enemyには要素が1つずつ入ります。", "explanation": "リストの全要素を順番に処理できます。", "difficulty": 2,
    },
    {
        "skill": "for", "type": "fill", "instruction": "1から3までの数を作ってください。",
        "code": "for number in ___:\n    print(number)", "answer": "range(1, 4)", "hint": "rangeの終了値は含まれません。",
        "explanation": "range(1, 4)は1, 2, 3を作ります。", "difficulty": 2,
    },
    {
        "skill": "for", "type": "predict", "instruction": "What is the final value of total?",
        "code": "total = 0\nfor number in range(3):\n    total += number\nprint(total)", "answer": "3",
        "hint": "0 + 1 + 2 を計算します。", "explanation": "range(3)の0、1、2を足すため合計は3です。", "difficulty": 2,
    },
    {
        "skill": "for", "type": "fix", "instruction": "インデントを修正してください。",
        "code": "for item in items:\nprint(item)", "answer": "for item in items:\n    print(item)",
        "hint": "ループ内の行を4スペース下げます。", "explanation": "繰り返す処理はfor文の内側にインデントします。", "difficulty": 1,
    },
    {
        "skill": "for", "type": "build", "instruction": "Print every item in the items list.",
        "answer": "for item in items:\n    print(item)", "hint": "every item = すべての要素 / in = ～の中の",
        "explanation": "forを使ってitemsから要素を1つずつ取得します。", "difficulty": 2,
    },

    # FUNCTIONS
    {
        "skill": "functions", "type": "type", "instruction": "表示された関数を入力してください。",
        "code": "def greet():\n    print(\"HELLO\")", "answer": "def greet():\n    print(\"HELLO\")",
        "hint": "defで関数を定義します。", "explanation": "defの後に関数名と丸括弧を書きます。", "difficulty": 1,
    },
    {
        "skill": "functions", "type": "fill", "instruction": "関数定義を始めるキーワードを入力してください。",
        "code": "___ greet():\n    print(\"HELLO\")", "answer": "def", "hint": "define = 定義する",
        "explanation": "Pythonではdefキーワードで関数を定義します。", "difficulty": 1,
    },
    {
        "skill": "functions", "type": "predict", "instruction": "What will be printed?",
        "code": "def add(a, b):\n    return a + b\n\nprint(add(2, 3))", "answer": "5",
        "hint": "returnは計算結果を呼び出し元へ返します。", "explanation": "2と3を足した5がreturnされます。", "difficulty": 2,
    },
    {
        "skill": "functions", "type": "fix", "instruction": "関数定義のSyntax Errorを修正してください。",
        "code": "def greet()\n    print(\"HELLO\")", "answer": "def greet():\n    print(\"HELLO\")",
        "hint": "関数定義の行末を確認します。", "explanation": "def行の末尾にはコロンが必要です。", "difficulty": 1,
    },
    {
        "skill": "functions", "type": "build", "instruction": "Create a function called greet that prints HELLO.",
        "answer": "def greet():\n    print(\"HELLO\")", "hint": "create a function = 関数を作る / called = ～という名前の",
        "explanation": "処理を関数にまとめると何度でも呼び出せます。", "difficulty": 2,
    },
    {
        "skill": "functions", "type": "type", "instruction": "引数を持つ関数を入力してください。",
        "code": "def double(number):\n    return number * 2", "answer": "def double(number):\n    return number * 2",
        "hint": "numberが引数です。", "explanation": "引数で受け取った値を2倍して返します。", "difficulty": 2,
    },
    {
        "skill": "functions", "type": "fill", "instruction": "計算結果を返すキーワードを入力してください。",
        "code": "def get_score():\n    ___ 100", "answer": "return", "hint": "return = 返す",
        "explanation": "returnで関数の結果を呼び出し元へ返します。", "difficulty": 1,
    },
    {
        "skill": "functions", "type": "predict", "instruction": "What is the output?",
        "code": "def welcome(name):\n    return \"Hello \" + name\n\nprint(welcome(\"Mia\"))", "answer": "Hello Mia",
        "hint": "2つの文字列を+でつなぎます。", "explanation": "Hello と引数Miaを連結した文字列が表示されます。", "difficulty": 2,
    },
    {
        "skill": "functions", "type": "fix", "instruction": "関数呼び出しを修正してください。",
        "code": "def jump():\n    print(\"JUMP\")\n\njump", "answer": "def jump():\n    print(\"JUMP\")\n\njump()",
        "hint": "関数を呼び出すときも丸括弧が必要です。", "explanation": "関数名の後ろに()を書いて呼び出します。", "difficulty": 2,
    },
    {
        "skill": "functions", "type": "build", "instruction": "Create a function add that returns a + b.",
        "answer": "def add(a, b):\n    return a + b", "hint": "returns = 返す / a and b are arguments",
        "explanation": "2つの引数を受け取り、その合計を返す関数です。", "difficulty": 2,
    },

    # LISTS
    {
        "skill": "lists", "type": "type", "instruction": "表示されたリストを入力してください。",
        "code": "items = [\"key\", \"potion\"]", "answer": "items = [\"key\", \"potion\"]",
        "hint": "リストは角括弧で囲みます。", "explanation": "リストには複数の値を順番に保存できます。", "difficulty": 1,
    },
    {
        "skill": "lists", "type": "fill", "instruction": "potionをリストに追加してください。",
        "code": "items.___(\"potion\")", "answer": "append", "hint": "append = 末尾に追加する",
        "explanation": "appendメソッドはリストの末尾に要素を追加します。", "difficulty": 1,
    },
    {
        "skill": "lists", "type": "predict", "instruction": "What will be printed?",
        "code": "colors = [\"red\", \"blue\", \"green\"]\nprint(colors[1])", "answer": "blue",
        "hint": "indexは0から始まります。", "explanation": "index 1は2番目の要素blueです。", "difficulty": 1,
    },
    {
        "skill": "lists", "type": "fix", "instruction": "リストの括弧を修正してください。",
        "code": "scores = (10, 20, 30]", "answer": "scores = [10, 20, 30]",
        "hint": "リストは左右とも角括弧です。", "explanation": "リストリテラルは[と]で囲みます。", "difficulty": 1,
    },
    {
        "skill": "lists", "type": "build", "instruction": "Create an empty list called enemies.",
        "answer": "enemies = []", "hint": "empty list = 空のリスト / called = ～という名前の",
        "explanation": "[]で要素を持たない空のリストを作れます。", "difficulty": 1,
    },
    {
        "skill": "lists", "type": "type", "instruction": "要素を削除するコードを入力してください。",
        "code": "items.remove(\"key\")", "answer": "items.remove(\"key\")",
        "hint": "remove = 削除する", "explanation": "removeは指定した値と一致する要素を削除します。", "difficulty": 2,
    },
    {
        "skill": "lists", "type": "fill", "instruction": "リストの要素数を取得してください。",
        "code": "item_count = ___(items)", "answer": "len", "hint": "length = 長さ",
        "explanation": "len関数はリストに含まれる要素数を返します。", "difficulty": 1,
    },
    {
        "skill": "lists", "type": "predict", "instruction": "What is the output?",
        "code": "items = [\"key\"]\nitems.append(\"coin\")\nprint(len(items))", "answer": "2",
        "hint": "追加後の要素数を数えます。", "explanation": "coinを追加したため要素数は2です。", "difficulty": 2,
    },
    {
        "skill": "lists", "type": "fix", "instruction": "最初の要素を表示するよう修正してください。",
        "code": "items = [\"key\", \"coin\"]\nprint(items[1])", "answer": "items = [\"key\", \"coin\"]\nprint(items[0])",
        "hint": "最初のindexは0です。", "explanation": "Pythonのindexは0から始まります。", "difficulty": 1,
    },
    {
        "skill": "lists", "type": "build", "instruction": "Add sword to the items list.",
        "answer": "items.append(\"sword\")", "hint": "add = 追加する / to the list = リストへ",
        "explanation": "appendを使って文字列swordを末尾へ追加します。", "difficulty": 2,
    },
]
