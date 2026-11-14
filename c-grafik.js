// Technische Zeichnungen als SVG (selbst gezeichnete Schemata, keine Fotos).
// Fotorealistische Bilder kommen später aus ChatGPT (siehe BILD-PROMPTS.md) und werden unter img/ abgelegt.
const SVGS = {};
const INK = '#d1d1d6', DARK = '#2c2c2e', MID = '#48484a', GREY = '#8e8e93', OR = '#ff8a1f';

const wheel = (cx, cy, r, tyre = 9) => {
  let sp = ''; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; sp += `<line x1="${cx}" y1="${cy}" x2="${(cx + (r - tyre) * Math.cos(a)).toFixed(1)}" y2="${(cy + (r - tyre) * Math.sin(a)).toFixed(1)}"/>` }
  return `<g fill="none" stroke-linecap="round"><circle cx="${cx}" cy="${cy}" r="${r - tyre / 2}" stroke="#1c1c1e" stroke-width="${tyre}"/><circle cx="${cx}" cy="${cy}" r="${r - tyre / 2}" stroke="${MID}" stroke-width="${tyre - 3}" stroke-dasharray="2 3" opacity=".6"/>
  <circle cx="${cx}" cy="${cy}" r="${r - tyre}" stroke="${GREY}" stroke-width="2"/><g stroke="${GREY}" stroke-width="1.2">${sp}</g><circle cx="${cx}" cy="${cy}" r="5" fill="${INK}" stroke="none"/></g>`;
};
const svg = (body, vb = '0 0 400 240') => `<svg viewBox="${vb}" width="100%" xmlns="http://www.w3.org/2000/svg" style="display:block">${body}</svg>`;
const ground = (y = 214) => `<line x1="10" y1="${y}" x2="390" y2="${y}" stroke="${MID}" stroke-width="2" stroke-dasharray="6 6"/>`;

// ---- Simson-Mokick (Schema, seitlich)
SVGS.simson = svg(`${ground()}
 <g fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M92 172 L205 158" stroke="${GREY}" stroke-width="6"/>
  <path d="M110 160 L132 102" stroke="${GREY}" stroke-width="5"/>
  <path d="M282 86 L146 102" stroke="${INK}" stroke-width="7"/>
  <path d="M146 102 L132 102" stroke="${INK}" stroke-width="7"/>
  <path d="M290 92 L318 172" stroke="${INK}" stroke-width="6"/>
  <path d="M282 74 L282 92" stroke="${INK}" stroke-width="7"/>
  <path d="M280 72 L298 56 L316 60" stroke="${INK}" stroke-width="5"/>
  <path d="M196 104 L192 150 M236 108 L222 142" stroke="${GREY}" stroke-width="4"/>
 </g>
 ${wheel(92, 172, 42)}${wheel(318, 172, 42)}
 <path d="M286 136 A46 46 0 0 1 356 150" fill="none" stroke="${GREY}" stroke-width="3"/>
 <path d="M52 140 A46 46 0 0 1 120 128" fill="none" stroke="${GREY}" stroke-width="3"/>
 <path d="M96 94 C104 82 150 84 160 90 L160 100 L96 102 Z" fill="#1c1c1e" stroke="${INK}" stroke-width="2"/>
 <path d="M158 84 C164 62 254 58 274 82 L266 98 L166 100 Z" fill="${OR}" stroke="#ffb866" stroke-width="2"/>
 <circle cx="328" cy="76" r="12" fill="#ffd60a" stroke="${INK}" stroke-width="2"/>
 <rect x="68" y="104" width="12" height="7" rx="2" fill="#ff453a"/>
 <rect x="132" y="116" width="36" height="26" rx="8" fill="${MID}" stroke="${INK}" stroke-width="2"/>
 <circle cx="206" cy="168" r="26" fill="${MID}" stroke="${INK}" stroke-width="2.5"/><rect x="186" y="164" width="40" height="26" rx="9" fill="${MID}" stroke="${INK}" stroke-width="2.5"/>
 <g transform="rotate(45 207 164)"><rect x="196" y="100" width="22" height="64" rx="3" fill="#636366" stroke="${INK}" stroke-width="2"/>
  <g stroke="${INK}" stroke-width="2.5"><line x1="191" y1="108" x2="223" y2="108"/><line x1="191" y1="116" x2="223" y2="116"/><line x1="191" y1="124" x2="223" y2="124"/><line x1="191" y1="132" x2="223" y2="132"/><line x1="191" y1="140" x2="223" y2="140"/></g>
  <rect x="194" y="92" width="26" height="10" rx="3" fill="${GREY}" stroke="${INK}" stroke-width="2"/><line x1="207" y1="92" x2="207" y2="80" stroke="#ffd60a" stroke-width="4"/></g>
 <rect x="168" y="146" width="22" height="14" rx="4" fill="#5ac8fa" stroke="${INK}" stroke-width="2"/>
 <path d="M238 146 C262 156 264 196 232 199 L150 199" fill="none" stroke="${GREY}" stroke-width="7" stroke-linecap="round"/>
 <rect x="62" y="190" width="90" height="16" rx="8" fill="${GREY}" stroke="${INK}" stroke-width="2"/>
 <circle cx="190" cy="178" r="6" fill="${INK}"/><circle cx="92" cy="172" r="14" fill="none" stroke="${INK}" stroke-width="2"/>
 <path d="M190 172 L92 158 M190 184 L92 186" stroke="${GREY}" stroke-width="2.5" fill="none"/>`);
