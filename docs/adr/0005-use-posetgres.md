# Uporaba PostgreSQL podatkovne baze

## Kontekst in opis problema

Aplikacija potrebuje podatkovno bazo za trajno in zanesljivo shranjevanje podatkov. Ker podatki vključujejo strukturirane entitete in njihove medsebojne povezave, je pomembno zagotoviti konsistentnost podatkov, podporo relacijam in možnost učinkovitega izvajanja poizvedb prek zalednega dela aplikacije.


## Obravnavane možnosti

* PostgreSQL
* MongoDB


## Sprejeta odločitev

Izbral sem PostgreSQL, saj zaradi narave aplikacije potrebujem relacijsko podatkovno bazo, z strogo strukturo in tipi. Dobro se integrira s Prisma ORM, kar omogoča tipiziran dostop do podatkov iz zalednega dela, razvitega v Expressu in TypeScriptu.


### Posledice

* Pozitivno: relacijski model omogoča jasno strukturo podatkov in povezovanje entitet
* Pozitivno: relacijska podatkovna baza zagotavlja ACID
* Pozitivno: dobra podpora za Prisma ORM in Docker
* Pozitivno: primeren za kompleksnejše poizvedbe in večje količine podatkov.
* Negativno: potrebno je načrtovati podatkovno shemo in relacije med tabelami