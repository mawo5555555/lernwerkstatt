// Deutsch Klasse 6 (Rahmenlehrplan Berlin-Brandenburg): Wortarten, Satzglieder, Zeitformen, Wortbildung, Rechtschreibung, Schreiben
MISSIONS.push(

{id:'deutsch-1', subject:'deutsch', theme:'simson', topic:'Wortarten', title:'Wortarten-Werkstatt', sub:'Nomen, Verben, Adjektive erkennen', min:12,
 rlp:'Sprachwissen: Wortarten unterscheiden, Nominalisierung (Nomensignale), Steigerung, Plural',
 steps:[
  W('Wörter sortieren wie Werkzeug', 'Jede Wortart hat ihre Aufgabe:\n\n• **Nomen** (Namenwörter): Dinge, Lebewesen, Gedanken. Sie werden großgeschrieben und haben einen Artikel: der Traktor.\n• **Verben** (Tunwörter): Was passiert? fahren, schrauben, er fährt.\n• **Adjektive** (Wiewörter): Wie ist etwas? schnell, rostig. Man kann sie steigern.\n\n**Nominalisierung:** Aus Verben und Adjektiven werden Nomen, wenn ein **Nomensignal** davorsteht (Artikel, beim, zum, im …). Dann schreibst du sie groß: das Fahren, beim Schrauben.'),
  Q('Die rote Simson knattert durch das Dorf. Welches Wort ist das Verb?', 'knattert', ['rote', 'durch', 'Dorf'], 'Das Verb sagt, was passiert: Sie knattert. Man kann es verändern: ich knattere, sie knattert.'),
  Q('Im selben Satz: Welches Wort ist das Adjektiv?', 'rote', ['Simson', 'knattert', 'durch'], 'Das Adjektiv sagt, wie die Simson ist: rot. Vor einem Nomen bekommt es eine Endung: die rote Simson.'),
  Q('Welches Wort ist ein Nomen?', 'Dorf', ['durch', 'rote', 'knattert'], 'Vor „Dorf“ steht ein Artikel: das Dorf.'),
  Q('Welcher Satz ist richtig geschrieben?', 'Beim Schrauben habe ich mir den Finger geklemmt.', ['Beim schrauben habe ich mir den Finger geklemmt.', 'Beim Schrauben habe ich mir den finger geklemmt.', 'beim Schrauben habe ich mir den Finger geklemmt.'], '„beim“ ist ein Nomensignal. Darum wird „Schrauben“ großgeschrieben. Auch „Finger“ ist ein Nomen.'),
  M('Ordne zu', [['Nomen', 'Traktor'], ['Verb', 'schrauben'], ['Adjektiv', 'rostig'], ['Artikel', 'der'], ['Präposition', 'unter']], 'Welche Wortart passt zu welchem Beispiel?'),
  T('Mache aus dem Verb ein Nomen: Opa hilft mir beim ___ (reparieren).', 'Reparieren', 'Nach „beim“ steht ein Nomen. Es wird großgeschrieben: beim Reparieren.', {cs:true, hint:'Nach „beim“ wird groß geschrieben.'}),
  T('Steigere: schnell – schneller – am ___', 'schnellsten', 'Die zweite Steigerung: am schnellsten.', {}),
  T('Mehrzahl von „der Traktor“: die ___', 'Traktoren', 'Der Plural lautet Traktoren. (Betont wird: Trak-TO-ren.)', {cs:true})
]},

{id:'deutsch-2', subject:'deutsch', theme:'traktor', topic:'Satzglieder', title:'Satzglieder-Check', sub:'Subjekt, Prädikat, Objekt und Co.', min:12,
 rlp:'Sprachwissen: Satzglieder (Subjekt, Prädikat, Objekt, Adverbiale) mit der Umstellprobe bestimmen',
 steps:[
  W('Der Satz wird zerlegt', 'Satzglieder erkennst du mit der **Umstellprobe**: Was beim Umstellen immer zusammenbleibt, ist ein Satzglied.\n\n• **Prädikat**: die Verbform (was passiert?). Im Aussagesatz steht sie immer an zweiter Stelle.\n• **Subjekt**: Wer oder was tut etwas?\n• **Objekt**: Wen oder was? (Akkusativ) / Wem? (Dativ)\n• **Adverbiale**: Wann? Wo? Wie? Warum?\n\nBeispiel: Der Landwirt | fährt | am Morgen | mit dem Traktor | auf das Feld.'),
  Q('Wie viele Satzglieder hat: Der Landwirt fährt am Morgen mit dem Traktor auf das Feld?', '5', ['4', '6', '9'], 'Der Landwirt | fährt | am Morgen | mit dem Traktor | auf das Feld = 5 Satzglieder.'),
  Q('Was ist das Subjekt in „Heute mäht Lena den Rasen“?', 'Lena', ['Heute', 'mäht', 'den Rasen'], 'Frage: Wer mäht? Lena.'),
  Q('Was ist das Objekt in „Der Bauer repariert den Rasentraktor“?', 'den Rasentraktor', ['Der Bauer', 'repariert', 'Der'], 'Frage: Wen oder was repariert der Bauer? Den Rasentraktor.'),
  Q('Welches Satzglied ist „am Morgen“?', 'Adverbiale der Zeit', ['Subjekt', 'Objekt', 'Prädikat'], 'Frage: Wann fährt der Landwirt? Am Morgen. Das ist eine Zeitangabe.'),
  Q('Mit welcher Frage findest du eine Ortsangabe?', 'Wo?', ['Wann?', 'Wer?', 'Wie?'], 'Wo? fragt nach dem Ort, zum Beispiel „auf dem Feld“.'),
  Q('Welches Satzglied steht im Aussagesatz immer an zweiter Stelle?', 'das Prädikat', ['das Subjekt', 'das Objekt', 'die Zeitangabe'], 'Die gebeugte Verbform steht im Aussagesatz an zweiter Stelle: Heute mäht Lena. / Lena mäht heute.')
]},

{id:'deutsch-3', subject:'deutsch', theme:'hof', topic:'Zeitformen', title:'Zeitreise auf dem Hof', sub:'Präsens, Präteritum, Perfekt, Futur', min:12,
 rlp:'Sprachwissen: Tempora (Präsens, Präteritum, Perfekt, Futur), unregelmäßige Verben',
 steps:[
  W('Die Zeitformen', 'Ein Verb verändert sich je nach Zeit:\n\n• **Präsens** (jetzt): er fährt\n• **Präteritum** (erzählen und berichten): er fuhr\n• **Perfekt** (mündlich erzählen): er ist gefahren\n• **Futur** (Zukunft): er wird fahren\n\nBei starken Verben ändert sich der Stamm: fahren – fuhr – gefahren. Das lernst du am besten auswendig.'),
  T('Präteritum: ich fahre – ich ___', 'fuhr', 'Fahren – fuhr – gefahren.', {hint:'Der Stammvokal ändert sich.'}),
  T('Präteritum: er isst – er ___', ['aß', 'ass'], 'Essen – aß – gegessen.', {hint:'Der Stammvokal wird zu a.'}),
  M('Grundform und Präteritum', [['fahren', 'fuhr'], ['schreiben', 'schrieb'], ['gehen', 'ging'], ['sehen', 'sah'], ['helfen', 'half']], 'Welche Präteritum-Form gehört zu welchem Verb?'),
  Q('Welcher Satz steht richtig im Perfekt?', 'Wir sind aufs Feld gefahren.', ['Wir haben aufs Feld gefahren.', 'Wir sind aufs Feld gefuhr.', 'Wir waren aufs Feld gefahren.'], 'Bei Bewegungsverben wie fahren oder gehen bildet man das Perfekt mit „sein“: Wir sind gefahren.'),
  Q('Ein Bericht im Präteritum: Gestern ___ der Mähdrescher den ganzen Weizen.', 'erntete', ['erntet', 'wird ernten', 'hat ernten'], 'Präteritum von ernten: er erntete.'),
  Q('In welcher Zeitform steht: „Der Bauer wird morgen den Mais säen“?', 'Futur', ['Präsens', 'Präteritum', 'Perfekt'], 'Mit „wird“ + Grundform (hier: säen) bildet man das Futur.'),
  T('Perfekt: Ich habe einen Bericht ___ (schreiben).', 'geschrieben', 'Schreiben – schrieb – geschrieben.', {})
]},

{id:'deutsch-4', subject:'deutsch', theme:'simson', topic:'Wortbildung', title:'Wortbaustelle', sub:'Zusammensetzungen und Wortfamilien', min:12,
 rlp:'Sprachwissen: Wortbildung (Zusammensetzung, Wortbausteine, Fugen-s), Wortfamilien',
 steps:[
  W('Wörter zusammenbauen', 'Viele Wörter bestehen aus Bausteinen:\n\n• **Zusammensetzung**: Bestimmungswort + **Grundwort**. Das Grundwort (hinten) bestimmt den Artikel: Rasen + Mäher = der Rasenmäher.\n• **Wortfamilie**: Wörter mit dem gleichen Wortstamm: fahr-: Fahrer, Abfahrt, Fahrrad, er fährt.\n• **Vorsilben** (be-, ver-, ab-) und **Nachsilben** (-ung, -heit, -keit) verändern ein Wort.\n• Manchmal steckt ein **Fugen-s** dazwischen: Arbeit-s-handschuh.',
    'Das Wort „Moped“ ist eine Abkürzung aus „Motor“ und „Pedal“.'),
  Q('Was ist das Grundwort in „Rasenmäher“?', 'Mäher', ['Rasen', 'Mähen', 'Gras'], 'Das Grundwort steht hinten und sagt, was es ist: ein Mäher. „Rasen“ sagt nur genauer, welcher.'),
  Q('Welchen Artikel hat „Zündkerze“?', 'die', ['der', 'das'], 'Das Grundwort ist „Kerze“, und es heißt die Kerze. Also: die Zündkerze.'),
  Q('Welchen Artikel hat „Ölwechsel“?', 'der', ['die', 'das'], 'Das Grundwort ist „Wechsel“: der Wechsel, also der Ölwechsel.'),
  Q('Welches Wort gehört nicht zur Wortfamilie „fahren“?', 'Farbe', ['Fahrer', 'Abfahrt', 'Fahrrad'], '„Farbe“ hat einen anderen Wortstamm und eine andere Bedeutung.'),
  T('Setze zusammen: Stroh + Ballen = ___', 'Strohballen', 'Beide Wörter werden zusammengeschrieben: Strohballen.', {cs:true}),
  T('Setze zusammen mit Fugen-s: Arbeit + Handschuh = ___', 'Arbeitshandschuh', 'Zwischen Arbeit und Handschuh kommt ein „s“: Arbeitshandschuh.', {cs:true}),
  T('Bilde das Nomen: gesund + ___ = Gesundheit (die Nachsilbe)', ['heit', '-heit'], 'Aus dem Adjektiv „gesund“ wird mit der Nachsilbe -heit das Nomen „Gesundheit“.', {})
]},

{id:'deutsch-5', subject:'deutsch', theme:'sport', topic:'Rechtschreibung', title:'Rechtschreib-Boxenstopp', sub:'das oder dass, ß, Kommas', min:12,
 rlp:'Rechtschreibung: das/dass, ss und ß, Kommasetzung bei Nebensätzen, Fehler finden',
 steps:[
  W('Ein Stopp für die Rechtschreibung', '**das oder dass?**\n• **das** kannst du durch „dieses“, „jenes“ oder „welches“ ersetzen: Das Moped, das ich mag.\n• **dass** leitet einen Nebensatz ein und kann nicht ersetzt werden: Ich weiß, dass er kommt. Vor „dass“ steht immer ein Komma.\n\n**ss oder ß?** Nach einem kurzen Vokal schreibt man „ss“ (Fluss, muss). Nach einem langen Vokal oder Doppellaut schreibt man „ß“ (Straße, heiß).'),
  Q('Ich weiß, ___ du schnell lernst.', 'dass', ['das'], 'Hier kannst du nicht „dieses“ einsetzen. Es ist ein Nebensatz, also „dass“.'),
  Q('Welcher Satz ist richtig?', 'Das Moped, das ich mag, ist rot.', ['Dass Moped, das ich mag, ist rot.', 'Das Moped, dass ich mag, ist rot.', 'Dass Moped, dass ich mag, ist rot.'], 'Beide Male geht „dieses“: Dieses Moped, dieses ich mag … Also zweimal „das“.'),
  T('Ergänze das oder dass: Ich glaube, ___ Opa die Simson repariert hat.', 'dass', 'Nebensatz nach dem Komma, „dieses“ passt nicht: dass.', {}),
  T('Ergänze das oder dass: ___ rote Moped gehört mir.', 'das', 'Hier ist „das“ der Artikel von „Moped“.', {}),
  Q('Welches Wort ist richtig geschrieben?', 'Straße', ['Strasse', 'Strase', 'Sträße'], 'Langes a: Das „ß“ steht nach einem langen Vokal.'),
  Q('Welches Wort ist richtig geschrieben?', 'Fluss', ['Fluß', 'Flus', 'Fluhs'], 'Kurzes u, darum „ss“.'),
  Q('Welches Wort ist falsch geschrieben?', 'Maschiene', ['Rasen', 'Zündkerze', 'Benzin'], 'Richtig heißt es „Maschine“, ohne „e“ nach dem „i“.'),
  Q('Wo steht das Komma richtig?', 'Ich weiß, dass er kommt.', ['Ich weiß dass, er kommt.', 'Ich, weiß dass er kommt.', 'Ich weiß dass er, kommt.'], 'Das Komma steht direkt vor „dass“.')
]},

{id:'deutsch-6', subject:'deutsch', theme:'sport', topic:'Schreiben', title:'Sportbericht schreiben', sub:'Sachlich berichten', min:14,
 rlp:'Schreiben: Bericht (W-Fragen, Präteritum, sachlich, geordnete Reihenfolge); Sprechen: Erzählen',
 steps:[
  W('Ein Bericht ist wie ein Spielstand', 'Ein Bericht informiert **sachlich**. Er beantwortet die W-Fragen: Wer? Was? Wann? Wo? Wie? Mit welchem Ergebnis?\n\n• Er steht im **Präteritum** (Gestern spielten wir …).\n• Er hält die **Reihenfolge** ein (erst, dann, danach, zum Schluss).\n• Er enthält **keine Meinung** und keine Übertreibung („mega“, „voll cool“).'),
  Q('Welcher Satz passt in einen Sportbericht?', 'Am Samstag gewann die E-Jugend das Spiel mit 3:1.', ['Es war einfach mega cool!', 'Wir spielen gleich los.', 'Boah, ich habe so geschwitzt!'], 'Er ist sachlich, steht im Präteritum und nennt Wer, Wann und Was.'),
  Q('Welche W-Frage beantwortet „auf dem Sportplatz in Beelitz“?', 'Wo?', ['Wann?', 'Wer?', 'Warum?'], 'Es ist ein Ort.'),
  O('Bringe den Bericht in die richtige Reihenfolge', ['Am Samstag fand auf dem Sportplatz ein Turnier statt.', 'Zuerst spielte unsere Mannschaft gegen Lindow.', 'Nach dem Abpfiff stand es 3:1 für uns.', 'Zum Schluss erhielten alle Spieler eine Urkunde.'], 'Tippe die Sätze so an, wie sie zeitlich aufeinander folgen.'),
  T('Schreibe im Präteritum: Wir spielen auf dem Sportplatz.', ['Wir spielten auf dem Sportplatz'], 'Spielen wird im Präteritum zu „spielten“.', {hint:'Das Verb endet auf -ten.'}),
  Q('Was gehört nicht in einen sachlichen Bericht?', 'Deine Meinung („Das war der geilste Tag!“)', ['Wann und wo es war', 'Die Reihenfolge der Ereignisse', 'Das Ergebnis'], 'Berichte sind sachlich. Meinungen gehören in einen Kommentar.'),
  X('Erzähle mündlich: Was ist bei deinem letzten Training oder Spiel passiert? Der Ablauf von Anfang bis Ende.', 'Tipp: „Zuerst … danach … am Ende …“ hilft beim Aufbau.', 60)
]}

);

