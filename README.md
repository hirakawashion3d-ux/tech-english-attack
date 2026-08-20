# TECH ENGLISH ATTACK

Python・プログラミング・ゲーム開発・3DCGの技術英語を、ゲームとして毎日練習するアプリです。ローカルではFlaskで動き、GitHub Pagesでも公開できます。

完成したゲームで遊びながら、ユーザー本人がPythonを手打ちして育てる教材として、読みやすく小さな構造を優先しています。

## 起動方法（Windows）

```bash
cd C:\Users\HirakawaShion\tech_english_attack
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

起動後、ブラウザで [http://127.0.0.1:5000](http://127.0.0.1:5000) を開きます。

## 遊べるモード

- **WORD ATTACK** — 60秒の標準4択。
- **SENTENCE MODE** — 60秒で短い技術英文を読み、日本語の意味を選ぶ。
- **SPRINT** — 30秒の高速スコアアタック。
- **MARATHON** — 120秒の長時間トレーニング。
- **REVIEW MODE** — 直前のプレイで間違えた単語・英文だけを再出題。

終了後にはSCORE、正解数、不正解数、Accuracy、Max Combo、間違えた問題を確認できます。最高スコア、最高正答率、プレイ回数はブラウザのlocalStorageに保存されます。

## GitHub Pages版

公開サイト：<https://hirakawashion3d-ux.github.io/tech-english-attack/>

GitHub PagesはFlask/Pythonを実行できないため、`build_site.py` が公開用ファイルを `docs` フォルダへ作ります。

```bash
python build_site.py
```

WORD問題は `docs/static/questions.json`、Sentence問題は `docs/static/sentences.json` に出力されます。問題を変更したら、commitの前にもう一度ビルドしてください。

## コードの読み方

次の順番で読むと、初心者でも処理を追いやすくなります。

1. `app.py` — URL、ページ表示、問題API
2. `questions.py` — WORD MODEのlistとdictionary
3. `sentence_questions.py` — SENTENCE MODEの英文、選択肢、keywords
4. `templates/` — Flask版のHTML
5. `static/game.js` — タイマー、正誤判定、モード分岐、成績保存
6. `static/style.css` — HUD風UIとSentence用レイアウト
7. `build_site.py` — GitHub Pages用サイトを作るPythonスクリプト

## Python学習ポイント

- **import**: `app.py` がFlask、`random`、2つの問題ファイルを読み込みます。
- **list**: `questions` と `sentence_questions` は問題を順番に持つリストです。
- **dictionary**: 1問ごとに英文、正解、選択肢、難易度などを名前付きで持ちます。
- **function**: `home()`、`get_questions()`、`get_sentences()` が役割ごとの関数です。
- **if**: 選択された難易度によって返す問題を変えます。
- **return**: 関数からHTMLやJSONを返します。
- **random**: `random.sample()` が問題をランダムな順番にします。
- **for**: リスト内包表記やビルド処理で、問題や置換項目を順番に処理します。

## 難易度

- **Basic**: 短く基本的な単語・英文。
- **Core**: Python、3DCG、ゲーム開発、Gitで頻出する表現。
- **Advanced**: 実際のドキュメントや警告に近い表現。
- **Mixed**: すべての難易度から出題。

おすすめは、Basicを正答率80%まで遊ぶ → Coreへ進む → Advancedを声に出して読む → REVIEW MODEで間違いを復習する流れです。

### Sentence Modeで学べる英語

技術英文では、最初に「何が（subject）」「どうする（verb）」を探します。たとえば `The function returns ...` は、subjectが `The function`、verbが `returns` です。

- **returns**: 戻り値として「返す」。
- **takes**: 関数が引数を「受け取る」。
- **updates / removes / stores / checks**: 「更新する / 削除する / 保存する / 確認する」。主語の直後に出やすい動作です。
- **exists**: ファイルや値が「存在する」。`does not exist` は「存在しない」。
- **required**: 必須。省略できません。
- **optional**: 任意。省略できます。
- **deprecated**: 非推奨。今は使えても将来削除される可能性があります。
- **if**: 「もし〜なら」。条件を示します。
- **when**: 「〜する時」。処理が起きるタイミングを示します。
- **until**: 「〜するまで」。処理を続ける終点を示します。

### v2で追加されたPython学習ポイント

- **別ファイルからimportする**: `app.py` が `sentence_questions.py` の問題リストを読み込みます。
- **新しいAPI routeを追加する**: `/api/sentences` がSentence問題をJSONで返します。
- **listをフィルタリングする**: 選ばれた `level` と一致する問題だけをリスト内包表記で取り出します。
- **dictionaryに新しいキーを追加する**: `sentence`、`keywords`、`category`、`type` で問題の情報を整理します。
- **modeによって処理を分岐する**: JavaScriptがWORD、SENTENCE、REVIEWでデータと表示方法を切り替えます。

## 問題を追加するには

Sentence問題は `sentence_questions.py` の `sentence_questions` リストへdictionaryを1つ追加します。`answer` は必ず `choices` にも入れてください。

```python
{
    "sentence": "The method returns a new object.",
    "answer": "メソッドは新しいオブジェクトを返す",
    "choices": [
        "メソッドは新しいオブジェクトを返す",
        "メソッドはオブジェクトを削除する",
        "メソッドはファイルを開く",
        "メソッドは何も受け取らない",
    ],
    "keywords": ["method", "returns", "new", "object"],
    "level": "basic",
    "category": "Function / Method",
    "type": "sentence",
},
```

## 将来の拡張案

- 苦手な問題ほど出やすくする
- ERROR MODEを追加する
- CODE MODEを追加する
- 日付ごとの成績履歴を保存する
- SQLiteで問題と成績を管理する

## 次に手打ちする小さなPython課題

**Sentenceのレベル別出題数を自分で変更する。**

`sentence_questions.py` の各レベルの問題数を数え、`app.py` で返す数を調整してみてください。完成コードをコピーせず、まず変数と `if` を使う方法を考える練習です。
