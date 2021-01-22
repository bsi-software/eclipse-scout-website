## Launch Website
* npm install
* npm run dev:server
* Start http://localhost:8080/


## Screenshots für Scout Homepage Erstellen
* Chrome verwenden
* Outline-Tree mit D&D so einstellen, dass er genau 261px breit ist
  (im DOM Inspector verifizieren)
* Unnötige Nodes zuklappen
* Chrome Window mit "Sizer" Tool auf 1280 x 960 resizen
* Screenshot von Chrome Window machen (Alt + Print Screen)
* In GIMP pasten. Ränder beschneiden. 1 Pixel Rahmen von Chrome
  darf nicht Teil vom Bild sein.
* Zielgrösse: 1278 x 859 Pixel
* Scrollbars entfernen / übermalen
* Outline-Selector Button oben links mit blau übermalen
* Angeschnittene Texte in der Outline mit blau übermalen
* Fertiges Bild kopieren / auf 800 x 538 skalieren
* Als PNG speichern


## TODOs
* Finale Illustrationen -> Remo?
* Build implementieren, package.json aufräumen
* Internet Explorer ggf. Error abfangen / Edge prüfen (Babel, ES5 transpile)
* Finale englische Texte von Carmen übernehmen.
* Browser- und Device Tests
* Prio 2: Kleine (farbige) Animation für Raketentriebwerk --> ausprobieren
* Phase 2: Github.io in die Homepage integrieren?
* Phase 2: News/Blog in die Homepage integrieren? Mit Marketing klären


## Erledigt
* CGU: Neue Screenshots für Charts erstellen
* Unbenutzte Ressourcen entfernen (nicht referenzierte Bilder)
* BSH: 4 Icons im Footer aus Community Menu verwenden.
* Favicons
* Titel vom HTML Dokument setzen
* Blaue Links korrigieren (Screenshot von CGU)
* CGU: About in Features (oder Benefits) umbenennen
* CGU: Input für Texte liefern.
* BSH: Drop-shadow bei Bildern zu gross. Und auch bei V11 Button
* BSH: Screenshots optimieren wegen abgerundeten Ecken,
  grauer rand bei screenshots wegmachen
* BSH: Ganze Pünktli oder Strich machen bei Demo Apps Widget
* Text und Bild besser alignieren in About page (mobile version verbessern)
* Alle Nav-Items verlinken
* JS-Error get-started-button wenn nicht auf start seite. Auch in Mobile
  Navi. Prüfen ob man auf Startseite ist?
* About / Version mobile friendly machen
* Mobile Navigation finalisieren, Konzept wie bei heutiger Scout Site
* Margins im Mobile grosszügiger (15px horiz.)
* Nowrap bei Get Started Titel --> responsive-ness generell
* Prüfen, ob das Copyright unten im Footer korrekt ist (Eclipse statt BSI?)
  --> alle Project pages (auch mit eigener Website) haben das Eclipse Copyright
* Hover-Effekt für Features Grid --> probieren: Titel und Icon einfärben
  oder 3D mässig hervorheben
* DAX Ot als Webfont einbetten
* v11 auf https://eclipsescout.github.io/11.0/ verlinken
  --> Ich finde es nicht unbedingt logisch, auf die Doc zu springen bei diesem
      Link. Besser fände ich eine Tabelle mit allen Versionen (hatten wir das
      nicht mal besprochen?) In dieser Tabelle hat man dann alle Links zu
      einer Version: Sourcen, Download und Docs. Der Link springt dann zur
      Zeile mit der entsprechenden Version. Könnte man ggf. auf einer Version
      Seite unterbringen.
* SVG Version vom Scout Logo erstellen (PNG ist unscharf)
  Variante mit Scout-Blau machen
* Manchmal gibt es einen JS-Error beim $divToHide #onDemoAppButtonClick
* Mehr Abstand zw. Titel Demo Apps und Navigations-Element
* Tooltips für Scout JS / Classic bei Demo Apps und Getting started
* Responsive UI an dritter Stelle
* Icon "laptop-launch" oder "space-rocket-flying" bei getting started? --> Letzteres
* Weitere Animationen definieren, braucht es mehr? --> Nein
* Icons unten im Footer weg? Gibt's ja schon in der Haupt-Navi, Blog ist fraglich
  --> So lassen, aber Streamline Varianten verwenden
* Demo-Apps: schnellerer Fade bei Überblendung
* Demo-Apps: Screenshots vertauscht
* Highlight-Color definieren (Farbklecks fehlt) --> Orange OK

## Nicht realisiert
* BSH: Get Started als Titel verwenden? Evtl. nicht klar was die Sektion bedeutet ohne Titel
  --> CGU: klar genug
* BSH: v11 etwas komisch, evtl. als Kästli unter Business Applications made easy
  oder besser neben dem Scout Logo?
  --> CGU: verständlich. Ähnlich wie andere Sites das machen, man sieht sofort
  was der aktuelle Release ist.
* BSH: Wo kann man Downloaden? Vielleicht auch bei Get Started unterbringen.
  --> CGU: es gibt keine einfach Download-Möglickeit, es braucht immer den
  Weg über die Beginners Guide.
