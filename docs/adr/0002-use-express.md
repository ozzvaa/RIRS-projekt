# Uporaba Expressa za razvoj zalednega dela aplikacije

## Kontekst in opis problema

Aplikacija potrebuje zaledni del, ki omogoča obdelavo zahtevkov, komunikacijo s podatkovno bazo ter upravljanje avtentikacije in avtorizacije uporabnikov. Express omogoča vzpostavitev HTTP API-ja za komunikacijo z React čelnim delom aplikacije ter dobro integracijo z okoljem NodeJS in strogo tipizacijo z uporabo TypeScripta.


## Obravnavane možnosti

* Plain TypeScript
* Express
* Python flask


## Sprejeta odločitev

Izbral sem tehnologijo Express, saj omogoča enostavno integracijo TypeScripta v vzpostavitev APIja, komunikacijo z Reactom in okoljem Node. React in Express pogosto sodelujeta skupaj pri podobnih arhitekturnih odločitvah, zato sem uporabil standardno arhitekturo. NodeJS zagotavlja uporabo istega programskega jezika na čelnem in zalednem delu kar omogoča lažje programiranje.


### Posledice

* Pozitivno: standardni izbor za komunikacijo z Reactovim čelnim delom.
* Pozitivno: dobra podpora za TypeScript in številne dodatne knjižnice.
* Pozitivno: integracija s Prisma ORM za lažjo komunikacijo z bazo
* Negativno: za naprednejše funkcionalnosti odvisnost od zunanjih knjižnic


