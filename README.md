# ESA Image Portal

## Descrizione

Un portale dinamico per la gestione delle immagini, basato su uno schema JSON per configurare il layout e le azioni. Include funzionalità come "Like", "Delete", "Feature" e "Share".

## Funzionalità

- **Dynamic Image Display**: Le immagini sono caricate da uno schema JSON e visualizzate in una griglia configurabile.
- **Schema-Driven UI**: Modifica facilmente il layout e le azioni aggiornando lo schema JSON.
- **Interactive Action Buttons**: Pulsanti per "Like", "Delete", "Feature" e "Share".
- **Unit Testing**: Test unitari per i componenti principali.
- **Cloud Deployment**: Configurato per il deployment su Netlify o Vercel.

## Installazione

1. Clona il repository:
   ```bash
   git clone <repository-url>
   ```
2. Installa le dipendenze:
   ```bash
   npm install
   ```
3. Avvia il server mock:
   ```bash
   npm run mock-server
   ```
4. Avvia l'applicazione:
   ```bash
   npm run dev
   ```

## Test

Esegui i test unitari con:

```bash
npm test
```

## Deployment

1. Configura un account su [Netlify](https://www.netlify.com/) o [Vercel](https://vercel.com/).
2. Collega il repository al servizio di hosting.
3. Segui le istruzioni per il deployment automatico.

## Struttura del Progetto

- **src/**: Contiene i componenti React, le query GraphQL e lo schema JSON.
- **mock-server/**: Server Apollo per testare le mutazioni e le query.
- **public/**: Contiene le immagini statiche.

## Contributi

Contribuisci al progetto aprendo una pull request o segnalando problemi nel repository.

## Licenza

Questo progetto è rilasciato sotto la licenza MIT.
