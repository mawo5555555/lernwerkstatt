'use strict';
const $ = s => document.querySelector(s);
const KEY = 'wt-state-v1';
const VERSION = '1.1';
let S;
try { S = JSON.parse(localStorage.getItem(KEY)) } catch (e) {}
S = Object.assign({points: 0, days: [], done: {}, stars: {}, miss: {}, log: [], ratings: [], theme: 'simson', subj: 'mathe', name: '', daily: {}}, S || {});
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)) } catch (e) {} };
const pad = n => String(n).padStart(2, '0');
const ymd = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const today = () => ymd(new Date());
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
const rich = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a };

let view = 'home', run = null, timers = [], audioCtx = null, mediaUrl = null;
const clearTimers = () => { timers.forEach(t => { clearTimeout(t); clearInterval(t) }); timers = [];
  if (mediaUrl) { URL.revokeObjectURL(mediaUrl); mediaUrl = null } };
const later = (f, ms) => { const t = setTimeout(f, ms); timers.push(t); return t };

// ---- Aufgaben-Index (für Boxenstopp)
const QT = ['quiz', 'num', 'text', 'match', 'order', 'parts'];
const QIDX = {};
MISSIONS.forEach(m => m.steps.forEach((s, i) => { if (QT.includes(s.type) && (s.type !== 'parts' || s.ask)) { s.qid = m.id + '#' + i; QIDX[s.qid] = {m, s} } }));
const SUBJ_ORDER = ['mathe', 'deutsch', 'englisch', 'nawi'];
const byS = k => [...MISSIONS.filter(m => m.subject === k && !m.speech), ...MISSIONS.filter(m => m.subject === k && m.speech)];
const missCount = () => Object.keys(S.miss).filter(q => QIDX[q]).length;

function streak() {
  let n = 0; const d = new Date();
  const has = x => S.days.includes(ymd(x));
  if (!has(d)) d.setDate(d.getDate() - 1);
  while (has(d)) { n++; d.setDate(d.getDate() - 1) }
  return n;
}
const dayIdx = () => { const d = new Date(); return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5) };
const doneToday = id => S.log.some(e => e.d === today() && e.id === id);
const pickFor = k => { const l = byS(k); return l.find(m => !S.done[m.id]) || l.slice().sort((a, b) => (S.stars[a.id] || 0) - (S.stars[b.id] || 0))[0] || l[0] };
function plan() {
  if (S.daily.d !== today()) {
    const k = SUBJ_ORDER[dayIdx() % 4], k2 = SUBJ_ORDER[(dayIdx() + 1) % 4];
    S.daily = {d: today(), main: pickFor(k).id, bonus: pickFor(k2).id}; save();
  }
  return {main: MISSIONS.find(m => m.id === S.daily.main), bonus: MISSIONS.find(m => m.id === S.daily.bonus)};
}
const theme = id => THEMES[id];
function setAccent(c) { document.documentElement.style.setProperty('--ac', c) }
const starStr = n => '★'.repeat(n) + '☆'.repeat(3 - n);

function go(v) { clearTimers(); run = null; view = v; render() }

function render() {
  const a = $('#app');
  const tabs = [['home', '🏠', 'Heute'], ['missions', '📚', 'Lernen'], ['garage', '🏁', 'Garage'], ['parents', '👪', 'Eltern']];
  $('#tab').innerHTML = tabs.map(t => `<button class="${view === t[0] ? 'on' : ''}" onclick="go('${t[0]}')"><span>${t[1]}</span>${t[2]}</button>`).join('');
  $('#tab').style.display = view === 'run' ? 'none' : 'flex';
  if (view === 'home') { const p = plan(); setAccent(SUBJECTS[p.main.subject].color); a.innerHTML = home(p) }
  else if (view === 'missions') { setAccent(SUBJECTS[S.subj].color); a.innerHTML = missions() }
  else if (view === 'garage') { setAccent('#e0b43a'); a.innerHTML = garage() }
  else if (view === 'parents') { setAccent('#3b8cff'); a.innerHTML = parents() }
  else if (view === 'run') step();
  window.scrollTo(0, 0);
}

const mItem = (m, tag = '') => { const t = theme(m.theme), n = S.stars[m.id] || 0, d = S.done[m.id] || 0;
  return `<button class="item" onclick="start('${m.id}')"><div class="dot" style="background:${t.color}33">${t.emoji}</div>
  <div style="flex:1"><b>${esc(m.title)}</b><span class="m">${esc(m.sub)} · ${m.min} Min.${tag}</span></div>
  ${d ? (m.speech ? `<span class="done">✓ ${d}×</span>` : `<span class="stars">${starStr(n)}</span>`) : ''}</button>`; };

