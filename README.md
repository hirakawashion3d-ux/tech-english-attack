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

## LEARN

LEARNはクイズではなく、知らないConceptを最初から理解する独立ページ群です。

- **LEARN** — 説明、コード、Visual、WHY、Mistake、Game Useを読んで理解する。
- **PRACTICE** — 既存Python Trainingで、ヒントを使いながらコードを繰り返し書く。
- **PLAYGROUND / RUN IT** — ブラウザ内の安全なミニ実行環境で値を変更して試す。
- **CHALLENGE** — ヒントに頼らず自力でできるか確認する。

`/learn` には15 Module、153 Python Concept、40 Tech English Conceptがあります。すべて最初から閲覧でき、Score・Accuracy・Combo・Timerは表示しません。

```text
/learn
/learn/variables
/learn/variables/assignment
```

Conceptを開くとlocalStorageへ最後のページと状態（NEW / READ / TRIED / PRACTICED）を保存します。HomeのCONTINUE LEARNINGから再開でき、SAVEしたConceptは同じ進捗データのbookmarksに入ります。Concept末尾のPRACTICE THISは関連するPython Trainingへ移動し、TrainingのLEARN THIS CONCEPTから説明へ戻れます。

教材データは `learning/catalog.py` と `learning/english.py` にあります。追加後は `python validate_learning.py` でID・必須キー・Pythonサンプル構文を確認し、`python build_site.py` でGitHub Pages用の全学習ページを生成します。

## TOEIC 500 / 600を0から目指す（1年目標）

`/toeic` は、英語学習を0から始めてTOEIC 500点または600点を目指す読解コースです。12か月・48レッスンを用意し、1か月ごとに4つの短いオリジナルTOEIC形式英文を学びます。スコア到達を保証する教材ではないため、公式問題集の時間を測った演習と組み合わせて使います。

各レッスンは必ず次の4段階で進みます。

1. **EXAMPLE** — 訳を見ずに英文を一度読む。
2. **BREAK DOWN** — 主語・動作・対象・時や条件に分け、単語とかたまりを確認する。
3. **YOUR JAPANESE** — 自分が理解した内容を日本語で入力してから解釈例を見る。
4. **ENGLISH IMAGE** — 同じ例文をもう一度見て、日本語へ置き換えず場面を頭に描く。

入力した日本語、現在のSTEP、完了したレッスンはブラウザのlocalStorageへ保存されます。月1は語順とbe動詞から始まり、月12では受け身・完了・条件を含む600点向けの文まで進みます。

教材データは `toeic_lessons.py` にあります。`make_lesson()` の呼び出しを一つ追加すれば、英文、解釈例、分解、場面、読解ポイントを自分で増やせます。変更後は次を実行します。

```bash
python validate_learning.py
python build_site.py
```

## 英語の教科書（小学・中学・高校）

`/textbook` は、単語や `the`、`is` から学び直すための0スタート用教科書です。小学英語・中学英語・高校英語を各12レッスン、合計36レッスン用意しています。各レッスンには最低6語の単語があり、次の順で学びます。

1. **WORDS** — 例文を読む前に必要な単語を覚える。
2. **GRAMMAR & CONNECTION** — `the`、`is`、`and` など、単語をつなぐ働きを知る。
3. **EXAMPLE** — 短い例文を読む。
4. **BREAK DOWN** — 文を小さなかたまりに分ける。
5. **YOUR JAPANESE** — 自分の日本語で意味を書いてから解釈例を見る。
6. **ENGLISH IMAGE** — 最後に英文を見直し、場面を英語のままイメージする。

小学英語では基本単語、`I / you`、`am / is / are`、`a / an / the`、前置詞、基本動詞、接続詞、疑問詞を扱います。中学英語では一般動詞、時制、助動詞、比較、受け身、現在完了、関係代名詞へ進みます。高校英語では文型、節、分詞、条件文、長文の骨組み、TOEIC・技術英文の読み方を扱います。

教材データは `english_textbook.py`、画面の順番と進捗保存は `static/textbook.js` にあります。完了レッスン、自分の和訳、途中のSTEPはブラウザのlocalStorageへ保存されます。

変更後は教材データを確認してGitHub Pages版を作り直します。

```bash
python validate_learning.py
python build_site.py
```

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

### Python Score Courses

寿司打の金額コースのように、問題の難しさと目標スコアが異なる3コースがあります。料金ではなくスコア目標です。

- **3,000 SCORE COURSE** — BASIC。難易度1の基礎コード中心。
- **5,000 SCORE COURSE** — CORE。5つの問題形式を混ぜて出題。
- **10,000 SCORE COURSE** — ADVANCED。難易度2のPREDICT / FIX / BUILD中心。

どのコースも開始時は60秒で、問題数に制限はありません。正解するとコース別に時間が少し追加されます。連続正解するとCOMBOが増え、1問の得点は `100 × COMBO` になります。コンボ倍率に上限はないため、正確に速く入力できればスコアをどこまでも伸ばせます。不正解ではCOMBOだけが0に戻り、スコアは減りません。

通常の5問Practiceと10問Challengeは別モードとして残っています。

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

WORD問題は `questions.json`、Sentence問題は `sentences.json`、Python Training問題は `python_lessons.json`、TOEIC教材は `toeic.json`、英語教科書は `textbook.json` として `docs/static` へ出力されます。Pythonの教材データを変更したら、commit前に次を実行してください。

```bash
python build_site.py
```

## コードの読み方

1. `app.py` — ページとAPI route
2. `questions.py` / `sentence_questions.py` — 英語ゲームの問題
3. `learning/catalog.py` — Python LEARNのModuleと153 Concept
4. `learning/english.py` — Tech English LEARNの40 Concept
5. `toeic_lessons.py` — TOEICの12か月目標と48 Reading Lesson
6. `english_textbook.py` — 小学・中学・高校の36レッスンと単語
7. `static/textbook.js` — 教科書表示、自分の和訳、進捗保存
8. `static/toeic.js` — 4段階表示、自分の解釈、進捗保存
9. `static/learn.js` — Module/Concept表示、RUN、進捗、Bookmark
10. `python_lessons.py` — Python Trainingの50問
11. `templates/` — 画面のHTML
12. `static/training.js` — 5問セッション、入力判定、XP保存
13. `static/progress.js` — Accuracyと星の表示
14. `static/game.js` — 既存WORD/SENTENCEゲーム
15. `static/style.css` — ダークHUDデザイン
16. `build_site.py` — GitHub Pages用ファイルの生成

## Python学習ポイント

- **import**: `app.py` と `build_site.py` が `python_lessons.py` と `toeic_lessons.py` のlistを読み込みます。
- **別ファイルからimport**: `app.py` が `english_textbook.py` からレベルとレッスンのlistを読み込みます。
- **listのフィルタリング**: `validate_learning.py` と `static/textbook.js` は、指定したレベルに合うレッスンだけをlistから取り出します。
- **dictionaryのキー**: 各レッスンに `level`、`words`、`grammar`、`chunks` などのキーを持たせ、表示内容を整理します。
- **新しいAPI route**: `app.py` の `get_textbook_content()` が3レベルと36レッスンをJSONで返します。
- **ifによる分岐**: `static/textbook.js` がURLを確認し、教科書トップ・レベル一覧・個別レッスンの表示を分けます。
- **list / dictionary**: `toeic_lessons.py` は48レッスンをlistで持ち、各レッスンをdictionaryとして保存します。
- **function**: `make_lesson()` は受け取った英文や分解データから、1レッスン分のdictionaryを作ってreturnします。
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
