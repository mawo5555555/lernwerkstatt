// Kerninhalte: Welten (Themen), Fächer, Garage und Bausteine für die Missionen.
// Die Missionen selbst stehen in c-mathe.js, c-deutsch.js, c-englisch.js, c-nawi.js, c-sprechen.js
// Schritt-Typen: wissen, quiz, num, text, match, order, slider, parts, circuit, reaction, talk
//   (Sprech-Schritte: breath, rhythm, soft, phrase, challenge, rate)

const THEMES = {
  simson:  {name:'Simson',         emoji:'🛵', color:'#ff8a1f'},
  traktor: {name:'Traktor',        emoji:'🚜', color:'#4cc35a'},
  hof:     {name:'Landwirtschaft', emoji:'🌾', color:'#e0b43a'},
  sport:   {name:'Sport',          emoji:'⚽', color:'#3b8cff'},
  tuning:  {name:'Tuning',         emoji:'🔧', color:'#ff453a'}
};

const SUBJECTS = {
  mathe:    {name:'Mathe',    long:'Mathematik',          emoji:'🧮', color:'#0a84ff'},
  deutsch:  {name:'Deutsch',  long:'Deutsch',             emoji:'📖', color:'#ff6b4a'},
  englisch: {name:'Englisch', long:'Englisch',            emoji:'🌍', color:'#bf5af2'},
  nawi:     {name:'NaWi',     long:'Naturwissenschaften', emoji:'🔬', color:'#30d158'}
};

const MISSIONS = [];

// ---- Hilfen
const de = (n, d = 1) => (+n).toFixed(d).replace('.', ',').replace(/(,\d*?)0+$/, '$1').replace(/,$/, '');
const eur = n => (+n).toFixed(2).replace('.', ',') + ' €';
const gcd = (a, b) => b ? gcd(b, a % b) : a;
const lcm = (a, b) => a / gcd(a, b) * b;

// ---- Bausteine (richtige Antwort bei quiz steht immer zuerst, die App mischt)
const W = (title, text, fact, svg) => ({type:'wissen', title, text, fact, svg});
// Teile-Zeichnung: svg = Schlüssel in SVGS/SPOTS (c-grafik.js). ask=true: Teile müssen angetippt werden (zählt als Aufgabe)
const P = (title, text, svg, ask = false, en = false) => ({type:'parts', title, text, svg, ask, en});
const Q = (q, right, wrong, why) => ({type:'quiz', q, opts:[right, ...wrong], why});
const N = (q, a, why, o = {}) => ({type:'num', q, a, why, ...o});
const T = (q, a, why, o = {}) => ({type:'text', q, a:[].concat(a), why, ...o});
const M = (title, pairs, text) => ({type:'match', title, pairs, text});
const O = (title, items, text, alts) => ({type:'order', title, items, text, alts});
const L = (title, text, sliders, out) => ({type:'slider', title, text, sliders, out});
const X = (prompt, hint, seconds = 60) => ({type:'talk', prompt, hint, seconds});

const GARAGE = [
  {id:'g1', name:'Simson S51',           need:0,    emoji:'🛵', img:'img/garage1.png', text:'Dein erstes Moped.'},
  {id:'g2', name:'Rasentraktor',         need:80,   emoji:'🚜', img:'img/garage2.png', text:'Fürs Mähen und Üben.'},
  {id:'g3', name:'Kleiner Traktor',      need:200,  emoji:'🚜', img:'img/garage3.png', text:'Ab aufs Feld.'},
  {id:'g4', name:'Traktor mit Anhänger', need:400,  emoji:'🚛', img:'img/garage4.png', text:'Ernte einfahren.'},
  {id:'g5', name:'Mähdrescher',          need:700,  emoji:'🌾', img:'img/garage5.png', text:'Großes Gerät für große Aufgaben.'},
  {id:'g6', name:'Simson Schwalbe',      need:1000, emoji:'🛵', img:'img/garage6.png', text:'Der Klassiker für die Sammlung.'},
  {id:'g7', name:'Unimog',               need:1400, emoji:'🚛', img:'img/garage7.png', text:'Geht überall durch.'},
  {id:'g8', name:'Feldhäcksler',         need:1900, emoji:'🌽', img:'img/garage8.png', text:'Ganz oben in der Garage.'}
];

// ---- Das große Ziel: Etappen. Eine Etappe ist geschafft, wenn alle Missionen mindestens 2 Sterne haben.
const PROJECT = {
  name: 'MTX 125',
  title: 'Das große Ziel: MTX-Zylinder',
  text: 'Ein Zylinder mit etwa 120 bis 125 cm³ für den MTX-Motor. Bis du ihn einbauen kannst, sammelst du hier das Wissen eines echten Tuners. Jede Etappe besteht aus Missionen aus verschiedenen Fächern.',
  note: 'Wichtig: Ein Umbau auf 125 cm³ ist nur mit Prüfung, Eintragung in die Papiere und dem passenden Führerschein für die Straße erlaubt. Schrauben und Planen machst du mit Erwachsenen.',
  stages: [
    {title: 'Motor verstehen',        text: 'Zweitakt, Wärme und Kühlkreislauf.',          ids: ['nawi-8', 'nawi-9', 'nawi-16']},
    {title: 'Rechnen wie ein Tuner',  text: 'Hubraum, Übersetzung und Zahlen im Griff.',    ids: ['mathe-8', 'mathe-9', 'mathe-12']},
    {title: 'Lesen und verstehen',    text: 'Fachtexte auf Deutsch und Englisch.',          ids: ['deutsch-10', 'deutsch-14', 'englisch-12']},
    {title: 'Planen und sparen',      text: 'Teile-Liste, Sparplan und Brief an den Händler.', ids: ['mathe-10', 'mathe-13', 'deutsch-13']},
    {title: 'Regeln und Sicherheit',  text: 'Betriebserlaubnis, Führerschein und Argumente.', ids: ['deutsch-8', 'deutsch-15']}
  ]
};
