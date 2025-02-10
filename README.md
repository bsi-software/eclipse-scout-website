## Launch Website
* `npm install`
* `npm run start`
* Start http://localhost:8095/scout/

Wir verwenden absichtlich einen Kontextpfad, damit man lokal die gleiche Ausgangslage wie
auf der deployten Homepage hat und Fehler bei relativen Referenzen beim lokalen Testen
bemerkt werden.

## Build
* Lokalen Server starten `npm run start` (Port 8095)
* Build starten `npm run build`
* Gebaute statische Files in /dist Ordner testen `npm run start:dist` (Port 8096)


## Screenshots für Scout Homepage erstellen
* Chrome verwenden
* Outline-Tree mit D&D so einstellen, dass er genau 260px breit ist (im DOM Inspector verifizieren)
* Unnötige Nodes zuklappen
* Chrome Mobile-Emulator öffnen, auf Responsive stellen und 960 x 645 einstellen
* Scrollbars entfernen ($('.scrollbar').remove()), Username ändern
* Beim 3-Punkte-Menü rechts oben Capture Screenshot klicken
* Bild auf 1280 x 860 skalieren um Datei-Grösse zu reduzieren (Windows-Explorer, Rechtsklick, Resize pictures)

## Update auf eine neue Version
* Versions-Tabelle anpassen in versions.hbs
  * Neue Version einfügen
  * Wenn die neue Version eine x.1-Version ist -> LATEST
  * Wenn die neue Version eine x.2-Version ist -> LATEST LTS
  * Überprüfen, ob bei einer älteren x.2-Version LTS entfernt werden muss
* Variablen SCOUT_VERSION und SCOUT_VERSION_STRING in server.js anpassen
