// Garage: Fahrzeugseiten mit Steckbrief und Minispielen (Starten, Beschleunigen, Tanken, Waschen, Experten-Quiz, Teile)
// Fahrzeugdaten: specs = Steckbrief, race = vereinfachtes Schaltspiel, start = Startreihenfolge, trap = falscher Schritt mit Erklärung
const ST2T = ['Benzinhahn auf', 'Choke ziehen (Motor ist kalt)', 'Zündschlüssel einstecken und drehen', 'Leerlauf prüfen', 'Kickstarter kräftig durchtreten'];
const TRAP2T = ['Vollgas geben vor dem Kicken', 'Vollgas beim Kaltstart lässt den Motor absaufen. Erst kicken, dann vorsichtig Gas geben.'];
const STDIESEL = ['Schalthebel auf Leerlauf', 'Kupplung treten', 'Zündschlüssel auf Vorglühen', 'Warten, bis die Glühlampe ausgeht', 'Anlasser betätigen'];
const TRAPDIESEL = ['Choke ziehen', 'Ein Diesel hat keinen Choke. Er wird vorgeglüht.'];
const VEH = {
  g1: {kind: '2t', fuel: 'mix', tank: 8, spots: 'simson', start: ST2T, trap: TRAP2T, race: {g: 4, vmax: 60, idle: 1500, red: 7000, win: [5200, 6600]},
    specs: [['Hersteller', 'Simson, Suhl (Thüringen)'], ['Bauzeit', '1980 bis etwa 1990'], ['Motor', 'Einzylinder-Zweitakt, 49,6 cm³'], ['Leistung', 'ca. 3,7 PS'], ['Getriebe', '3 oder 4 Gänge'], ['Höchstgeschwindigkeit', '60 km/h'], ['Kraftstoff', 'Gemisch 1:50']],
    fact: 'Fast alle Ersatzteile für die S51 gibt es bis heute neu zu kaufen.',
    quiz: [Q('Welchen Kraftstoff tankt die S51?', 'Gemisch aus Benzin und Öl (1:50)', ['Diesel', 'Benzin ganz ohne Öl', 'Strom'], 'Zweitakter brauchen das Öl im Benzin zum Schmieren.'),
      Q('Wie schnell fährt eine originale S51?', 'etwa 60 km/h', ['etwa 25 km/h', 'etwa 100 km/h', 'etwa 130 km/h'], ''),
      Q('Wo wurde die S51 gebaut?', 'in Suhl', ['in Zwickau', 'in Hamburg', 'in München'], 'Simson saß in Suhl in Thüringen.'),
      Q('Wie viele Takte hat ihr Motor?', 'zwei', ['vier', 'sechs', 'keinen, er ist elektrisch'], '')]},
  g2: {kind: '4t', fuel: 'benzin', tank: 4, spots: 'rasenfront', start: ['Auf den Sitz setzen', 'Mähwerk ausschalten', 'Bremspedal treten', 'Choke ziehen', 'Zündschlüssel drehen'], trap: ['Mähwerk einschalten', 'Mit eingeschaltetem Mähwerk startet er aus Sicherheitsgründen gar nicht.'],
    race: {g: 3, vmax: 9, idle: 1500, red: 3600, win: [2700, 3400]},
    specs: [['Typ', 'Aufsitzmäher (Rasentraktor)'], ['Motor', 'Viertakt-Benzinmotor'], ['Leistung', 'typisch 12 bis 20 PS'], ['Schnittbreite', 'etwa 1 m'], ['Tempo', 'bis etwa 8 km/h'], ['Kraftstoff', 'Benzin, ohne Öl'], ['Sicherheit', 'Sitzschalter stoppt das Mähwerk']],
    fact: 'Der Viertakter hat sein Motoröl in der Ölwanne. Darum kommt kein Öl ins Benzin.',
    quiz: [Q('Was passiert, wenn du beim Mähen vom Sitz aufstehst?', 'Das Mähwerk schaltet sich ab.', ['Er fährt schneller.', 'Gar nichts.', 'Das Licht geht an.'], 'Der Sitzschalter schützt vor dem drehenden Messer.'),
      Q('Was kommt in den Tank?', 'Benzin ohne Öl', ['Gemisch 1:50', 'Diesel', 'Wasser'], 'Ein Viertakter schmiert sich mit eigenem Motoröl.'),
      Q('Wie fährt man mit dem Aufsitzmäher am Hang?', 'gerade hoch und runter', ['quer zum Hang', 'im Zickzack mit Vollgas', 'rückwärts mit laufendem Mähwerk'], 'Quer zum Hang kann er umkippen.'),
      Q('Woran erkennst du ein stumpfes Messer?', 'Die Grasspitzen sind ausgefranst und werden braun.', ['Der Rasen wird grüner.', 'Der Motor wird leiser.', 'Die Reifen werden weicher.'], '')]},
  g3: {kind: 'd', fuel: 'diesel', tank: 150, spots: 'traktor', start: STDIESEL, trap: TRAPDIESEL, race: {g: 4, vmax: 30, idle: 700, red: 2300, win: [1700, 2200]},
    specs: [['Hersteller', 'Traktorenwerk Schönebeck (DDR)'], ['Bauzeit', '1967 bis 1984'], ['Motor', 'Vierzylinder-Diesel'], ['Leistung', 'etwa 90 PS'], ['Höchstgeschwindigkeit', 'etwa 30 km/h'], ['Kraftstoff', 'Diesel']],
    fact: 'Viele ZT 300 arbeiten heute noch auf Höfen oder fahren bei Oldtimer-Treffen mit.',
    quiz: [Q('Welchen Kraftstoff braucht der ZT 300?', 'Diesel', ['Gemisch 1:50', 'Benzin', 'Holz'], ''),
      Q('Was macht man vor dem Starten eines alten Diesels?', 'vorglühen', ['Choke ziehen', 'Öl ins Benzin mischen', 'kicken'], 'Die Glühkerzen wärmen den Brennraum vor.'),
      Q('Wo wurde der ZT 300 gebaut?', 'in Schönebeck an der Elbe', ['in Suhl', 'in Hamburg', 'in Stuttgart'], ''),
      Q('Wie viele Zylinder hat sein Motor?', 'vier', ['einen', 'zwei', 'zwölf'], '')]},
  g4: {kind: 'd', fuel: 'diesel', tank: 200, spots: 'traktor', start: STDIESEL, trap: TRAPDIESEL, race: {g: 4, vmax: 40, idle: 800, red: 2400, win: [1800, 2300]},
    specs: [['Typ', 'Standardtraktor mit Kipp-Anhänger'], ['Motor', 'Vier- oder Sechszylinder-Diesel'], ['Leistung', 'oft 100 bis 200 PS'], ['Höchstgeschwindigkeit', 'meist 40 km/h'], ['Anhänger', 'Kipper für Getreide, Mais oder Rüben'], ['Wichtig', 'Mit Anhänger ist der Bremsweg viel länger']],
    fact: 'Über die Zapfwelle treibt der Traktor Geräte wie Pressen, Mähwerke oder Pumpen an.',
    quiz: [Q('Warum ist der Bremsweg mit vollem Anhänger länger?', 'Mehr Masse braucht mehr Kraft zum Abbremsen.', ['Der Anhänger zieht nach vorne.', 'Die Reifen werden größer.', 'Der Motor wird lauter.'], ''),
      Q('Wofür ist die Zapfwelle am Traktor?', 'Sie treibt Geräte wie Pressen oder Mähwerke an.', ['Sie hält den Anhänger fest.', 'Sie pumpt Diesel in den Tank.', 'Sie ist für das Radio.'], ''),
      Q('Wie heißt ein Anhänger, der die Ladung abkippen kann?', 'Kipper', ['Tieflader', 'Wohnwagen', 'Pflug'], ''),
      Q('Was fährt man im Herbst oft mit Traktor und Anhänger vom Feld?', 'gehäckselten Mais', ['Schnee', 'Fische', 'Autos'], 'Der Feldhäcksler bläst ihn direkt auf den Anhänger.')]},
  g9: {kind: '2t', fuel: 'mix', tank: 7, spots: 'sr50', start: ST2T, trap: TRAP2T, race: {g: 4, vmax: 60, idle: 1500, red: 7000, win: [5200, 6600]},
    specs: [['Hersteller', 'Simson, Suhl'], ['Bauzeit', 'ab 1986'], ['Motor', 'Einzylinder-Zweitakt, 49,6 cm³'], ['Leistung', 'ca. 3,7 PS'], ['Höchstgeschwindigkeit', '60 km/h'], ['Räder', '12 Zoll'], ['Kraftstoff', 'Gemisch 1:50']],
    fact: 'Es gab auch den großen Bruder SR80 mit 80 cm³.',
    quiz: [Q('Was hat der SR50, was die S51 nicht hat?', 'ein Trittbrett und eine Verkleidung', ['einen Dieselmotor', 'vier Räder', 'einen Elektromotor'], ''),
      Q('Wie groß sind die Räder des SR50?', '12 Zoll', ['16 Zoll', '20 Zoll', '8 Zoll'], 'Die S51 hat 16-Zoll-Räder.'),
      Q('Welches Mischverhältnis tankt der SR50?', '1:50', ['1:5', '1:500', 'gar kein Öl'], ''),
      Q('Wie hieß der große Bruder?', 'SR80 mit 80 cm³', ['SR125 Diesel', 'SR50 Turbo', 'SR300'], '')]},
  g5: {kind: 'd', fuel: 'diesel', tank: 300, start: ['Dreschwerk und Schneidwerk aus', 'Fahrhebel auf Neutral', 'Zündschlüssel auf Vorglühen', 'Warten, bis die Glühlampe ausgeht', 'Anlasser betätigen'], trap: ['Schneidwerk beim Starten einschalten', 'Erst wenn der Motor läuft und alles frei ist, wird das Schneidwerk eingeschaltet.'],
    race: {g: 3, vmax: 20, idle: 800, red: 2400, win: [1800, 2300]},
    specs: [['Hersteller', 'Fortschritt (DDR)'], ['Bauzeit', '1968 bis 1987'], ['Motor', 'Sechszylinder-Diesel'], ['Leistung', 'etwa 105 PS'], ['Schnittbreite', 'etwa 5,7 m'], ['Tempo', 'etwa 20 km/h'], ['Aufgabe', 'Mähen, Dreschen und Körner sammeln in einem']],
    fact: 'Der E 512 war einer der meistgebauten Mähdrescher der DDR.',
    quiz: [Q('Was macht ein Mähdrescher?', 'Getreide mähen und dreschen', ['Gras häckseln', 'Kühe melken', 'Gülle fahren'], ''),
      Q('Wo landen die Körner?', 'im Korntank', ['im Auspuff', 'auf dem Dach', 'im Kühler'], ''),
      Q('Wie heißt der vordere Teil, der das Getreide abschneidet?', 'Schneidwerk', ['Lenkrad', 'Zapfwelle', 'Kotflügel'], ''),
      Q('Was bleibt beim Dreschen übrig und wird oft zu Ballen gepresst?', 'Stroh', ['Mehl', 'Mais', 'Sand'], '')]},
  g6: {kind: '2t', fuel: 'mix', tank: 7, start: ST2T, trap: TRAP2T, race: {g: 4, vmax: 60, idle: 1500, red: 7000, win: [5200, 6600]},
    specs: [['Hersteller', 'Simson, Suhl'], ['Bauzeit', '1964 bis 1986'], ['Motor', 'Einzylinder-Zweitakt, 49,6 cm³'], ['Leistung', 'ca. 3,6 PS'], ['Höchstgeschwindigkeit', '60 km/h'], ['Kraftstoff', 'Gemisch 1:50']],
    fact: 'Die Schwalbe gehört zur Vogelserie von Simson: Spatz, Star, Sperber, Habicht und Schwalbe.',
    quiz: [Q('Zu welcher Serie gehört die Schwalbe?', 'zur Vogelserie', ['zur Fischserie', 'zur Blumenserie', 'zur Planetenserie'], ''),
      Q('Welcher Name gehört NICHT zur Simson-Vogelserie?', 'Adler', ['Spatz', 'Star', 'Habicht'], ''),
      Q('Was für ein Fahrzeug ist die Schwalbe?', 'ein Kleinroller', ['ein Traktor', 'ein Lastwagen', 'ein Mähdrescher'], ''),
      Q('Wie lange wurde die Schwalbe gebaut?', 'von 1964 bis 1986', ['von 2000 bis 2010', 'nur ein Jahr', 'von 1900 bis 1910'], '')]},
  g7: {kind: 'd', fuel: 'diesel', tank: 160, start: ['Handbremse prüfen', 'Gang raus (Leerlauf)', 'Kupplung treten', 'Zündschlüssel auf Vorglühen', 'Anlasser betätigen'], trap: TRAPDIESEL,
    race: {g: 5, vmax: 90, idle: 700, red: 3000, win: [2200, 2850]},
    specs: [['Hersteller', 'Mercedes-Benz'], ['Gebaut seit', '1948'], ['Name', 'UNIversal-MOtor-Gerät'], ['Antrieb', 'Allrad'], ['Besonderheit', 'Portalachsen für viel Bodenfreiheit'], ['Einsatz', 'Landwirtschaft, Winterdienst, Feuerwehr']],
    fact: 'Der Unimog kann vorne und hinten Geräte tragen, zum Beispiel einen Schneepflug und einen Streuer.',
    quiz: [Q('Wofür steht Unimog?', 'Universal-Motor-Gerät', ['Unglaublich mobil', 'Union-Motor-Gesellschaft', 'Unterwegs im Moor'], ''),
      Q('Welchen Antrieb hat der Unimog?', 'Allrad', ['nur vorne', 'nur hinten', 'Pedale'], ''),
      Q('Wozu dienen die Portalachsen?', 'für viel Bodenfreiheit im Gelände', ['zum Schwimmen', 'für mehr Sitze', 'als Kofferraum'], ''),
      Q('Wofür wird der Unimog im Winter oft eingesetzt?', 'zum Schneeräumen und Streuen', ['als Eisdiele', 'gar nicht', 'im Schwimmbad'], '')]},
  g8: {kind: 'd', fuel: 'diesel', tank: 900, start: ['Häckselwerk aus', 'Fahrhebel auf Neutral', 'Zündschlüssel auf Vorglühen', 'Warten, bis die Glühlampe ausgeht', 'Anlasser betätigen'], trap: ['Häckselwerk beim Starten einschalten', 'Das Häckselwerk wird erst eingeschaltet, wenn der Motor läuft und niemand in der Nähe ist.'],
    race: {g: 3, vmax: 40, idle: 800, red: 2200, win: [1600, 2100]},
    specs: [['Typ', 'Selbstfahrender Feldhäcksler'], ['Motor', 'großer Diesel'], ['Leistung', 'oft 400 bis über 1000 PS'], ['Aufgabe', 'Mais oder Gras klein häckseln'], ['Tempo', 'bis 40 km/h auf der Straße'], ['Ergebnis', 'Silage, Futter für Kühe']],
    fact: 'Ein großer Feldhäcksler schafft in einer Stunde so viel Mais, dass mehrere Anhänger voll werden.',
    quiz: [Q('Was macht ein Feldhäcksler?', 'Er häckselt Mais oder Gras in kleine Stücke.', ['Er drischt Getreide.', 'Er pflügt den Acker.', 'Er sät Körner.'], ''),
      Q('Was wird aus dem Häckselgut?', 'Silage, also Futter für Kühe', ['Brot', 'Benzin', 'Papier'], ''),
      Q('Wohin bläst der Häcksler das Häckselgut?', 'auf einen Anhänger, der nebenher fährt', ['zurück aufs Feld', 'in seinen Tank', 'in die Luft'], ''),
      Q('Wie viel PS haben große Feldhäcksler?', 'oft über 500 PS', ['etwa 4 PS', 'etwa 20 PS', 'genau 60 PS'], '')]}
};

