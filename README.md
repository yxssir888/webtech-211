# webtech-211

## Introduction

Projet de laboratoire pour apprendre Node.js et Git à l'ECE. Ce projet met en place un serveur Node.js simple, avec gestion de routes, lecture de fichiers JSON, et intégration de Nodemon.

## Prérequis

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

## Installation

```sh
git clone https://github.com/yxssir888/webtech-211.git
cd webtech-211
npm install
```

## Fonctionnalités

- Serveur HTTP basique avec Node.js
- Rechargement automatique avec Nodemon (`npm run dev`)
- Gestion de routes :
  - `/` : page d’accueil avec liens vers les autres routes
  - `/hello?name=...` :
    - Si le nom est "Adja", réponse personnalisée avec une courte intro
    - Si le nom est aléatoire, réponse classique "Hello [name]"
    - Si aucun nom, réponse "Hello anonymous"
  - `/about` : lecture et affichage du fichier `about.json`
  - `/[nom]` : route dynamique qui affiche le contenu JSON correspondant si le fichier existe
- Gestion des erreurs 404 pour les routes inconnues


### Lancer le script simple

```sh
npm start
```

### Lancer le serveur en mode développement (avec Nodemon)

```sh
npm run dev
```

## Contributeurs

- Adja Sira Doumbouya <adjasira.doumbouya@edu.ece.fr>
