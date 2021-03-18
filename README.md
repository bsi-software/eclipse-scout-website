## Launch Website
* `npm install`
* `npm run start`
* Start http://localhost:8080/scout/

Wir verwenden absichtlich einen Kontextpfad, damit man lokal die gleiche Ausgangslage wie
auf der deployten Homepage hat und Fehler bei relativen Referenzen beim lokalen Testen
bemerkt werden.

## Build
* Lokalen Server starten `npm run start` (Port 8080)
* Build starten `npm run build`
* Gebaute statische Files in /dist Ordner testen `npm run start:dist` (Port 8081)


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

## Github.io
* Die Doku bleibt vorerst auf Github.io. Wir gleichen aber den Look an die
  neue Scout Homepage an.
* Die Startseite auf Github.io hat nur noch einen Intro-Text, eine Illustration
  und eine Tabelle mit den Scout Versionen. Klickt man auf einen Link in dieser
  Tabelle kommt man zur Doku für diese Version.
* Bei älteren Versionen der Doku soll im Header ein Hinweis angezeigt werden, dass
  dies nicht mehr die aktuelle Version ist und einen Link zur aktuellen Version.
* Die Beginners Guide soll ggf. besser strukturiert werden und die beiden Tutorials
  in separate Dokumente ausgelagert werden.
