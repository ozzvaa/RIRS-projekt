# Uporaba PrismaORM za lažjo strukturiranje in komunikacijo s podatkovno bazo

## Kontekst in opis problema

Aplikacija potrebuje zanesljiv način za komunikacijo med zalednim delom, razvitim v Expressu in TypeScriptu, ter podatkovno bazo PostgreSQL. Za lažje upravljanje podatkovnih modelov, relacij in poizvedb je smiselno uporabiti orodje, ki omogoča tipiziran dostop do podatkovne baze in poenostavi vzdrževanje njene strukture.


## Obravnavane možnosti

* Plain SQL
* PrismaORM
* Mongoose


## Sprejeta odločitev

Izbral sem Prisma ORM, saj omogoča tipiziran dostop do podatkovne baze, definiranje podatkovnih modelov in upravljanje migracij. Dobro se integrira z Node.js, Expressom in TypeScriptom, kar poenostavi komunikacijo s PostgreSQL ter zmanjša potrebo po ročnem pisanju ponavljajoče se kode za izvajanje poizvedb.


### Posledice

* Pozitivno: tipizirana shema in dober pregled nad modeli
* Pozitivno: zmanjšana potreba po pisanju SQL
* Pozitivno: pisanje poizvedb za komunikacijo z bazo na zalednem delu v TypeScript jeziku
* Negativno: potreba po dodatnih knjižnicah za komunikacijo s Prismo
* Negativno: potrebno znanje po pisanju sheme v Prisma DSL
* Negativno: spremembe v shemi zahtevajo migracije