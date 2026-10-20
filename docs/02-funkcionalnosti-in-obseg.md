## Opredelite uporabniške vloge, funkcionalnosti in obseg rešitve.

Vključite:

Uporabniške vloge
Opišite vsaj tri smiselne uporabniške vloge. Za vsako navedite, kaj lahko počne in katerih pravic nima.
Predvidene funkcionalnosti
Pripravite seznam 10–15 predvidenih funkcionalnosti.
Funkcionalnosti naj opisujejo vsebinsko uporabo rešitve, ne samo splošnih možnosti, kot so prijava, registracija, pregled, dodajanje, urejanje in brisanje.
Izberite 5–7 funkcionalnosti, ki so ključne za prvo delujočo različico (označite jih z oznako MVP). Vsaj 3 od teh funkcionalnosti morajo biti domensko specifične, torej značilne za vašo rešitev (in ne samo CRUD).
Kasnejše nadgradnje
Navedite vsaj 5 možnih nadgradenj.
Out of scope
Po alinejah navedite funkcionalnosti, ki  jih v tem projektu ne boste implementirali oz. kaj vaš projekt ne bo.

# Uporabniške vloge
- Administrator - neomejen dostop do podatkov, dodeljevanje vlog, pravic in nastavitev
- Glavni urednik - ustvarjanje in pregled nad vsemi projekti, dodeljevanje projektov urednikom in tehnikom, nadzor nad pravicami urednikov
- Urednik - pregled nad dodeljenimi projekti, izpolnjevanje in urejanje projektov, izvoz uredniških podatkov (nima dostopa do pregleda in urejanja določenih podatkov)
- Tehnik - dostop in pregled nad tehničnimi podatki, izvoz tehničnih podatkov (nima dostopa do pregleda in urejanja določenih podatkov)

# Funkcionalnosti
- Dinamična spletna stran kot vmesnik (MPV)
- CRUD operacije (MPV)
- Avtentikacija - prijava uporabnika (MPV)
- Avtorizacija uporabnikov - prilagojen dostop do podatkov, projektov in ostalih funkcionalnosti  (MPV)
- Administracija nad uporabniki - Dodeljevanje vlog (glavni urednik) uporabnikom (urednik, tehnik) (MPV)
- Kreiranje vlog (MVP)
- Pregled nad vsemi knjižnimi projekti (glavni urednik) (MPV)
- Dodeljevanje dostopov (glavni urednik) uporabnikom na posameznem projektu (MPV)
- Dodeljevanje dostopov vloge glede na vsebinski podatek / stolpec (npr. urednik lahko vidi samo naslov, avtorja...)
- Kreiranje internih seznamov (npr. interni seznam rubrik, ki se pogosto uporabljajo)
- Pregled nad trenutnimi dodeljenimi projekti in izpolnjevanje (urednik) (MPV)
- Pregled nad zgodovino projektov
- Računanje statistike in statistična analiza (koliko letnih projektov, dobiček, povprečja...)
- Spremljanje napredka projekta (stopnja izpolnjenosti)
- Kreacija filtrov / mask izvozov
- Izvoz formatiranih osnovnih in tehničnih podatkov o knjigi 

# Nadgradnje
- Spremljanje ur dela urednika na posameznem projektu
- Zgodovina sprememb projekta
- Določanje striktnih deadlinov
- Računovodski portal za spremljanje prodaje
- Samodejni generator promocijskih listov
- Portal za spremljanje skladišča (izvodov)


# Out of scope
- Integracija z zunanjimi spletnimi stranmi
- Integracija z že obstoječimi formati (NUK)
- Mobilna storitev