// ---- Zustand pro Fahrzeug
const gst = id => { S.gar = S.gar || {}; const o = S.gar[id] = S.gar[id] || {}; const def = {km: 0, fuel: 50, dirt: .6, wd: today(), best: 0, exp: false}; for (const k in def) if (o[k] === undefined) o[k] = def[k]; return o };
const daysSince = d => Math.max(0, Math.round((new Date(today()) - new Date(d)) / 864e5));
const dirtOf = st => Math.min(1, st.dirt + daysSince(st.wd) * .08);
let G = {id: null, on: false, raf: 0};

// ---- Motorgeräusch (Web Audio, synthetisch)
// Aufbau: Zünd-Impulse in einem Puffer (mit leichten Unregelmäßigkeiten wie bei einem echten Motor), die Wiedergabe-Geschwindigkeit
// folgt der Drehzahl. Feste Filter formen Auspuff- und Motorresonanzen (die bleiben gleich, egal wie schnell der Motor dreht).
// Zweitakt: 1 Zündung pro Umdrehung, helles Klingeln vom Resonanzauspuff, im Leerlauf leichtes „Viertakten“ (Aussetzer).
// Diesel (4 Zylinder, Viertakt): 2 Zündungen pro Umdrehung, harte Verbrennungsschläge („Nageln“). Rasentraktor (1 Zylinder, Viertakt): 1 Zündung pro 2 Umdrehungen.
let ENG = null;
const FB = 40;
const firingHz = (v, r) => r / 60 * (v.kind === '2t' ? 1 : v.kind === 'd' ? 2 : .5);
function engExcite(kind) {
  const sr = audioCtx.sampleRate, N = 24, per = sr / FB, len = Math.round(per * N), b = audioCtx.createBuffer(1, len, sr), d = b.getChannelData(0);
  let seed = 12345; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let k = 0; k < N; k++) {
    const amp = kind === '2t' ? ([5, 13, 19].includes(k) ? .35 : .75 + rnd() * .35) : kind === 'd' ? (k % 4 === 2 ? .8 : 1) * (.9 + rnd() * .15) : .85 + rnd() * .25;
    const st = Math.max(0, Math.round((k + (rnd() - .5) * (kind === 'd' ? .03 : .08)) * per)), dur = Math.round(sr * (kind === 'd' ? .0025 : .006));
    let lp = 0;
    for (let i = 0; i < per * .95 && st + i < len; i++) {
      const t = i / sr, env = kind === 'd' ? Math.exp(-t * 700) + .3 * Math.exp(-t * 60) : kind === '2t' ? Math.exp(-t * 140) + .15 * Math.exp(-t * 25) : Math.exp(-t * 70);
      lp += ((rnd() * 2 - 1) - lp) * (kind === 'd' ? .85 : kind === '2t' ? .45 : .25);
      d[st + i] += amp * env * (lp * .7 + (i < dur ? 1 - i / dur : 0) * (kind === 'd' ? 1.4 : .9));
    }
  }
  let m = 0; for (let i = 0; i < len; i++) m = Math.max(m, Math.abs(d[i])); for (let i = 0; i < len; i++) d[i] /= m * 1.05;
  return b;
}
function engGraph(v) {
  if (!S.sound) return null;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)(); if (audioCtx.state === 'suspended') audioCtx.resume();
    const A = audioCtx, k = v.kind, P = {'2t': {body: 260, ring: 2300, rq: 5, mech: 3800}, d: {body: 110, ring: 3200, rq: 1.2, mech: 2500}, '4t': {body: 150, ring: 900, rq: 2, mech: 3000}}[k];
    const src = A.createBufferSource(); src.buffer = engExcite(k); src.loop = true; src.playbackRate.value = .3;
    const sh = A.createWaveShaper(), curve = new Float32Array(1024); for (let i = 0; i < 1024; i++) { const x = i / 511.5 - 1; curve[i] = Math.tanh(x * 2.2) } sh.curve = curve;
    const body = A.createBiquadFilter(); body.type = 'peaking'; body.frequency.value = P.body; body.Q.value = 1.4; body.gain.value = 12;
    const lp = A.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900; lp.Q.value = .8;
    const ring = A.createBiquadFilter(); ring.type = 'bandpass'; ring.frequency.value = P.ring; ring.Q.value = P.rq;
    const gA = A.createGain(), gB = A.createGain(), gN = A.createGain(), m = A.createGain(), comp = A.createDynamicsCompressor();
    gA.gain.value = .9; gB.gain.value = .1; gN.gain.value = 0; m.gain.value = 0;
    const nb = A.createBuffer(1, A.sampleRate, A.sampleRate), nd = nb.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    const ns = A.createBufferSource(); ns.buffer = nb; ns.loop = true; const nf = A.createBiquadFilter(); nf.type = 'bandpass'; nf.frequency.value = P.mech; nf.Q.value = 2;
    src.connect(sh); sh.connect(body); body.connect(lp); lp.connect(gA); sh.connect(ring); ring.connect(gB); ns.connect(nf); nf.connect(gN);
    [gA, gB, gN].forEach(x => x.connect(m)); m.connect(comp); comp.connect(A.destination); src.start(); ns.start();
    return {src, lp, gA, gB, gN, m, ns, v, rpm: 0};
  } catch (e) { return null }
}
function engRpm(r, load = 0) {
  if (!ENG) return; const v = ENG.v, A = audioCtx, t = A.currentTime, x = Math.min(1.1, r / v.race.red); ENG.rpm = r;
  ENG.src.playbackRate.setTargetAtTime(Math.max(.05, firingHz(v, r) / FB), t, .03);
  ENG.lp.frequency.setTargetAtTime(400 + 2600 * x + 1800 * load, t, .05);
  ENG.gB.gain.setTargetAtTime(v.kind === '2t' ? .08 + .5 * load * x + .15 * x : v.kind === 'd' ? .3 + .2 * load : .1 + .15 * x, t, .05);
  ENG.gN.gain.setTargetAtTime(.015 + .05 * x, t, .1);
  ENG.m.gain.setTargetAtTime(.22 + .14 * load + .06 * x, t, .06);
}
// Durchdrehen beim Kicken oder mit dem Anlasser (der Motor zündet noch nicht richtig)
function engCrank(v) {
  if (!ENG) ENG = engGraph(v); if (!ENG) return;
  clearTimeout(ENG.ct); engRpm(v.kind === '2t' ? 420 : v.kind === 'd' ? 260 : 500, 0); ENG.m.gain.setTargetAtTime(.12, audioCtx.currentTime, .03);
  if (v.kind === '2t') { tone(95, .05, 0, 'square', .05); tone(70, .08, .03, 'triangle', .06) } else tone(170 + Math.random() * 20, .3, 0, 'sawtooth', .025);
  ENG.ct = setTimeout(() => { if (!G.on && ENG) engKill(.15) }, 520);
}
function engStart(v) {
  G.on = true; if (!ENG) ENG = engGraph(v); if (!ENG) return; clearTimeout(ENG.ct);
  const r = v.race; engRpm(r.idle * 1.7, .4); setTimeout(() => { if (ENG && G.on && !G.run) engRpm(r.idle * 1.15, 0) }, 450); setTimeout(() => { if (ENG && G.on && !G.run) engRpm(r.idle, 0) }, 1300);
}
function engKill(fade = .5) { const e = ENG; ENG = null; if (!e) return; try { const t = audioCtx.currentTime; e.src.playbackRate.setTargetAtTime(.04, t, fade / 2); e.m.gain.setTargetAtTime(0, t, fade / 3); setTimeout(() => { try { e.src.stop(); e.ns.stop() } catch (x) {} }, fade * 2000 + 200) } catch (x) {} }
function engStop() { G.on = false; if (G.raf) clearInterval(G.raf); G.raf = 0; engKill(.6) }
const chug = () => { const v = VEH[G.id]; if (v) engCrank(v) };

