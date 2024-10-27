# **Trackster App**

En träningskalender där användare kan logga sina träningspass, spåra framsteg och analysera sin utveckling.

## Innehåll

1. [Projektstatus](#projektstatus)
2. [Funktioner](#funktioner)
3. [Teknik](#teknik)
4. [Installation](#installation)
5. [API-samlingar](#api-samlingar)
6. [PWA-funktionalitet](#pwa-funktionalitet)

---

## **Projektstatus**

Trackster App är under utveckling, med kommande funktioner som notifikationer och statistik för träningshistorik.

## **Funktioner**

- **Användarprofil**: Skapa och hantera användarkonton
- **Träningslogg**: Logga typ av träning, tid, kaloriförbrukning och anteckningar
- **Kalendervy**: Se och navigera bland loggade pass
- **PWA**: Installera och använd offline

## **Teknik**

**Frontend**: React, Vite, Tailwind CSS

**Backend**: Node.js, Express, MongoDB (Atlas), JWT  
**Övrigt**: PWA-stöd för offline-användning

## **Installation**

1. **Klona repot:**

   ```bash
   git clone https://github.com/chas-academy/u09-fullstack-js-Denize01.git
   ```

2. **Backend-installation:**

   - Gå till backend-mappen och installera beroenden:

     ```bash
     cd backend
     npm install
     ```

   - Skapa `.env`-fil och lägg till:

     ```env
     NODE_ENV=development
     MONGO_URI=<Din egna MongoDB URI>
     PORT=5000
     JWT_SECRET=<JWT secret> //Kommer snart.
     ```

   - Starta backend-servern:

     ```bash
     npm run dev
     ```

3. **Frontend-installation:**

   - Gå till frontend-mappen och installera beroenden:

     ```bash
     cd frontend
     npm install
     ```

   - Skapa `.env`-fil:

     ```env
     VITE_API_URL=http://localhost:5000/api
     ```

   - Starta frontend:

     ```bash
     npm run dev
     ```

4. **Användning**: Öppna `http://localhost:5173` i webbläsaren.

## **API-samlingar**

//Kommer snart.

## **PWA-funktionalitet**

Trackster är en PWA, vilket möjliggör offline-användning. För installation:

- **Desktop**: Klicka på "Installera"-ikonen i webbläsaren.
- **Mobil**: I Chrome, välj "Lägg till på hemskärmen" i menyn.

---
