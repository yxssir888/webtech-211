# webtech-211
 
## Introduction

Projet de laboratoire pour apprendre **Node.js** et **Git** à l'ECE.  
Ce projet met en place un serveur Node.js simple, avec gestion de routes, lecture de fichiers JSON, et intégration de Nodemon pour le rechargement automatique.

---

# Client 


## 🚀 Démarrer le Projet

Ces instructions vous permettront d'obtenir une copie du projet opérationnelle sur votre machine locale à des fins de développement et de test.

### Prérequis

Assurez-vous d'avoir installé les éléments suivants :

* Node.js (version recommandée par Next.js)
* npm ou yarn (ou pnpm)

### Installation

1.  **Cloner le dépôt :**
    ```bash
    git clone lien git
    cd [Nom de votre projet]
    ```
2.  **Installer les dépendances :**
    ```bash
    npm install
    # ou
    yarn install
    ```
3.  **Lancer le serveur de développement :**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```
    Le projet devrait être accessible à l'adresse `http://localhost:3000`.

## 📂 Structure du Répertoire `app` (App Router)

Ce projet utilise l'**App Router** de Next.js, qui repose sur la convention de routage par fichiers. La structure des dossiers et les noms de fichiers spéciaux définissent les routes et les interfaces utilisateur (UI).



| `app/` | **Routage Principal** | Contient toutes les routes, les layouts et les pages de l'application. |
| `app/layout.js` | **Root Layout** | Le composant racine partagé entre toutes les pages (définit le `<html>` et le `<body>`). |
| `app/page.js` | **Page d'Accueil** | Représente la route racine (`/`) de l'application. |
| `app/dashboard/` | **Segment de Route** | Définit la route `/dashboard`. Peut contenir son propre `page.js` et `layout.js`. |
| `app/articles/[slug]/page.js` | **Route Dynamique** | Gère les pages dynamiques, comme `/articles/mon-article-cool`. `[slug]` est un paramètre de route. |
| `app/loading.js` | **UI de Chargement** | Composant optionnel qui s'affiche pendant le chargement d'un segment de route (utilise React Suspense). |
| `app/error.js` | **Boundary d'Erreur** | Composant optionnel pour intercepter et afficher les erreurs dans un segment de route. |
| `app/api/route.js` | **API Route** | Définit une API Endpoint (par ex. `POST /api/users`). |
| `components/` | **Composants Réutilisables** | Contient tous les composants React réutilisables (séparés du routage). |
| `public/` | **Assets Statiques** | Pour les fichiers statiques (images, polices, fichiers robots.txt) accessibles via l'URL racine. |

## 🧑‍💻 Contributeurs

Un grand merci aux personnes suivantes qui ont contribué à l'élaboration et à la maintenance de ce projet :

* **Mohamed KA** 
* **Adja Sira DOUMBOUYA**
* **Yassir** 


## 🔗 Liens Utiles

Voici quelques ressources pour approfondir votre compréhension de Next.js et de l'App Router :



 [Documentation Officielle de Next.js](https://nextjs.org/docs) 
 [Principes de l'App Router](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) | Détails sur le routage par fichiers. |
 [Interface utilisateur design ](https://tailwindcss.com) 
