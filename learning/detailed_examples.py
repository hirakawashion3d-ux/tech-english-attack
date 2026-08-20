"""Concept-specific examples for the core beginner modules."""

DETAILED_EXAMPLES = {
    "variables": [
        "player_hp = 100", "score = 0", "lives = 3", "player_name = \"Reimu\"",
        "score = 100\nprint(score)", "player_hp = 100\nplayer_hp = 80",
        "total = score + bonus", "score = 0\nscore += 100", "lives = 3\nlives -= 1",
        "player_speed = 5", "enemy_spawn_time = 3", "player_hp = 100\nplayer_speed = 5\nscore = 0",
    ],
    "numbers": [
        "player_hp = 100", "speed = 4.5", "score = 100 + 50", "player_hp = 100 - 20",
        "damage = 25 * 2", "half = 10 / 2", "groups = 10 // 3", "remainder = 10 % 3",
        "area = 4 ** 2", "result = (2 + 3) * 4", "is_fast = speed > 5",
        "player_x = 320\nplayer_y = 240", "player_x = player_x + speed",
    ],
    "strings": [
        "message = \"GAME START\"", "player_name = \"Reimu\"", "item = 'key'",
        "stage_name = \"Forest\"", "message = \"Hello \" + player_name",
        "message = f\"HP: {player_hp}\"", "name_length = len(player_name)",
        "first_letter = player_name[0]", "message = f\"SCORE {score}\"",
    ],
    "boolean": [
        "is_alive = True", "is_game_over = False", "is_dead = player_hp <= 0",
        "is_max = score == 100", "is_moving = speed != 0", "is_boss = enemy_hp > 500",
        "is_slow = speed < 3", "can_clear = score >= 100", "is_empty = item_count <= 0",
        "running = True\npaused = False",
    ],
    "if": [
        "if is_alive:\n    print(\"MOVE\")", "if player_hp <= 0:\n    print(\"GAME OVER\")",
        "if score >= 100:\n    print(\"CLEAR\")", "if is_alive:\n    print(\"PLAY\")",
        "if player_hp < enemy_damage:\n    print(\"DANGER\")",
        "if has_key:\n    print(\"OPEN\")\nelse:\n    print(\"LOCKED\")",
        "if score >= 200:\n    rank = \"S\"\nelif score >= 100:\n    rank = \"A\"",
        "if has_key and door_is_locked:\n    print(\"OPEN\")",
        "if has_sword or has_magic:\n    print(\"ATTACK\")", "if not paused:\n    update_game()",
        "if is_alive:\n    if player_hp < 20:\n        print(\"DANGER\")",
        "if player_hp <= 20:\n    print(\"LOW HP\")", "if player_hp <= 0:\n    running = False",
    ],
    "lists": [
        "enemies = [\"slime\", \"bat\"]", "items = []", "first_enemy = enemies[0]",
        "bullets.append(\"bullet\")", "items.remove(\"key\")", "enemy_count = len(enemies)",
        "has_key = \"key\" in items", "scores[0] = 100", "enemies = [\"slime\", \"bat\", \"boss\"]",
        "bullets = []\nbullets.append({\"x\": 100, \"y\": 200})",
    ],
    "for": [
        "for number in range(3):\n    print(number)", "for item in items:\n    print(item)",
        "for enemy in enemies:\n    print(enemy)", "for number in range(5):\n    print(number)",
        "for i in range(5):\n    print(i)", "for x in range(100, 401, 100):\n    print(x)",
        "count = 0\nfor enemy in enemies:\n    count += 1",
        "for enemy in enemies:\n    if enemy == \"boss\":\n        print(\"BOSS\")",
        "for bullet in bullets:\n    bullet[\"y\"] -= 5", "for enemy in enemies:\n    enemy[\"x\"] += enemy[\"speed\"]",
    ],
    "functions": [
        "def greet():\n    print(\"HELLO\")", "def update_player():\n    print(\"UPDATE\")",
        "def jump():\n    print(\"JUMP\")", "jump()", "def move(speed):\n    print(speed)",
        "move(5)", "def get_score():\n    return 100",
        "def add_score(score, amount):\n    return score + amount",
        "new_score = add_score(score, 100)", "def update():\n    move_player()\n    move_enemies()",
        "def move_player(x, speed):\n    return x + speed",
        "def take_damage(hp, damage):\n    return hp - damage",
        "def spawn_enemy(enemies, enemy):\n    enemies.append(enemy)\n    return enemies",
    ],
}
