# bhc 교육 게임 — 게임 목록(허브)

주소: https://jgpower1.github.io/ (made by J.G)

모든 교육 게임을 한 앱에서 종류별로 골라 할 수 있게 모아 둔 첫 화면이에요.
폰에 설치하면 앱 하나(아이콘 'bhc 교육게임')로 모든 게임이 열려요.

## 새 게임 넣는 법 (3단계)

1. 게임을 새 폴더에 올려요. 예: `sauce1/index.html`
2. 게임 HTML의 `</body>` 바로 앞에 한 줄을 넣어요.
   ```html
   <script src="../hub/link.js" defer></script>
   ```
   - 게임 목록에서 들어오면 첫 화면 오른쪽 위에 '🏠 게임 목록' 버튼이 생겨요.
   - 게임마다 있는 설치 버튼 · 설치 안내는 숨겨져요(설치는 허브 앱 하나로).
   - 첫 화면은 `#title.show`(3D 게임), `#scr-title`(버거)로 찾아요. 다른 모양이면 첫 화면 요소에 `data-hub-title`을 달아 주세요.
3. `hub/games.json`의 `games`에 한 줄을 더하고, 그림(900×415, JPG)을 `hub/img/`에 넣어요.
   ```json
   { "id": "sauce1", "cat": "chicken", "title": "소스 마스터", "ver": "1",
     "url": "sauce1/", "img": "hub/img/sauce1.jpg",
     "desc": "한 줄 설명", "tags": ["3D 조리", "8단계"],
     "record": { "type": "3d", "key": "bhc3d_sauce1_best" } }
   ```
   - 새 종류(예: 사이드 메뉴)는 `categories`에 `{ "id", "name", "icon", "desc" }`를 더하면 위쪽 종류 버튼이 자동으로 생겨요.
   - 같은 게임의 새 버전은 그 줄의 `url` · `ver` · `img`만 바꿔요(목록에는 최신 버전만).
   - `record.type`: `3d`(알싹킹 · 뿌링클 방식 `{pt, grade}`), `burger`(버거 방식 `{bestPt, unlocked}`). 없으면 지워도 돼요.

## 파일

- `/index.html` 게임 목록 화면 · `/manifest.webmanifest` 앱 정보 · `/sw.js` 서비스 워커(허브 파일만 저장, 게임 요청은 건드리지 않음)
- `/hub/games.json` 게임 목록 · `/hub/link.js` 게임 ↔ 목록 연결 · `/hub/img/` 카드 그림 · `/hub/icons/` 앱 아이콘
- 그림이나 아이콘을 바꾸면 `/sw.js`의 `CACHE` 이름 숫자를 올려 주세요(예: `bhc-hub-v2`).
