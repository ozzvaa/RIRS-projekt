# Uporaba Docker kontejnerjev za izgradnjo aplikacije 

## Kontekst in opis problema

Aplikacija je sestavljena iz več delov (čelni del, zaledni del, podatkovna baza, prisma shema). Razvoj in zaganjanje posameznih delov bi bilo težavno na različnih napravah z različnimi razvijalnimi okolji, zato s kontejnerizacijo celotne arhitekture zelo olajšamo razvoj tako na lokalni napravi kot strežniku kjer bo aplikacija stala.


## Obravnavane možnosti

* Docker in Docker compose
* Virtualna naprava
* Ročna namestitev arhitektur


## Sprejeta odločitev

Izbral sem Docker in Docker Compose, saj omogočata izvajanje posameznih komponent aplikacije v ločenih zabojnikih in njihovo upravljanje prek skupne konfiguracijske datoteke. Docker Compose omogoča zagon in povezovanje čelnega dela, zalednega dela in podatkovne baze z enim ukazom docker compose up. Tako je razvojno okolje lažje vzpostaviti na različnih računalnikih, odvisnosti posameznih komponent pa so ločene od gostiteljskega sistema. Edina zahteva na različnih napravah je Docker.


### Posledice
* Pozitivno: enostaven in ponovljiv lokalni zagon vseh komponent aplikacije
* Pozitivno: ločeni zabojniki omogočajo izolacijo okolij in odvisnosti
* Pozitivno: Docker Compose poenostavi konfiguracijo omrežja in povezav med storitvami
* Pozitivno: lažja vzpostavitev razvojnega okolja na drugih računalnikih
* Negativno: potrebno je osnovno poznavanje Dockerja in Docker Compose
* Negativno: konfiguracija vrat, omrežij, trajnega shranjevanja in spremenljivk okolja zahteva dodatno nastavitev