// ---- Garagen-Liste
function garage() {
  return `<h1>Garage</h1><p class="m">Tippe auf ein Fahrzeug: starten, Gas geben, tanken, waschen und Experte werden. Mit Punkten aus den Missionen schaltest du neue Fahrzeuge frei.</p>
  ${GARAGE.map(g => { const lock = S.points < g.need, st = lock ? null : gst(g.id);
    return `<div class="card gcard ${lock ? 'lock' : ''}" style="cursor:pointer" onclick="openVeh('${g.id}')"><div class="gimg">${gimg(g)}</div><div style="flex:1"><b>${esc(g.name)}</b>
    ${lock ? `<div class="m">🔒 noch ${g.need - S.points} Punkte</div><div class="bar" style="margin-top:6px"><i style="width:${Math.max(3, 100 * S.points / g.need)}%"></i></div>`
      : `<div class="m">${esc(g.text)}</div><div class="vchips"><span>🛣️ ${st.km} km</span><span>⛽ ${Math.round(st.fuel)} %</span>${st.best ? `<span>🏁 ${de(st.best, 1)} s</span>` : ''}${st.exp ? '<span>⭐ Experte</span>' : ''}${dueCount(VEH[g.id], st) ? '<span style="background:#ff453a55">🔧 Wartung</span>' : ''}</div>`}</div><span class="chev">›</span></div>`; }).join('')}<h2>Das große Ziel</h2>` + projectView();
}
function openVeh(id) { clearTimers(); engStop(); G = {id, on: false, raf: 0, panel: null}; view = 'veh'; render() }

// ---- Fahrzeugseite
function vehView() {
  const g = GARAGE.find(x => x.id === G.id), v = VEH[g.id], lock = S.points < g.need;
  const head = `<div class="nav"><button class="back" onclick="go('garage')">‹</button><b>Garage</b></div>`;
  const hero = `<div class="vhero${lock ? ' lock2' : ''}" id="vh" onclick="vBlip()"><img id="vimg" src="${g.img}" alt="${esc(g.name)}" onerror="this.remove()"><canvas id="dirt"></canvas><div class="vtit">${g.emoji} ${esc(g.name)}</div></div>`;
  if (lock) { const p = plan().main;
    return head + hero + `<div class="card center"><div class="big">🔒</div><b style="font-size:20px">Noch ${g.need - S.points} Punkte</b><div class="bar" style="margin:10px 0"><i style="width:${Math.max(3, 100 * S.points / g.need)}%"></i></div>
    <p class="m">Du hast ${S.points} von ${g.need} Punkten. Jede Mission bringt 10 bis 30 Punkte, fehlerfreie gibt es mit Bonus.</p></div>
    <div class="card"><b>Vorschau</b>${v.specs.slice(0, 3).map(s => `<div class="row sp spec"><span class="m">${esc(s[0])}</span><b>${esc(s[1])}</b></div>`).join('')}<p class="m">Den Rest erfährst du, wenn du es freigeschaltet hast.</p></div>
    <button class="btn" onclick="start('${p.id}')">Punkte holen: ${esc(p.title)}</button>`; }
  const st = gst(g.id), d = dirtOf(st);
  const tiles = [['start', G.on ? '⏹' : '🔑', G.on ? 'Motor aus' : 'Motor starten'], ['race', '🏁', 'Beschleunigen'], ['fuel', '⛽', 'Tanken'], ['wash', '🧽', 'Waschen'], ['quiz', st.exp ? '⭐' : '❓', st.exp ? 'Experte' : 'Experten-Quiz'], ['shop', '🔧', 'Werkstatt' + (dueCount(v, st) ? ' <em class="badge">' + dueCount(v, st) + '</em>' : '')], ['specs', '📋', 'Steckbrief'], ...(v.spots ? [['parts', '🔍', 'Teile ansehen']] : [])];
  return head + hero + `<div class="vstat"><div><b>${st.km}</b><span>km</span></div><div><b>${Math.round(st.fuel)} %</b><span>Tank</span><div class="bar"><i style="width:${st.fuel}%;background:${st.fuel < 15 ? '#ff453a' : '#30d158'}"></i></div></div>
    <div><b>${d < .1 ? '✨' : d < .5 ? 'ok' : 'dreckig'}</b><span>Sauberkeit</span><div class="bar"><i style="width:${100 - d * 100}%;background:#0a84ff"></i></div></div><div><b>${st.best ? de(st.best, 1) + ' s' : '–'}</b><span>Bestzeit</span></div></div>
    <div class="vtiles">${tiles.map(t => `<button class="vt${G.panel === t[0] ? ' on' : ''}" id="vt_${t[0]}" onclick="vPanel('${t[0]}')"><span>${t[1]}</span>${t[2]}</button>`).join('')}</div>
    <div id="vp"></div>`;
}
function vRefresh() { const p = G.panel; $('#app').innerHTML = vehView(); if (G.on) $('#vh').classList.add('run'); drawDirt(false); if (p) vPanel(p, true) }
function vPanel(k, keep) {
  const g = GARAGE.find(x => x.id === G.id), v = VEH[g.id], st = gst(g.id);
  if (G.raf) { clearInterval(G.raf); G.raf = 0; if (G.on) engRpm(v.race.idle) }
  if (k === 'start' && G.on && !keep) { engStop(); $('#vh').classList.remove('run'); toast('Motor aus. 🔇'); G.panel = null; vRefresh(); return }
  G.panel = k; document.querySelectorAll('.vt').forEach(b => b.classList.toggle('on', b.id === 'vt_' + k));
  const p = $('#vp'); p.innerHTML = '<div class="card vpc">' + VP[k](g, v, st) + '</div>'; if (VPI[k]) VPI[k](g, v, st);
  if (!keep) (k === 'wash' ? $('#vh') : p).scrollIntoView({behavior: 'smooth', block: k === 'wash' ? 'start' : 'nearest'});
}