function home(p) {
  const m = p.main, sub = SUBJECTS[m.subject], t = theme(m.theme), st = streak(), done = doneToday(m.id);
  const g = [...GARAGE].reverse().find(x => S.points >= x.need);
  const nxt = GARAGE.find(x => x.need > S.points);
  const bonusDone = doneToday(p.bonus.id), box = missCount();
  const hour = new Date().getHours(), hi = hour < 11 ? 'Guten Morgen' : hour < 18 ? 'Hallo' : 'Guten Abend';
  return `<div class="top"><div><div class="m">${new Date().toLocaleDateString('de-DE', {weekday: 'long', day: 'numeric', month: 'long'})}</div><h1>${hi}${S.name ? ', ' + esc(S.name) : ''}!</h1></div></div>
  <div class="chips"><span class="chip">🔥 ${st} ${st === 1 ? 'Tag' : 'Tage'}</span><span class="chip">⭐ ${S.points} Punkte</span></div>
  <div class="hero"><img class="heroimg" src="img/m-${m.id}.jpg" alt="" onerror="this.remove()"><div class="m" style="color:rgba(255,255,255,.85)">Mission des Tages · ${sub.emoji} ${sub.long} · ${m.min} Min.</div>
    <h3>${t.emoji} ${esc(m.title)}</h3><p>${esc(m.sub)}</p>
    <button class="btn" onclick="start('${m.id}')">${done ? 'Heute geschafft ✓ · nochmal' : 'Los geht’s'}</button></div>
  <h2>Noch mehr?</h2>
  <button class="item" onclick="start('${p.bonus.id}')"><div class="dot" style="background:${SUBJECTS[p.bonus.subject].color}33">${SUBJECTS[p.bonus.subject].emoji}</div><div style="flex:1"><b>Bonus: ${esc(p.bonus.title)}</b><span class="m">${SUBJECTS[p.bonus.subject].long} · ${p.bonus.min} Min.</span></div>${bonusDone ? '<span class="done">✓</span>' : ''}</button>
  ${box ? `<button class="item" onclick="startBox()"><div class="dot" style="background:#ff453a33">🏁</div><div style="flex:1"><b>Boxenstopp</b><span class="m">${box} Aufgaben zum Wiederholen</span></div></button>` : ''}
  <h2>Deine Fächer</h2>
  <div class="grid">${SUBJ_ORDER.map(k => { const v = SUBJECTS[k], l = byS(k), d = l.filter(x => S.done[x.id]).length, g2 = l.filter(x => (S.stars[x.id] || 0) >= 2).length;
    return `<button class="th" style="border-color:${v.color}55" onclick="S.subj='${k}';save();go('missions')"><div class="e">${v.emoji}</div><b>${v.name}</b>
    <span class="m">${d} von ${l.length} Missionen</span><div class="bar" style="margin-top:8px"><i style="width:${Math.max(3, 100 * g2 / l.length)}%;background:${v.color}"></i></div></button>`; }).join('')}</div>
  <h2>Deine Garage</h2>
  <div class="card gcard" onclick="go('garage')"><div class="gimg">${gimg(g)}</div><div style="flex:1"><b>${esc(g.name)}</b>
  ${nxt ? `<div class="m">Noch ${nxt.need - S.points} Punkte bis ${esc(nxt.name)}</div><div class="bar" style="margin-top:8px"><i style="width:${Math.max(4, 100 * (S.points - g.need) / (nxt.need - g.need))}%"></i></div>` : '<div class="m">Alles freigeschaltet!</div>'}</div></div>`;
}
const gimg = g => `<img src="${g.img}" alt="" onerror="this.replaceWith(document.createTextNode('${g.emoji}'))">`;

function missions() {
  const list = byS(S.subj); let last = '', out = '';
  list.forEach(m => { if (m.topic !== last) { out += `<h2>${esc(m.topic)}</h2>`; last = m.topic } out += mItem(m); });
  const s = SUBJECTS[S.subj];
  return `<h1>${s.emoji} ${s.long}</h1><p class="m">Klasse 6 · Sterne gibt es für Aufgaben, die du gleich beim ersten Versuch löst.</p>
  <div class="chips2 wrap">${SUBJ_ORDER.map(k => `<button class="${S.subj === k ? 'on' : ''}" style="${S.subj === k ? 'border-color:' + SUBJECTS[k].color : ''}" onclick="S.subj='${k}';save();render()">${SUBJECTS[k].emoji} ${SUBJECTS[k].name}</button>`).join('')}</div>${out}`;
}

function garage() {
  return `<h1>Garage</h1><p class="m">Für jede Mission gibt es Punkte. Damit schaltest du neue Fahrzeuge frei.</p>
  ${GARAGE.map(g => `<div class="card gcard ${S.points < g.need ? 'lock' : ''}"><div class="gimg">${gimg(g)}</div><div><b>${esc(g.name)}</b><div class="m">${S.points < g.need ? '🔒 ab ' + g.need + ' Punkten' : esc(g.text)}</div></div></div>`).join('')}`;
}

