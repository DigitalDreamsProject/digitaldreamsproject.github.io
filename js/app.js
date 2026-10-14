(function () {
  var G = window.GAMES || [];
  var $ = function (s) { return document.querySelector(s); };
  var PLAY = '<svg viewBox="0 0 24 24"><path d="M6 3v18l15-9z"/></svg>';
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); };
  var link = function (g) { return 'play.html?g=' + encodeURIComponent(g.id); };

  var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

  function card(g) {
    return '<a class="card" href="' + link(g) + '" data-title="' + esc((g.title + ' ' + g.tags.join(' ')).toLowerCase()) + '" data-cat="' + esc(g.category) + '">' +
      '<div class="thumb"><img loading="lazy" src="' + g.thumb + '" alt="' + esc(g.title) + ' thumbnail">' +
      '<div class="hov"><span>' + PLAY + ' Play now</span></div></div>' +
      '<div class="meta"><h3>' + esc(g.title) + '</h3><p>' + esc(g.short) + '</p></div></a>';
  }
  var soon = '<div class="card soon" data-soon><div><div class="ic">🚀</div><b>More games coming soon</b><span>New dreams are being built</span></div></div>';

  var grid = $('#grid');

  /* ---------- SEARCH (works on every page) ---------- */
  var q = $('#q'), box = $('#searchBox'), homeFilter = null;
  function find(t) { t = t.trim().toLowerCase(); return G.filter(function (g) { return (g.title + ' ' + g.tags.join(' ') + ' ' + g.short + ' ' + g.category).toLowerCase().indexOf(t) > -1; }); }
  if (q && box) {
    var drop = document.createElement('div'); drop.className = 'sdrop'; box.appendChild(drop);
    var showDrop = function () {
      var t = q.value.trim(); if (!t) { drop.classList.remove('open'); return; }
      var r = find(t);
      drop.innerHTML = r.length ? r.map(function (g) { return '<a href="' + link(g) + '"><img src="' + g.thumb + '" alt=""><span><b>' + esc(g.title) + '</b><small>' + esc(g.category) + '</small></span></a>'; }).join('') : '<div class="none">😕 No games found</div>';
      drop.classList.add('open');
    };
    q.addEventListener('input', function () { showDrop(); if (homeFilter) homeFilter(q.value); });
    q.addEventListener('focus', showDrop);
    q.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { drop.classList.remove('open'); q.blur(); }
      if (e.key === 'Enter') {
        e.preventDefault(); var t = q.value.trim(); if (!t) return;
        if (homeFilter) { homeFilter(t); drop.classList.remove('open'); $('#games').scrollIntoView({ behavior: 'smooth' }); }
        else location.href = 'index.html?q=' + encodeURIComponent(t) + '#games';
      }
    });
    document.addEventListener('click', function (e) { if (!box.contains(e.target)) drop.classList.remove('open'); });
  }

  /* ---------- HOME ---------- */
  var hero = $('#hero');
  if (hero) {
    var f = G.filter(function (g) { return g.featured; })[0] || G[0];
    hero.innerHTML =
      '<div><span class="pill"><b></b> Free to play · No sign-up</span>' +
      '<h1>Play. Dream. <span>Level up.</span></h1>' +
      '<p class="lead">Welcome to Digital Dreams Project — a home for fast, fun browser games. Pick a thumbnail and jump straight in.</p>' +
      '<div class="btns"><a class="btn primary" href="' + link(f) + '">' + PLAY + ' Play ' + esc(f.title.split(' ').slice(0, 2).join(' ')) + '</a><a class="btn ghost" href="#games">Browse games</a></div>' +
      '<div class="stats"><div><b>' + G.length + '</b><span>Games</span></div><div><b>' + (f.levels || '∞') + '</b><span>Levels</span></div><div><b>0 $</b><span>Cost</span></div></div></div>' +
      '<a class="feature" href="' + link(f) + '"><span class="badge">⭐ Featured</span><div class="in"><img src="' + f.thumbLarge + '" alt="' + esc(f.title) + '"><div class="play"><div class="bigplay">' + PLAY.replace('<svg', '<svg') + '</div></div></div></a>';

    var cats = ['All'];
    G.forEach(function (g) { if (cats.indexOf(g.category) < 0) cats.push(g.category); });
    $('#chips').innerHTML = cats.map(function (c, i) { return '<button class="chip' + (i ? '' : ' on') + '" data-c="' + esc(c) + '">' + esc(c) + '</button>'; }).join('');
    var cat = 'All', term = '';
    function render() {
      var list = G.filter(function (g) {
        return (cat === 'All' || g.category === cat) && (g.title + ' ' + g.tags.join(' ') + ' ' + g.short).toLowerCase().indexOf(term) > -1;
      });
      grid.innerHTML = list.map(card).join('') + (cat === 'All' && !term ? soon : '');
      $('#empty').style.display = list.length ? 'none' : 'block';
    }
    $('#chips').addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      document.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on'); cat = b.dataset.c; render();
    });
    homeFilter = function (v) { term = v.trim().toLowerCase(); render(); };
    var qs = new URLSearchParams(location.search).get('q');
    if (qs && q) { q.value = qs; term = qs.trim().toLowerCase(); }
    render();
    return;
  }

  /* ---------- PLAY PAGE ---------- */
  var app = $('#app');
  if (app) {
    var id = new URLSearchParams(location.search).get('g');
    var g = G.filter(function (x) { return x.id === id; })[0];
    if (!g) { app.innerHTML = '<div class="panel" style="grid-column:1/-1;text-align:center"><h3>Game not found</h3><a class="btn primary" href="index.html">Back to games</a></div>'; return; }
    document.title = 'Play ' + g.title + ' – Digital Dreams Project';
    app.innerHTML =
      '<div class="stage">' +
        '<div class="screen" id="screen" style="aspect-ratio:' + g.aspect + '">' +
          '<div class="loader" id="loader"><div class="box"><img src="' + g.thumb + '" alt=""><div class="bar"><i></i></div><div style="color:#cfc8ff;font-weight:600">Loading ' + esc(g.title) + '…</div></div></div>' +
          '<iframe id="frame" title="' + esc(g.title) + '" allow="autoplay; fullscreen; gamepad" allowfullscreen></iframe>' +
        '</div>' +
        '<div class="bar2"><img src="' + g.thumb + '" alt=""><div><h1>' + esc(g.title) + '</h1><small>' + esc(g.category) + ' · Digital Dreams Project</small></div><span class="sp"></span>' +
          '<button class="ibtn" id="restart" title="Reload game" aria-label="Reload game"><svg viewBox="0 0 24 24"><path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/></svg></button>' +
          '<button class="ibtn" id="fs" title="Fullscreen" aria-label="Fullscreen"><svg viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></button>' +
        '</div>' +
      '</div>' +
      '<aside class="side">' +
        '<div class="panel"><h3>About this game</h3><p>' + esc(g.description) + '</p></div>' +
        '<div class="panel"><h3>⌨️ Controls</h3><div class="keys">' + g.controls.map(function (c) { return '<div><kbd>' + esc(c[0]) + '</kbd>' + esc(c[1]) + '</div>'; }).join('') + '</div></div>' +
        '<div class="panel"><h3>💡 Tip</h3><p>Click inside the game once so your keyboard works. Choose a level on the menu to begin.</p></div>' +
      '</aside>';

    var frame = $('#frame'), loader = $('#loader'), screen = $('#screen');
    function load() { loader.classList.remove('hide'); frame.src = g.path; }
    frame.addEventListener('load', function () {
      setTimeout(function () { loader.classList.add('hide'); }, 400);
      try { frame.contentWindow.focus(); } catch (e) {}
    });
    screen.addEventListener('click', function () { try { frame.contentWindow.focus(); } catch (e) {} });
    $('#restart').onclick = function () { frame.src = 'about:blank'; setTimeout(load, 50); };
    $('#fs').onclick = function () {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (screen.requestFullscreen) screen.requestFullscreen();
      else if (screen.webkitRequestFullscreen) screen.webkitRequestFullscreen();
    };
    document.addEventListener('fullscreenchange', function () { try { frame.contentWindow.focus(); } catch (e) {} });
    load();

    var others = G.filter(function (x) { return x.id !== g.id; });
    grid.innerHTML = others.map(card).join('') + soon;
    // stop game keys from scrolling the parent page
    window.addEventListener('keydown', function (e) { if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.key) > -1 && document.activeElement === frame) e.preventDefault(); });
  }
})();