const VP = {
  // Starten: Schritte in der richtigen Reihenfolge, dann kicken oder Anlasser halten
  start(g, v, st) {
    if (st.fuel <= 0) return `<b>⛽ Tank leer!</b><p class="m">Ohne Sprit springt nichts an. Erst tanken.</p><button class="btn" onclick="vPanel('fuel')">Zum Tanken</button>`;
    G.seq = shuffle([...v.start.map((_, i) => i), 't']); G.k = 0; G.mist = 0;
    return `<b>🔑 Motor starten</b><p class="m">Tippe die Schritte in der richtigen Reihenfolge an. Achtung, ein Schritt ist falsch!</p><div id="sqd"></div>
    <div id="sqb">${G.seq.map(i => `<button class="mb wide" id="sq_${i}" onclick="vStep('${i}')">${esc(i === 't' ? v.trap[0] : v.start[i])}</button>`).join('')}</div><div id="sqf"></div>`;
  },
  race(g, v, st) {
    if (!G.on) return `<b>🏁 Beschleunigen</b><p class="m">Der Motor ist aus. Erst starten, dann geht’s los.</p><button class="btn" onclick="vPanel('start')">🔑 Zum Starten</button>`;
    if (st.fuel < 12) return `<b>⛽ Fast leer!</b><p class="m">Für eine Runde brauchst du mindestens 12 % im Tank.</p><button class="btn" onclick="vPanel('fuel')">Zum Tanken</button>`;
    const r = v.race;
    return `<b>🏁 Beschleunigen bis ${r.vmax} km/h</b><p class="m">Halte <b>Gas</b> gedrückt. Schalte hoch, wenn die Nadel im <b style="color:#30d158">grünen Bereich</b> ist. Bleib nicht zu lange im <b style="color:#ff453a">roten Bereich</b>!</p>
    <div class="race"><svg viewBox="0 0 200 120" width="100%" style="max-width:300px;display:block;margin:0 auto">${tachoArcs(r)}<line id="ndl" x1="100" y1="100" x2="100" y2="22" stroke="#fff" stroke-width="4" stroke-linecap="round" style="transform-origin:100px 100px;transform:rotate(-90deg)"/><circle cx="100" cy="100" r="7" fill="#fff"/></svg>
    <div class="row sp" style="margin-top:4px"><div><span class="m">Gang</span><br><b id="gr" style="font-size:28px">1</b><span class="m">/${r.g}</span></div><div class="center"><b id="spd" style="font-size:44px">0</b><br><span class="m">km/h</span></div><div style="text-align:right"><span class="m">Zeit</span><br><b id="tm" style="font-size:28px">0,0</b><span class="m"> s</span></div></div>
    <div id="rmsg" class="center" style="min-height:24px;font-weight:700"></div>
    <div class="row" style="gap:10px"><button class="gas" id="gas">Gas</button><button class="shiftb" id="shb" onclick="vShift()">Schalten ⬆</button></div></div>`;
  },
  fuel(g, v, st) {
    if (v.fuel === 'mix') { G.L = [2, 3, 4, 5][Math.floor(Math.random() * 4)]; G.lit = 0; G.stage = 1;
      return `<b>⛽ Gemisch tanken (1:50)</b><p class="m">Schritt 1: Halte den Zapfhahn gedrückt und tanke genau <b>${G.L} Liter</b> Benzin.</p>
      <div class="pump"><div class="pg"><i id="pgi"></i><em style="bottom:${100 * G.L / 6}%"></em></div><div><b id="pl" style="font-size:34px">0,0</b> Liter<br><span class="m">Ziel: ${G.L} Liter</span></div></div>
      <button class="gas" id="pump" style="width:100%">⛽ Zapfhahn halten</button><div id="mix"></div>`; }
    G.f0 = st.fuel; G.f = st.fuel;
    return `<b>⛽ ${v.fuel === 'diesel' ? 'Diesel' : 'Benzin'} tanken</b><p class="m">Halte den Zapfhahn gedrückt und lass los, wenn der Tank im <b style="color:#30d158">grünen Bereich</b> ist. Nicht überlaufen lassen!${v.fuel === 'benzin' ? ' Der Viertakter bekommt reines Benzin, kein Öl.' : ''}</p>
    <div class="pump"><div class="pg wide"><i id="pgi" style="height:${st.fuel}%"></i><em class="band"></em></div><div><b id="pl" style="font-size:34px">${Math.round(st.fuel)} %</b><br><span class="m">Tank: ca. ${v.tank} Liter</span></div></div>
    <button class="gas" id="pump" style="width:100%">⛽ Zapfhahn halten</button><div id="mix"></div>`;
  },
  wash(g, v, st) { return `<b>🧽 Waschen</b><p class="m">Reibe mit dem Finger über das Bild oben, bis kein Dreck mehr zu sehen ist.</p><div class="bar"><i id="wbar" style="width:0%;background:#0a84ff"></i></div><p class="m" id="wtx">0 % sauber</p>` },
  quiz(g, v, st) { G.q = 0; G.qok = 0; return `<b>❓ Experten-Quiz: ${esc(g.name)}</b><p class="m">${st.exp ? 'Du bist schon Experte. Teste dich trotzdem!' : 'Mindestens 3 von 4 richtig: Dann bekommst du das ⭐ Experten-Abzeichen und 5 Bonuspunkte.'}</p><div id="vq"></div>` },
  specs(g, v, st) { return `<b>📋 Steckbrief</b>${v.specs.map(s => `<div class="row sp spec"><span class="m">${esc(s[0])}</span><b>${esc(s[1])}</b></div>`).join('')}<div class="fact fb" style="margin-top:12px">💡 ${esc(v.fact)}</div><p class="m">Gefahren mit dir: ${st.km} km.</p>` },
  parts(g, v, st) { const sp = SPOTS[v.spots];
    return `<b>🔍 Teile ansehen</b><p class="m">Tippe auf die Zahlen.</p><div class="art" style="border-radius:16px"><div class="pw">${SVGS[v.spots]}${sp.map((p, i) => `<button class="hs" id="vx${i}" style="left:${p.x}%;top:${p.y}%" onclick="vPart(${i})">${i + 1}</button>`).join('')}</div></div><div id="vpi" class="m" style="margin-top:10px">${sp.length} Teile zum Entdecken.</div>` }
};
const VPI = {
  race(g, v) { if (!G.on || !$('#gas')) return; const b = $('#gas'), on = e => { e.preventDefault(); G.gas = true; if (!G.run) vRaceGo(v) }, off = () => G.gas = false;
    b.addEventListener('pointerdown', on); ['pointerup', 'pointerleave', 'pointercancel'].forEach(x => b.addEventListener(x, off)); b.oncontextmenu = e => e.preventDefault(); G.run = null },
  fuel(g, v, st) { const b = $('#pump'); let iv = null;
    const stop = () => { if (!iv) return; clearInterval(iv); iv = null; v.fuel === 'mix' ? mixStop(v, st) : dieselStop(v, st) };
    b.addEventListener('pointerdown', e => { e.preventDefault(); if (iv || G.stage === 2 || G.done) return; iv = setInterval(() => {
      if (v.fuel === 'mix') { G.lit += .05; $('#pl').textContent = de(G.lit, 1); $('#pgi').style.height = Math.min(100, 100 * G.lit / 6) + '%'; if (G.lit > 6) stop() }
      else { G.f += .6; $('#pl').textContent = Math.round(G.f) + ' %'; $('#pgi').style.height = Math.min(100, G.f) + '%'; if (G.f > 101) stop() } tone(140 + Math.random() * 30, .05, 0, 'triangle', .02) }, 40) });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(x => b.addEventListener(x, stop)); b.oncontextmenu = e => e.preventDefault() },
  wash() { drawDirt(true) },
  quiz(g, v) { vQuiz(v) }
};

// ---- Starten
function vStep(i) {
  const g = GARAGE.find(x => x.id === G.id), v = VEH[g.id], b = $('#sq_' + i);
  if (i === 't') { G.mist++; b.classList.add('no'); setTimeout(() => b.remove(), 900); $('#sqf').innerHTML = `<div class="fb bad">❌ ${esc(v.trap[1])}</div>`; tone(190, .2, 0, 'triangle', .1); return }
  if (+i !== G.k) { G.mist++; b.classList.add('no'); later(() => b.classList.remove('no'), 450); $('#sqf').innerHTML = `<div class="fb bad">Noch nicht. Was muss vorher passieren?</div>`; return }
  b.remove(); G.k++; tone(700, .07, 0, 'sine', .06); $('#sqf').innerHTML = '';
  $('#sqd').innerHTML = v.start.slice(0, G.k).map((w, k) => `<div class="ordl"><b>${k + 1}</b> ${esc(w)} ✓</div>`).join('');
  if (G.k < v.start.length) return;
  const tr = $('#sq_t'); if (tr) tr.remove();
  if (v.kind === '2t') { G.kick = 1 + Math.floor(Math.random() * 3);
    $('#sqb').innerHTML = `<button class="kick" id="kick" onclick="vKick()">🦶 KICK!</button><p class="m center">Tritt kräftig! Manchmal braucht es mehrere Versuche.</p>` }
  else { $('#sqb').innerHTML = `<button class="kick" id="anl">🔑 Anlasser halten</button><div class="bar"><i id="anb" style="width:0"></i></div><p class="m center">Halte gedrückt, bis der Motor anspringt.</p>`;
    let t = null, p = 0; const b2 = $('#anl'), stp = () => { clearInterval(t); t = null; if (p < 100) { p = 0; $('#anb').style.width = '0'; $('#sqf').innerHTML = '<div class="fb bad">Zu kurz! Länger gedrückt halten.</div>' } };
    b2.addEventListener('pointerdown', e => { e.preventDefault(); if (t) return; $('#sqf').innerHTML = ''; t = setInterval(() => { p += 4; $('#anb').style.width = p + '%'; if (p % 16 === 0) chug(); if (p >= 100) { clearInterval(t); t = null; vRunning(v) } }, 50) });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(x => b2.addEventListener(x, stp)); b2.oncontextmenu = e => e.preventDefault() }
}
function vKick() { const v = VEH[G.id]; chug(); const k = $('#kick'); k.classList.remove('pop'); void k.offsetWidth; k.classList.add('pop'); G.kick--;
  if (G.kick > 0) { $('#sqf').innerHTML = `<div class="fb">${['Blubb … noch nicht. Nochmal!', 'Fast! Noch ein Kick.', 'Er hustet schon. Weiter!'][Math.floor(Math.random() * 3)]}</div>`; return }
  vRunning(v) }
function vRunning(v) {
  const g = GARAGE.find(x => x.id === G.id), st = gst(g.id);
  if (!G.panneDone && vPanne(v)) { G.panneDone = true; return }
  G.panneDone = false;
  engStart(v); $('#vh').classList.add('run'); st.fuel = Math.max(0, st.fuel - 1); save();
  $('#sqb').innerHTML = `<div class="center"><div class="big">✅</div><b style="font-size:20px">Motor läuft!</b><p class="m">${v.kind === '2t' ? 'Ring-ding-ding! Choke wieder rein, sobald er warm ist.' : v.kind === 'd' ? 'Der Diesel nagelt gemütlich im Leerlauf.' : 'Der Motor brummt. Jetzt kann es losgehen.'}${G.mist ? '' : ' Fehlerfrei gestartet!'}<br><b style="color:var(--t)">Tipp: Tippe aufs Bild oben, dann gibst du im Stand Gas.</b></p></div><button class="btn" onclick="vPanel('race')">🏁 Jetzt beschleunigen</button>`;
  $('#sqf').innerHTML = ''; const t = $('#vt_start'); if (t) t.innerHTML = '<span>⏹</span>Motor aus';
}