function parents() {
  const days = [...Array(7)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - 6 + i); return d });
  const cnt = d => S.log.filter(e => e.d === ymd(d)).length;
  const r = S.ratings.slice(-10);
  const avg = r.length ? (r.reduce((a, b) => a + b.score, 0) / r.length).toFixed(1) : '–';
  const rows = SUBJ_ORDER.map(k => { const v = SUBJECTS[k], l = byS(k).filter(m => !m.speech), d = l.filter(m => S.done[m.id]), st = d.filter(m => S.stars[m.id]);
    const a = st.length ? (st.reduce((x, m) => x + S.stars[m.id], 0) / st.length).toFixed(1) : '–';
    return `<div class="row sp" style="padding:6px 0"><span>${v.emoji} <b>${v.name}</b></span><span class="m">${d.length} von ${l.length} Missionen · Ø ${a} Sterne</span></div>`; }).join('');
  const weak = {}; Object.entries(S.miss).forEach(([q, n]) => { if (QIDX[q]) { const m = QIDX[q].m; weak[m.title + ' (' + SUBJECTS[m.subject].name + ')'] = (weak[m.title + ' (' + SUBJECTS[m.subject].name + ')'] || 0) + n } });
  const wk = Object.entries(weak).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const plans = SUBJ_ORDER.map(k => `<details class="card"><summary><b>${SUBJECTS[k].emoji} ${SUBJECTS[k].long}</b></summary>${byS(k).map(m => `<p class="m"><b style="color:var(--t)">${esc(m.title)}:</b> ${esc(m.rlp)}</p>`).join('')}</details>`).join('');
  return `<h1>Eltern</h1><p class="m">Überblick über Fortschritt und Themen. Sprachaufnahmen werden nicht gespeichert.</p>
  <div class="card"><b>Letzte 7 Tage</b><div class="week">${days.map(d => `<div><i style="height:${cnt(d) * 26 + 4}px"></i>${d.toLocaleDateString('de-DE', {weekday: 'short'}).slice(0, 2)}</div>`).join('')}</div>
  <div class="m">Serie: ${streak()} Tage · Missionen gesamt: ${Object.values(S.done).reduce((a, b) => a + b, 0)}</div></div>
  <div class="card"><b>Fächer</b>${rows}</div>
  <div class="card"><b>Das fällt noch schwer</b>${wk.length ? wk.map(w => `<div class="row sp" style="padding:6px 0"><span>${esc(w[0])}</span><span class="m">${w[1]}×</span></div>`).join('') + '<p class="m">Diese Aufgaben kommen im Boxenstopp noch einmal dran.</p>' : '<p class="m">Noch nichts. Gut so.</p>'}</div>
  ${r.length ? `<div class="card"><b>Gefühl beim Sprechen (1–5)</b><p class="m">Durchschnitt der letzten ${r.length} Einträge: <b style="color:var(--t)">${avg}</b></p></div>` : ''}
  <h2>Lehrplan-Bezug</h2>${plans}
  <div class="card"><b>Tipps</b><p class="m">• Erst zuhören, ausreden lassen, Zeit geben.<br>• Fehler als Hinweis sehen: Im Boxenstopp wird geübt, was nicht gleich klappte.<br>• Anstrengung loben, nicht nur Ergebnisse.<br>• Zehn bis fünfzehn Minuten täglich sind besser als eine lange Stunde.</p></div>
  <div class="card"><b>Name in der App</b><input id="nm" value="${esc(S.name)}" placeholder="Vorname (optional)" style="width:100%;margin-top:8px;padding:12px;border-radius:12px;border:0;background:var(--card2);color:var(--t);font:inherit" onchange="S.name=this.value.trim().slice(0,20);save()"></div>
  <div class="card"><b>Version</b><p class="m">Werkstatt Klasse 6, Version ${VERSION}. Missionen: ${MISSIONS.length}.</p></div>
  <div class="card"><b>Synchronisation</b><p class="m">Noch nicht aktiv. Der Fortschritt liegt nur auf diesem Gerät.</p></div>
  <button class="btn alt" onclick="if(confirm('Wirklich alle Fortschritte löschen?')){S.points=0;S.days=[];S.done={};S.stars={};S.miss={};S.log=[];S.ratings=[];S.daily={};save();render()}">Fortschritt zurücksetzen</button>`;
}

// ---- Mission ablaufen lassen
function start(id) {
  clearTimers();
  const m = MISSIONS.find(x => x.id === id);
  run = {m, i: 0, ok: 0, tot: 0, score: 0, steps: [...m.steps, ...(m.speech ? [{type: 'rate'}] : [])]};
  view = 'run'; setAccent(theme(m.theme).color); render();
}
function startBox() {
  clearTimers();
  let ids = Object.keys(S.miss).filter(q => QIDX[q]).sort((a, b) => S.miss[b] - S.miss[a]).slice(0, 6);
  if (ids.length < 4) shuffle(Object.keys(QIDX).filter(q => S.done[QIDX[q].m.id] && !ids.includes(q))).slice(0, 6 - ids.length).forEach(q => ids.push(q));
  if (!ids.length) { alert('Noch nichts zu wiederholen. Schließe zuerst eine Mission ab.'); return }
  const steps = [{type: 'wissen', title: 'Boxenstopp', text: 'Hier kommen Aufgaben dran, die beim ersten Mal nicht gleich geklappt haben. Nimm dir Zeit. Wenn du sie jetzt sicher löst, sind sie bald erledigt.'}, ...shuffle(ids).map(q => QIDX[q].s)];
  run = {m: {id: 'box', theme: 'sport', title: 'Boxenstopp', steps}, i: 0, ok: 0, tot: 0, score: 0, steps};
  view = 'run'; setAccent(theme('sport').color); render();
}
const next = () => { clearTimers(); run.i++; step() };
function step() {
  const a = $('#app'), s = run.steps[run.i], n = run.steps.length;
  if (run.i >= n) return finish();
  const head = `<div class="nav"><button class="back" onclick="if(confirm('Mission beenden?'))go('home')">✕</button><div class="steps">${run.steps.map((_, k) => `<i class="${k <= run.i ? 'on' : ''}"></i>`).join('')}</div></div>`;
  run.cur = {tries: 0, done: false};
  a.innerHTML = head + STEP[s.type](s);
  if (INIT[s.type]) INIT[s.type](s);
  window.scrollTo(0, 0);
}
const nextBtn = (label = 'Weiter', dis = false) => `<button class="btn" id="nx" ${dis ? 'disabled' : ''} onclick="next()">${label}</button>`;
const fb = (cls, html) => { const e = $('#fb'); if (e) e.innerHTML = `<div class="fb ${cls}">${html}</div>` };

