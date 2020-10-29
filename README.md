# Prosjekt 3

## Hvordan kjøre og teste

### 1. Installering
Installer pakkene lokalt ved følgende kommando i terminalen (både i /frontend og i /backend):

`npm install`

### 2. Backend
Start backend i /backend ved:

`npm run dev`

(Husk å bruke NTNU VPN slik at backend kan koble seg opp mot databasen)

(Husk at lagring av filer vil restarte serveren, og gjøre at f.eks innloggede brukere blir utlogget i backend)

(dersom du ønsker å ha den kompilerte JavaScript-builden se mer [her](https://gitlab.stud.idi.ntnu.no/it2810-h20/team-24/prosjekt-3/-/blob/14-write-documentation/backend/README.md))

### 3. Frontend
Start deretter frontend i /frontend ved:

`npm start`

(Husk at backend må fortsette å kjøre, så man må ha 2 terminaler oppe.)

### 4. Testing
Man kjører enhetstestene i /frontend ved:

`npm run test`

Man kjører end-to-end testene i /frontend ved:

`npm run e2e`

(Husk at frontend og backend må kjøre, altså man må ha 3 terminaler oppe)


## Om siden
Vi har valgt å utvikle en webside der man kan søke på, filtrere, sortere og vise detaljert info om filmer. I tillegg har vi laget et innloggingssystem, slik at man kan lagre favorittfilmer. 

For å ha et datagrunnlag vi kan bruke i databasen, har vi lastet ned IMDB sin dump med generell informasjon deres film og serie-innhold. Siden denne informasjonen var begrenset og uten bilder, har vi laget et script som bruker API-kall til TMDB for å legge til ytterligere informasjon, og slik at vi får filtrert vekk uønsket innhold. 

## React
React med typescript er brukt i frontend, som har blitt satt opp med create-react-app. Vi har lagt alle react komponenter i mappen components og ytterligere gruppert komponentene i undermapper etter hvilke kategorier de tilhører. Vi har gruppene movie, navigation, search og user. For eksempel har movie-mappen komponenter for moviepage, moviegrid, moviecard osv.


I implementasjon har vi ved unntak av tredjepartskomponentene brukt de ordinære mekanismene i React som props og state med en hensiktsmessig komponentstruktur. Vi har så godt som mulig dekomponert komponentene slik at de er så enkle og leselig som mulig. Funksjoner og annen kode som ikke er selvforklarende er også kommentert.

## Redux
Vi har valgt å bruke Redux til state management i React applikasjonen. Grunnen til at vi valgte Redux er at det er et populært og etablert bibliotek for state mangament og at det var noe vi ønsket å lære mer om.


Måten vi bruker Redux på er at vi har 3 reducere: SearchParams, SearchResult og User. Dette er tilstand som vi ser på som globale fordi de går på tvers av flere komponenter og kreves på forskjellige nivåer av komponent-hierarkiet. SearchParams inneholder alle parameterne som skal sendes med til backend når det skal utføres søk. SearchResult er resultatet man får fra et søk (inkludere filmer og antall pager). User inneholder informasjon om brukeren som er logget inn, og inneholder også favoritt-filmene som er valgt.


Vi har sørget så godt som mulig for å følge de grunnleggende prinsippene bak Redux som blant annet å ha rene reducer-funksjoner (ingen side-effects). I tillegg til å sørge for at Actions er de eneste som kan endre Store.

## REST API, backend og MongoDB

Vi har valgt å bruke MongoDB som vår database. Dette fordi det er en svært populær databaseløsning som har god dokumentasjon, enkel å sette opp og er fleksibel å bruke. I vårt film-domene har vi to «collections», nemlig movie og user. For å enkelt kunne støtte søking på tekst har vi lagt inn en tekst-indeks på tittel feltene i movie-collection. Databasen er også satt opp på den virtuelle maskinen som gruppa har fått tildelt.


Backend applikasjonen er satt opp til å bruke express.js med bruk av typescript i utviklingen. Her har vi brukt utviklingsverktøy som ts-node for å kunne kjøre typescript koden uten å eksplisitt måtte kompilere samt at vi har brukt nodemon til å kunne dynamisk oppdatere serveren ved lagring av relevante filer. Dessuten har vi satt opp kommandoer for å kunne kompilere (npm run build), kjøre den kompilerte javascript (npm start) og kjøre typescript under utvikling (npm run dev).


For at backend applikasjonen skal enkelt kommunisere med databasen har vi brukt tredjepartskomponenten mongoose, som også gir et enklere grensesnitt for å skrive spørringer mot MongoDB. For å implementere søking av filmer har vi blant annet brukt find-funksjonen med MongoDB-queries for søk og filtrering. Dette blir deretter sortert og riktig filmer og antall blir valgt ut i fra paging-parameterne. Kode knyttet til spørringer, modeller og kommunikasjon mot databasen har vi lagt i mappen data.


Vi har valgt å utvikle et REST-api som et grensesnitt mot vår frontend. Grunnen til at vi valgte REST-api over f.eks GraphQL, at vi føler strukturen til et REST-api harmonerer bedre med de andre komponetene vi har valgt: Express og MongoDB. Det blir enklere og mer naturlig koble det sammen uten spesielt mye ekstra implementasjon, som GraphQL potensielt hadde vært. 


Vi har to overordende endepunkter: /movie og /user. Under /user har vi /register, /login, /logout osv. Under /movie har vi blant annet /search som også har knyttet til seg flere mulig parametre som har diverse filter, sortering, query osv. Kode for å håndtere forespørslene og responser har vi samlet i en kontroller-mappe med en fil for hver av de to endepunktene. Vi har en fil, routes.ts, som samler alle rutene til kontrollerne, og deretter blir denne routes komponenten lagt inn som middleware i Express applikasjonen i app.ts.


Backenden har dessuten implementert registrering og autentisering av brukere (ble gjort før vi visste at det ikke var krav). Dette er også lagt inn som middleware i Express applikasjonen og krever bare at man legger til requireAuth-funksjonen som argument i et endepunkt for å kunne bli brukt. Mesteparten av kode knyttet til autentisering er i /controllers/user.ts.


## Testing
### Unit og snapshot testing
Det er skrevet 5 unit-tester med Jest. For at unit-testene for komponentene som bruker ajax ikke skal sende faktiske kall til backend, har vi mocket alle slike kall. Det testes blant annet for at verdiene til enkeltelementer tar verdien av mock dataene, og at fetch kalles korrekt antall ganger. Det er også skrevet et par snapshot tester, som gir oss mulighet til å oppdage uønskede endringer i renderingen. 

### End to end testing
Vi har valgt å bruke Cypress til å skrive end to end testene, da dette er godt dokumentert og virket enkelt å bruke. Det er skrevet 5 slike tester, der hver test er et eksempel på en brukerreise. Disse sjekker blant annet navigering på siden, registrering, innlogging, favorittinnhold og søk.

### Device testing
Vi testet at ting så bra ut og at funksjonaliteten var lik på flere forskjellige enheter. Vi testet bl.a. i Chrome der man kan teste i størrelsen til ulike enheter, men også på Motorola g6 plus og iPad Pro.
