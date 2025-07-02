# web-mywebsite

Ein persönliches, web-basiertes Dashboard, das als eine Art Mini-Betriebssystem im Browser fungiert. Es bietet eine anpassbare Oberfläche mit zwei verschiedenen Layout-Optionen (Sidebar und Desktop) und einer Vielzahl von integrierten Anwendungen und Widgets für den täglichen Gebrauch und die Arbeit.

---

## ✨ Features

Dieses Projekt umfasst eine Reihe von Tools und Anwendungen, die in einer einheitlichen Oberfläche zusammengefasst sind:

### Hauptanwendungen
* **AppDrawer:** Eine zentrale Anlaufstelle zum Hinzufügen, Verwalten und Starten deiner Lieblings-Webanwendungen und Links.
* **ReadlateR:** Speichere Artikel und Links, um sie später zu lesen. Die App ruft Metadaten wie Titel, Beschreibung und Vorschaubild ab und gruppiert Links nach Domain.
* **RSS Reader:** Ein voll funktionsfähiger RSS-Reader zum Abonnieren und Lesen von Feeds. Er verfügt über einen "Gelesen"-Status, Favoriten und einen ablenkungsfreien Lesemodus.
* **AuriMea:** Ein Finanz-Dashboard zur Verfolgung von Einnahmen und Ausgaben. Es bietet Diagramme zur Visualisierung von Daten nach Kategorie und Konto.
* **MemoMea:** Eine Notiz- und Tagebuchanwendung, die Markdown-Formatierung unterstützt. Notizen können nach Tags und Datum gefiltert werden.
* **Unicorn (Arbeits-Tools):** Ein spezieller Bereich für arbeitsbezogene Werkzeuge, der Folgendes umfasst:
    * Ein **Dashboard** mit schnellen Links zu Systemen wie DCCP, iTWIIN, PAM und mehr.
    * **Mail-Vorlagen** für verschiedene Kundenservice-Szenarien, die das schnelle Kopieren von Standardantworten ermöglichen.
    * Eine Übersicht wichtiger **Kontakte** und Abteilungen.
    * Ein Tool zur Verwaltung von **Evidenzfällen**.

### Widgets
Eine Sammlung von kleinen Helfern, die in die Oberfläche integriert sind:
* **Uhr & Kalender**
* **Wetter-Widget**, das den Standort des Benutzers verwendet
* **Taschenrechner**
* **Tarifrechner** zur Berechnung von Bruttopreisen
* **Lern-Quizze** wie ein Japanisch-Kana-Trainer und ein EU-Hauptstädte-Quiz

---

## 🎨 Layouts

Das Projekt bietet zwei verschiedene Benutzeroberflächen-Layouts, zwischen denen in den Einstellungen gewechselt werden kann:

* **Sidebar-Layout (`index.html`):** Eine moderne, App-ähnliche Oberfläche mit einer Navigationsleiste auf der linken Seite.
* **Desktop-Layout (`index_desktop.html`):** Eine traditionelle Desktop-Metapher mit App-Symbolen auf dem Desktop, Fenstern und einem Dock am unteren Bildschirmrand.

---

## 💾 Datenverwaltung

Die Anwendung legt alle Daten lokal im Browser ab. Um Datenverlust zu vermeiden und die Synchronisierung zwischen Geräten zu ermöglichen, sind die folgenden Funktionen integriert:

* **Backup:** Erstellt ein Backup aller Anwendungsdaten (Notizen, Links, Transaktionen, etc.) in einer einzigen `.zip`-Datei.
* **Restore:** Ermöglicht das Wiederherstellen von Daten aus einer zuvor erstellten Backup-Datei.
* **Alles löschen:** Eine Option, um alle lokal gespeicherten Daten unwiderruflich zu entfernen.

---

## 🛠️ Technologien

* **HTML5**
* **Tailwind CSS** für das Styling
* **JavaScript (ES6)** für die Funktionalität
* **Lucide Icons** für die Symbole
* **Chart.js** für die Diagramme in AuriMea
* **Marked.js** für das Markdown-Rendering in MemoMea
* **JSZip** für die Backup-Funktionalität

---

## 🚀 Wie man es benutzt

1.  Öffne die `index.html` Datei in einem modernen Webbrowser.
2.  Wähle in den **Einstellungen** dein bevorzugtes Layout (Sidebar oder Desktop).
3.  Beginne mit der Nutzung der verschiedenen Anwendungen und Widgets.
4.  Füge deine eigenen Links im **AppDrawer** hinzu oder importiere eine bestehende Liste.
5.  Erstelle regelmäßig **Backups** deiner Daten, um sie zu sichern.