// ---- Beschleunigen (Schaltspiel)
function tachoArcs(r) {
  const max = r.red * 1.1, ang = x => Math.PI * (1 - x / max), pt = (x, R) => [100 + R * Math.cos(ang(x)), 100 - R * Math.sin(ang(x))];
  const arc = (a, b, col, w = 10) => { const [x1, y1] = pt(a, 80), [x2, y2] = pt(b, 80); return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} A80 80 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${col}" stroke-width="${w}"/>` };
  let ticks = ''; const stp = r.red > 4000 ? 1000 : 500; for (let x = 0; x <= max; x += stp) { const [a, b] = pt(x, 66), [c, d] = pt(x, 74); ticks += `<line x1="${a.toFixed(1)}" y1="${b.toFixed(1)}" x2="${c.toFixed(1)}" y2="${d.toFixed(1)}" stroke="#8e8e93" stroke-width="2"/>` }
  return arc(0, max, '#3a3a3c') + arc(r.win[0], r.win[1], '#30d158') + arc(r.red, max, '#ff453a') + ticks + `<text x="100" y="118" text-anchor="middle" fill="#8e8e93" font-size="9">Drehzahl</text>`;
}
function vRaceGo(v) {
  const r = v.race, vg = k => r.vmax * Math.pow(k / r.g, .75);
  G.run = {rpm: r.idle, k: 1, t: 0, over: 0, perfect: 0, last: performance.now(), done: false};
  const msg = (t, c = '') => { const e = $('#rmsg'); if (e) { e.textContent = t; e.style.color = c } };
  const loop = () => {
    const now = performance.now(), R = G.run; if (!R || R.done || !$('#ndl')) { clearInterval(G.raf); G.raf = 0; return } const dt = Math.min(.2, (now - R.last) / 1000); R.last = now; R.t += dt;
    const acc = (r.red - r.idle) / (1 + R.k * .85);
    R.rpm = G.gas ? Math.min(r.red * 1.08, R.rpm + acc * dt) : Math.max(r.idle, R.rpm - (r.red - r.idle) * .9 * dt);
    if (R.rpm > r.red) { R.over += dt; msg('⚠️ Roter Bereich! Schalten oder Gas weg!', '#ff453a') } else R.over = Math.max(0, R.over - dt);
    const spd = Math.min(r.vmax, R.rpm / r.red * vg(R.k));
    $('#ndl').style.transform = `rotate(${-90 + 180 * Math.min(1, R.rpm / (r.red * 1.1))}deg)`; $('#spd').textContent = Math.round(spd); $('#tm').textContent = de(R.t, 1); $('#gr').textContent = R.k; engRpm(R.rpm, G.gas ? 1 : 0);
    if (R.over > 1.6) { clearInterval(G.raf); G.raf = 0; R.done = true; G.run = null; engRpm(r.idle); msg('');
      $('#rmsg').innerHTML = `<div class="fb bad" style="text-align:left">💥 Zu lange im roten Bereich: ${v.kind === '2t' ? 'Kolbenklemmer' : 'Motorschaden'}-Gefahr! Der Motor wurde zum Schutz abgeregelt. Nächstes Mal früher schalten.</div><button class="btn alt" onclick="vPanel('race')">Nochmal</button>`; snd('bad'); return }
    if (R.k === r.g && spd >= r.vmax - .01) { clearInterval(G.raf); G.raf = 0; return vRaceEnd(v, R) }
  };
  G.raf = setInterval(loop, 33); G.vg = vg; G.msg = msg;
}
function vShift() {
  const v = VEH[G.id], r = v.race, R = G.run; if (!R || R.done) { if (G.on && !R) G.msg && G.msg('Erst Gas geben!'); return }
  if (R.k >= r.g) { G.msg('Das ist schon der höchste Gang. Gas halten!'); return }
  const rpm = R.rpm; R.rpm = Math.max(r.idle, rpm * G.vg(R.k) / G.vg(R.k + 1)); R.k++; tone(260, .05, 0, 'square', .04);
  if (rpm < r.win[0]) G.msg('Zu früh geschaltet, der Motor quält sich.', '#ff9f0a');
  else if (rpm <= r.win[1]) { R.perfect++; G.msg('Perfekt geschaltet! ✅', '#30d158') }
  else G.msg('Etwas spät, aber okay.', '#ffd60a');
}
function vRaceEnd(v, R) {
  R.done = true; G.run = null; const g = GARAGE.find(x => x.id === G.id), st = gst(g.id), rec = !st.best || R.t < st.best, km = 2 + Math.floor(Math.random() * 5);
  if (rec) st.best = Math.round(R.t * 10) / 10; st.km += km; st.fuel = Math.max(0, st.fuel - 12); st.dirt = Math.min(1, st.dirt + .2); save(); engRpm(v.race.idle);
  if (rec) { confetti(); snd('win') } else snd('ok'); ride(g.emoji);
  $('#rmsg').innerHTML = `<div class="card center" style="background:var(--card2);margin:10px 0 0"><div class="big">${rec ? '🏆' : '🏁'}</div><b style="font-size:20px">${v.race.vmax} km/h in ${de(R.t, 1)} Sekunden</b>
    <p class="m">${rec ? 'Neue Bestzeit!' : 'Bestzeit: ' + de(st.best, 1) + ' s'} · ${R.perfect} von ${v.race.g - 1} Schaltvorgängen perfekt · ${km} km Ausfahrt</p></div><button class="btn" onclick="vPanel('race')">Nochmal</button>`;
  const sp = document.querySelector('.vstat'); if (sp) sp.outerHTML = (new DOMParser().parseFromString(vehView(), 'text/html').querySelector('.vstat') || sp).outerHTML;
}

// ---- Tanken
function mixStop(v, st) {
  if (G.lit > G.L + .25) { $('#mix').innerHTML = '<div class="fb bad">Übergelaufen! Etwas zu viel. Schütte es zurück und versuch es nochmal.</div>'; G.lit = 0; $('#pl').textContent = '0,0'; $('#pgi').style.height = '0'; return }
  if (G.lit < G.L - .25) { $('#mix').innerHTML = `<div class="fb">Noch ${de(G.L - G.lit, 1)} Liter. Weiter drücken!</div>`; return }
  G.stage = 2; $('#pump').disabled = true;
  $('#mix').innerHTML = `<div class="fb good">Genau ${G.L} Liter! 👍</div><p style="font-weight:700">Schritt 2: Wie viel Zweitaktöl gehört zu ${G.L} Litern bei 1:50?</p>
  <div class="sld"><div class="row sp"><span>Öl</span><b id="olv">0 ml</b></div><input type="range" id="ol" min="0" max="200" step="10" value="0" oninput="$('#olv').textContent=this.value+' ml'"></div>
  <button class="hintb" onclick="this.outerHTML='<div class=&quot;fb hint&quot;>💡 1:50 heißt: 1 Teil Öl auf 50 Teile Benzin. 1 Liter = 1000 ml, und 1000 : 50 = 20 ml Öl pro Liter.</div>'">💡 Tipp</button>
  <button class="btn" onclick="mixCheck()">Öl einfüllen</button><div id="mixf"></div>`;
}
function mixCheck() {
  const ml = +$('#ol').value, want = G.L * 20, st = gst(G.id);
  if (ml === want) { st.fuel = Math.min(100, st.fuel + G.L * 12); save(); snd('ok'); G.done = true;
    $('#mixf').innerHTML = `<div class="fb good"><b>Richtig: ${want} ml!</b> ${G.L} · 20 ml = ${want} ml. Gut schütteln, fertig. Tank jetzt bei ${Math.round(st.fuel)} %.</div><button class="btn alt" onclick="vRefresh()">Fertig</button>` }
  else $('#mixf').innerHTML = ml < want ? '<div class="fb bad">Zu wenig Öl! Dann schmiert der Kolben nicht richtig: Kolbenklemmer-Gefahr. Rechne nochmal.</div>' : '<div class="fb bad">Zu viel Öl! Der Motor qualmt und die Zündkerze verrußt. Rechne nochmal.</div>';
}
function dieselStop(v, st) {
  if (G.f > 100) { $('#mix').innerHTML = `<div class="fb bad">💦 Übergelaufen! Das gibt eine Sauerei, und ${v.fuel === 'diesel' ? 'Diesel' : 'Benzin'} im Boden schadet der Umwelt. Nochmal.</div>`; G.f = G.f0; $('#pl').textContent = Math.round(G.f) + ' %'; $('#pgi').style.height = G.f + '%'; return }
  if (G.f < 95) { $('#mix').innerHTML = '<div class="fb">Noch nicht voll. Weiter drücken!</div>'; return }
  G.done = true; $('#pump').disabled = true; const L = Math.round((G.f - G.f0) / 100 * v.tank), pr = v.fuel === 'diesel' ? 1.65 : 1.75, right = Math.round(L * pr);
  G.pay = right; const opts = shuffle([right, Math.round(right * 1.4) + 1, Math.max(1, Math.round(right * .6) - 1)]);
  st.fuel = Math.min(100, G.f); save();
  $('#mix').innerHTML = `<div class="fb good">Voll! Du hast <b>${L} Liter</b> getankt.</div><p style="font-weight:700">An der Kasse: Der Liter kostet ${eur(pr)}. Was musst du ungefähr zahlen?</p>${opts.map(o => `<button class="opt" onclick="payPick(this,${o})">etwa ${o} €</button>`).join('')}<div id="mixf"></div>`;
}
function payPick(b, o) { if (G.paid) return; if (o === G.pay) { G.paid = true; b.classList.add('ok'); snd('ok'); $('#mixf').innerHTML = '<div class="fb good"><b>Richtig!</b> Liter mal Preis. Gute Fahrt!</div><button class="btn alt" onclick="G.paid=false;vRefresh()">Fertig</button>' } else { b.classList.add('bad'); b.disabled = true; snd('bad'); $('#mixf').innerHTML = '<div class="fb bad">Überschlag: Runde den Preis auf glatte Euro und rechne Liter mal Preis.</div>' } }