const SIMSON_SPOTS = [
  {x: 45, y: 61, name: 'Vergaser', en: 'carburettor', info: 'Der Vergaser mischt Luft und Benzin zu einem zündfähigen Gemisch. Beim Tuning wird er oft gegen einen größeren Vergaser getauscht, die Düsen müssen dann neu abgestimmt werden.'},
  {x: 58, y: 54, name: 'Zylinder mit Kühlrippen', en: 'cylinder', info: 'Im Zylinder bewegt sich der Kolben. Die Rippen geben die Wärme an die Luft ab (Luftkühlung). Tuning-Zylinder haben oft mehr Hubraum und geänderte Kanäle.'},
  {x: 65, y: 46, name: 'Zündkerze', en: 'spark plug', info: 'Die Kerze erzeugt den Zündfunken, der das verdichtete Gemisch entzündet. Der Elektrodenabstand muss stimmen.'},
  {x: 25, y: 82, name: 'Auspuff-Endtopf', en: 'exhaust (silencer)', info: 'Der Auspuff leitet die heißen Abgase ab und dämpft den Lärm. Seine Form beeinflusst auch, wie gut der Motor Leistung abgibt.'},
  {x: 35, y: 74, name: 'Kette', en: 'chain', info: 'Die Kette überträgt die Kraft vom Ritzel am Motor auf das Kettenrad am Hinterrad.'},
  {x: 54, y: 32, name: 'Tank', en: 'fuel tank', info: 'Im Tank ist das Gemisch aus Benzin und Zweitaktöl.'},
  {x: 77, y: 23, name: 'Lenker', en: 'handlebar', info: 'Am Lenker sitzen Gasgriff, Bremshebel und Kupplungshebel.'},
  {x: 82, y: 34, name: 'Scheinwerfer', en: 'headlight', info: 'Der Scheinwerfer wird vom Stromkreis der Lichtmaschine versorgt.'},
  {x: 17, y: 66, name: 'Hinterrad', en: 'rear wheel', info: 'Das Hinterrad wird über die Kette angetrieben. Der Reifen überträgt die Kraft auf die Straße.'},
  {x: 39, y: 55, name: 'Luftfilter', en: 'air filter', info: 'Der Luftfilter hält Staub und Schmutz aus der Ansaugluft fern.'}
];

