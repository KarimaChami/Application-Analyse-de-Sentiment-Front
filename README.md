
---

# ✅ **Frontend – `sentiment-front/README.md`**

```markdown
# 🌐 Interface Web d'Analyse de Sentiment — Frontend (Next.js)

## 🎯 Objectif
Fournir une interface simple permettant de :
- se connecter via `/login`,
- récupérer un JWT,
- analyser un texte via `/sentiment`,
- afficher score + sentiment,
- gérer les états : *loading*, *error*, *success*.

---

## 📁 Structure du Frontend

Application-analyse-de-sentiment-front/
├── sentiment-front/
│   ├── app/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── sentiment/
│   │   │   └── page.tsx
│   │   └── utils/
│   │       └── auth.ts
│   │
│   ├── Dockerfile
│   └── RADME.md

---

## 🔧 Variables d’environnement (`.env.local`)

NEXT_PUBLIC_API_BASE=http://localhost:8000


**Requête protégée :**
```ts
fetch(API + "/predict", {
  method: "POST",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ text })
})


## 📄 Pages du projet
**/login
  - champs username/password
  - requête POST → /login
  - en cas de succès : stocke JWT → redirection /sentiment

**/sentiment
  - textarea pour entrer le texte
  - appel API → /predict
  - affichage :
       -- score
       -- sentiment
       -- erreurs (ex : JWT expiré)
       -- état “loading”
##🚀 Lancement du frontend

installation : npm install
developpement : npm run dev 


##🐳 Dockerisation Frontend

build : docker build -t sentiment-front .
run : docker run -p 3000:3000 sentiment-front
