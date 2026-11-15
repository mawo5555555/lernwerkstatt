# Lernwerkstatt

Lern-App (PWA) für den Stoff der 6. Klasse in Brandenburg: Deutsch, Mathe, Englisch und Naturwissenschaften. Die Aufgaben sind in die Welt von Simson, Tuning, Traktor, Rasentraktor, Landwirtschaft und Sport eingebettet. Läuft im Browser, auf iPhone und iPad als Home-Bildschirm-App. Der Fortschritt liegt lokal im Gerät (localStorage).

Version 1.5 (Test).

## Online

https://mawo5555555.github.io/lernwerkstatt/ (GitHub Pages). Auf dem iPhone oder iPad in Safari öffnen, dann Teilen und „Zum Home-Bildschirm“.

## Starten

```bash
python3 -m http.server 8731
```

Dann `http://localhost:8731` öffnen. 

## Aufbau

| Datei | Inhalt |
| --- | --- |
| `index.html` | Oberfläche und Styles |
| `app.js` | Logik: Tagesplan, Missionen, Aufgabentypen, Punkte, Garage, Elternbereich |
| `content.js` | Welten, Fächer, Garage und Bausteine (`W`, `Q`, `N`, `T`, `M`, `O`, `L`, `P`, `X`) |
| `c-grafik.js` | Technische Zeichnungen als SVG (Simson S51, Simson SR50, Traktor, Rasentraktor, Zweitaktmotor, Kühlkreislauf) |
| `c-mathe.js`, `c-deutsch.js`, `c-englisch.js`, `c-nawi.js` | Missionen je Fach |
| `c-technik.js` | Profi-Werkstatt: Motortechnik über den Schulstoff hinaus (mit Taschenrechner) |
| `c-extra.js` | Mitmach-Aufgaben (Sortieren, Lückentext, Blitzrunde, Zahlenstrahl), werden in die Missionen eingefügt |
| `garage.js` | Garage: Fahrzeugseiten mit Steckbrief, Starten, Schaltspiel, Tanken, Waschen, Experten-Quiz, Teile |
| `c-sprechen.js` | kleine Sprech-Übungen (Bestandteil von Deutsch) |
| `sw.js`, `manifest.webmanifest` | Offline-Cache und Installation |
| `img/foto/` | Fotos: eigene Aufnahmen des Rasentraktors und freie Bilder von Wikimedia Commons (Nachweis in der App unter Eltern, Bildnachweis) |
| `img/ki/`, `img/cover/`, `img/m-*.jpg` | KI-erzeugte Bilder (ChatGPT, Gemini) für Garage, Titelbilder und Missionen; Missionsbilder stehen in `MIMG_LIST` (content.js) |
| `img/` | optionale Bilder: `garage1.png` bis `garage8.png`, `m-<mission-id>.jpg` (siehe `BILD-PROMPTS.md`) |

## Neue Missionen hinzufügen

Eine Mission ist ein Eintrag in `MISSIONS` (in einer der `c-*.js` Dateien, oder in einer neuen Datei):

```js
MISSIONS.push({
  id: 'mathe-12',            // eindeutig
  subject: 'mathe',          // mathe | deutsch | englisch | nawi
  theme: 'simson',           // simson | traktor | hof | sport | tuning (Farbe und Symbol)
  topic: 'Brüche',           // Überschrift in der Liste
  title: 'Mein Titel', sub: 'Kurzer Untertitel', min: 12,
  rlp: 'Lehrplan-Bezug für den Elternbereich',
  steps: [
    W('Titel', 'Erklärtext mit **fett**.\nNeue Zeile.', 'Wusstest du? (optional)'),
    Q('Frage?', 'richtige Antwort', ['falsch 1', 'falsch 2'], 'Erklärung'),
    N('Rechenaufgabe?', 42, 'Rechenweg', {unit: 'm', hint: 'Tipp'}),
    T('Texteingabe?', ['Antwort', 'andere erlaubte Antwort'], 'Erklärung'),
    M('Zuordnen', [['links', 'rechts'], ['a', 'b']]),
    O('Reihenfolge', ['1. Schritt', '2. Schritt', '3. Schritt']),
    L('Labor', 'Text', [{id: 'x', label: 'x', min: 0, max: 10, step: 1, val: 5, unit: ''}], v => `Ergebnis: ${v.x * 2}`),
    P('Teile', 'Tippe auf die Zahlen', 'simson'),
    X('Erkläre in eigenen Worten …', 'Tipp …', 60)
  ]
});
```

Danach, falls es eine neue Datei ist, den `<script>`-Tag in `index.html` und den Dateinamen in `sw.js` ergänzen. Die Reihenfolge der Missionen im Fach entspricht der Reihenfolge im Code. Nur Aufgabentypen mit richtiger Antwort zählen für die Sterne (Quiz, Zahl, Text, Zuordnen, Reihenfolge, Teile finden).

Neue Zeichnungen: in `c-grafik.js` ein SVG in `SVGS` und die Tipp-Punkte in `SPOTS` anlegen.

## Hinweise

- Die Technikzeichnungen sind vereinfachte Schemata, keine Bauzeichnungen.
- Die Preise in den Rechenaufgaben sind Beispiele.
- Inhalte orientieren sich am Rahmenlehrplan Berlin-Brandenburg (Teil C). Der Lehrplan wird überarbeitet, bitte mit der Schule abgleichen.
