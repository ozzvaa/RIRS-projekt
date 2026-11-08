# RIRS-projekt

## Opis projekta
Projekt je namenjen razvoju aplikacije v okviru predmeta Razvoj informacijskih rešitev in storitev (RIRS). Aplikacija zajema spletno storitev za lažje spremljanje in vodenje založniškega procesa.

## Uporabljene tehnologije
- **[React](https://react.dev/learn)** – razvoj uporabniškega vmesnika
- **[TypeScript](https://www.typescriptlang.org/docs/)** – statično preverjanje tipov
- **[Node.js](https://nodejs.org/docs/latest/api/)** – izvajalno okolje za zaledni del
- **[Express](https://expressjs.com/)** – razvoj API-ja
- **[PostgreSQL](https://www.postgresql.org/docs/)** – podatkovna baza
- **[Prisma ORM](https://www.prisma.io/docs/orm)** – povezava z bazo in upravljanje podatkov
- **[Docker](https://docs.docker.com/)** – kontejnerizacija aplikacije in lokalni razvoj


## Navodila za zagon
1. Poženi Docker container z bazo. 
```bash
docker build -t uredniski_portal ./backend
```


```bash
docker run -d --name uredniski_portal_db --env-file .env -p 7777:5432 -v uredniski_portal_data:/var/lib/postgresql uredniski_portal
```

2. Zagon zalednega dela in čelnega dela aplikacije
```bash
cd frontend
npm run dev

cd backend
npm run dev
```