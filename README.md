# WebTech 211 – Application de Restauration

Frontend de l'**Application de Restauration WebTech 211**, développé avec **Next.js** et **TailwindCSS**.  
Communique **exclusivement avec Supabase en mode local (hors ligne)** via Docker.  
Authentification, menu et gestion des plats entièrement gérés par Supabase.

---

## Prérequis

| Outil              | Version recommandée       | Lien de téléchargement |
| ------------------ | ------------------------- | ---------------------- |
| **Node.js**        | ≥ 18                      | [nodejs.org](https://nodejs.org/) |
| **npm**            | Inclus avec Node.js       | –                      |
| **Docker Desktop** | Dernière version          | [docker.com](https://www.docker.com/products/docker-desktop) |


---

## Installation & Démarrage

### 1. Cloner le projet

```bash
git clone https://github.com/yxssir888/webtech-211.git
cd webtech-211
```

### 2. Démarrer Supabase en local (Docker)

```bash
# Depuis la racine du projet
cd supabase
docker compose up -d
```

- Attendez **2-3 minutes** pour que tous les services démarrent
- Ouvrez : [http://localhost:54323](http://localhost:54323)
- **Connexion Studio Supabase** :
  - **Email** : `supabase`
  - **Mot de passe** : `webtech211`


### 3. Créer un compte admin (via Supabase Studio)

1. Allez sur [http://localhost:54323](http://localhost:54323)
2. Connectez-vous avec les identifiants ci-dessus
3. Allez dans **Authentication > Users**
4. Cliquez sur **"Add user"**
5. Remplissez :
   - **Email** : `admin@restaurant.com`
   - **Password** : `admin123`
   - Confirmez le mot de passe
6. Cliquez sur **"Create user"**

> **Compte admin créé** :  
> **Email** : `admin@restaurant.com`  
> **Mot de passe** : `admin123`

---

### 4. Installer les dépendances du client

```bash
cd ../client
npm install
```

### 5. Créer le fichier `.env.local` dnas le client

### 6. Lancer le client

```bash
npm run dev
```
---


## Schéma de la base de données (Supabase)

### Table : `menu`

| Colonne     | Type         | Description                  |
| ----------- | ------------ | ---------------------------- |
| `id`        | `bigint`     | Clé primaire (auto-incrément) |
| `title`     | `text`       | Nom du plat                  |
| `desc`      | `text`       | Description                  |
| `image`     | `text`       | URL de l’image               |
| `price`     | `numeric`    | Prix en €                    |
| `created_at`| `timestamp`  | Date de création             |


---

## Dépannage

| Problème                         | Solution |
| -------------------------------- | -------- |
| `Connection refused` à Supabase  | `docker compose up -d` dans `supabase/` |
| Port 3000 déjà utilisé           | `npm run dev -- -p 3001` |
| Erreur `.env.local`              | Vérifiez le nom (pas `.env`) |

---

## Arrêter Supabase

```bash
cd supabase
docker compose down
```

---

## Contributeurs

**Mohamed KA**  
**Adja Sira DOUMBOUYA**  
**Yassir MOUSMAHI**

---

<div align="center">

**Made with ❤️ by l'équipe WebTech 211 – ECE Paris 2025**

</div>
```
