# 📦 Ajustement des styles pour Google Docs

[🇫🇷 Version Française](#-version-française) | [🇬🇧 English Version](#-english-version)

---

## 🇫🇷 Version Française

> Un outil (add-on) intuitif pour Google Docs qui permet de redimensionner et de styliser rapidement et uniformément toutes les polices d'un document (Texte normal, Titres, Sous-titres, Titres 1 à 6).

<a href="https://developers.google.com/apps-script"><img src="https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google-apps-script&logoColor=white" alt="Google Apps Script"></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-indigo?style=for-the-badge" alt="License: MIT"></a>
<a href="README.md"><img src="https://img.shields.io/badge/Status-Production-brightgreen?style=for-the-badge" alt="Status: Production"></a>

---

### ✨ Fonctionnalités Clés

- 🎨 **Interface Moderne** : Panneau latéral interactif et esthétique basé sur les principes de Material Design 3.
- 🔤 **Options Globales** : Modifiez en un clic la **police de caractères** (parmi des dizaines de Google Fonts) et l'**interligne** de l'ensemble du document.
- ⚙️ **Ajustement Millimétré** : Personnalisez individuellement la **taille** et la **couleur** pour chaque type de paragraphe (Titre, Sous-titre, Titre 1-6, Texte normal).
- 🔄 **Application Récursive** : Redimensionne et recolore les textes dans le corps du document, ainsi que dans les listes et les tableaux.
- 📌 **En-têtes et Pieds de page** : Option pour inclure ou exclure les en-têtes et les pieds de page lors des modifications de style.
- 💾 **Sauvegarde des Préférences** : Mémorisation automatique de vos réglages (tailles, couleurs actives, polices, etc.) pour vos prochaines sessions.

---

### 🚀 Installation & Configuration

Pour utiliser ce script dans vos documents Google Docs :

1. Ouvrez un document Google Docs.
2. Allez dans le menu **Extensions > Apps Script**.
3. Créez un fichier de code, nommez-le `Code.gs` et collez-y le contenu du fichier **[Code.gs](file:///Users/fabrice/Documents/Mes%20développements/Ajustement%20des%20styles/Code.gs)**.
4. Créez un nouveau fichier HTML (Fichier > Nouveau > HTML), nommez-le `sidebar.html` et collez-y le contenu du fichier **[sidebar.html](file:///Users/fabrice/Documents/Mes%20développements/Ajustement%20des%20styles/sidebar.html)**.
5. Sauvegardez le projet et actualisez votre document Google Docs. Un nouveau menu **"Ajustement des styles"** va apparaître !

---

### 🛠️ Structure du Projet

Le projet contient deux fichiers principaux :
- **[Code.gs](file:///Users/fabrice/Documents/Mes%20développements/Ajustement%20des%20styles/Code.gs)** : Gère la logique côté serveur (interaction avec l'API Google Docs, récupération et mémorisation des préférences utilisateur).
- **[sidebar.html](file:///Users/fabrice/Documents/Mes%20développements/Ajustement%20des%20styles/sidebar.html)** : Gère l'interface utilisateur (UI), les styles (CSS) et la logique client (JavaScript).

---

### 👤 Auteur

- **[Fabrice Faucheux](https://faucheux.bzh)** (FF Labs) - [GitHub](https://github.com/FabriceFx)

---

### 📄 Licence

Ce projet est disponible sous licence **MIT**. Vous êtes libre de l'utiliser et de le modifier.

---

## 🇬🇧 English Version

> An intuitive Google Docs add-on to quickly and uniformly resize or restyle all fonts in a document (Normal text, Titles, Subtitles, Headings 1 to 6).

<a href="https://developers.google.com/apps-script"><img src="https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google-apps-script&logoColor=white" alt="Google Apps Script"></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-indigo?style=for-the-badge" alt="License: MIT"></a>

---

### ✨ Key Features

- 🎨 **Modern Interface**: Clean and interactive sidebar based on Material Design 3 guidelines.
- 🔤 **Global Options**: Modify the **font family** (from dozens of Google Fonts) and **line spacing** for the entire document in one click.
- ⚙️ **Fine-Tuning**: Customize size and color individually for each text type (Title, Subtitle, Heading 1-6, Normal Text) using built-in color pickers.
- 🔄 **Recursive Styler**: Seamlessly resizes and recolors text in the document body, lists, and tables.
- 📌 **Headers & Footers**: Toggle option to include or exclude headers and footers from styling updates.
- 💾 **Persistent Settings**: Automatic saving of your preferences (font size, active colors, fonts) so you don't have to enter them again.

---

### 🚀 Installation & Setup

To use this script in your Google Docs:

1. Open any Google Document.
2. Go to the menu **Extensions > Apps Script**.
3. Create a code file named `Code.gs` and paste the contents of **[Code.gs](file:///Users/fabrice/Documents/Mes%20développements/Ajustement%20des%20styles/Code.gs)**.
4. Create a new HTML file (File > New > HTML), name it `sidebar.html` and paste the contents of **[sidebar.html](file:///Users/fabrice/Documents/Mes%20développements/Ajustement%20des%20styles/sidebar.html)**.
5. Save the project and refresh your Google Doc. A new menu named **"Ajustement des styles"** will appear!

---

### 🛠️ Project Structure

The project relies on two main components:
- **[Code.gs](file:///Users/fabrice/Documents/Mes%20développements/Ajustement%20des%20styles/Code.gs)**: Server-side logic handling the Google Docs DocumentApp API and user properties/settings persistence.
- **[sidebar.html](file:///Users/fabrice/Documents/Mes%20développements/Ajustement%20des%20styles/sidebar.html)**: Client-side layout (HTML), styles (CSS), and user interaction scripting (JavaScript).

---

### 👤 Author

- **[Fabrice Faucheux](https://faucheux.bzh)** (FF Labs) - [GitHub](https://github.com/FabriceFx)

---

### 📄 License

This project is licensed under the **MIT License**. Feel free to use and modify it.

---
<p align="center"><a href="https://faucheux.bzh" target="_blank" style="color: inherit; text-decoration: none;">&lt;&gt; par Fabrice Faucheux</a></p>
