/* bhc 교육 게임 — 게임과 게임 목록(허브)을 잇는 작은 스크립트 (made by J.G)
   게임 HTML의 </body> 바로 앞에 한 줄만 넣으면 돼요:  <script src="../hub/link.js" defer></script>
   • 게임 목록에서 들어온 게임: 첫 화면 오른쪽 위에 '🏠 게임 목록' 버튼이 생겨요.
   • 게임 목록 앱 하나로 설치하므로, 게임마다 있는 설치 버튼 · 설치 안내는 숨겨요.
   첫 화면 찾기: #title.show (3D 게임) · #scr-title (버거) · [data-hub-title] (새 게임은 첫 화면에 이 표시를 달아 주세요). */
(function () {
  var fromHub = /[?&]from=hub(&|#|$)/.test(location.search);
  try { if (fromHub) sessionStorage.setItem('bhc_hub', '1'); else fromHub = sessionStorage.getItem('bhc_hub') === '1'; } catch (e) { }
  if (!fromHub) return;
  var de = document.documentElement; de.classList.add('from-hub');
  var st = document.createElement('style');
  st.textContent =
    'html.from-hub #a2hsBtn,html.from-hub #btn-install{display:none!important}' +
    '#hubBack{position:fixed;z-index:2147483646;top:calc(env(safe-area-inset-top,0px) + 12px);right:calc(env(safe-area-inset-right,0px) + 12px);' +
    'display:none;align-items:center;gap:6px;min-height:44px;padding:0 16px;border-radius:99px;background:#fffdf6;color:#10213a;border:3px solid #10213a;' +
    'box-shadow:0 4px 0 #10213a;font:800 15px/1 "Pretendard Variable",Pretendard,"Apple SD Gothic Neo","Noto Sans KR","Malgun Gothic",system-ui,sans-serif;' +
    'text-decoration:none;white-space:nowrap;-webkit-tap-highlight-color:transparent}' +
    '#hubBack.on{display:inline-flex}#hubBack:active{transform:translateY(3px);box-shadow:0 1px 0 #10213a}' +
    '#hubBack:focus-visible{outline:3px solid #ff7a1a;outline-offset:3px}';
  document.head.appendChild(st);
  var a = document.createElement('a');
  a.id = 'hubBack'; a.href = new URL('../', location.href).href; a.textContent = '🏠 게임 목록';
  a.setAttribute('aria-label', '게임 목록으로 돌아가기');
  document.body.appendChild(a);
  var TITLE = ['#title.show', '#scr-title:not([hidden])', '[data-hub-title]:not([hidden])'];
  function tick() {
    var on = TITLE.some(function (s) { var e = document.querySelector(s); return !!e && e.getClientRects().length > 0; });
    a.classList.toggle('on', on);
    var o = document.getElementById('a2hs'); if (o && o.classList.contains('show') && !o.dataset.hubKeep) o.classList.remove('show');
  }
  tick(); setInterval(tick, 400);
})();
