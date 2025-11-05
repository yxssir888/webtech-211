# webtech-211

Frontend de l'**Application de Restauration WebTech 211**, développé avec **Next.js ** et stylisé avec **TailwindCSS**.  
Communique directement avec **Supabase local** (via Docker) pour l'authentification, le menu et les commandes.

---

## 📋 Prérequis

| Outil              | Version recommandée | Lien de téléchargement                                       |
| ------------------ | ------------------- | ------------------------------------------------------------ |
| **Node.js**        | ≥ 18                | [nodejs.org](https://nodejs.org/)                            |
| **npm** / **yarn** | Inclus avec Node.js | –                                                            |
| **Docker Desktop** | Dernière version    | [docker.com](https://www.docker.com/products/docker-desktop) |

---

## 🚀 Installation & Démarrage

### 1️⃣ Cloner le projet

```bash
git clone [https://github.com/yxssir888/webtech-211.git]
cd webtech-211
```

### 2️⃣ Démarrer Supabase en local (Docker)

**⚠️ Obligatoire** : Supabase doit tourner avant le client.

```bash
# Depuis la racine du projet
cd supabase
docker compose up -d
```

- Attends **2-3 minutes** pour que les services démarrent
- Ouvre : **http://localhost:8000**
- Login : `supabase` / Mot de passe : `this_password_is_insecure_and_should_be_updated`

✅ Supabase est maintenant 100% local (base de données, auth, API)

### 3️⃣ Installer les dépendances du client

```bash
cd ../client
npm install
```

### 4️⃣ Créer le fichier `.env.local`

Dans `client/.env.local`, colle :

```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItbG9jYWwtcHJvamVjdCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzI3NjY1NjAwLCJleHAiOjIwNDMyNDk2MDB9.0123456789abcdef
```

> 🔒 Ces clés sont sécurisées en local (pas de risque)

### 5️⃣ Lancer le client

```bash
npm run dev
```

✅ Accès : **http://localhost:3000**

---

## ✨ Fonctionnalités disponibles

| Page       | Fonctionnalité                |
| ---------- | ----------------------------- |
| `/`        | Page d'accueil + Menu complet |
| `/login`   | Connexion / Inscription       |
| `/menu`    | Consultation du menu          |
| `/order`   | Passer une commande           |
| `/profile` | Profil utilisateur (en cours) |

## 🛠️ Dépannage rapide

| Problème                      | Solution                                |
| ----------------------------- | --------------------------------------- |
| Connection refused à Supabase | `docker compose up -d` dans `supabase/` |
| Port 3000 déjà utilisé        | `npm run dev -- -p 3001`                |
| Erreur `.env.local`           | Vérifie le nom du fichier (pas `.env`)  |

---

### Arrêter Supabase

```bash
cd supabase
docker compose down
```

---

## 👥 Contributeurs

**Mohamed KA**
**Adja Sira DOUMBOUYA**
**Yassir MOUSMAHI**

---

## 🔗 Liens Utiles

- [Next.js App Router](https://nextjs.org/docs/app)
- [TailwindCSS](https://tailwindcss.com/)
- [Supabase Docs](https://supabase.com/docs)
- [Supabase + Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

<div align="center">

**Made with ❤️ by l'équipe WebTech 211 – ECE Paris 2025**

</div>
