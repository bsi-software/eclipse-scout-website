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


## Screenshots für Scout Homepage erstellen
* Chrome verwenden
* Outline-Tree mit D&D so einstellen, dass er genau 260px breit ist (im DOM Inspector verifizieren)
* Unnötige Nodes zuklappen
* Chrome Mobile-Emulator öffnen, auf Responsive stellen und 960 x 645 einstellen
* Scrollbars entfernen ($('.scrollbar').remove()), Username ändern
* Beim 3-Punkte-Menü rechts oben Capture Screenshot klicken
* Bild auf 1280 x 860 skalieren um Datei-Grösse zu reduzieren (Windows-Explorer, Rechtsklick, Resize pictures)

## Update auf eine neue Version
* Version-Tabelle anpassen in versions.hbs (nicht mehr als 3 Versionen auflisten)
* Variablen in server.js anpassen