// ---- Traktor (Schema, seitlich)
SVGS.traktor = svg(`${ground()}
 ${wheel(118, 160, 54, 12)}${wheel(322, 186, 30, 8)}
 <g stroke-linecap="round" stroke-linejoin="round">
  <path d="M170 118 H332 L346 152 V176 H170 Z" fill="#2f7a3b" stroke="#6fdc84" stroke-width="2"/>
  <rect x="330" y="128" width="22" height="42" rx="5" fill="${MID}" stroke="${INK}" stroke-width="2"/>
  <g stroke="${INK}" stroke-width="1.5"><line x1="334" y1="136" x2="348" y2="136"/><line x1="334" y1="144" x2="348" y2="144"/><line x1="334" y1="152" x2="348" y2="152"/><line x1="334" y1="160" x2="348" y2="160"/></g>
  <path d="M84 150 V72 H178 V150 Z" fill="#1c3a4a" stroke="${INK}" stroke-width="3"/><rect x="94" y="82" width="74" height="50" rx="4" fill="#5ac8fa" opacity=".35"/>
  <rect x="76" y="66" width="110" height="8" rx="3" fill="${MID}" stroke="${INK}" stroke-width="2"/>
  <path d="M300 118 V62" stroke="${GREY}" stroke-width="7"/><path d="M294 60 H308" stroke="${INK}" stroke-width="5"/>
  <circle cx="352" cy="122" r="7" fill="#ffd60a" stroke="${INK}" stroke-width="2"/>
  <path d="M118 168 L44 186" stroke="${INK}" stroke-width="7"/><path d="M110 100 L40 152" stroke="${GREY}" stroke-width="5"/>
  <path d="M132 130 L58 168" stroke="${OR}" stroke-width="12"/><path d="M58 168 L44 176" stroke="${INK}" stroke-width="6"/>
  <rect x="28" y="170" width="20" height="14" rx="3" fill="${MID}" stroke="${INK}" stroke-width="2"/>
  <rect x="26" y="184" width="30" height="8" rx="3" fill="${GREY}"/>
 </g>`);
const TRAKTOR_SPOTS = [
  {x: 62, y: 62, name: 'Motor unter der Haube', info: 'Im Traktor arbeitet meist ein starker Dieselmotor. Er treibt die Räder, die Hydraulik und die Zapfwelle an.'},
  {x: 76, y: 28, name: 'Auspuff', info: 'Der Auspuff steht senkrecht nach oben, damit Abgase und Lärm nicht in die Kabine ziehen.'},
  {x: 32, y: 45, name: 'Kabine', info: 'Die Kabine schützt vor Wetter und Lärm. Oft hat sie Klimaanlage und Radio.'},
  {x: 29, y: 67, name: 'Hinterrad', info: 'Die großen Hinterräder mit dem groben Profil haben viel Grip auf dem Acker und verteilen das Gewicht.'},
  {x: 80, y: 78, name: 'Vorderrad', info: 'Die kleineren Vorderräder lenken den Traktor.'},
  {x: 24, y: 63, name: 'Hydraulikzylinder', info: 'Im Zylinder drückt Öl einen Kolben. Weil Flüssigkeiten sich nicht zusammendrücken lassen, hebt die Hydraulik schwere Geräte.'},
  {x: 16, y: 74, name: 'Unterlenker', info: 'Die Unterlenker halten Geräte wie Pflug oder Mähwerk am Heck. Das nennt man Dreipunktaufhängung.'},
  {x: 9, y: 79, name: 'Zapfwelle', info: 'Die Zapfwelle ist eine drehende Welle am Heck. Sie treibt angehängte Geräte an, zum Beispiel ein Mähwerk.'},
  {x: 88, y: 51, name: 'Scheinwerfer', info: 'Scheinwerfer und Arbeitsscheinwerfer helfen bei der Arbeit in der Dämmerung.'}
];