// Antwort werten: nur der erste Versuch zählt für Sterne und Boxenstopp
function scoreQ(ok) {
  const s = run.steps[run.i]; run.tot++;
  if (ok) { run.ok++; if (s.qid && S.miss[s.qid]) { S.miss[s.qid]--; if (S.miss[s.qid] <= 0) delete S.miss[s.qid] } }
  else if (s.qid) S.miss[s.qid] = (S.miss[s.qid] || 0) + 1;
  save();
}
function qDone() { run.cur.done = true; const b = $('#nx'); if (b) { b.disabled = false; b.scrollIntoView({block: 'nearest', behavior: 'smooth'}) } const c = $('#chk'); if (c) c.style.display = 'none' }
const norm = (s, cs) => { s = String(s).normalize('NFC').trim().replace(/[.,!?;:„“"’']/g, '').replace(/\s+/g, ' '); return cs ? s : s.toLowerCase() };
const parseNum = s => { s = String(s).replace(/\s/g, '').replace(/[^\d.,\-]/g, ''); if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) s = s.replace(/\./g, ''); return Number(s.replace(',', '.')) };

const STEP = {
  wissen: s => `<h1>${esc(s.title)}</h1>${s.svg ? `<div class="card art">${SVGS[s.svg]}</div>` : ''}<div class="card"><p>${rich(s.text)}</p></div>${s.fact ? `<div class="card fact"><b>💡 Wusstest du?</b><p class="m" style="color:var(--t)">${rich(s.fact)}</p></div>` : ''}${nextBtn()}`,
  quiz: s => { run.cur.order = shuffle(s.opts.map((_, i) => i));
    return `<div class="q">${rich(s.q)}</div>${run.cur.order.map(i => `<button class="opt" id="o${i}" onclick="qpick(${i})">${esc(s.opts[i])}</button>`).join('')}<div id="fb"></div>${nextBtn('Weiter', true)}`; },
  num: s => `<div class="q">${rich(s.q)}</div><div class="row"><input id="in" class="in" inputmode="decimal" autocomplete="off" placeholder="Antwort" onkeydown="if(event.key==='Enter')ncheck()"><span class="m">${esc(s.unit || '')}</span></div><div id="fb"></div>
    <button class="btn" id="chk" onclick="ncheck()">Prüfen</button>${nextBtn('Weiter', true)}`,
  text: s => `<div class="q">${rich(s.q)}</div><input id="in" class="in" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Antwort" onkeydown="if(event.key==='Enter')tcheck()"><div id="fb"></div>
    <button class="btn" id="chk" onclick="tcheck()">Prüfen</button>${nextBtn('Weiter', true)}`,
  match: s => { run.cur.R = shuffle(s.pairs.map((_, i) => i)); run.cur.sel = null; run.cur.found = 0; run.cur.mist = 0;
    return `<h1>${esc(s.title)}</h1><p class="m">${esc(s.text || '')} Tippe links und rechts jeweils eins an.</p><div class="mt"><div>${s.pairs.map((p, i) => `<button class="mb" id="ml${i}" onclick="mpick('l',${i})">${esc(p[0])}</button>`).join('')}</div>
    <div>${run.cur.R.map(i => `<button class="mb" id="mr${i}" onclick="mpick('r',${i})">${esc(s.pairs[i][1])}</button>`).join('')}</div></div><div id="fb"></div>${nextBtn('Weiter', true)}`; },
  order: s => { run.cur.idx = shuffle(s.items.map((_, i) => i)); run.cur.got = []; run.cur.mist = 0;
    return `<h1>${esc(s.title)}</h1><p class="m">${esc(s.text || '')}</p><div class="card" id="oo" style="min-height:54px"><span class="m">Hier entsteht die richtige Reihenfolge …</span></div>
    <div id="op">${run.cur.idx.map(i => `<button class="mb wide" id="oi${i}" onclick="opick(${i})">${esc(s.items[i])}</button>`).join('')}</div><div id="fb"></div>${nextBtn('Weiter', true)}`; },
  parts: s => { const sp = SPOTS[s.svg]; run.cur.n = 0; run.cur.mist = 0; run.cur.todo = s.ask ? shuffle(sp.map((_, i) => i)) : []; run.cur.hit = [];
    return `<h1>${esc(s.title)}</h1><p class="m">${esc(s.text || '')}</p><div class="card art"><button class="zoomb" onclick="this.parentNode.classList.toggle('z');this.textContent=this.parentNode.classList.contains('z')?'🔍 Verkleinern':'🔍 Vergrößern'">🔍 Vergrößern</button><div class="pwo"><div class="pw">${SVGS[s.svg]}${sp.map((p, i) => `<button class="hs" id="hs${i}" style="left:${p.x}%;top:${p.y}%" onclick="hpick(${i})">${s.ask ? '' : i + 1}</button>`).join('')}</div></div></div>
    <div class="card" id="hi"><p class="m">${s.ask ? 'Los geht’s …' : 'Tippe auf die Zahlen und lerne die Teile kennen.'}</p></div><div id="fb"></div>${nextBtn('Weiter', !!s.ask)}`; },
  slider: s => `<h1>${esc(s.title)}</h1><p class="m">${esc(s.text || '')}</p>${s.sliders.map(x => `<div class="sld"><div class="row sp"><span>${esc(x.label)}</span><b id="sv_${x.id}"></b></div><input type="range" id="sr_${x.id}" min="${x.min}" max="${x.max}" step="${x.step}" value="${x.val}" oninput="slid()"></div>`).join('')}
    <div class="card lab" id="lab"></div>${nextBtn()}`,
  circuit: () => `<h1>Stromkreis-Labor</h1><p class="m">Schließe den Schalter und stecke etwas in die Lücke. Leuchtet die Lampe?</p><div class="card"><div id="cv"></div><div class="center" id="cs" style="font-weight:700"></div></div>
    <button class="btn alt" id="csw" onclick="cswitch()">Schalter einschalten</button><div class="chips2 wrap" id="cmat">${CMAT.map((m, k) => `<button onclick="cmat(${k})">${m[0]}</button>`).join('')}</div>${nextBtn()}`,
  reaction: () => `<h1>Reaktionstest</h1><p class="m">Tippe auf die Fläche, sobald sie grün wird. Nicht zu früh tippen!</p><button class="react" id="rx" onclick="rxTap()">Tippe zum Start</button><div class="center m" id="rr"></div>${nextBtn()}`,
  breath: s => `<h1>Tanken</h1><p class="m">${esc(s.text)}</p><div class="ring" id="ring">Gleich geht’s los</div><div class="center m" id="bc"></div>${nextBtn('Überspringen')}`,
  rhythm: s => `<h1>Gänge</h1><p class="m">${esc(s.text)}</p>
    <div class="chips2" id="gears"><button data-b="66" class="on">Gang 1</button><button data-b="84">Gang 2</button><button data-b="104">Gang 3</button></div>
    <div class="card">${s.lines.map((l, a) => `<div class="line">${l.map((y, b) => `<span class="syl" id="s${a}_${b}">${esc(y)}</span>`).join('')}</div>`).join('')}</div>
    <button class="btn alt" id="rs" onclick="rhythmToggle()">▶ Takt starten</button>${nextBtn()}`,
  soft: s => `<h1>Kaltstart</h1><p class="m">${esc(s.text)}</p>${s.lines.map((l, k) => `<div class="card"><div class="sl">${esc(l)}</div><div class="rev" id="rv${k}"><i></i></div><button class="btn alt" style="margin:6px 0 0;padding:12px" onclick="softGo(${k})">Sanft starten</button></div>`).join('')}${nextBtn()}`,
  phrase: s => `<h1>Schaltpause</h1><p class="m">${esc(s.text)}</p><div id="ph"></div>`,
  talk: s => `<h1>Los, erzähl!</h1><div class="card"><p style="font-size:20px;font-weight:600">${esc(s.prompt)}</p><p class="m">${esc(s.hint)}</p></div>
    <div class="card center"><div class="big" id="rc">🎙️</div><div class="m" id="rt">Aufnahme ist freiwillig und bleibt nur auf diesem Gerät.</div>
    <button class="btn alt" id="rb" onclick="recToggle()">Aufnehmen</button><div id="pl"></div></div>${nextBtn()}`,
  challenge: s => `<h1>${esc(s.title)}</h1><p class="m">${esc(s.text)}</p>${s.options.map((o, k) => `<button class="opt" onclick="pick(this,${k})">${esc(o)}</button>`).join('')}
    <p class="m">Mach es in deinem Tempo. Ob es klemmt oder nicht: Du hast es gemacht, das zählt.</p>${nextBtn('Heute erledigt ✓', true)}`,
  rate: () => `<h1>Wie war’s?</h1><p class="m">Wie entspannt hat sich das Sprechen heute angefühlt? Es gibt kein richtig oder falsch.</p>
    <div class="rate">${['😬', '😕', '😐', '🙂', '😎'].map((e, k) => `<button onclick="rate(${k + 1},this)">${e}</button>`).join('')}</div>
    <button class="btn" id="nx" disabled onclick="next()">Fertig</button>`
};

// ---- Aufgaben-Logik
function qpick(i) {
  const s = run.steps[run.i], c = run.cur; if (c.done) return;
  const el = $('#o' + i); c.tries++;
  if (i === 0) { el.classList.add('ok'); if (c.tries === 1) scoreQ(true); fb('good', c.tries === 1 ? '<b>Richtig!</b> ' + rich(s.why) : 'Jetzt stimmt es. ' + rich(s.why)); qDone(); return }
  el.classList.add('bad'); el.disabled = true;
  if (c.tries === 1) scoreQ(false);
  const left = c.order.filter(k => !$('#o' + k).disabled).length;
  if (c.tries >= 2 || left <= 1) { $('#o0').classList.add('ok'); document.querySelectorAll('.opt').forEach(x => x.disabled = true); fb('bad', '<b>Die richtige Antwort ist grün.</b> ' + rich(s.why)); qDone() }
  else fb('bad', 'Nicht ganz. Versuche es noch einmal.');
}
function ncheck() {
  const s = run.steps[run.i], c = run.cur, inp = $('#in'); if (c.done || !inp.value.trim()) return;
  const v = parseNum(inp.value), ok = isFinite(v) && Math.abs(v - s.a) <= (s.tol || 0) + 1e-9; c.tries++;
  if (c.tries === 1) scoreQ(ok);
  if (ok) { inp.disabled = true; fb('good', '<b>Richtig!</b> ' + rich(s.why)); qDone() }
  else if (c.tries >= 2) { inp.disabled = true; fb('bad', '<b>Die Lösung ist ' + de(s.a, 3) + (s.unit ? ' ' + esc(s.unit) : '') + '.</b> ' + rich(s.why)); qDone() }
  else { fb('bad', 'Noch nicht ganz. ' + esc(s.hint || 'Rechne noch einmal in Ruhe.')); inp.select() }
}
function tcheck() {
  const s = run.steps[run.i], c = run.cur, inp = $('#in'); if (c.done || !inp.value.trim()) return;
  const ok = s.a.some(a => norm(a, s.cs) === norm(inp.value, s.cs)); c.tries++;
  if (c.tries === 1) scoreQ(ok);
  if (ok) { inp.disabled = true; fb('good', '<b>Richtig!</b> ' + rich(s.why)); qDone() }
  else if (c.tries >= 2) { inp.disabled = true; fb('bad', '<b>Richtig wäre: ' + esc(s.a[0]) + '.</b> ' + rich(s.why)); qDone() }
  else { fb('bad', 'Noch nicht ganz. ' + esc(s.hint || 'Schau noch einmal genau hin.')); inp.select() }
}
function mpick(side, i) {
  const s = run.steps[run.i], c = run.cur, b = $('#m' + side + i); if (c.done || b.classList.contains('ok')) return;
  if (!c.sel || c.sel.side === side) { if (c.sel) $('#m' + c.sel.side + c.sel.i).classList.remove('sel'); c.sel = {side, i}; b.classList.add('sel'); return }
  const o = c.sel, ob = $('#m' + o.side + o.i); c.sel = null; ob.classList.remove('sel');
  if (o.i === i) { b.classList.add('ok'); ob.classList.add('ok'); c.found++;
    if (c.found === s.pairs.length) { scoreQ(c.mist <= 1); fb('good', c.mist === 0 ? '<b>Alles richtig!</b>' : 'Geschafft. Fehlversuche: ' + c.mist); qDone() } }
  else { c.mist++; b.classList.add('no'); ob.classList.add('no'); later(() => { b.classList.remove('no'); ob.classList.remove('no') }, 450) }
}
function opick(i) {
  const s = run.steps[run.i], c = run.cur, b = $('#oi' + i); if (c.done || b.disabled) return;
  const cand = c.got.concat(s.items[i]), seqs = [s.items, ...(s.alts || [])];
  if (seqs.some(q => cand.every((w, k) => q[k] === w))) { c.got = cand; b.disabled = true; b.classList.add('ok');
    $('#oo').innerHTML = cand.map((w, k) => `<div class="ordl"><b>${k + 1}</b> ${esc(w)}</div>`).join('');
    if (cand.length === s.items.length) { scoreQ(c.mist <= 1); fb('good', c.mist === 0 ? '<b>Alles richtig!</b>' : 'Geschafft. Fehlversuche: ' + c.mist); qDone() } }
  else { c.mist++; b.classList.add('no'); later(() => b.classList.remove('no'), 450) }
}
function hpick(i) {
  const s = run.steps[run.i], c = run.cur, sp = SPOTS[s.svg], b = i >= 0 ? $('#hs' + i) : null; if (c.done) return;
  if (i < 0) { askShow(); return }
  if (!s.ask) { document.querySelectorAll('.hs').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); $('#hi').innerHTML = `<b>${i + 1}. ${esc(sp[i].name)}${s.en && sp[i].en ? ' = ' + esc(sp[i].en) : ''}</b><p class="m" style="color:var(--t)">${esc(sp[i].info)}</p>`; return }
  if (c.hit.includes(i)) return;
  const want = c.todo[c.n];
  if (i === want) { c.hit.push(i); b.classList.add('ok'); b.textContent = '✓'; c.n++; if (c.n === sp.length) { scoreQ(c.mist <= 1); fb('good', c.mist === 0 ? '<b>Alles gefunden!</b>' : 'Geschafft. Fehlversuche: ' + c.mist); $('#hi').innerHTML = '<p class="m">Alle Teile gefunden.</p>'; qDone(); return } }
  else { c.mist++; b.classList.add('no'); later(() => b.classList.remove('no'), 450) }
  askShow();
}
function askShow() {
  const s = run.steps[run.i], c = run.cur, sp = SPOTS[s.svg];
  $('#hi').innerHTML = `<p class="q" style="margin:0">Tippe auf: <b>${esc(s.en && sp[c.todo[c.n]].en ? sp[c.todo[c.n]].en : sp[c.todo[c.n]].name)}</b></p><p class="m">${c.n} von ${sp.length} gefunden</p>`;
}
function slid() {
  const s = run.steps[run.i], v = {};
  s.sliders.forEach(x => { v[x.id] = +$('#sr_' + x.id).value; $('#sv_' + x.id).textContent = de(v[x.id], x.step < 1 ? 1 : 0) + x.unit });
  $('#lab').innerHTML = s.out(v);
}
const CMAT = [['Kupferdraht', true], ['Eisennagel', true], ['Alufolie', true], ['Gummiband', false], ['Holzstab', false], ['Glasstab', false], ['Plastiklineal', false]];
function circ() {
  const c = run.cur, lit = c.on && CMAT[c.m][1];
  $('#cv').innerHTML = `<svg viewBox="0 0 300 180" width="100%"><g fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round">
    <path d="M40 90 V40 H100"/><path d="M160 40 H260 V70"/><path d="M260 110 V140 H180"/><path d="M120 140 H40 V110"/>
    <line x1="100" y1="40" x2="${c.on ? 160 : 150}" y2="${c.on ? 40 : 14}"/></g>
    <line x1="22" y1="90" x2="58" y2="90" stroke="#fff" stroke-width="6"/><line x1="30" y1="104" x2="50" y2="104" stroke="#fff" stroke-width="3"/><text x="66" y="98" fill="#98989f" font-size="11">Batterie</text>
    <circle cx="260" cy="90" r="22" fill="${lit ? '#ffd60a' : '#2c2c2e'}" stroke="#fff" stroke-width="3"/>${lit ? '<circle cx="260" cy="90" r="34" fill="#ffd60a" opacity=".25"/>' : ''}
    <text x="214" y="132" fill="#98989f" font-size="11">Lampe</text>
    <rect x="120" y="133" width="60" height="14" rx="4" fill="${CMAT[c.m][1] ? '#c98a4b' : '#8e8e93'}"/><text x="150" y="170" text-anchor="middle" fill="#98989f" font-size="11">${CMAT[c.m][0]}</text></svg>`;
  $('#cs').innerHTML = lit ? '💡 Die Lampe leuchtet! Der Stromkreis ist geschlossen.' : !c.on ? 'Dunkel: Der Schalter ist offen.' : 'Dunkel: ' + CMAT[c.m][0] + ' leitet keinen Strom. Der Kreis ist unterbrochen.';
  $('#csw').textContent = c.on ? 'Schalter ausschalten' : 'Schalter einschalten';
  document.querySelectorAll('#cmat button').forEach((b, k) => b.classList.toggle('on', k === c.m));
}
function cswitch() { run.cur.on = !run.cur.on; circ() }
function cmat(k) { run.cur.m = k; circ() }
function rxTap() {
  const c = run.cur, b = $('#rx'), r = $('#rr'); c.best = c.best || 9999;
  if (c.st === 'wait') { clearTimers(); c.st = 'idle'; b.className = 'react'; b.textContent = 'Zu früh! Tippe zum Neustart'; return }
  if (c.st === 'go') { const ms = Math.round(performance.now() - c.t0); c.best = Math.min(c.best, ms); c.st = 'idle'; b.className = 'react'; b.textContent = ms + ' ms';
    r.innerHTML = `Beste Zeit: <b style="color:var(--t)">${c.best} ms</b> · Menschen reagieren meist in 200 bis 300 ms. Tippe für einen neuen Versuch.`; return }
  c.st = 'wait'; b.className = 'react wait'; b.textContent = 'Warte …';
  later(() => { c.st = 'go'; c.t0 = performance.now(); b.className = 'react go'; b.textContent = 'JETZT!' }, 1500 + Math.random() * 2500);
}

const INIT = {
  slider() { slid() },
  parts(s) { if (s.ask) hpick(-1) },
  circuit() { run.cur.on = false; run.cur.m = 3; circ() },
  reaction() { run.cur.st = 'idle' },
  breath(s) {
    const ring = $('#ring'), bc = $('#bc'); let r = 0;
    ring.style.transitionDuration = s.inSec + 's';
    const cycle = () => {
      if (r >= s.rounds) { ring.textContent = 'Geschafft'; ring.className = 'ring'; bc.textContent = ''; $('#nx').textContent = 'Weiter'; return }
      r++; bc.textContent = `Runde ${r} von ${s.rounds}`;
      ring.textContent = 'Einatmen'; ring.style.transitionDuration = s.inSec + 's'; ring.className = 'ring big';
      later(() => { ring.textContent = 'Ausatmen'; ring.style.transitionDuration = s.outSec + 's'; ring.className = 'ring small';
        later(cycle, s.outSec * 1000) }, s.inSec * 1000);
    };
    later(cycle, 600);
  },
  rhythm(s) {
    $('#gears').onclick = e => { const b = e.target.closest('button'); if (!b) return;
      document.querySelectorAll('#gears button').forEach(x => x.classList.remove('on')); b.classList.add('on'); if (R.on) { rhythmToggle(); rhythmToggle() } };
    R = {on: false, s};
  },
  phrase(s) { run.p = {a: 0, b: 0}; phraseShow(s) }
};
let R = {};
function click(accent) {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.frequency.value = accent ? 880 : 640; g.gain.setValueAtTime(.25, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(.001, audioCtx.currentTime + .08);
    o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime + .09);
  } catch (e) {}
}
function rhythmToggle() {
  const btn = $('#rs'); if (R.on) { clearTimers(); R.on = false; btn.textContent = '▶ Takt starten'; document.querySelectorAll('.syl').forEach(x => x.classList.remove('hot')); return }
  const bpm = +document.querySelector('#gears .on').dataset.b, seq = [];
  R.s.lines.forEach((l, a) => { l.forEach((_, b) => seq.push([a, b])); seq.push(null) });
  let k = 0; R.on = true; btn.textContent = '⏹ Stopp';
  const tick = () => {
    document.querySelectorAll('.syl').forEach(x => x.classList.remove('hot'));
    const q = seq[k % seq.length]; if (q) { $(`#s${q[0]}_${q[1]}`).classList.add('hot'); click(q[1] === 0) }
    k++; if (k > seq.length * 2) rhythmToggle();
  };
  tick(); timers.push(setInterval(tick, 60000 / bpm));
}
function softGo(k) {
  const el = $('#rv' + k); el.classList.remove('go'); void el.offsetWidth; el.classList.add('go');
}
function phraseShow(s) {
  const p = run.p, sent = s.sentences[p.a]; if (!sent) { $('#ph').innerHTML = `<div class="card center"><div class="big">👏</div><p>Alle Abschnitte geschafft!</p></div>${nextBtn()}`; return }
  $('#ph').innerHTML = `<div class="card"><div class="sl">${sent.map((c, k) => `<span class="${k === p.b ? 'c' : 'a'}">${esc(c)} </span>`).join('')}</div></div>
    <div class="ring" id="pr" style="width:110px;height:110px;font-size:16px;transition:none">${p.b + 1} / ${sent.length}</div>
    <button class="btn" id="pb" onclick="phraseNext()">Gesprochen · Pause</button>`;
  $('#ph .sl').classList.add('cur');
}
function phraseNext() {
  const p = run.p, s = run.steps[run.i], sent = s.sentences[p.a], pr = $('#pr'), pb = $('#pb');
  pb.disabled = true; pb.textContent = 'Schaltpause …'; pr.textContent = 'Atmen'; pr.style.transition = 'transform 1.4s'; pr.className = 'ring big'; pr.style.width = '110px'; pr.style.height = '110px';
  later(() => { p.b++; if (p.b >= sent.length) { p.b = 0; p.a++ } phraseShow(s) }, 1500);
}
let rec = null, chunks = [];
async function recToggle() {
  const b = $('#rb'), t = $('#rt');
  if (rec && rec.state === 'recording') { rec.stop(); return }
  try {
    const st = await navigator.mediaDevices.getUserMedia({audio: true});
    rec = new MediaRecorder(st); chunks = [];
    rec.ondataavailable = e => chunks.push(e.data);
    rec.onstop = () => { st.getTracks().forEach(x => x.stop()); if (mediaUrl) URL.revokeObjectURL(mediaUrl);
      mediaUrl = URL.createObjectURL(new Blob(chunks, {type: rec.mimeType}));
      $('#pl').innerHTML = `<audio controls src="${mediaUrl}"></audio>`; b.textContent = 'Nochmal aufnehmen'; t.textContent = 'Hör dir an, was dir gefällt. Das bleibt nur auf dem Gerät.'; $('#rc').textContent = '🎧' };
    rec.start(); b.textContent = '⏹ Stopp'; t.textContent = 'Läuft … sprich in deinem Tempo.'; $('#rc').textContent = '🔴';
  } catch (e) { t.textContent = 'Mikrofon nicht freigegeben. Kein Problem: Sprich einfach laut, dann geht’s weiter.' }
}
function pick(el) { document.querySelectorAll('.opt').forEach(x => x.classList.remove('on')); el.classList.add('on'); $('#nx').disabled = false; run.ch = el.textContent }
function rate(n, el) { document.querySelectorAll('.rate button').forEach(x => x.classList.remove('on')); el.classList.add('on'); run.score = n; $('#nx').disabled = false }

