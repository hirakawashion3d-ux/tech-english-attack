# TECH ENGLISH ATTACK

Python、プログラミング、ゲーム開発、3DCG の技術英単語を、60秒で答える4択スコアアタックです。
完成したゲームとして毎日遊びながら、後から自分で Python コードを書き足して育てるための小さな教材でもあります。

## 起動方法（Windows）

PowerShell またはコマンドプロンプトで、このフォルダへ移動してから実行します。

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

起動後、ブラウザで [http://127.0.0.1:5000](http://127.0.0.1:5000) を開いてください。終了する時はターミナルで `Ctrl + C` を押します。

## v1でできること

- WORD MODE を60秒間プレイする
- 4択で技術英単語を答える（60問）
- 正解で 100 SCORE と COMBO を獲得する
- 不正解で正解を表示し、COMBO が0に戻る
- 終了後に SCORE、正解数、不正解数、Accuracy、Max Combo、間違えた単語を確認する
- 最高スコアをブラウザの localStorage に保存する

## コードの読み方

最初は次の順番で読むと、処理の流れを追いやすいです。

1. `app.py` — Flask がどの URL でどのページを開くかを読む
2. `questions.py` — 問題のリストを読む、単語を1問追加してみる
3. `templates` の HTML — ページに置かれる表示要素を読む
4. `static/game.js` — タイマー、正誤判定、スコア、結果画面への移動を読む
5. `static/style.css` — HUD風の見た目を調整する

## Python学習ポイント

- **import**: `app.py` の先頭で Flask と `random`、`questions.py` の問題データを読み込んでいます。
- **variable（変数）**: `shuffled_questions` は、シャッフルされた問題を入れておく名前です。
- **list（リスト）**: `questions.py` の `questions = [...]` は問題を順番に入れたリストです。
- **dictionary（辞書）**: 各問題の `{ "word": ..., "answer": ... }` は、名前と値をセットで持つ辞書です。
- **function（関数）**: `home()`、`game()`、`get_questions()` は、役割ごとに分けた処理です。
- **return**: 関数の最後で、HTML または問題データを Flask に返しています。
- **if**: `if __name__ == "__main__":` は、このファイルを直接実行した時だけサーバーを起動するための条件です。
- **random**: `random.sample(...)` は、問題を毎回ランダムな順番にして返します。

## 問題を追加するには

`questions.py` の `questions` リストに、次の形の辞書を追加します。`answer` の文字は必ず `choices` にも入れてください。

```python
{"word": "shader", "answer": "シェーダー", "choices": ["シェーダー", "頂点", "衝突", "引数"]},
```

## 次に自分で実装すると良い機能

完成コードを写すより、まずは小さく自分で作るのがおすすめです。

1. **間違えた単語だけ再出題する**
   - 作るもの: 結果画面の間違いリストから、復習用の問題だけを出すモード。
   - 必要なPython知識: list、for、if、関数、辞書。
2. **問題カテゴリを追加する**
   - 作るもの: Python / 3DCG / Git などを選べる画面。
   - 必要なPython知識: 辞書、if、関数、URLの値。
3. **問題数を増やす**
   - 作るもの: 新しい単語と選択肢。
   - 必要なPython知識: list、dictionary、文字列。
4. **難易度を追加する**
   - 作るもの: Easy / Normal / Hard ごとの問題セット。
   - 必要なPython知識: if、比較、list、関数の引数。
5. **正答率によって出題確率を変える**
   - 作るもの: 苦手な問題が出やすくなる仕組み。
   - 必要なPython知識: dictionary、random、計算、for。
6. **ERROR MODEを追加する**
   - 作るもの: 短い Python エラー文の意味を答えるモード。
   - 必要なPython知識: 新しい問題データ、関数、if、HTML。
7. **成績履歴を保存する**
   - 作るもの: 日付ごとのスコア一覧。
   - 必要なPython知識: list、dictionary、JSONまたはファイル読み書き。
8. **SQLiteを使う**
   - 作るもの: 問題や成績をデータベースへ保存する仕組み。
   - 必要なPython知識: import、SQLite、SQL、関数、例外処理。

## 将来の拡張案

- **ERROR MODE**: Python の短いエラーメッセージを読み、意味を答える。
- **CODE MODE**: 短い Python コードを読み、結果や意味を答える。
- **DOCS MODE**: Python や Pygame のドキュメント風英文を読む。
- **BOSS MODE**: WORD / ERROR / CODE / DOCS を混ぜた総合スコアアタック。