// ---- Rasentraktor (Schema, seitlich)
SVGS.rasen = svg(`${ground()}
 ${wheel(120, 176, 34, 10)}${wheel(310, 192, 22, 8)}
 <g stroke-linecap="round" stroke-linejoin="round">
  <rect x="150" y="176" width="130" height="24" rx="10" fill="${MID}" stroke="${INK}" stroke-width="2"/><line x1="170" y1="190" x2="262" y2="190" stroke="#ffd60a" stroke-width="4" stroke-dasharray="14 8"/>
  <path d="M200 176 V150 H318 L326 176 Z" fill="#c8382b" stroke="#ff7a6b" stroke-width="2"/>
  <path d="M232 150 V100 M232 100 L262 88" stroke="${INK}" stroke-width="5" fill="none"/><ellipse cx="262" cy="82" rx="24" ry="8" transform="rotate(-18 262 82)" fill="none" stroke="${INK}" stroke-width="5"/>
  <path d="M96 152 C100 126 100 108 106 96 H150 L156 150 Z" fill="#1c1c1e" stroke="${INK}" stroke-width="2"/>
  <path d="M150 176 L156 150" stroke="${GREY}" stroke-width="5"/>
  <path d="M46 160 V124 H88 V160 Z" fill="#2c2c2e" stroke="${INK}" stroke-width="2.5"/><g stroke="${GREY}" stroke-width="1.5"><line x1="52" y1="132" x2="82" y2="132"/><line x1="52" y1="142" x2="82" y2="142"/><line x1="52" y1="152" x2="82" y2="152"/></g>
  <path d="M150 188 C112 188 100 170 90 150" stroke="${GREY}" stroke-width="7" fill="none"/>
  <path d="M290 150 L294 176" stroke="${INK}" stroke-width="5"/>
 </g>`);
const RASEN_SPOTS = [
  {x: 52, y: 80, name: 'Mähdeck', info: 'Unter dem Mähdeck drehen Messer. Die Schnitthöhe wird mit einem Hebel eingestellt.'},
  {x: 56, y: 84, name: 'Messer', info: 'Das Messer schneidet das Gras und wirbelt es zum Auswurf. Es muss scharf sein, sonst reißt es die Halme.'},
  {x: 15, y: 62, name: 'Fangkorb', info: 'Im Fangkorb sammelt sich das Gras. Ist er voll, muss man ihn leeren.'},
  {x: 66, y: 36, name: 'Lenkrad', info: 'Mit dem Lenkrad werden die Vorderräder eingeschlagen.'},
  {x: 31, y: 48, name: 'Sitz', info: 'Auf dem Sitz fährst du. Ein Sicherheitsschalter schaltet das Messer ab, wenn man aufsteht.'},
  {x: 70, y: 66, name: 'Motor unter der Haube', info: 'Meist ein kleiner Benzinmotor mit Einzylinder oder Zweizylinder. Er treibt Räder und Messer an.'},
  {x: 30, y: 74, name: 'Hinterrad', info: 'Die Hinterräder sind größer und treiben den Rasentraktor an.'},
  {x: 77, y: 82, name: 'Vorderrad', info: 'Die kleinen Vorderräder lenken den Rasentraktor.'}
];