function finish() {
  const m = run.m, box = m.id === 'box', talk = m.steps.some(s => s.type === 'talk');
  let pts = (box ? 6 : 10) + 2 * run.ok;
  const perfect = run.tot > 0 && run.ok === run.tot; if (perfect && !box) pts += 5;
  if (m.speech) { if (m.skill === 'mut') pts += 5; if (talk) pts += 5 } else if (talk) pts += 3;
  const stars = m.speech || !run.tot ? 3 : run.ok / run.tot >= .85 ? 3 : run.ok / run.tot >= .6 ? 2 : 1;
  const before = S.points; S.points += pts;
  if (!box) { S.done[m.id] = (S.done[m.id] || 0) + 1; S.stars[m.id] = Math.max(S.stars[m.id] || 0, stars) }
  S.log.push({d: today(), id: m.id, s: stars}); S.log = S.log.slice(-500);
  if (!S.days.includes(today())) S.days.push(today());
  if (run.score) S.ratings.push({date: today(), id: m.id, score: run.score});
  save(); const st = streak();
  const unlocked = GARAGE.find(g => before < g.need && S.points >= g.need), mc = missCount();
  $('#app').innerHTML = `<div class="center" style="margin-top:34px"><div class="big">🏁</div><h1>${box ? 'Boxenstopp erledigt!' : 'Mission geschafft!'}</h1>
    ${run.tot ? `<div class="stars big2">${starStr(stars)}</div><p class="m">${run.ok} von ${run.tot} Aufgaben gleich beim ersten Versuch richtig.</p>` : ''}
    <p class="m">Du hast ${pts} Punkte geholt${st > 1 ? ' und ' + st + ' Tage in Folge gelernt' : ''}.</p></div>
    ${unlocked ? `<div class="card gcard"><div class="gimg">${gimg(unlocked)}</div><div><b>Neu in der Garage:</b><br>${esc(unlocked.name)}</div></div>` : ''}
    ${mc ? `<button class="btn alt" onclick="startBox()">Boxenstopp: ${mc} Aufgaben wiederholen</button>` : ''}
    <button class="btn" onclick="go('home')">Zurück</button>`;
  run = null; view = 'home'; $('#tab').style.display = 'flex';
}

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
render();
