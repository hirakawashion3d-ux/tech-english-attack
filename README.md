# TECH ENGLISH ATTACK

技術英語を読み、Pythonコードを実際に入力して覚えるローカル学習アプリです。完成したゲームとして遊びながら、ユーザー本人がPythonを手打ちして拡張できる小さな構造を優先しています。

## 起動方法（Windows）

```bash
cd C:\Users\HirakawaShion\tech_english_attack
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

起動後、ブラウザで [http://127.0.0.1:5000](http://127.0.0.1:5000) を開きます。

## 学習モード

- **WORD ATTACK** — 技術英単語の60秒4択ゲーム。
- **SENTENCE MODE** — 短い技術英文の意味を読む60秒4択ゲーム。
- **SPRINT / MARATHON** — 30秒または120秒のスコアアタック。
- **REVIEW MODE** — 直前に間違えた単語・英文を再出題。
- **PYTHON TRAINING** — 5問ずつ実際にPythonを入力する練習。
- **CHALLENGE MODE** — 5つのSkillと問題形式を混ぜた10問の実力確認。

すべてのSkillは最初から選択できます。レッスンのロックや強制順序はありません。

## Python Training

Python Trainingは、答えを眺める教材ではなく、英語を読む → Pythonを考える → 入力する → 間違いを修正する、を短時間で反復する練習場です。

- **TYPE** — 表示されたコードを正確に入力する。
- **FILL** — `___` に入る値や演算子、キーワードを入力する。
- **PREDICT** — コードを読み、実行結果を入力する。
- **FIX** — Syntax Errorや変数名、インデントを自分で修正する。
- **BUILD** — 完成コードを見ず、日本語または短い英語の指示からコードを作る。

1回目の不正解では `TRY AGAIN` のみを表示します。その後は英単語の短いHINTを利用でき、3回目から `SHOW ANSWER` を選べます。正解後には短いExplanationを表示します。textarea内でTabを押すと4スペースのインデントが入ります。

### Skill Map

以下の5カテゴリを自由に練習できます。

- `VARIABLES`
- `IF`
- `FOR`
- `FUNCTIONS`
- `LISTS`

各SkillにはTYPE / FILL / PREDICT / FIX / BUILDを2問ずつ、合計10問用意しています。全体では50問です。

### XP・星・Progress

正解は基本100 XPです。ヒントなしならボーナスが付き、複数回試した場合も最低40 XPを獲得できます。学習を罰ゲームにしないため、失敗してもXPがマイナスになることはありません。

星はSkillごとの過去Accuracyから計算します。未プレイは `☆☆☆☆☆`、Accuracy 0〜39%は★、40〜59%は★★、60〜74%は★★★、75〜89%は★★★★、90%以上は★★★★★です。

Progress画面ではTOTAL XP、TOTAL TRAINING、PYTHON ACCURACYと、Skillごとの星・Accuracyを確認できます。成績はブラウザのlocalStorageへ保存します。

### Challenge

5カテゴリから10問を選び、TYPE / FILL / PREDICT / FIX / BUILDを混ぜて出題します。Skillを順番にクリアするモードではなく、現在の実力を自由に試すモードです。

## GitHub Pages版

公開サイト：<https://hirakawashion3d-ux.github.io/tech-english-attack/>

GitHub PagesではPythonを実行できないため、次の流れで公開用データを作ります。

```text
python_lessons.py
        ↓
python build_site.py
        ↓
docs/static/python_lessons.json
        ↓
GitHub Pages
```

WORD問題は `questions.json`、Sentence問題は `sentences.json`、Python Training問題は `python_lessons.json` として `docs/static` へ出力されます。Pythonの問題データを変更したら、commit前に次を実行してください。

```bash
python build_site.py
```

## コードの読み方

1. `app.py` — ページとAPI route
2. `questions.py` / `sentence_questions.py` — 英語ゲームの問題
3. `python_lessons.py` — Python Trainingの50問
4. `templates/` — 画面のHTML
5. `static/training.js` — 5問セッション、入力判定、XP保存
6. `static/progress.js` — Accuracyと星の表示
7. `static/game.js` — 既存WORD/SENTENCEゲーム
8. `static/style.css` — ダークHUDデザイン
9. `build_site.py` — GitHub Pages用ファイルの生成

## Python学習ポイント

- **import**: `app.py` と `build_site.py` が `python_lessons.py` のlistを読み込みます。
- **list**: 50問を順番に保持し、条件に合う問題を新しいlistへ取り出します。
- **dictionary**: 各問題に `skill`、`type`、`instruction`、`answer`、`hint`、`explanation`、`difficulty` を保存します。
- **function**: `get_python_lessons()` がTraining問題をJSONで返します。
- **if**: `skill` や `type` が指定されたときだけ問題を絞り込みます。
- **for**: list内包表記で、各問題のSkillや形式を順番に確認します。
- **random**: `random.sample()` がAPIの問題順をランダムにします。
- **return**: route関数からHTMLまたはJSONを返します。

## Python Training問題の追加方法

`python_lessons.py` の `python_lessons` listへdictionaryを追加します。既存の1問を見本にして、以下のキーをすべて指定してください。

```python
{
    "skill": "variables",
    "type": "build",
    "instruction": "Create a variable called score and set it to 0.",
    "answer": "score = 0",
    "hint": "create = 作る / set = 設定する",
    "explanation": "scoreという変数に数値0を代入しています。",
    "difficulty": 1,
}
```

追加後は `python build_site.py` を実行すると、Flask版とGitHub Pages版へ同じ問題を反映できます。

## Sentence Modeで学べる英語

技術英文では最初に「何が（subject）」「どうする（verb）」を探します。`The function returns ...` ならsubjectは `The function`、verbは `returns` です。

- **returns / takes** — 戻り値を返す / 引数を受け取る
- **updates / removes / stores / checks** — 更新する / 削除する / 保存する / 確認する
- **exists** — 存在する。`does not exist` は存在しない
- **required / optional / deprecated** — 必須 / 任意 / 非推奨
- **if / when / until** — もし〜なら / 〜するとき / 〜するまで

## ユーザー本人が次にPythonで追加する課題

**新しく「WHILE」Skillを自分で追加する。**

`python_lessons.py`へwhile問題を追加し、Skill一覧と `/api/python-lessons` の絞り込み対象にも `while` を加えてください。完成コードをコピーせず、まず既存の `for` Skillがどのファイルを通って表示されるか追ってみましょう。
