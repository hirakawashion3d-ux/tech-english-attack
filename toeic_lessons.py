"""Original TOEIC-style reading lessons for learning from zero toward 500 or 600.

Each lesson follows the same four steps in the browser:
example, breakdown, your Japanese interpretation, and English image.
"""

toeic_goal = {
    "start_score": 0,
    "target_scores": [500, 600],
    "months": 12,
    "weekly_target": 4,
}


toeic_months = [
    {"month": 1, "title": "語順とbe動詞", "goal": "主語のあとに状態が続く形をつかむ。"},
    {"month": 2, "title": "現在形の動作", "goal": "誰が何をするかを先に見つける。"},
    {"month": 3, "title": "場所と名詞のまとまり", "goal": "前置詞を場所・位置のイメージで読む。"},
    {"month": 4, "title": "過去と未来", "goal": "時を表す語から出来事の時間を判断する。"},
    {"month": 5, "title": "依頼・義務・提案", "goal": "must、can、should、pleaseの温度差をつかむ。"},
    {"month": 6, "title": "名詞を後ろから説明", "goal": "長い主語を小さなまとまりに分ける。"},
    {"month": 7, "title": "条件と理由", "goal": "if、because、although、onceで文の関係を読む。"},
    {"month": 8, "title": "会議と職場", "goal": "予定・配置・進行状況の英文に慣れる。"},
    {"month": 9, "title": "顧客対応", "goal": "案内・謝罪・返金・保証の定型表現を読む。"},
    {"month": 10, "title": "告知とアナウンス", "goal": "変更理由と利用者への指示を素早くつかむ。"},
    {"month": 11, "title": "少し長い業務文", "goal": "文の中心と追加説明を分けて読む。"},
    {"month": 12, "title": "600点チャレンジ", "goal": "複数の文法要素を英語の順番でイメージする。"},
]


def make_lesson(lesson_id, month, sentence, translation, chunks, image, point):
    """Return one lesson dictionary. Add another call below to extend the course."""
    return {
        "id": lesson_id,
        "month": month,
        "week": int(lesson_id[-2:]),
        "sentence": sentence,
        "translation": translation,
        "chunks": [
            {"text": text, "meaning": meaning, "role": role}
            for text, meaning, role in chunks
        ],
        "image": image,
        "point": point,
    }