// ---- Waschen (Dreck wegwischen)
function drawDirt(active) {
  const cv = $('#dirt'), h = $('#vh'); if (!cv || !h) return; const st = gst(G.id), d = active ? Math.max(.35, dirtOf(st)) : dirtOf(st);
  const W = 240, H = Math.round(240 * h.clientHeight / Math.max(1, h.clientWidth)); cv.width = W; cv.height = H; const x = cv.getContext('2d');
  x.clearRect(0, 0, W, H); if (d < .05 && !active) return;
  let seed = 7; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  x.fillStyle = `rgba(110,92,64,${.18 + d * .3})`; x.fillRect(0, 0, W, H);
  for (let i = 0; i < 60 + d * 140; i++) { const r = 4 + rnd() * 16, y = H * (.35 + Math.pow(rnd(), .6) * .65); x.fillStyle = `rgba(${62 + rnd() * 30},${44 + rnd() * 18},${26 + rnd() * 12},${.55 + d * .35})`; x.beginPath(); x.ellipse(rnd() * W, y, r, r * (.4 + rnd() * .5), rnd() * 3, 0, 7); x.fill() }
  for (let i = 0; i < 300 * d + 80; i++) { x.fillStyle = `rgba(55,40,25,${.6 + rnd() * .4})`; x.beginPath(); x.arc(rnd() * W, H * (.2 + rnd() * .8), .6 + rnd() * 2, 0, 7); x.fill() }
  if (!active) { cv.style.pointerEvents = 'none'; return }
  cv.style.pointerEvents = 'auto'; cv.style.touchAction = 'none';
  const all = cnt(x, W, H) || 1; let n = 0, down = false;
  const rub = e => { if (!down) return; const b = cv.getBoundingClientRect(); x.globalCompositeOperation = 'destination-out'; x.beginPath(); x.arc((e.clientX - b.left) / b.width * W, (e.clientY - b.top) / b.height * H, 14, 0, 7); x.fill(); x.globalCompositeOperation = 'source-over';
    if (++n % 6) return; tone(900 + Math.random() * 500, .03, 0, 'sine', .015); const left = cnt(x, W, H) / all, pct = Math.round(100 * (1 - left)); const wb = $('#wbar'); if (wb) { wb.style.width = pct + '%'; $('#wtx').textContent = pct + ' % sauber' }
    if (left < .12) { down = false; x.clearRect(0, 0, W, H); cv.style.pointerEvents = 'none'; st.dirt = 0; st.wd = today(); save(); confetti(); snd('win');
      $('#vh').insertAdjacentHTML('beforeend', '<div class="sparkle">✨✨✨</div>'); setTimeout(() => { const s = document.querySelector('.sparkle'); if (s) s.remove() }, 2200);
      $('#vp').innerHTML = `<div class="card vpc center"><div class="big">✨</div><b style="font-size:20px">Blitzblank!</b><p class="m">${esc(GARAGE.find(g => g.id === G.id).name)} glänzt wieder. Nach jeder Ausfahrt wird es wieder etwas dreckiger.</p><button class="btn alt" onclick="vRefresh()">Fertig</button></div>` } };
  cv.onpointerdown = e => { down = true; cv.setPointerCapture(e.pointerId); rub(e) }; cv.onpointermove = rub; cv.onpointerup = cv.onpointercancel = () => down = false;
}
const cnt = (x, W, H) => { const a = x.getImageData(0, 0, W, H).data; let c = 0; for (let i = 3; i < a.length; i += 16) if (a[i] > 30) c++; return c };

// ---- Experten-Quiz
function vQuiz(v) {
  const g = GARAGE.find(x => x.id === G.id), st = gst(g.id), q = v.quiz[G.q], box = $('#vq'); if (!box) return;
  if (!q) { const pass = G.qok >= 3, first = pass && !st.exp; if (first) { st.exp = true; S.points += 5; save(); confetti(); snd('win') }
    box.innerHTML = `<div class="center"><div class="big">${pass ? '⭐' : '📚'}</div><b style="font-size:20px">${G.qok} von ${v.quiz.length} richtig</b><p class="m">${first ? 'Experten-Abzeichen verdient! +5 Punkte.' : pass ? 'Stark, du bist Experte.' : 'Schau in den Steckbrief und versuch es nochmal.'}</p></div><button class="btn alt" onclick="vPanel('quiz')">Nochmal</button>`; return }
  G.qa = false; const ord = shuffle(q.opts.map((_, i) => i));
  box.innerHTML = `<p class="m">Frage ${G.q + 1} von ${v.quiz.length}</p><div class="q" style="font-size:19px">${esc(q.q)}</div>${ord.map(i => `<button class="opt" onclick="vqa(this,${i})">${esc(q.opts[i])}</button>`).join('')}<div id="vqf"></div>`;
}
function vqa(b, i) { if (G.qa) return; G.qa = true; const v = VEH[G.id], q = v.quiz[G.q], ok = i === 0; if (ok) G.qok++; b.classList.add(ok ? 'ok' : 'bad'); snd(ok ? 'ok' : 'bad');
  if (!ok) document.querySelectorAll('#vq .opt').forEach(x => { if (x.textContent === q.opts[0]) x.classList.add('ok') });
  $('#vqf').innerHTML = `<div class="fb ${ok ? 'good' : 'bad'}">${ok ? '<b>Richtig!</b> ' : '<b>Leider nicht.</b> '}${esc(q.why || '')}</div><button class="btn" onclick="G.q++;vQuiz(VEH[G.id])">Weiter</button>` }

// ---- Teile
function vPart(i) { const sp = SPOTS[VEH[G.id].spots]; document.querySelectorAll('#vp .hs').forEach(x => x.classList.remove('sel')); $('#vx' + i).classList.add('sel'); $('#vpi').innerHTML = `<b style="color:var(--t)">${i + 1}. ${esc(sp[i].name)}</b><br>${esc(sp[i].info)}` }

// ---- Gas geben im Stand: Tippe aufs Bild, wenn der Motor läuft
function vBlip() { const v = VEH[G.id]; if (!G.on || G.run || !v) return; engRpm(v.race.red * .75, 1); clearTimeout(G.bt); G.bt = setTimeout(() => { if (G.on && !G.run) engRpm(v.race.idle * 1.1, 0); setTimeout(() => { if (G.on && !G.run) engRpm(v.race.idle, 0) }, 500) }, 380) }

// ---- Werkstatt: Wartungsaufträge. every = fällig nach so vielen km (Spiel-Kilometer)
// Schritt-Arten: mc (Auswahl, erste Antwort richtig), turn (im Kreis drehen: dir -1 = lösen/links, 1 = festziehen/rechts),
// slide (Wert in den grünen Bereich stellen), hold (gedrückt halten), fill (gedrückt halten bis in den grünen Bereich, nicht überfüllen), dip (Ölmessstab ablesen)
const JOBS = {
  kerze: {name: 'Zündkerze wechseln', icon: '🔌', kinds: ['2t', '4t'], every: 40, steps: v => [
    {t: 'mc', q: 'Der Motor ist abgekühlt. Was machst du zuerst?', o: ['Kerzenstecker abziehen', 'Kerze mit dem Hammer lockern', 'Tank abbauen', 'Motor starten'], why: 'Erst den Stecker ab, sonst kommt man nicht an die Kerze.'},
    {t: 'mc', q: 'Welches Werkzeug dreht die Zündkerze heraus?', o: ['🔧 Zündkerzenschlüssel', '🪛 Schlitzschraubendreher', '🗜️ Rohrzange', '🔨 Hammer'], why: 'Der Kerzenschlüssel umfasst die Kerze und rutscht nicht ab.'},
    {t: 'turn', q: 'Dreh die alte Kerze heraus. Wische im Kreis über den Schlüssel.', dir: -1, turns: 2, ico: '🔧'},
    {t: 'mc', q: 'Die alte Kerze ist schwarz und verrußt. Was heißt das?', o: ['Das Gemisch war zu fett.', 'Alles perfekt.', 'Das Gemisch war zu mager.', 'Der Reifen ist platt.'], why: 'Rehbraun wäre ideal. Schwarz bedeutet zu viel Kraftstoff oder Öl.'},
    {t: 'slide', q: 'Stelle den Elektrodenabstand der neuen Kerze ein.', min: .2, max: 1.2, step: .05, lo: v.kind === '2t' ? .4 : .6, hi: v.kind === '2t' ? .6 : .8, unit: ' mm', why: v.kind === '2t' ? 'Bei der Simson etwa 0,4 bis 0,6 mm. Steht genau in der Betriebsanleitung.' : 'Bei vielen Rasentraktoren etwa 0,6 bis 0,8 mm. Steht genau in der Anleitung.'},
    {t: 'turn', q: 'Neue Kerze erst von Hand eindrehen, dann festziehen.', dir: 1, turns: 1.5, ico: '🔧'},
    {t: 'mc', q: 'Was fehlt noch?', o: ['Kerzenstecker wieder aufstecken', 'Tank leeren', 'Lenker abschrauben', 'Reifen wechseln'], why: 'Ohne Stecker kein Funke.'}]},
  kette: {name: 'Kette spannen und ölen', icon: '⛓️', kinds: ['2t'], every: 30, steps: () => [
    {t: 'mc', q: 'Wie soll eine Mopedkette gespannt sein?', o: ['mit etwas Durchhang, nicht straff', 'ganz straff wie eine Saite', 'so locker, dass sie schleift', 'ist egal'], why: 'Zu straff zerstört Lager und Kette, zu locker springt sie ab.'},
    {t: 'turn', q: 'Löse die Achsmutter am Hinterrad.', dir: -1, turns: 1, ico: '🔩'},
    {t: 'slide', q: 'Stelle die Kettenspanner ein, bis der Durchhang passt.', min: 0, max: 100, step: 1, lo: 42, hi: 58, chain: true, why: 'Etwas Spiel muss bleiben, weil die Kette beim Einfedern länger gezogen wird.'},
    {t: 'turn', q: 'Achsmutter wieder festziehen.', dir: 1, turns: 1, ico: '🔩'},
    {t: 'hold', q: 'Halte gedrückt: Das Hinterrad dreht sich und du sprühst Kettenspray auf die Innenseite der Kette.', ms: 2600, ico: '🧴', btn: 'Sprühen'},
    {t: 'mc', q: 'Warum wischt man zu viel Kettenspray ab?', o: ['Sonst klebt Dreck dran und es spritzt herum.', 'Weil es sonst brennt.', 'Damit die Kette rostet.', 'Das macht man nicht.'], why: ''}]},
  oel: {name: 'Ölstand prüfen', icon: '🛢️', kinds: ['4t', 'd'], every: 40, steps: () => [
    {t: 'mc', q: 'Wann prüft man den Ölstand?', o: ['bei abgestelltem Motor auf ebenem Boden', 'bei Vollgas', 'während der Fahrt am Hang', 'nie'], why: 'Nur eben und bei stehendem Motor zeigt der Messstab richtig an.'},
    {t: 'hold', q: 'Ziehe den Messstab heraus und wische ihn sauber.', ms: 1200, ico: '🧻', btn: 'Abwischen'},
    {t: 'dip'}]},
  luft: {name: 'Luftfilter reinigen', icon: '🌬️', kinds: ['2t', '4t', 'd'], every: 50, steps: () => [
    {t: 'mc', q: 'Womit öffnest du den Luftfilterkasten?', o: ['🪛 Schraubendreher', '🔨 Hammer', '✂️ Schere', '🧲 Magnet'], why: ''},
    {t: 'turn', q: 'Löse die Schraube am Deckel.', dir: -1, turns: 1.5, ico: '🪛'},
    {t: 'hold', q: 'Klopfe den Filter aus und blase ihn von innen nach außen mit Druckluft durch.', ms: 2000, ico: '💨', btn: 'Ausblasen'},
    {t: 'mc', q: 'Warum ist ein sauberer Luftfilter wichtig?', o: ['Der Motor bekommt genug saubere Luft.', 'Dann passt mehr in den Tank.', 'Für eine lautere Hupe.', 'Damit die Reifen halten.'], why: 'Ein verstopfter Filter macht das Gemisch zu fett, der Motor verliert Kraft.'},
    {t: 'turn', q: 'Deckel wieder festschrauben.', dir: 1, turns: 1.5, ico: '🪛'}]},
  reifen: {name: 'Reifendruck prüfen', icon: '🛞', kinds: ['4t', 'd'], every: 60, steps: v => [
    {t: 'mc', q: 'Wo findest du den richtigen Reifendruck?', o: ['in der Betriebsanleitung', 'auf dem Nummernschild', 'im Tankdeckel', 'auf dem Sitz'], why: ''},
    {t: 'fill', q: `Pumpe den Reifen auf. In diesem Beispiel soll er ${v.kind === 'd' ? '1,6' : '1,0'} bar haben.`, max: v.kind === 'd' ? 2.4 : 1.6, lo: v.kind === 'd' ? 1.55 : .95, hi: v.kind === 'd' ? 1.65 : 1.05, start: v.kind === 'd' ? 1.1 : .6, unit: ' bar', ico: '🛞', btn: 'Pumpen'},
    {t: 'mc', q: 'Was passiert bei zu wenig Luft im Reifen?', o: ['Er walkt, wird heiß und nutzt sich ab.', 'Er wird schneller.', 'Nichts.', 'Der Tank läuft aus.'], why: ''}]}
};
const jobsFor = v => Object.entries(JOBS).filter(([, j]) => j.kinds.includes(v.kind));
const jobDue = (st, k) => st.km - ((st.svc || {})[k] || 0) >= JOBS[k].every;
const dueCount = (v, st) => jobsFor(v).filter(([k]) => jobDue(st, k)).length;