// ---- Erweiterung: Vorgangsbeschreibung, Argumentieren, Nebensätze, Lesen, wörtliche Rede, Präsentieren
MISSIONS.push(

{id:'deutsch-7', subject:'deutsch', theme:'tuning', topic:'Schreiben', title:'Zündkerze wechseln', sub:'Eine Vorgangsbeschreibung schreiben', min:14,
 rlp:'Schreiben: Vorgangsbeschreibung (Reihenfolge, Präsens, Fachbegriffe, Zeitwörter und Signalwörter)',
 steps:[
  W('Schritt für Schritt erklären', 'Eine **Vorgangsbeschreibung** erklärt, wie etwas gemacht wird, zum Beispiel ein Kerzenwechsel an der Simson.\n\n• Sie steht im **Präsens** („Man dreht die Kerze heraus.“).\n• Die **Reihenfolge** muss stimmen, mit Signalwörtern: zuerst, dann, danach, anschließend, zum Schluss.\n• Sie nennt **Werkzeug und Material** genau (Kerzenschlüssel, Fühlerlehre).\n• Sie enthält **keine Meinung** und kein „ich“.',
    'Wichtig bei echten Arbeiten am Moped: Nur mit einem Erwachsenen schrauben, den Motor abkühlen lassen und passende Werkzeuge verwenden.'),
  O('Die richtige Reihenfolge', ['Zuerst lässt man den Motor abkühlen und zieht den Kerzenstecker ab.', 'Dann dreht man die Kerze mit dem Kerzenschlüssel heraus.', 'Danach prüft man den Elektrodenabstand mit der Fühlerlehre.', 'Anschließend schraubt man die neue Kerze zuerst von Hand ein.', 'Zum Schluss zieht man sie leicht fest und steckt den Stecker auf.'], 'Tippe die Schritte in der richtigen Reihenfolge an.'),
  Q('Welcher Satz gehört in eine Vorgangsbeschreibung?', 'Danach prüft man den Elektrodenabstand mit der Fühlerlehre.', ['Ich fand das Schrauben total langweilig.', 'Gestern hat mein Bruder die Kerze kaputtgemacht.', 'Das Moped ist das schönste der Welt.'], 'Sachlich, Präsens, mit Signalwort und genauem Werkzeug.'),
  Q('Welches Werkzeug dreht eine Zündkerze heraus?', 'Kerzenschlüssel', ['Zollstock', 'Pinsel', 'Wasserwaage'], 'Der Kerzenschlüssel passt genau auf den Sechskant der Kerze.'),
  Q('Welche Wörter helfen, die Reihenfolge deutlich zu machen?', 'zuerst, danach, zum Schluss', ['super, mega, cool', 'weil, obwohl, damit', 'gestern, heute, morgen'], 'Das sind Signalwörter für die Reihenfolge.'),
  T('Schreibe im Präsens: Man ___ die Kerze heraus. (drehen)', 'dreht', 'Man dreht … (3. Person Singular).', {hint:'Es endet auf -t.'}),
  T('Schreibe im Präsens: Man ___ die Kerze von Hand ein. (schrauben)', 'schraubt', 'Man schraubt … (3. Person Singular).', {}),
  Q('Warum lässt man den Motor vor dem Kerzenwechsel abkühlen?', 'Um sich nicht zu verbrennen.', ['Damit der Tank voller wird.', 'Damit die Kerze heller leuchtet.', 'Das ist nur eine Regel ohne Grund.'], 'Zylinderkopf und Kerze können sehr heiß sein.')
]},

{id:'deutsch-8', subject:'deutsch', theme:'tuning', topic:'Argumentieren', title:'Darf ich tunen?', sub:'Meinung begründen mit Argumenten', min:14,
 rlp:'Schreiben und Sprechen: Meinung begründen (Behauptung, Begründung, Beispiel), Konjunktionen weil, denn, deshalb',
 steps:[
  W('Gute Argumente', 'Ein gutes Argument besteht aus drei Teilen:\n\n1. **Behauptung** (Meinung): „Ein Moped sollte nur mit Erlaubnis verändert werden.“\n2. **Begründung** (mit weil, denn, deshalb): „…, weil sonst die Betriebserlaubnis erlöschen kann.“\n3. **Beispiel**: „Wenn man einen stärkeren Zylinder einbaut, ohne ihn eintragen zu lassen, darf man damit nicht mehr auf der Straße fahren.“\n\nWer nur „weil ich es will“ sagt, überzeugt niemanden.',
    'Wer an einem Fahrzeug etwas verändert, das Leistung oder Höchstgeschwindigkeit steigert, muss das beachten: Die Betriebserlaubnis kann erlöschen. Frag vorher immer einen Fachmann oder die Prüfstelle.'),
  Q('Welcher Satz ist eine Behauptung (Meinung)?', 'Schrauben am Moped lernt man am besten gemeinsam mit einem Erfahrenen.', ['Der Zylinder hat 50 cm³.', 'Die Kerze steht oben am Kopf.', 'Der Tank fasst vier Liter.'], 'Eine Behauptung ist eine Meinung, die man begründen kann. Die anderen Sätze nennen Tatsachen.'),
  Q('Welcher Satz ist eine Begründung?', '…, weil man sich sonst verletzen kann.', ['Das finde ich toll.', 'Ich will das haben.', 'Das steht so im Katalog.'], 'Eine Begründung beantwortet „Warum?“ und beginnt oft mit „weil“ oder „denn“.'),
  Q('Welches Beispiel passt zur Behauptung „Mit einem Erwachsenen zu schrauben ist sinnvoll“?', 'Beim Wechsel der Kette zeigt dir der Erwachsene, wie die Kette richtig gespannt wird.', ['Mein Tank ist leer.', 'Ich habe Hunger.', 'Die Simson ist orange.'], 'Ein Beispiel zeigt den Fall konkret.'),
  T('Ergänze die Begründung: Ich trage beim Schrauben Handschuhe, ___ ich mich nicht schneiden will. (weil oder denn)', 'weil', 'Bei „weil“ steht das Verb am Ende des Nebensatzes: weil ich mich nicht schneiden will.', {hint:'Das Verb steht am Satzende.'}),
  Q('Warum darf man ein getuntes Moped nicht einfach auf der Straße fahren?', 'Weil die Betriebserlaubnis erlöschen kann, wenn Leistung oder Tempo verändert wurden.', ['Weil es dann nicht mehr anspringt.', 'Weil es dann lauter schimpft.', 'Das ist nur ein Gerücht.'], 'Veränderungen müssen geprüft und eingetragen sein. Sonst gilt die Zulassung nicht mehr.'),
  Q('Welches Argument ist am stärksten?', 'Ich möchte tunen, weil ich dabei lerne, wie ein Motor funktioniert, und ein Erwachsener hilft.', ['Ich möchte tunen, weil ich es will.', 'Ich möchte tunen, weil alle es tun.', 'Ich möchte tunen, weil Papa so alt ist.'], 'Es hat eine sachliche Begründung und nennt den Nutzen.'),
  X('Argumentiere mündlich: Warum macht es Spaß, an einem Moped oder Traktor zu schrauben? Gib zwei Gründe an.', 'Tipp: „Ich finde …, weil … Zum Beispiel …“', 60)
]},

{id:'deutsch-9', subject:'deutsch', theme:'simson', topic:'Satzbau', title:'Haupt- und Nebensätze', sub:'weil, dass, obwohl, damit', min:12,
 rlp:'Sprachwissen: Hauptsatz, Nebensatz, Satzgefüge, Konjunktionen, Kommasetzung',
 steps:[
  W('Zwei Sätze verbinden', 'Ein **Hauptsatz** kann allein stehen: „Die Simson springt nicht an.“\nEin **Nebensatz** braucht den Hauptsatz und beginnt mit einer **Konjunktion** (weil, dass, obwohl, damit, wenn, als). Im Nebensatz steht das gebeugte Verb am **Ende**. Vor dem Nebensatz steht ein **Komma**.\n\nBeispiel: Die Simson springt nicht an, **weil** der Tank leer **ist**.'),
  Q('Welcher Satz ist ein Nebensatz?', 'weil der Tank leer ist', ['Der Tank ist leer.', 'Die Simson springt nicht an.', 'Wir fahren heute.'], 'Er beginnt mit „weil“, und das Verb steht am Ende.'),
  Q('Wo steht das Verb im Nebensatz?', 'am Ende', ['an erster Stelle', 'an zweiter Stelle', 'es fehlt'], 'In Nebensätzen steht die gebeugte Verbform am Satzende.'),
  Q('Welcher Satz ist richtig?', 'Ich putze die Kette, damit sie nicht rostet.', ['Ich putze die Kette damit, sie nicht rostet.', 'Ich putze die Kette, damit sie rostet nicht.', 'Ich putze die Kette damit sie nicht rostet'], 'Komma vor „damit“, und das Verb „rostet“ steht am Ende.'),
  T('Verbinde mit „weil“: Die Simson springt nicht an. Der Tank ist leer.', ['Die Simson springt nicht an, weil der Tank leer ist', 'Die Simson springt nicht an weil der Tank leer ist'], 'Das Verb „ist“ steht im Nebensatz am Ende.', {hint:'Beginne mit „Die Simson springt nicht an, weil …“.'}),
  Q('Welche Konjunktion passt? Ich fahre mit dem Traktor, ___ es regnet.', 'obwohl', ['damit', 'dass', 'sodass'], '„Obwohl“ drückt einen Gegensatz aus: Es regnet, trotzdem fahre ich.'),
  Q('Welche Konjunktion passt? Opa sagt, ___ der Motor warm laufen muss.', 'dass', ['obwohl', 'damit', 'weil'], '„dass“ leitet den Inhalt von dem ein, was Opa sagt.'),
  T('Ergänze: Ich nehme einen Pullover mit, ___ mir nicht kalt wird. (damit/weil)', 'damit', '„damit“ nennt den Zweck.', {}),
  Q('Wie viele Kommas braucht der Satz: Ich weiß dass du kommst weil du es versprochen hast?', 'zwei', ['eins', 'drei', 'keins'], 'Ich weiß, dass du kommst, weil du es versprochen hast. Vor jedem Nebensatz steht ein Komma.')
]},

{id:'deutsch-10', subject:'deutsch', theme:'simson', topic:'Lesen', title:'Sachtext verstehen', sub:'Wie ein Zweitaktmotor arbeitet', min:14,
 rlp:'Lesen: Informationen aus Sachtexten entnehmen, Hauptaussagen erkennen, Fragen zum Text beantworten',
 steps:[
  W('Lies den Text genau', 'Der Zweitaktmotor\n\nEin Zweitaktmotor braucht für einen Arbeitsablauf nur zwei Kolbenhübe. Wenn der Kolben nach oben fährt, verdichtet er über sich das Gemisch aus Benzin und Luft. Gleichzeitig entsteht unter dem Kolben im Kurbelgehäuse ein Unterdruck, der frisches Gemisch ansaugt. Kurz vor dem oberen Totpunkt zündet die Kerze. Das heiße Gas drückt den Kolben nach unten. Dabei öffnet er zuerst den Auslass, und die Abgase strömen hinaus. Danach öffnen die Überströmkanäle. Das vorverdichtete Gemisch aus dem Kurbelgehäuse strömt in den Zylinder und schiebt die Reste der Abgase hinaus.\n\nWeil es keine eigene Ölwanne gibt, wird das Öl dem Benzin beigemischt. So werden die beweglichen Teile geschmiert. Dafür entsteht beim Fahren der typische blaue Rauch.'),
  Q('Was ist die Hauptaussage des Textes?', 'Er erklärt, wie ein Zweitaktmotor in zwei Hüben arbeitet.', ['Er erklärt, wie man ein Moped repariert.', 'Er beschreibt eine Fahrt mit dem Moped.', 'Er vergleicht Traktoren und Autos.'], 'Der Text erklärt die Arbeitsweise des Zweitaktmotors.'),
  Q('Wie viele Kolbenhübe braucht ein Zweitaktmotor für einen Arbeitsablauf?', 'zwei', ['einen', 'drei', 'vier'], 'Das steht im ersten Satz.'),
  Q('Was geschieht zuerst, wenn der Kolben nach unten fährt?', 'Der Auslass öffnet sich.', ['Die Überströmkanäle öffnen sich.', 'Die Kerze zündet.', 'Das Gemisch wird angesaugt.'], 'Im Text: „Dabei öffnet er zuerst den Auslass.“'),
  Q('Warum wird dem Benzin Öl beigemischt?', 'Es gibt keine eigene Ölwanne, das Öl schmiert die beweglichen Teile.', ['Damit der Motor lauter wird.', 'Damit der Tank voller aussieht.', 'Damit das Benzin billiger wird.'], 'Das steht im zweiten Absatz.'),
  Q('Welche Überschrift passt als Zwischenüberschrift zum zweiten Absatz?', 'Warum Öl im Benzin ist', ['Der Weg zur Werkstatt', 'Vom Korn zum Brot', 'Geschichte der Räder'], 'Der Absatz handelt vom Öl im Gemisch.'),
  T('Finde im Text das Wort für die Stelle, an der der Kolben ganz oben ist (zwei Wörter, „oberer ...“):', ['oberer Totpunkt', 'oberen Totpunkt'], 'Im Text: „Kurz vor dem oberen Totpunkt zündet die Kerze.“', {}),
  Q('Welche Folge nennt der Text für das Öl im Benzin?', 'Beim Fahren entsteht blauer Rauch.', ['Der Motor wird schneller.', 'Der Tank wird leichter.', 'Das Moped braucht weniger Luft.'], 'Der letzte Satz: „Dafür entsteht beim Fahren der typische blaue Rauch.“')
]},

{id:'deutsch-11', subject:'deutsch', theme:'hof', topic:'Zeichensetzung', title:'Wörtliche Rede im Stall', sub:'Anführungszeichen und Komma richtig setzen', min:12,
 rlp:'Rechtschreibung: wörtliche Rede, Redebegleitsatz, Satzzeichen',
 steps:[
  W('Wörtliche Rede', 'Was jemand sagt, steht in **Anführungszeichen**. Der Satz, der sagt, wer spricht, heißt **Redebegleitsatz**.\n\n• Vorangestellt: Opa sagt**:** „Hol bitte den Schlüssel.“\n• Nachgestellt: „Hol bitte den Schlüssel**“,** sagt Opa.\n• Das Frage- oder Ausrufezeichen bleibt in der Rede, danach folgt trotzdem das Komma: „Wo ist der Schlüssel**?“,** fragt Lena.\n\nDas erste Anführungszeichen steht unten, das zweite oben: „ … “'),
  Q('Welcher Satz ist richtig?', 'Opa sagt: „Hol bitte den Schlüssel.“', ['Opa sagt „Hol bitte den Schlüssel“.', 'Opa sagt, „Hol bitte den Schlüssel.“', 'Opa sagt: Hol bitte den Schlüssel.'], 'Vor der wörtlichen Rede steht ein Doppelpunkt.'),
  Q('Welcher Satz ist richtig?', '„Der Traktor ist fertig“, sagt der Bauer.', ['„Der Traktor ist fertig.“ sagt der Bauer.', '„Der Traktor ist fertig“ sagt der Bauer.', 'Der Traktor ist fertig, sagt der Bauer.'], 'Nach der Rede steht ein Komma, kein Punkt.'),
  Q('Welcher Satz ist richtig?', '„Wo ist die Kerze?“, fragt Lena.', ['„Wo ist die Kerze“, fragt Lena.', '„Wo ist die Kerze?“ fragt Lena.', '„Wo ist die Kerze?“. fragt Lena.'], 'Das Fragezeichen bleibt, danach folgt ein Komma.'),
  Q('Welcher Satz ist richtig?', 'Lena ruft: „Der Motor läuft!“', ['Lena ruft, „Der Motor läuft!“', 'Lena ruft „Der Motor läuft“!', 'Lena ruft: Der Motor läuft!'], 'Vor der Rede steht ein Doppelpunkt, das Ausrufezeichen steht in der Rede.'),
  Q('Wie nennt man den Teil „sagt Opa“ in „Komm her“, sagt Opa?', 'Redebegleitsatz', ['Nebensatz', 'Adverbiale', 'Prädikat'], 'Er begleitet die wörtliche Rede.'),
  Q('Welche Anführungszeichen sind richtig gesetzt?', '„Hallo“, sagt Tom.', ['“Hallo„, sagt Tom.', '„Hallo„, sagt Tom.', '“Hallo“, sagt Tom.'], 'Unten am Anfang, oben am Ende: „ … “'),
  Q('Macht man aus „Ich komme gleich“, sagte Tom eine indirekte Rede, wie geht das richtig?', 'Tom sagte, er komme gleich.', ['Tom sagte: Ich komme gleich.', 'Tom sagte „er komme gleich“.', 'Tom sagte, ich komme gleich.'], 'Bei der indirekten Rede fallen Anführungszeichen weg, und die Person ändert sich: er statt ich.')
]},

{id:'deutsch-12', subject:'deutsch', theme:'tuning', topic:'Sprechen und Zuhören', title:'Mein Lieblingsfahrzeug', sub:'Eine Kurzpräsentation vorbereiten', min:14,
 rlp:'Sprechen und Zuhören: Präsentation planen, gliedern, Stichwortzettel, frei sprechen',
 steps:[
  W('Ein Kurzvortrag mit Plan', 'Ein guter Vortrag hat einen klaren Aufbau:\n\n1. **Einleitung**: Begrüßung und Thema nennen.\n2. **Hauptteil**: Eckdaten, wie es funktioniert, Besonderes.\n3. **Schluss**: Zusammenfassung und Dank, dann Fragen.\n\nSprich **laut, langsam und deutlich**, schau die Zuhörer an und nutze einen **Stichwortzettel** statt ganzer Sätze.',
    'Zeig ein Bild oder ein echtes Teil, zum Beispiel eine Zündkerze oder ein Ritzel. Das merken sich die Zuhörer besser.'),
  O('Reihenfolge des Vortrags über meine Simson', ['Begrüßung und Thema nennen', 'Eckdaten vorstellen (Baujahr, Hubraum, Farbe)', 'Erklären, wie der Motor funktioniert', 'Etwas Besonderes zeigen (zum Beispiel ein Tuning-Teil)', 'Zusammenfassen, bedanken und nach Fragen fragen'], 'Tippe die Teile in der sinnvollen Reihenfolge an.'),
  Q('Was gehört auf einen Stichwortzettel?', 'Wenige Stichwörter und Zahlen', ['Der komplette Text zum Ablesen', 'Nur ein Bild', 'Gar nichts'], 'Mit Stichwörtern sprichst du frei und schaust die Zuhörer an.'),
  Q('Wie sprichst du bei einem Vortrag am besten?', 'Laut, langsam und mit Pausen', ['Möglichst schnell, damit es kurz ist', 'Leise und zum Boden schauend', 'Mit dem Rücken zum Publikum'], 'Pausen helfen dir und den Zuhörern.'),
  Q('Welcher Anfang ist besser?', 'Guten Morgen. Ich zeige euch heute meine Simson S51 und erkläre, wie ihr Motor funktioniert.', ['Ähm, also, ja, keine Ahnung.', 'Das ist halt ein Moped.', 'Ich habe nichts vorbereitet.'], 'Der gute Anfang begrüßt, nennt das Thema und macht neugierig.'),
  Q('Wie wirst du bei Fragen am besten souverän?', 'Du sagst: „Das weiß ich nicht genau, ich finde es heraus.“', ['Du erfindest eine Antwort.', 'Du schweigst und gehst weg.', 'Du sagst, die Frage sei dumm.'], 'Ehrlich sein ist besser als Raten.'),
  X('Stelle dein Lieblingsfahrzeug (Simson, Traktor oder Rasentraktor) in einer Minute vor: Begrüßung, drei Fakten, Schluss.', 'Tipp: Atme vor jedem Abschnitt kurz ein, mach kleine Pausen.', 60)
]}

);