toeic_lessons = [
    make_lesson(
        "m01-01", 1, "The office is open today.", "事務所は本日開いています。",
        [("The office", "その事務所は", "主語"), ("is open", "開いています", "状態"), ("today", "今日", "時")],
        "今日、入口が開いている事務所を思い浮かべる。", "be動詞の後ろに open を置くと、現在の状態を表します。",
    ),
    make_lesson(
        "m01-02", 1, "The meeting room is on the second floor.", "会議室は2階にあります。",
        [("The meeting room", "その会議室は", "主語"), ("is", "あります", "存在"), ("on the second floor", "2階に", "場所")],
        "建物の2階にある会議室を頭の中で指さす。", "on + floor は『その階に』という場所のまとまりです。",
    ),
    make_lesson(
        "m01-03", 1, "Ms. Sato is responsible for the project.", "佐藤さんはそのプロジェクトを担当しています。",
        [("Ms. Sato", "佐藤さんは", "主語"), ("is responsible for", "〜を担当しています", "状態の表現"), ("the project", "そのプロジェクトを", "対象")],
        "プロジェクトの担当者として佐藤さんの名前が表示されている画面。", "responsible for は3語を一つにして『〜を担当する』と読みます。",
    ),
    make_lesson(
        "m01-04", 1, "These documents are ready for review.", "これらの書類は確認できる状態です。",
        [("These documents", "これらの書類は", "主語"), ("are ready", "準備ができています", "状態"), ("for review", "確認のための", "目的")],
        "机の上に確認待ちの書類がそろっている場面。", "ready for は『〜の準備ができて』という状態を作ります。",
    ),
    make_lesson(
        "m02-01", 2, "The store opens at nine.", "その店は9時に開店します。",
        [("The store", "その店は", "主語"), ("opens", "開店します", "動作"), ("at nine", "9時に", "時刻")],
        "時計が9時を示した瞬間に店のドアが開く。", "三人称単数の主語なので open に s が付きます。",
    ),
    make_lesson(
        "m02-02", 2, "Our team checks the schedule every morning.", "私たちのチームは毎朝予定を確認します。",
        [("Our team", "私たちのチームは", "主語"), ("checks", "確認します", "動作"), ("the schedule", "予定を", "対象"), ("every morning", "毎朝", "頻度")],
        "朝、チーム全員が一日の予定表を見る。", "主語→動作→対象の順で読むと、文の骨格がすぐ見えます。",
    ),
    make_lesson(
        "m02-03", 2, "The manager approves all travel requests.", "管理者はすべての出張申請を承認します。",
        [("The manager", "管理者は", "主語"), ("approves", "承認します", "動作"), ("all travel requests", "すべての出張申請を", "対象")],
        "管理者が申請一覧に承認の印を付ける。", "travel requests は『旅行』ではなく職場では『出張申請』と考えます。",
    ),
    make_lesson(
        "m02-04", 2, "This machine produces fifty parts per hour.", "この機械は1時間に50個の部品を生産します。",
        [("This machine", "この機械は", "主語"), ("produces", "生産します", "動作"), ("fifty parts", "50個の部品を", "対象"), ("per hour", "1時間あたり", "割合")],
        "機械から1時間で50個の部品が流れてくる。", "per は『〜あたり』。数字と一緒に処理能力を表します。",
    ),
    make_lesson(
        "m03-01", 3, "The keys are in the top drawer.", "鍵は一番上の引き出しにあります。",
        [("The keys", "鍵は", "主語"), ("are", "あります", "存在"), ("in the top drawer", "一番上の引き出しの中に", "場所")],
        "一番上の引き出しを開けると鍵が入っている。", "in は物の内側にあるイメージです。",
    ),
    make_lesson(
        "m03-02", 3, "Please place the package beside the front desk.", "荷物を受付の横に置いてください。",
        [("Please place", "置いてください", "依頼"), ("the package", "その荷物を", "対象"), ("beside the front desk", "受付の横に", "場所")],
        "受付カウンターのすぐ横に荷物を置く。", "beside は『すぐ横』の位置を表します。",
    ),
    make_lesson(
        "m03-03", 3, "A copy of the invoice is attached to this email.", "請求書のコピーがこのメールに添付されています。",
        [("A copy of the invoice", "請求書のコピーが", "主語"), ("is attached", "添付されています", "状態"), ("to this email", "このメールに", "接続先")],
        "メール画面に請求書ファイルのアイコンが付いている。", "A of B は『BのA』と後ろから日本語にすると自然です。",
    ),
    make_lesson(
        "m03-04", 3, "Employees in this department wear identification cards.", "この部署の従業員は身分証を着用します。",
        [("Employees", "従業員は", "主語"), ("in this department", "この部署の", "主語の説明"), ("wear", "着用します", "動作"), ("identification cards", "身分証を", "対象")],
        "部署の従業員が首からIDカードを下げている。", "in this department は Employees を後ろから説明します。",
    ),
    make_lesson(
        "m04-01", 4, "The train arrived ten minutes late.", "列車は10分遅れて到着しました。",
        [("The train", "列車は", "主語"), ("arrived", "到着しました", "過去の動作"), ("ten minutes late", "10分遅れて", "結果")],
        "予定時刻より10分後にホームへ入る列車。", "arrived の -ed で、すでに終わった出来事だと分かります。",
    ),
    make_lesson(
        "m04-02", 4, "We sent the revised proposal yesterday.", "私たちは昨日、修正版の提案書を送りました。",
        [("We", "私たちは", "主語"), ("sent", "送りました", "過去の動作"), ("the revised proposal", "修正版の提案書を", "対象"), ("yesterday", "昨日", "時")],
        "昨日、修正済みの提案書を送信したメール画面。", "sent は send の過去形。yesterday も過去を確定させます。",
    ),
    make_lesson(
        "m04-03", 4, "The new branch will open next month.", "新しい支店は来月開店します。",
        [("The new branch", "新しい支店は", "主語"), ("will open", "開店します", "未来の動作"), ("next month", "来月", "時")],
        "カレンダーの来月に新店舗オープンの印がある。", "will + 動詞の原形は、これから起きることを表します。",
    ),
    make_lesson(
        "m04-04", 4, "The technician will inspect the equipment tomorrow.", "技術者は明日その設備を点検します。",
        [("The technician", "技術者は", "主語"), ("will inspect", "点検します", "未来の動作"), ("the equipment", "その設備を", "対象"), ("tomorrow", "明日", "時")],
        "明日、技術者が機械を一つずつ点検する予定表。", "equipment は数えない名詞なので通常 equipments にはしません。",
    ),
    make_lesson(
        "m05-01", 5, "Visitors must sign in at reception.", "訪問者は受付で署名しなければなりません。",
        [("Visitors", "訪問者は", "主語"), ("must sign in", "署名しなければなりません", "義務"), ("at reception", "受付で", "場所")],
        "訪問者が受付の記録用紙に名前を書く。", "must は強い義務、sign in は受付などで入場を記録する表現です。",
    ),
    make_lesson(
        "m05-02", 5, "You can reserve a room through the website.", "ウェブサイトから部屋を予約できます。",
        [("You", "あなたは", "主語"), ("can reserve", "予約できます", "可能"), ("a room", "部屋を", "対象"), ("through the website", "ウェブサイトを通じて", "手段")],
        "ウェブサイトの予約画面から空き部屋を選ぶ。", "through は『〜を通じて』という経路・手段のイメージです。",
    ),
    make_lesson(
        "m05-03", 5, "Please submit the form by Friday.", "金曜日までに書類を提出してください。",
        [("Please submit", "提出してください", "依頼"), ("the form", "その書類を", "対象"), ("by Friday", "金曜日までに", "期限")],
        "金曜日の締切より前に提出ボタンを押す。", "by は締切までのどこか、until はその時まで継続する違いがあります。",
    ),
    make_lesson(
        "m05-04", 5, "Staff members should keep the door locked.", "スタッフはドアを施錠した状態にしておくべきです。",
        [("Staff members", "スタッフは", "主語"), ("should keep", "保つべきです", "提案・義務"), ("the door locked", "ドアを施錠した状態に", "対象と状態")],
        "スタッフが確認し、ドアを鍵の掛かった状態に保つ。", "keep A B は『AをBの状態に保つ』という形です。",
    ),
    make_lesson(
        "m06-01", 6, "The applicant selected for the position has extensive experience.", "その職に選ばれた応募者には豊富な経験があります。",
        [("The applicant", "その応募者には", "主語"), ("selected for the position", "その職に選ばれた", "主語の説明"), ("has", "あります", "動作"), ("extensive experience", "豊富な経験が", "対象")],
        "選考で選ばれた応募者の経歴書に長い経験欄がある。", "selected 以下をいったん括弧に入れると、The applicant has experience が見えます。",
    ),
    make_lesson(
        "m06-02", 6, "Customers who join the program receive a discount.", "プログラムに参加する顧客は割引を受けられます。",
        [("Customers", "顧客は", "主語"), ("who join the program", "プログラムに参加する", "主語の説明"), ("receive", "受けます", "動作"), ("a discount", "割引を", "対象")],
        "会員プログラムへ登録した顧客に割引が表示される。", "who から program までが Customers の種類を説明します。",
    ),
    make_lesson(
        "m06-03", 6, "The equipment installed last week is working properly.", "先週設置された設備は正常に動いています。",
        [("The equipment", "その設備は", "主語"), ("installed last week", "先週設置された", "主語の説明"), ("is working", "動いています", "進行中の状態"), ("properly", "正常に", "動作の説明")],
        "先週設置した機械が今、問題なく動作している。", "installed の前に which was が省略された形として考えられます。",
    ),
    make_lesson(
        "m06-04", 6, "We need a designer who can update the website.", "私たちはウェブサイトを更新できるデザイナーを必要としています。",
        [("We", "私たちは", "主語"), ("need", "必要としています", "動作"), ("a designer", "デザイナーを", "対象"), ("who can update the website", "ウェブサイトを更新できる", "対象の説明")],
        "求人票にウェブ更新ができるデザイナーと書かれている。", "who 以下が、どのような designer かを説明します。",
    ),
    make_lesson(
        "m07-01", 7, "If you have any questions, contact the support desk.", "質問があれば、サポート窓口へ連絡してください。",
        [("If you have any questions", "質問があれば", "条件"), ("contact", "連絡してください", "指示"), ("the support desk", "サポート窓口へ", "対象")],
        "疑問が生まれたら矢印がサポート窓口へ向かう。", "if のまとまりは条件。その条件のとき何をするかが後半です。",
    ),
    make_lesson(
        "m07-02", 7, "The event was postponed because of heavy rain.", "その催しは大雨のため延期されました。",
        [("The event", "その催しは", "主語"), ("was postponed", "延期されました", "受け身"), ("because of", "〜のため", "理由"), ("heavy rain", "大雨", "理由の内容")],
        "大雨の絵から延期されたイベント日程へ矢印を伸ばす。", "because of の後ろには名詞が来ます。ここでは heavy rain です。",
    ),
    make_lesson(
        "m07-03", 7, "Although the price increased, demand remained strong.", "価格は上昇しましたが、需要は依然として高いままでした。",
        [("Although the price increased", "価格は上昇しましたが", "逆の条件"), ("demand", "需要は", "主語"), ("remained strong", "高いままでした", "状態")],
        "値札は上がっているのに、購入希望者の列が続いている。", "although は予想と逆の結果につなぐ『〜だけれど』です。",
    ),
    make_lesson(
        "m07-04", 7, "We will begin once all participants have arrived.", "参加者全員が到着したら開始します。",
        [("We will begin", "私たちは開始します", "未来の動作"), ("once", "〜したら", "開始条件"), ("all participants", "参加者全員が", "主語"), ("have arrived", "到着した", "完了")],
        "全員のチェック欄が埋まった瞬間に開始ボタンを押す。", "once は『その条件が整ったらすぐ』という開始点を表します。",
    ),
    make_lesson(
        "m08-01", 8, "The conference begins immediately after lunch.", "会議は昼食の直後に始まります。",
        [("The conference", "会議は", "主語"), ("begins", "始まります", "動作"), ("immediately after lunch", "昼食の直後に", "時")],
        "昼食終了と同時に会議室へ移動する予定表。", "immediately after を一つにして『〜の直後』と読みます。",
    ),
    make_lesson(
        "m08-02", 8, "Mr. Lee has been transferred to the Osaka office.", "リーさんは大阪支社へ異動になりました。",
        [("Mr. Lee", "リーさんは", "主語"), ("has been transferred", "異動になりました", "現在につながる受け身"), ("to the Osaka office", "大阪支社へ", "移動先")],
        "リーさんの所属先が大阪支社へ移った社員名簿。", "has been transferred は、異動が決まり現在もその結果が続く表現です。",
    ),
    make_lesson(
        "m08-03", 8, "The sales report must be completed before the meeting.", "売上報告書は会議前に完成させなければなりません。",
        [("The sales report", "売上報告書は", "主語"), ("must be completed", "完成させなければなりません", "義務の受け身"), ("before the meeting", "会議前に", "期限")],
        "会議開始より前に報告書へ完了マークを付ける。", "must be + 過去分詞で『〜されなければならない』です。",
    ),
    make_lesson(
        "m08-04", 8, "Several employees are working remotely this week.", "数名の従業員は今週リモートで勤務しています。",
        [("Several employees", "数名の従業員は", "主語"), ("are working", "勤務しています", "進行中の動作"), ("remotely", "遠隔で", "方法"), ("this week", "今週", "期間")],
        "今週、複数の社員がそれぞれ自宅から接続している。", "are working は今の一時的な状況を表します。",
    ),
    make_lesson(
        "m09-01", 9, "We apologize for the delay in processing your order.", "ご注文の処理が遅れていることをおわびします。",
        [("We apologize for", "私たちは〜をおわびします", "謝罪"), ("the delay", "遅れを", "対象"), ("in processing your order", "ご注文を処理する際の", "遅れの説明")],
        "処理待ちの注文と、おわびのメッセージが表示される。", "apologize for の後ろに、謝罪する理由が続きます。",
    ),
    make_lesson(
        "m09-02", 9, "Please let us know if you need further assistance.", "さらにお手伝いが必要でしたらお知らせください。",
        [("Please let us know", "私たちにお知らせください", "依頼"), ("if", "もし〜なら", "条件"), ("you need", "あなたが必要とする", "動作"), ("further assistance", "さらに支援を", "対象")],
        "困っている利用者からサポート担当へ連絡が届く。", "let us know は『私たちに知らせる』という定型表現です。",
    ),
    make_lesson(
        "m09-03", 9, "Your payment will be refunded within five business days.", "お支払いは5営業日以内に返金されます。",
        [("Your payment", "お支払いは", "主語"), ("will be refunded", "返金されます", "未来の受け身"), ("within five business days", "5営業日以内に", "期限")],
        "5営業日の枠の中で支払額が利用者へ戻る。", "within は『その期間を超えずに』という内側のイメージです。",
    ),
    make_lesson(
        "m09-04", 9, "The warranty does not cover accidental damage.", "保証は偶発的な損傷を対象としていません。",
        [("The warranty", "保証は", "主語"), ("does not cover", "対象としていません", "否定の動作"), ("accidental damage", "偶発的な損傷を", "対象")],
        "保証範囲の円の外側に、落下による損傷がある。", "cover はここでは『覆う』ではなく、保証の対象に含める意味です。",
    ),
    make_lesson(
        "m10-01", 10, "Passengers are asked to remain seated until the bus stops.", "乗客はバスが停止するまで着席しているよう求められています。",
        [("Passengers", "乗客は", "主語"), ("are asked to remain seated", "着席したままでいるよう求められています", "依頼の受け身"), ("until the bus stops", "バスが停止するまで", "継続期限")],
        "動いているバスの間は乗客が席に座り続ける。", "until は、ある時点まで状態や動作が続くことを表します。",
    ),
    make_lesson(
        "m10-02", 10, "Due to maintenance work, the library will close early.", "保守作業のため、図書館は早く閉館します。",
        [("Due to maintenance work", "保守作業のため", "理由"), ("the library", "図書館は", "主語"), ("will close", "閉館します", "未来の動作"), ("early", "早く", "時")],
        "工具のマークから、早い閉館時刻へ矢印が伸びる。", "due to は理由を表し、後ろには名詞のまとまりが来ます。",
    ),
    make_lesson(
        "m10-03", 10, "The parking area behind the building is currently unavailable.", "建物裏の駐車場は現在利用できません。",
        [("The parking area", "駐車場は", "主語"), ("behind the building", "建物裏の", "主語の説明"), ("is currently unavailable", "現在利用できません", "状態")],
        "建物の裏にある駐車場へ利用不可の表示が出ている。", "長い主語でも、中心は The parking area です。",
    ),
    make_lesson(
        "m10-04", 10, "Free samples will be provided while supplies last.", "在庫がある間、無料サンプルが提供されます。",
        [("Free samples", "無料サンプルが", "主語"), ("will be provided", "提供されます", "未来の受け身"), ("while supplies last", "在庫がある間", "期間の条件")],
        "在庫箱に品物が残っている間だけサンプルを配る。", "while supplies last は広告でよく使う『在庫限り』の表現です。",
    ),
    make_lesson(
        "m11-01", 11, "The company plans to expand its services in response to customer demand.", "その会社は顧客の需要に応じてサービスを拡大する予定です。",
        [("The company", "その会社は", "主語"), ("plans to expand", "拡大する予定です", "計画"), ("its services", "自社のサービスを", "対象"), ("in response to customer demand", "顧客の需要に応じて", "理由・反応")],
        "顧客の要望が増え、それに合わせてサービス範囲が広がる。", "plan to + 動詞で計画、in response to で何への対応かを読みます。",
    ),
    make_lesson(
        "m11-02", 11, "Anyone interested in attending the workshop should register online.", "研修会への参加に関心がある人はオンライン登録してください。",
        [("Anyone", "誰でも／人は", "主語"), ("interested in attending the workshop", "研修会への参加に関心がある", "主語の説明"), ("should register", "登録してください", "提案"), ("online", "オンラインで", "方法")],
        "参加したい人がウェブ上の登録フォームを開く。", "Anyone の直後から workshop までは、対象となる人の条件です。",
    ),
    make_lesson(
        "m11-03", 11, "The report indicates that operating costs have decreased significantly.", "報告書は運営費が大幅に減少したことを示しています。",
        [("The report", "報告書は", "主語"), ("indicates", "示しています", "動作"), ("that operating costs", "運営費が〜ということを", "内容の主語"), ("have decreased significantly", "大幅に減少した", "内容の動作")],
        "報告書のグラフで運営費の線が大きく下がっている。", "that 以下を『何を示すのか』という一つの内容として扱います。",
    ),
    make_lesson(
        "m11-04", 11, "Products purchased during the sale cannot be returned without a receipt.", "セール中に購入した商品は、レシートなしでは返品できません。",
        [("Products", "商品は", "主語"), ("purchased during the sale", "セール中に購入した", "主語の説明"), ("cannot be returned", "返品できません", "不可能の受け身"), ("without a receipt", "レシートなしでは", "条件")],
        "セール品を返品しようとするが、レシートが必要と表示される。", "purchased の説明を外すと Products cannot be returned が骨格です。",
    ),
    make_lesson(
        "m12-01", 12, "By the time the guests arrive, the staff will have prepared the hall.", "来客が到着するまでには、スタッフは会場の準備を終えているでしょう。",
        [("By the time the guests arrive", "来客が到着するまでには", "未来の基準時"), ("the staff", "スタッフは", "主語"), ("will have prepared", "準備を終えているでしょう", "未来の完了"), ("the hall", "会場を", "対象")],
        "来客到着の時計より前に、会場準備の完了印が付く。", "will have + 過去分詞は、未来のある時点までの完了です。",
    ),
    make_lesson(
        "m12-02", 12, "The committee is expected to announce its decision later this week.", "委員会は今週後半に決定を発表する見込みです。",
        [("The committee", "委員会は", "主語"), ("is expected to announce", "発表する見込みです", "予測の受け身"), ("its decision", "その決定を", "対象"), ("later this week", "今週後半に", "時")],
        "今週後半のカレンダーに委員会の発表予定が置かれている。", "be expected to は『〜すると予想される／見込まれる』です。",
    ),
    make_lesson(
        "m12-03", 12, "Unless otherwise noted, all prices include delivery charges.", "別途記載がない限り、すべての価格に配送料が含まれます。",
        [("Unless otherwise noted", "別途記載がない限り", "例外条件"), ("all prices", "すべての価格は", "主語"), ("include", "含みます", "動作"), ("delivery charges", "配送料を", "対象")],
        "値札の中に商品代と配送料が一緒に入っている。", "unless は『もし〜でなければ』。例外を先に示します。",
    ),
    make_lesson(
        "m12-04", 12, "Employees are encouraged to suggest ways to improve workplace safety.", "従業員は職場の安全性を改善する方法を提案するよう奨励されています。",
        [("Employees", "従業員は", "主語"), ("are encouraged to suggest", "提案するよう奨励されています", "働きかけの受け身"), ("ways", "方法を", "対象"), ("to improve workplace safety", "職場の安全性を改善するための", "対象の説明")],
        "従業員から安全改善のアイデアが提案箱へ集まる。", "ways to improve は『改善するための方法』とまとまりで読みます。",
    ),
]
