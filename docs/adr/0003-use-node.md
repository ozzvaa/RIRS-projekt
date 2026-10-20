# Uporaba NodeJS izvajalnega okolja

## Kontekst in opis problema

Aplikacija potrebuje izvajalno okolje za zaledni del, ki omogoča izvajanje Express strežnika in komunikacijo s podatkovno bazo. Ker je čelni del razvit v Reactu in TypeScriptu, je smiselno izbrati okolje, ki omogoča uporabo istega programskega jezika na čelnem in zalednem delu ter enostavno upravljanje knjižnic in odvisnosti.


## Obravnavane možnosti

* NodeJS


## Sprejeta odločitev

Izbral sem Node.js, saj omogoča izvajanje JavaScripta zunaj brskalnika ter neposredno podporo zalednemu delu, razvitemu z Expressom in TypeScriptom. Omogoča uporabo skupnega ekosistema knjižnic za čelni in zaledni del, enotno upravljanje odvisnosti z npm ter enostavno integracijo s Prisma ORM in Dockerjem. Je najpopularnejše izvajalno okolje za programski jezik JavaScript in standardni izbor v kombinaciji z Express in React arhitekturo.


### Posledice

* Pozitivno: uporaba JavaScripta in TypeScripta na čelnem in zalednem delu aplikacije.
* Pozitivno: velik ekosistem knjižnic in orodij prek npm.
* Pozitivno: dobra integracija z Expressom, Prisma ORM in Dockerjem.
* Pozitivno: enostavnejše vzdrževanje in upravljanje odvisnosti v celotnem projektu.
* Negativno: omejena komputacijska obremenitev pri večjih obremenitvah