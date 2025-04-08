# ESA Image Portal

## Overview

ESA Image Portal è un prototipo di applicazione per visualizzare e gestire immagini utilizzando un'interfaccia utente intuitiva e un backend basato su GraphQL. Questo progetto è stato sviluppato per dimostrare l'uso di tecnologie moderne come React, Apollo Client e Vite.

## Features

- Visualizzazione di immagini in una griglia dinamica.
- Mock server per simulare un backend GraphQL.
- Architettura modulare e scalabile.

## Prerequisiti

- Node.js (versione 16 o superiore).
- Gestore di pacchetti `npm` o `yarn`.

## Istruzioni per l'Esecuzione Locale

1. **Clona il repository**:

   ```bash
   git clone <repository-url>
   cd esa-image-portal
   ```

2. **Installa le dipendenze**:

   ```bash
   npm install
   ```

3. **Avvia il mock server**:

   ```bash
   cd mock-server
   npm install
   cd ..
   npm run server
   ```

4. **Avvia l'applicazione**:

   ```bash
   npm run dev
   ```

5. **Apri il browser**:
   Naviga su `http://localhost:5173` per visualizzare l'applicazione.

## Test

Esegui i test unitari con:

```bash
npm test
```

## Deployment

### Configurazione Vercel

- Il file `vercel.json` configura il deployment su Vercel.
- **Build**:
  - Utilizza `@vercel/static-build` con la directory di output `dist`.
- **Routing**:
  - Tutte le richieste sono reindirizzate a `index.html`.

### Pipeline CI/CD

- Utilizza GitHub Actions per il testing e il deployment automatico.

## Struttura del Progetto

- **src/**: Contiene il codice sorgente dell'applicazione.

  - **apollo/**: Configurazione del client Apollo per GraphQL.
  - **components/**: Componenti React riutilizzabili.
  - **graphql/**: File per le query e mutazioni GraphQL.
  - **pages/**: Pagine principali dell'applicazione.
  - **schema/**: Schema JSON per la struttura dei dati.
  - **state/**: Gestione dello stato globale con Redux.

- **mock-server/**: Contiene il server mock per simulare un backend GraphQL.

- **test/**: Test unitari per i componenti.

## Guida Tecnica

### Schema

- Il file dello schema si trova in `src/schema/image-schema.json`.
- **Modifica dello schema**:
  - Aggiungi o rimuovi campi direttamente nel file JSON.
  - Aggiorna i componenti React e le query/mutazioni GraphQL per riflettere i cambiamenti.

### GraphQL API

- **Setup**:

  - Configurazione del client Apollo in `src/apollo/client.ts`.
  - Endpoint del mock server: `http://localhost:4000/graphql`.

- **Query**:

  - Definite in `src/graphql/queries.ts`.
  - Esempio:
    ```graphql
    query GetImages {
      images {
        id
        title
        url
      }
    }
    ```

- **Mutazioni**:
  - Definite in `src/graphql/mutations.ts`.
  - Esempio:
    ```graphql
    mutation AddImage($input: ImageInput!) {
      addImage(input: $input) {
        id
        title
      }
    }
    ```

### Modifica delle Query/Mutazioni

1. Aggiungi o modifica le query/mutazioni nei file `queries.ts` o `mutations.ts`.
2. Aggiorna i componenti React per utilizzare le nuove query/mutazioni.
3. Testa le modifiche utilizzando il mock server.

## Contributi

Contribuisci al progetto aprendo una pull request o segnalando problemi nel repository.

## Demo URL

Puoi accedere alla versione live del prototipo tramite il seguente link:

[ESA Image Portal - Demo Live](https://esa-image-portal-dsa8ba5s6-vitos-projects-fdb8ab7c.vercel.app/)
