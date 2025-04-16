# 🛥️ Port de Plaisance de Russell – API & Application Web

Ce projet est une application web complète pour gérer les **réservations de catways** dans un port de plaisance, construite avec **Node.js**, **Express**, **MongoDB**, et des vues **EJS**.

---

## 🚀 Fonctionnalités

- Authentification par **JWT**
- Tableau de bord pour les utilisateurs
- CRUD complet pour :
  - les **utilisateurs**
  - les **catways**
  - les **réservations**
- API RESTful documentée
- Interface utilisateur en **EJS** (HTML + CSS natif)
- Déploiement facile

---

## 🛠️ Stack technique

- **Back-end** : Node.js + Express
- **Base de données** : MongoDB (via Mongoose)
- **Front-end** : EJS + CSS natif
- **Authentification** : JSON Web Token (JWT)

---

## 🧪 Installation locale

1. **Cloner le projet**
```bash
git clone https://github.com/votre-utilisateur/api-russel.git
cd api-russel
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Créer un fichier `.env`**  
```dotenv
PORT=3000
MONGO_URI=mongodb://localhost:27017/russell
SECRET_KEY=uneCleSuperSecrete
```

4. **Lancer le serveur**
```bash
npm start
```

> L’application sera accessible sur `http://localhost:3000`

---

## 🔐 Authentification

- La connexion se fait via un endpoint `POST /auth/login` (ou via la page d’accueil `/`)
- Un **token JWT** est généré, utilisé pour accéder aux routes protégées

---

## 📄 Pages principales

| Route                    | Description                          |
|--------------------------|--------------------------------------|
| `/`                      | Page d’accueil avec formulaire login |
| `/tableau-de-bord`       | Tableau de bord utilisateur connecté |
| `/users`                 | Liste + création/modification utilisateurs |
| `/catways`               | Liste + création/modification catways |
| `/reservations`          | Liste + création/modification réservations |
| `/documentation`         | Documentation de l’API REST         |

---

## 📂 Structure du projet

```
📦 api-russel/
├── app.js
├── models/
├── routes/
├── services/
├── views/
├── public/
└── README.md
```

---

## 📘 API RESTful

> Voir la [documentation API](http://localhost:3000/documentation)

Exemples de routes :
- `GET /users` : liste des utilisateurs
- `POST /reservations` : créer une réservation
- `PUT /catways/:id` : modifier un catway
- `DELETE /reservations/:id` : supprimer une réservation

---

## 📤 Déploiement

Prêt pour être déployé sur :
- [Render](https://render.com)
- [Railway](https://railway.app)
- [Vercel (si front-end statique)]

---

## 👨‍💻 Auteur

Projet réalisé dans le cadre d’un devoir de développement web.  
© 2025 – Port de Plaisance de Russell

---
