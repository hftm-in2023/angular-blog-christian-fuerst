# SETUP.md

## Iteration 0 – Projekt-Setup für Angular Blog Anwendung

Dieses Dokument beschreibt die notwendigen Schritte zur Einrichtung des Projekts „AngularBlogChristianFuerst“ gemäß den Anforderungen der Iteration 0 im Kurs „Web Applikationen“. Ziel ist ein nachvollziehbares Setup, das von anderen Entwickler:innen einfach reproduziert werden kann.

---

## 1. Voraussetzungen

- **Node.js** (empfohlen: LTS-Version)
- **npm** (Node Package Manager)
- **Angular CLI** (Version 20.x):  
  Installation:
  ```bash
  npm install -g @angular/cli
  ```

- **Git**: zur Versionierung und Repository-Verwaltung
- **Visual Studio Code** oder ein anderer Editor deiner Wahl

---

## 2. Projekt-Klonen

```bash
git clone <REPOSITORY-URL>
cd angular-blog-christian-fuerst
```

---

## 3. Abhängigkeiten installieren

```bash
npm install
```

Dies installiert alle im `package.json` definierten Abhängigkeiten.

---

## 4. Linter und Formatierer konfigurieren

Das Projekt nutzt ESLint und Prettier:

- ESLint-Konfiguration: `eslint.config.js`
- Prettier-Konfiguration: `.prettierrc`
- Lint-Check ausführen:
  ```bash
  npm run lint
  ```

- Code formatieren:
  ```bash
  npm run format
  ```

---

## 5. Husky und Git Hooks aktivieren

Das Projekt verwendet `husky` und `lint-staged`, um Git-Hooks auszuführen:

```bash
npm run prepare
```

Dadurch werden die Hooks in `.husky/` initialisiert und z. B. `pre-commit` sowie `commit-msg` aktiviert.

---

## 6. TypeScript- und Angular-Konfiguration

Die TypeScript-Konfiguration ist aufgeteilt in:

- `tsconfig.json`: globale Einstellungen
- `tsconfig.app.json`: App-spezifisch
- `tsconfig.spec.json`: für Tests

Angular-spezifische Einstellungen befinden sich in `angular.json`. SCSS wird als Stylesprache verwendet.

---

## 7. Projekt starten

Für die lokale Entwicklungsumgebung:

```bash
npm start
```

Danach im Browser öffnen:  
http://localhost:4200

---

## 8. Tests ausführen

### Unit-Tests:

```bash
npm test
```

### Linting:

```bash
npm run lint
```

---

## 9. Weitere nützliche Befehle

- Projekt builden:
  ```bash
  npm run build
  ```

- Abhängigkeiten prüfen und aktualisieren:
  ```bash
  npm run deps:update
  ```

- Sicherheitsprüfung:
  ```bash
  npm run security:check
  ```

---

## 10. Commit-Richtlinien

Das Projekt verwendet `commitlint` zur Prüfung der Commit-Nachrichten:

- Commit-Nachrichten müssen dem [Conventional Commits](https://www.conventionalcommits.org) Standard entsprechen.
- Maximale Länge der Commit-Message: 100 Zeichen

---

## 11. Azure Deployment (optional)

Deployment-Konfiguration befindet sich in:  
`azure-static-web-apps-calm-river-07124f903.yml`

---

## 12. Weitere Hinweise

- Der Hauptentwicklungs-Branch ist `main`
- Alle Änderungen müssen dort regelmäßig gepusht werden
- Feedback erfolgt im Rahmen der stichprobenartigen Bewertung durch die Dozierenden

---

*Stand: Iteration 0 | Kurs: Web Applikationen*
