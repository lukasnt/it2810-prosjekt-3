# Prosjekt 3

## Rest API, backend og mongodb

Vi har valgt å bruke mongodb som vår database. Vi valgte den fordi det er en svært populær databaseløsning som har god dokumentasjon, enkel å sette opp og er fleksibel å bruke. I vårt film-domene har vi to «collections», nemlig movie og user. For å enkelt kunne støtte søking på tekst har vi lagt inn en tekst-indeks på tittel feltene i movie-collection. Databasen er også satt på den virtuelle maskinen som gruppa har fått tildelt.


Backend applikasjonen er satt opp til å bruke express.js med bruk av typescript i utviklingen. Her har vi brukt utviklingsverktøy som ts-node for å kunne kjøre typescript koden uten å eksplisitt måtte kompilere samt at vi har brukt nodemon til å kunne dynamisk oppdatere serveren ved lagring av relevante filer. Dessuten har vi satt opp kommandoer for å kunne kompilere (npm run build), kjøre den kompilerte javascript (npm start) og kjøre typescript under utvikling (npm run dev).


For at backend applikasjonen skal enkelt kommunisere med databasen har vi brukt tredjepartskomponenten mongoose, som også gir et enklere grensesnitt for å skrive spørringer mot mongodb. For å implementere søking av filmer har vi blant annet brukt find-funksjonen med mongodb-queries for søk og filtrering. Dette blir deretter sortert og riktig filmer og antall blir valgt ut i fra paging-parameterne. Kode knyttet til spørringer, modeller og kommunikasjon mot databasen har vi lagt i mappen data.


Vi har valgt å utvikle et REST-api som et grensesnitt mot vår frontend. Grunnen til at vi valgte REST-api over f.eks GraphQL, at vi føler strukturen til et REST-api harmonerer bedre med de andre komponetene vi har valgt: express og mongodb. Det blir enklere og mer naturlig koble det sammen uten spesielt mye ekstra implementasjon, som GraphQL potensielt hadde vært.


Vi har to overordende endepunkter: /movie og /user. Under /user har vi /register, /login, /logout osv. Under /movie har vi blant annet /search som også har knyttet til seg flere mulig parametre som har diverse filter, sortering, query osv. Kode for å håndtere forespørslene og responser har vi samlet i en kontroller-mappe med en fil for hver av de to endepunktene. Vi har en fil, routes.ts, som samler alle rutene til kontrollerne, og deretter blir denne routes komponenten lagt inn som middleware i express applikasjonen i app.ts.


Backenden har dessuten implementert registrering og autentisering av brukere (ble gjort før vi visste at det ikke var krav). Dette er også lagt inn som middleware i express applikasjonen og krever bare at man legger til requireAuth funksjonen som argument i et endepunkt for å kunne bli brukt. Mesteparten av kode knyttet til autentisering er i /controllers/user.ts.
