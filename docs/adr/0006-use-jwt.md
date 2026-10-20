# Uporaba JWT žetonov za avtentikacijo uporabnikov

## Kontekst in opis problema

Aplikacija mora omogočati prijavo uporabnikov ter preverjanje njihove identitete pri dostopu do zaščitenih funkcionalnosti. Zaledni del mora pri vsaki ustrezni zahtevi preveriti, ali je uporabnik avtenticiran, in mu glede na njegove pravice dovoliti ali zavrniti dostop. Rešitev mora omogočati varno komunikacijo med React čelnim delom in Express zalednim delom ter posreden dostop do podatkovne baze.


## Obravnavane možnosti

* JSON Web Token (JWT)
* Seje na strežniku


## Sprejeta odločitev

Izbral sem JWT (JSON Web Token), saj omogoča preverjanje identitete uporabnika na zalednem delu brez potrebe po shranjevanju posamezne seje na strežniku. Po uspešni prijavi backend izda žeton, ki ga ob naslednjih zahtevah uporabi za preverjanje pristnosti uporabnika. Žeton se bo shranjeval v piškotku HttpOnly, kar preprečuje neposredno branje njegove vsebine prek JavaScripta. Rešitev se dobro integrira z Expressom in omogoča tudi preverjanje uporabniških vlog za nadzor dostopa.


### Posledice
* Pozitivno: dobra integracija z Expressom in obstoječimi knjižnicami za Node.js
* Pozitivno: piškotek HttpOnly zmanjša tveganje kraje žetona prek JavaScripta.
* Pozitivno: omogoča preverjanje uporabniških vlog in omejevanje dostopa do funkcionalnosti.
* Negativno: nevarnost po CSRF napadih, potrebna dodatna zaščita
* Negativno: potrebna je pravilna konfiguracija piškotkov, CORS in HTTPS v produkcijskem okolju