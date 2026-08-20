# TECH ENGLISH ATTACK

Python・プログラミング・ゲーム開発・3DCGの技術英単語を、ゲームとして毎日練習するアプリです。ローカルでは Flask で動き、GitHub Pages 用の公開サイトも作れます。

## 起動方法（Windows）

```bash
cd C:\Users\HirakawaShion\tech_english_attack
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

ブラウザで [http://127.0.0.1:5000](http://127.0.0.1:5000) を開きます。

## 遊べるモード

- **WORD ATTACK** — 60秒の標準4択。
- **SPRINT** — 30秒の高速スコアアタック。
- **MARATHON** — 120秒の長時間トレーニング。
- **BOSS MODE** — シャッフルされた問題へ挑むスコアアタック。
- **REVIEW MODE** — 直前のプレイで間違えた単語だけを再出題。

終了後には SCORE、正解数、不正解数、Accuracy、Max Combo、間違えた単語を確認できます。最高スコア、最高正答率、プレイ回数はブラウザの localStorage に保存されます。

## GitHub Pages で自分のURLを作る

GitHub Pages は Flask/Python を実行できないため、公開版は静的なゲームとして作ります。まず公開用ファイルを作成します。

```bash
python build_site.py
```

次に GitHub で `tech-english-attack` という公開リポジトリを作り、このフォルダを push します。リポジトリの **Settings → Pages** で、次を選択します。

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/docs**

公開URLは次の形になります。

`https://<あなたのGitHubユーザー名>.github.io/tech-english-attack/`

問題を増やした時は、`questions.py` を編集してからもう一度 `python build_site.py` を実行します。

## コードの読み方

1. `app.py` — URLとページ表示、問題のシャッフル
2. `questions.py` — 問題の list と dictionary
3. `templates/` — Flask版のHTML
4. `static/game.js` — タイマー、正誤、モード、成績保存
5. `static/style.css` — HUD風UI
6. `build_site.py` — GitHub Pages用サイトを作るPythonスクリプト

## Python学習ポイント

- **import**: `app.py` が Flask、random、questions を読み込みます。
- **list**: `questions.py` の `questions` は問題を並べたリストです。
- **dictionary**: 1問ごとの `word`、`answer`、`choices` が辞書です。
- **function**: `home()` や `get_questions()` が役割ごとの関数です。
- **if**: `if __name__ == "__main__":` は直接実行した時だけサーバーを始めます。
- **random**: `random.sample()` が問題順を毎回ランダムにします。
- **for**: `build_site.py` は置換するURLの組を順番に処理します。

## 次に自分で実装すると良い機能

1. **間違えた単語だけ再出題する**
   - 作るもの: 複数プレイ分の苦手単語を集める復習モード。
   - 必要なPython知識: list、for、if、dictionary。
2. **問題カテゴリを追加する**
   - 作るもの: Python / 3DCG / Git を選ぶ画面。
   - 必要なPython知識: dictionary、if、関数、URLの値。
3. **問題数を増やす**
   - 作るもの: 新しい単語と選択肢。
   - 必要なPython知識: list、dictionary、文字列。
4. **難易度を追加する**
   - 作るもの: Easy / Normal / Hard。
   - 必要なPython知識: if、比較、関数の引数。
5. **正答率によって出題確率を変える**
   - 作るもの: 苦手な問題が出やすい仕組み。
   - 必要なPython知識: dictionary、random、計算、for。
6. **ERROR MODEを追加する**
   - 作るもの: Pythonエラー文の意味を答えるモード。
   - 必要なPython知識: 問題データ、関数、if、HTML。
7. **成績履歴を保存する**
   - 作るもの: 日付ごとのスコア一覧。
   - 必要なPython知識: JSON、ファイル読み書き、list。
8. **SQLiteを使う**
   - 作るもの: 問題と成績のデータベース。
   - 必要なPython知識: import、SQLite、SQL、例外処理。

## 難易度と英語力の伸ばし方

- **Basic**: 毎日出会う技術単語。英語の形と日本語の意味を結び付けます。
- **Core**: Python、ゲーム開発、3DCG、Gitで頻出する単語。
- **Advanced**: 実務で読むドキュメント文、設計・非同期・互換性などの用語。
- **Mixed**: 全レベルから出題。意味を思い出す速度を鍛えます。

おすすめの流れは、Basicを正答率80%まで遊ぶ → Coreを追加 → Advancedの英文を声に出して読む → REVIEW MODEで間違いをなくす、です。問題を追加する時は `questions.py` に自分が調べた単語・短い英文を1問ずつ書き足してください。英語とPythonを同時に使う最短の練習になります。