// ---- Zweitaktmotor im Schnitt (Modell: Hub 44, Kurbelradius 22, Pleuel 62; 1 Einheit = 1 mm)
function zyl(alpha, opt = {}) {
  const r = 22, l = 62, a = alpha * Math.PI / 180, cx = 150, cy = 240;
  const pin = cy - (r * Math.cos(a) + Math.sqrt(l * l - (r * Math.sin(a)) ** 2)), crown = pin - 22, skirt = crown + 34;
  const ex = crown > 164, tr = crown > 169, inn = skirt < 186, up = alpha > 180 && alpha < 360;
  const kx = cx + r * Math.sin(a), ky = cy - r * Math.cos(a);
  const burn = alpha >= 345 || alpha <= 70, fl = alpha >= 345 ? .25 + (alpha - 345) / 30 : alpha <= 70 ? Math.max(.18, .6 - alpha / 140) : 0;
  const gas = ex ? 'rgba(142,142,147,.45)' : burn ? `rgba(255,138,31,${fl.toFixed(2)})` : up && alpha > 255 ? 'rgba(255,190,100,.28)' : 'rgba(90,200,250,.22)';
  let o = `<rect x="84" y="200" width="132" height="96" rx="38" fill="${DARK}" stroke="${INK}" stroke-width="2.5"/>
   <path d="M98 126 H202 V200 H98 Z" fill="${MID}" stroke="${INK}" stroke-width="2.5"/>
   <g stroke="${INK}" stroke-width="2.5"><line x1="90" y1="136" x2="98" y2="136"/><line x1="90" y1="146" x2="98" y2="146"/><line x1="90" y1="156" x2="98" y2="156"/><line x1="202" y1="136" x2="210" y2="136"/><line x1="202" y1="146" x2="210" y2="146"/><line x1="202" y1="156" x2="210" y2="156"/></g>
   <path d="M98 126 Q98 98 150 98 Q202 98 202 126 Z" fill="#636366" stroke="${INK}" stroke-width="2.5"/>
   <rect x="112" y="126" width="76" height="74" fill="${DARK}"/>
   <path d="M112 126 Q112 106 150 106 Q188 106 188 126 Z" fill="${gas}"/><rect x="112" y="126" width="76" height="${Math.max(0, crown - 126)}" fill="${gas}"/>
   <rect x="60" y="164" width="52" height="18" fill="#1c1c1e" stroke="${INK}" stroke-width="2"/><rect x="60" y="186" width="52" height="14" fill="#1c1c1e" stroke="${INK}" stroke-width="2"/>
   <path d="M188 169 H214 V204 H202 V187 H188 Z" fill="#1c1c1e" stroke="${INK}" stroke-width="2"/>
   <rect x="86" y="202" width="128" height="92" rx="36" fill="rgba(90,200,250,.14)"/>
   <rect x="146" y="74" width="8" height="26" fill="#ffd60a" stroke="${INK}" stroke-width="1.5"/><rect x="143" y="62" width="14" height="14" rx="3" fill="${GREY}" stroke="${INK}" stroke-width="1.5"/>
   <circle cx="${cx}" cy="${cy}" r="34" fill="#636366" stroke="${INK}" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="5" fill="${INK}"/>
   <line x1="${cx}" y1="${cy}" x2="${kx.toFixed(1)}" y2="${ky.toFixed(1)}" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
   <line x1="${kx.toFixed(1)}" y1="${ky.toFixed(1)}" x2="150" y2="${pin.toFixed(1)}" stroke="#bfbfc4" stroke-width="6" stroke-linecap="round"/>
   <rect x="114" y="${crown.toFixed(1)}" width="72" height="34" rx="3" fill="#bfbfc4" stroke="${INK}" stroke-width="2"/>
   <line x1="114" y1="${(crown + 7).toFixed(1)}" x2="186" y2="${(crown + 7).toFixed(1)}" stroke="#636366" stroke-width="2"/><line x1="114" y1="${(crown + 12).toFixed(1)}" x2="186" y2="${(crown + 12).toFixed(1)}" stroke="#636366" stroke-width="2"/>
   <circle cx="150" cy="${pin.toFixed(1)}" r="5" fill="#2c2c2e" stroke="${INK}" stroke-width="1.5"/><circle cx="${kx.toFixed(1)}" cy="${ky.toFixed(1)}" r="5" fill="${INK}"/>`;
  if (!opt.still) {
    if (ex) o += `<path d="M104 173 H56 M64 168 L54 173 L64 178" stroke="${GREY}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    if (tr) o += `<path d="M208 196 V176 M203 183 L208 174 L213 183" stroke="#5ac8fa" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    if (inn) o += `<path d="M54 193 H104 M96 188 L106 193 L96 198" stroke="#5ac8fa" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    if (alpha >= 345 && alpha <= 359 || alpha === 0) o += `<path d="M150 106 l5 -9 l-3 0 l5 -9 M150 106 l-6 -8" stroke="#ffd60a" stroke-width="3" fill="none"/>`;
    o += `<text x="8" y="156" font-size="10" fill="${GREY}">Auslass</text><text x="8" y="209" font-size="10" fill="${GREY}">Einlass</text><text x="218" y="180" font-size="10" fill="${GREY}">Überströmer</text>`;
  }
  let phase;
  if (tr) phase = 'Spülen: Frisches Gemisch strömt aus dem Kurbelgehäuse durch den Überströmkanal nach oben und schiebt die Abgase hinaus.';
  else if (ex) phase = 'Auslass: Der Kolben gibt den Auslass frei, die heißen Abgase strömen hinaus.';
  else if (up && alpha > 255) phase = 'Verdichten: Der Kolben steigt und presst das Gemisch zusammen. Unter dem Kolben wird gleichzeitig neues Gemisch angesaugt.';
  else if (burn && alpha >= 345 || alpha === 0) phase = 'Zündung: Der Funke entzündet das verdichtete Gemisch.';
  else if (up) phase = 'Aufwärtshub: Unter dem Kolben saugt der Unterdruck frisches Gemisch ins Kurbelgehäuse.';
  else phase = 'Arbeiten: Das heiße Gas dehnt sich aus und drückt den Kolben nach unten. Das ist der Antrieb.';
  return {svg: svg(o, '0 54 300 246'), phase, ex, tr, inn, up};
}
SVGS.zyl = zyl(130, {still: true}).svg;
const ZYL_SPOTS = [
  {x: 50, y: 6, name: 'Zündkerze', info: 'Sie entzündet das verdichtete Gemisch mit einem Funken.'},
  {x: 50, y: 23, name: 'Brennraum', info: 'Hier verbrennt das Gemisch. Die Form des Brennraums und die Verdichtung sind beim Tuning wichtige Stellschrauben.'},
  {x: 50, y: 49, name: 'Kolben', info: 'Der Kolben wird vom heißen Gas nach unten gedrückt. Er dichtet mit Kolbenringen gegen die Zylinderwand ab.'},
  {x: 28, y: 49, name: 'Auslass', info: 'Hier strömen die Abgase aus dem Zylinder in den Auspuff. Beim Tuning wird der Auslass oft höher oder breiter gemacht. Das verändert die Steuerzeiten.'},
  {x: 70, y: 54, name: 'Überströmer', info: 'Der Kanal führt frisches Gemisch vom Kurbelgehäuse in den Zylinder. Tuning-Zylinder haben oft mehr oder größere Überströmkanäle.'},
  {x: 28, y: 60, name: 'Einlass', info: 'Hier strömt frisches Gemisch vom Vergaser in den Motor, sobald der Kolben das Fenster freigibt.'},
  {x: 50, y: 76, name: 'Kurbelwelle', info: 'Die Kurbelwelle wandelt die Auf-und-ab-Bewegung des Kolbens in eine Drehung um.'},
  {x: 46, y: 65, name: 'Pleuel', info: 'Das Pleuel verbindet Kolben und Kurbelwelle.'},
  {x: 28, y: 88, name: 'Kurbelgehäuse', info: 'Im Kurbelgehäuse wird das frische Gemisch vorverdichtet, bevor es durch die Überströmkanäle nach oben geht.'}
];

const SPOTS = {simson: SIMSON_SPOTS, traktor: TRAKTOR_SPOTS, rasen: RASEN_SPOTS, zyl: ZYL_SPOTS};