VP.shop = (g, v, st) => `<b>🔧 Werkstatt</b><p class="m">Fahrzeuge brauchen Pflege. Nach ein paar Ausfahrten wird Wartung fällig.</p>${jobsFor(v).map(([k, j]) => { const due = jobDue(st, k), left = j.every - (st.km - ((st.svc || {})[k] || 0));
  return `<button class="item" onclick="jStart('${k}')"><div class="dot" style="background:${due ? '#ff453a33' : '#30d15822'}">${j.icon}</div><div style="flex:1"><b>${j.name}</b><span class="m">${due ? '⚠️ fällig' : 'wieder fällig in ' + left + ' km'}</span></div><span class="chev">›</span></button>` }).join('')}`;

function jStart(k) { const v = VEH[G.id]; G.job = {k, steps: JOBS[k].steps(v), i: 0, mist: 0}; jStep() }
function jStep() {
  const J = G.job, s = J.steps[J.i], box = $('#vp .vpc'); if (!box) return; const j = JOBS[J.k];
  const head = `<div class="row sp"><b>${j.icon} ${j.name}</b><span class="m">${J.i + 1}/${J.steps.length}</span></div><div class="steps" style="margin:8px 0 12px">${J.steps.map((_, i) => `<i class="${i <= J.i ? 'on' : ''}"></i>`).join('')}</div>`;
  if (!s) return jDone();
  box.innerHTML = head + (JSTEP[s.t](s) || '') + '<div id="jf"></div>'; if (JINIT[s.t]) JINIT[s.t](s);
}
const jNext = (d = 600) => setTimeout(() => { if (!G.job) return; G.job.i++; jStep() }, d);
const jfb = (c, h) => { const e = $('#jf'); if (e) e.innerHTML = `<div class="fb ${c}">${h}</div>` };
function jDone() {
  const st = gst(G.id), J = G.job; st.svc = st.svc || {}; st.svc[J.k] = st.km; S.points += 2; save(); snd('win'); confetti(); G.job = null;
  $('#vp .vpc').innerHTML = `<div class="center"><div class="big">🔧✅</div><b style="font-size:20px">Auftrag erledigt!</b><p class="m">${esc(JOBS[J.k].name)}${J.mist ? ' · ' + J.mist + ' Fehlgriffe' : ' · fehlerfrei'} · +2 Punkte</p></div><button class="btn alt" onclick="vRefresh();vPanel('shop')">Zurück zur Werkstatt</button>`;
}
const JSTEP = {
  mc(s) { s.ord = shuffle(s.o.map((_, i) => i)); return `<div class="q" style="font-size:19px">${esc(s.q)}</div>${s.ord.map(i => `<button class="opt" onclick="jmc(this,${i})">${esc(s.o[i])}</button>`).join('')}` },
  turn(s) { return `<div class="q" style="font-size:19px">${esc(s.q)}</div><p class="m">${s.dir < 0 ? '↺ Linksherum: lösen' : '↻ Rechtsherum: festziehen'} · ${de(s.turns, 1)} Umdrehungen</p>
    <div class="turn" id="tw"><div class="tring"><i id="tp"></i></div><div class="tico" id="ti">${s.ico}</div><div class="tarrow">${s.dir < 0 ? '↺' : '↻'}</div></div><div class="bar"><i id="tb" style="width:0"></i></div>` },
  slide(s) { return `<div class="q" style="font-size:19px">${esc(s.q)}</div>${s.chain ? '<svg viewBox="0 0 300 90" width="100%" id="chs"></svg>' : `<div class="center"><b id="sv" style="font-size:34px"></b></div>`}
    <div class="nl" style="margin:10px 0"><div class="nlr" style="display:block;left:${nlp((s.lo - s.min) / (s.max - s.min))};width:calc((100% - 26px) * ${(s.hi - s.lo) / (s.max - s.min)})"></div><input type="range" id="js" min="${s.min}" max="${s.max}" step="${s.step}" value="${s.chain ? 90 : s.min}"></div>
    ${s.chain ? '<div class="row sp m"><span>zu locker</span><span>zu straff</span></div>' : ''}<button class="btn" onclick="jslide()">Passt so</button>` },
  hold(s) { return `<div class="q" style="font-size:19px">${esc(s.q)}</div><div class="center big" id="hi2">${s.ico}</div><div class="bar"><i id="hb2" style="width:0"></i></div><button class="gas" id="jh" style="width:100%;margin-top:12px">${s.btn} (halten)</button>` },
  fill(s) { G.fv = s.start; return `<div class="q" style="font-size:19px">${esc(s.q)}</div><div class="pump"><div class="pg wide"><i id="fgi" style="height:${100 * s.start / s.max}%"></i><em style="bottom:${100 * s.lo / s.max}%;height:${100 * (s.hi - s.lo) / s.max}%;background:#30d15899"></em></div><div><b id="fv" style="font-size:34px">${de(s.start, 2)}</b>${s.unit}<br><span class="m">Ziel: grüner Bereich</span></div></div><button class="gas" id="jh" style="width:100%">${s.ico} ${s.btn} (halten)</button>` },
  dip(s) { G.oil = Math.random() < .5 ? 'low' : 'ok'; const L = 280, x0 = 10, lv = G.oil === 'low' ? .09 : .23, X = f => x0 + L * f;
    return `<div class="q" style="font-size:19px">Stab rein, wieder raus. Wie ist der Ölstand?</div><svg viewBox="0 0 300 74" width="100%"><rect x="${x0}" y="28" width="${L}" height="12" rx="6" fill="#8e8e93"/><rect x="${x0}" y="28" width="${L * lv}" height="12" rx="6" fill="#c98a1b"/><rect x="${X(.92)}" y="20" width="${L * .08}" height="28" rx="6" fill="#ffd60a"/>
      <line x1="${X(.15)}" y1="20" x2="${X(.15)}" y2="48" stroke="#fff" stroke-width="2"/><line x1="${X(.3)}" y1="20" x2="${X(.3)}" y2="48" stroke="#fff" stroke-width="2"/>
      <text x="${X(.15)}" y="62" fill="#fff" font-size="11" text-anchor="middle">MIN</text><text x="${X(.3)}" y="62" fill="#fff" font-size="11" text-anchor="middle">MAX</text><text x="${x0}" y="14" fill="#8e8e93" font-size="10">← Spitze</text><text x="${X(1)}" y="14" fill="#8e8e93" font-size="10" text-anchor="end">Griff</text></svg>
      <p class="m">Das Öl (braun) reicht von der Spitze bis zu seiner Kante.</p>
      ${shuffle(['ok', 'low', 'high']).map(k => `<button class="opt" onclick="jdip(this,'${k}')">${{ok: 'Zwischen MIN und MAX: alles gut', low: 'Unter MIN: Öl nachfüllen', high: 'Über MAX: zu viel Öl'}[k]}</button>`).join('')}` }
};
const JINIT = {
  turn(s) { const w = $('#tw'); let last = null, sum = 0, q = 0; const need = s.turns * 2 * Math.PI;
    const ang = e => { const b = w.getBoundingClientRect(); return Math.atan2(e.clientY - b.top - b.height / 2, e.clientX - b.left - b.width / 2) };
    w.onpointerdown = e => { w.setPointerCapture(e.pointerId); last = ang(e) };
    w.onpointermove = e => { if (last === null || !G.job) return; const a = ang(e); let d = a - last; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI; last = a; sum += d;
      const prog = sum * s.dir; $('#ti').style.transform = `rotate(${sum}rad)`; $('#tb').style.width = Math.max(0, Math.min(100, 100 * prog / need)) + '%';
      if (prog < -1.6) { sum = 0; G.job.mist++; jfb('bad', s.dir < 0 ? 'Falsche Richtung! Linksherum lösen, rechtsherum festziehen.' : 'Falsche Richtung! Zum Festziehen rechtsherum drehen.'); snd('bad') }
      const nq = Math.floor(prog / (Math.PI / 2)); if (nq > q) { q = nq; tone(1400, .02, 0, 'square', .03); tone(900, .02, .03, 'square', .02) }
      if (prog >= need) { w.onpointermove = null; last = null; jfb('good', s.dir < 0 ? 'Gelöst! 👍' : 'Fest! Aber nicht überdrehen: nach fest kommt ab.'); snd('ok'); jNext(900) } };
    w.onpointerup = w.onpointercancel = () => last = null },
  slide(s) { const r = $('#js'), upd = () => { const v = +r.value; if (s.chain) { const sag = 4 + (100 - v) * .42; $('#chs').innerHTML = `<circle cx="45" cy="45" r="16" fill="none" stroke="#8e8e93" stroke-width="4"/><circle cx="255" cy="45" r="30" fill="none" stroke="#8e8e93" stroke-width="4"/><path d="M45 29 Q150 ${29 - (v > 95 ? 0 : 2)} 255 15" fill="none" stroke="#d1d1d6" stroke-width="5" stroke-dasharray="5 3"/><path d="M45 61 Q150 ${61 + sag} 255 75" fill="none" stroke="#d1d1d6" stroke-width="5" stroke-dasharray="5 3"/>` } else $('#sv').textContent = de(v, 2) + s.unit }; r.oninput = upd; upd() },
  hold(s) { holdBtn(s, p => { $('#hb2').style.width = p + '%'; if (p % 10 < 4) tone(s.ico === '🧴' ? 2500 + Math.random() * 800 : 300, .04, 0, s.ico === '🧴' ? 'sawtooth' : 'triangle', .012) }, () => { jfb('good', 'Erledigt!'); jNext(700) }, s.ms) },
  fill(s) { const b = $('#jh'); let iv = null; const stop = () => { if (!iv) return; clearInterval(iv); iv = null;
      if (G.fv > s.hi) { G.job.mist++; jfb('bad', 'Zu viel! Etwas Luft ablassen und nochmal.'); G.fv = s.start; $('#fv').textContent = de(G.fv, 2); $('#fgi').style.height = 100 * G.fv / s.max + '%' }
      else if (G.fv < s.lo) jfb('', 'Noch nicht genug, weiter pumpen.'); else { b.disabled = true; jfb('good', 'Genau richtig!'); snd('ok'); jNext(900) } };
    b.addEventListener('pointerdown', e => { e.preventDefault(); if (iv || b.disabled) return; iv = setInterval(() => { G.fv += s.max / 160; $('#fv').textContent = de(G.fv, 2); $('#fgi').style.height = Math.min(100, 100 * G.fv / s.max) + '%'; tone(220, .03, 0, 'triangle', .02); if (G.fv >= s.max) stop() }, 60) });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(x => b.addEventListener(x, stop)); b.oncontextmenu = e => e.preventDefault() }
};
function holdBtn(s, tick, done, ms) { const b = $('#jh'); let t = null, p = 0; const stp = () => { clearInterval(t); t = null };
  b.addEventListener('pointerdown', e => { e.preventDefault(); if (t || p >= 100) return; t = setInterval(() => { p += 100 / (ms / 50); tick(Math.min(100, Math.round(p))); if (p >= 100) { stp(); b.disabled = true; done() } }, 50) });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(x => b.addEventListener(x, stp)); b.oncontextmenu = e => e.preventDefault() }
