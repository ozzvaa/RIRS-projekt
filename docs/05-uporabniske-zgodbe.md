## Uporabniške zgodbe
Kot [uporabniška vloga] želim [dejanje/cilj], da [razlog/vrednost].
- oznako, npr. US-01,
- povezano funkcionalnost,
- uporabniško vlogo,
- accceptance criteria (3-5 za vsak US).


# Uporabniške zgodbe

## ## **US-01:** Dinamična spletna stran kot vmesnik (MPV)

User Story:
- Kot uporabnik portala želim dostopati do vseh ostalih funkcionalnosti portala preko spletnega vmesnika (spletne strani), kjer bodo funkcionalnosti prikazane z gumbi.

Acceptance criteria:
- Spletna stran na svojih podstraneh vsebuje dostope do vseh ostalih funkcionalnosti
- Funkcionalnosti so smiselno ločene po podstraneh
- Funkcionalnosti so dostopne na standardiziran in razumljiv način (gumbi, vnosna polja, seznami...)



## **US-02:** CRUD operacije (MPV)

User Story:
- Kot uporabnik želim imeti možnost ustvarjanja, branja, posodabljanja in brisanja podatkov, za realen prikaz stanja znotraj baze.

Acceptance criteria:
- Pregled podatkov naj bo v tabelarični obliki z jasnimi ključ-vrednost polji
- Urejanje posameznega podatka mora biti enostavno preko vnosnega polja, gumba ali seznama
- Vse podatke, ki se navezujejo na en projekt je možno urejati na istem vmesniku / tabeli



## **US-03:** Avtentikacija - prijava uporabnika (MPV)

User Story:
- Kot uporabnik želim ob prvem obisku strani vpisati svoje uporabniško ime in geslo za dostop do portala.

Acceptance criteria:
- Uporabniki so vnaprej določeni sistemsko ali preko administratorskega portala
- Samo avtenticirani uporabniki imajo dostop do portala
- Registracija novih uporabnikov je omogočena zgolj administratorju



## **US-04:** Avtorizacija uporabnikov - prilagojen dostop do podatkov, projektov in ostalih funkcionalnosti (MPV)

User Story:
- Kot uporabnik želim dostop le do tistih podatkov do katerih dostop mi dovoljuje moja vloga, za ohranjanje varnosti.

Acceptance criteria:
- Uporabniki brez ustreznih pravic ne morejo dostopati do podatkov
- Avtorizacija se preverja pri vsaki komunikaciji z bazo
- Ob poskusu dostopa do podatkov, do katerih uporabnik nima dostopa se izpiše ustrezno sporočilo o napaki



## **US-05:** Kreiranje vlog (MVP)

User Story:
- Kot Administrator / Glavni urednik želim ustvarjati vloge, dodeljevati pravice vlogam in dodeljevati vloge ostalim uporabnikom.

Acceptance criteria:
- Sistem mora administratorju omogočati kreacijo vloge, poimenovanje vloge in izbiro podatkov do katerih lahko dostopa
- Administrator lahko uporabniku dodeli vlogo
- Uporabnik ima lahko več vlog
- Vloge lahko tudi restriktirajo dostop do podatkov
- Upošteva se vrstni red dodeljenih vlog
 


## **US-06:** Pregled nad vsemi knjižnimi projekti (glavni urednik) (MPV)

User Story:
- Kot glavni urednik želim pregled nad vsemi projekti, tekočimi in zaključenimi, za strukturiran dostop in pregled nad delom.

Acceptance criteria:
- Sistem mora prikazovati vse projekte
- Sistem mora projekte sortirati glede na čas 
- Sistem mora projekte sortirati glede na stanje zaključenosti



## **US-07:** Dodeljevanje dostopov (glavni urednik) uporabnikom na posameznem projektu (MPV)

User Story:
- Kot glavni urednik želim dodeliti dostop posameznim urednikom zgolj do določenih projektov za lažjo delitev dela.

Acceptance criteria:
- Pregled posameznega projekta omogoča dodajanje/odstranjevanje urednikov preko gumba
- Na posameznem projektu je lahko več urednikov
- Urednik vidi in ureja zgolj projekte katerim je dodeljen 



## **US-08:** Dodeljevanje dostopov vloge glede na vsebinski podatek / stolpec (npr. urednik lahko vidi samo naslov, avtorja...)

User Story:
- Kot glavni urednik želim posamezni vlogi / uporabniku dodeliti dostop le do določenega vsebinskega podatka za nadzor nad dostopom do informacij.

Acceptance criteria:
- Za posamezno vlogo / uporabnika lahko določim do katerih podatkov lahko dostopa
- Izbor poteka preko izbirnih gumbov
- Določim lahko tudi ali uporabnik lahko samo vidi ali tudi ureja podatek



## **US-09:** Kreiranje internih seznamov (npr. interni seznam rubrik, ki se pogosto uporabljajo)

User Story:
- Kot administrator želim možnosti CRUD internih seznamov za vključevanje v izbirna polja na projektih (npr. rubrike, formati...). 

Acceptance criteria:
- Administrator lahko ureja in poimenuje sezname
- Podatki, ki sprejmejo seznam določenega tipa lahko črpajo iz internih seznamov
- Navadni uporabniki ne morejo urejati seznama



## **US-10:** Pregled nad trenutnimi dodeljenimi projekti in izpolnjevanje (urednik) (MPV)

User Story:
- Kot urednik želim pregled nad trenutnimi projekti katerim sem dodeljen in izpolnjevanje podatkov znotraj njih.

Acceptance criteria:
- Pregled nad projekti
- Urejanje podatkov znotraj njih



## **US-11:** Računanje statistike in statistična analiza (koliko letnih projektov, dobiček, povprečja...)

User Story:
- Kot glavni urednik želim možnost računanja statistike za potrebe statističnih analiz.

Acceptance criteria:
- Statistični pregled vseh / izbranih projektov
- Statistična analiza posameznih stolpcev
- Osnovna statistika - št. projektov, št. končanih projektov, št. tekočih projektov
 

## **US-12:** Spremljanje napredka projekta (stopnja izpolnjenosti)

User Story:
- Kot urenik želim videti kako napreduje posamezen projekt - koliko vnosnih polj je že zaključenih

Acceptance criteria:
- Prikaz odstotka izpolnjenih polj na posameznem projektu
- Možnost manualne potrditve zaključenosti polja
- Možnost manualne potrditve zaključenosti projekta


## **US-13:** Izvoz formatiranih osnovnih in tehničnih podatkov o knjigi 

User Story: 
- Kot urednik želim imeti možnost izvoza predefiniranih mask, za lažji pregled in deljenje projektnih informacij

Acceptance criteria:
- Vnaprej definirane določene maske
- Maska vključuje le izbrane stolpce
- Formatiranje podatkov iz stolpca na predefiniran način


## **US-14:** Kreacija filtrov / mask izvozov

User Story: 
- Kot urednik želim imeti možnost ustvarjanja novih mask izvozov.

Acceptance criteria:
- Izberem lahko podatke, ki pripadajo filtru
- Izberem lahko način formatiranja podatkov
- Dodam lahko tekst in enostavne placeholderje kamor bodo podatki šli