function jmc(b, i) { const s = G.job.steps[G.job.i]; if (s.done) return;
  if (i === 0) { s.done = true; b.classList.add('ok'); snd('ok'); jfb('good', '<b>Richtig!</b> ' + esc(s.why || '')); jNext(s.why ? 1600 : 700) }
  else { G.job.mist++; b.classList.add('bad'); b.disabled = true; snd('bad'); jfb('bad', 'Das passt nicht. Überleg noch einmal.') } }
function jslide() { const s = G.job.steps[G.job.i], v = +$('#js').value;
  if (v >= s.lo - 1e-9 && v <= s.hi + 1e-9) { snd('ok'); jfb('good', '<b>Passt!</b> ' + esc(s.why || '')); jNext(1700) }
  else { G.job.mist++; snd('bad'); jfb('bad', s.chain ? (v < s.lo ? 'Zu locker, die Kette könnte abspringen.' : 'Zu straff, das zerstört Kette und Lager.') : (v < s.lo ? 'Zu klein. Der Funke wird schwach.' : 'Zu groß. Der Funke springt schlecht über.') + ' Stell es in den grünen Bereich.') } }
function jdip(b, k) { if (b.disabled) return; if (k !== G.oil) { G.job.mist++; b.classList.add('bad'); b.disabled = true; snd('bad'); jfb('bad', 'Schau genau: Wo endet das Braune? MIN ist näher an der Spitze, MAX weiter hinten.'); return }
  b.classList.add('ok'); snd('ok'); document.querySelectorAll('#vp .opt').forEach(x => x.disabled = true);
  if (k === 'low') { jfb('good', '<b>Richtig, zu wenig!</b> Jetzt nachfüllen.'); G.job.steps.splice(G.job.i + 1, 0, {t: 'fill', q: 'Fülle Motoröl nach, bis der Stand zwischen MIN und MAX liegt. Langsam, nicht überfüllen!', max: 100, lo: 60, hi: 80, start: 22, unit: ' %', ico: '🛢️', btn: 'Einfüllen'}) }
  else jfb('good', '<b>Richtig, alles gut!</b> Messstab wieder rein.'); jNext(1300) }

// ---- Pannen beim Starten: manchmal springt der Motor nicht an. Dann heißt es: Fehler suchen wie ein Profi.
const PANNEN = {
  '2t': [{c: 'hahn', fix: 'Benzinhahn auf „AUF“ stellen'}, {c: 'kerze', fix: 'job:kerze'}, {c: 'stecker', fix: 'Kerzenstecker fest aufdrücken'}],
  '4t': [{c: 'kerze', fix: 'job:kerze'}, {c: 'luft', fix: 'job:luft'}],
  d: [{c: 'batt', fix: 'Batterie laden'}, {c: 'luft', fix: 'job:luft'}]
};
const CHECKS = {
  '2t': [['sprit', '⛽ Ist Sprit im Tank?'], ['hahn', '🚰 Kommt Sprit am Vergaser an?'], ['kerze', '🔌 Kerze rausdrehen und ansehen'], ['stecker', '⚡ Gibt es einen Funken?']],
  '4t': [['sprit', '⛽ Ist Sprit im Tank?'], ['kerze', '🔌 Kerze rausdrehen und ansehen'], ['luft', '🌬️ Luftfilter ansehen']],
  d: [['sprit', '⛽ Ist Diesel im Tank?'], ['batt', '🔋 Dreht der Anlasser kräftig?'], ['luft', '🌬️ Luftfilter ansehen']]
};
const CRES = {sprit: ['Ja, genug drin.', ''], hahn: ['Ja, Sprit kommt an.', 'Nein! Der Benzinhahn steht noch auf ZU. Gefunden!'], kerze: ['Die Kerze sieht rehbraun aus, alles gut.', 'Die Kerze ist schwarz verrußt und nass. Gefunden!'],
  stecker: ['Ja, kräftiger blauer Funke.', 'Kein Funke! Der Kerzenstecker sitzt locker. Gefunden!'], luft: ['Der Filter ist sauber.', 'Der Luftfilter ist total verstopft. Gefunden!'], batt: ['Ja, er dreht kräftig.', 'Nein, er dreht nur ganz müde: Die Batterie ist schwach. Gefunden!']};
function vPanne(v) {
  const st = gst(G.id); if (st.km < 5 || Math.random() > .3) return false;
  const p = PANNEN[v.kind][Math.floor(Math.random() * PANNEN[v.kind].length)]; G.panne = {p, tries: 0};
  $('#sqb').innerHTML = `<div class="center"><div class="big">😩</div><b style="font-size:20px">Er springt nicht an!</b><p class="m">Panne! Ein Profi sucht den Fehler der Reihe nach: Sprit, Funke, Luft. Was prüfst du?</p></div>
    ${CHECKS[v.kind].map(c => `<button class="opt" id="ck_${c[0]}" onclick="vCheck('${c[0]}')">${c[1]}</button>`).join('')}<div id="pf"></div>`;
  $('#sqf').innerHTML = ''; tone(120, .25, 0, 'triangle', .08); return true;
}
function vCheck(c) {
  const P = G.panne, b = $('#ck_' + c), hit = c === P.p.c; P.tries++; b.disabled = true; b.classList.add(hit ? 'ok' : 'gone');
  b.insertAdjacentHTML('beforeend', `<div class="m" style="margin-top:4px">${CRES[c][hit ? 1 : 0]}</div>`);
  if (!hit) { tone(500, .06, 0, 'sine', .05); return }
  snd('ok'); document.querySelectorAll('#sqb .opt').forEach(x => x.disabled = true);
  const job = P.p.fix.startsWith('job:') ? P.p.fix.slice(4) : null;
  $('#pf').innerHTML = `<div class="fb good">Nach ${P.tries} ${P.tries === 1 ? 'Prüfung' : 'Prüfungen'} gefunden. ${P.tries <= 2 ? 'Wie ein Profi!' : ''}</div>` +
    (job ? `<button class="btn" onclick="G.panne=null;vPanel('shop');jStart('${job}')">🔧 Reparieren: ${JOBS[job].name}</button>` : `<button class="gas" id="jh" style="width:100%">🔧 ${P.p.fix} (halten)</button><div class="bar" style="margin-top:8px"><i id="hb2" style="width:0"></i></div>`);
  if (!job) holdBtn({}, p => { $('#hb2').style.width = p + '%' }, () => { G.panne = null; const v = VEH[G.id]; $('#pf').innerHTML = '<div class="fb good">Repariert! Jetzt nochmal starten.</div>'; setTimeout(() => vPanel('start'), 1200) }, 1500);
}
