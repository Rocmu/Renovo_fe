# Ohjelmistotestit

## Sisäänkirjautuminen (Päivitetty 17.4.2025)

Taustapalvelimessa suoritettiin sisäänkirjautumis-testi. Testissä syötettiin käyttäjän käyttäjätunnukset, joiden avulla suoritettiin kirjautuminen Kubiokseen. Vastaus tulostettiin konsoliin.

Testin suoritus:
- 1. Taustapalvelin päälle `npm run dev`- komennolla.
- 2. `source tests/.venv/Scripts/activate` -komennolla virtuaaliympäristö päälle.
- 3. `robot --outputdir outputs tests/login-server-test.robot` -komennolla suoritettiin testit ja ohjattiin tulokset outputs-kansioon.

Tulokset:

- [Testi](login-server-test.robot)
- [log.html](../outputs/log.html)
- [output.xml](../outputs/output.xml)
- [report.html](../outputs/report.html)

Testeistä suoritettiin yksi epäonnistunut.

Huom! Testiä piti hiukan muuttaa asetusten vuoksi. Env- tiedostosta tulee nyt "huonot" käyttäjätunnukset. Lopputulos sama, eli epäonnistuu.

## Sisäänkirjautuminen (viikko 5)

Sovellukseen suoritettiin kaksi sisäänkirjautumistestiä, joissa toisesta kirjauduttiin ensin väärillä tunnuksilla (invalid) ja toisessa oikeilla tunnuksilla (valid).

Testin suoritus:
- 1. Taustapalvelin ja selain päälle `npm run dev`- komennolla.
- 2. `source tests/.venv/Scripts/activate` -komennolla virtuaaliympäristö päälle.
- 3. `robot --outputdir outputs tests/login-invalid-login.robot` -komennolla suoritettiin väärän kirjautumisen testit ja ohjattiin tulokset outputs-kansioon.
- 4. `robot --outputdir outputs tests/login-valid-login.robot` -komennolla suoritettiin oikean kirjautumisen testit ja ohjattiin tulokset outputs-kansioon.

Tulokset:

- Testi 1 [Sisäänkirjautuminen (invalid)](login-invalid-login.robot)
- Testi 2 [Sisäänkirjautuminen (valid)](login-valid-login.robot)
- [log.html](../outputs/log.html)
- [output.xml](../outputs/output.xml)
- [report.html](../outputs/report.html)

## Taustapalvelimen testaus (viikko 6)

Sovellukseen suoritettiin taustapalvelimen testaus, jossa haettiin käyttäjän työvuorot, jonka jälkeen syötettiin uusi vuoro.

Testin suoritus:
- 1. Taustapalvelin ja selain päälle `npm run dev`- komennolla.
- 2. `source tests/.venv/Scripts/activate` -komennolla virtuaaliympäristö päälle.
- 3. `robot --outputdir outputs tests/server-test.robot` -komennolla suoritettiin taustapalvelimen testit ja ohjattiin tulokset outputs-kansioon.

Tulokset:

- Testi [Taustapalvelin-vuorot-haku-syöttö](server-test.robot)
- [log.html](../outputs/log.html)
- [output.xml](../outputs/output.xml)
- [report.html](../outputs/report.html)

## Github.io sivun luominen (viikko 7)

Sovelluksen repositio muutettiin julkiseksi, ja sille luotiin Github.io- sivu, josta opettajat pystyvät katsomaan testien raportteja, koodiratkaisuja ja raportteja.

## Rakenne KESKEN!

```
Renovo_fe/
├── tests/
│   └── asennustesti.py
│   └── test2.robot
│   └── testX.robot
│   └── testX.robot
│   └── testX.robot
│   └── requirements.txt
│   └── README.md
└── outputs/
│   └── log.html
│   └── output.xml
│   └── report.html
│   └── README.md
```

## Käyttötapaukset ja niitä vastaavat testit (viikko 7 ja 8) KESKEN!

Viimeiseksi dokumentaatioon on kerätty suoritetut ohjelmistotestit, joissa ollaan testattu sovelluksen kykyä täyttää vaatimusmäärittelyyn luetellut käyttötapaukset. Ensin lukijalle esitellään kaikki käyttötapaukset, joiden pohjalta testit on tehty. Tämän jälkeen esitellään kaikki suunnitellut ohjelmistotestit, niiden tavoitteet, testauksen kohde (UI tai taustapalvelin), sekä onnistumisen kriteerit.

### Käyttötapaukset

- ### UTC_1: Käyttäjätilin luominen
- ### UTC_2: Sisäänkirjautuminen
- ### UTC_3: Mittaustulosten tarkastelu
- ### UTC_4: Työvuorojen syöttö
- ### UTC_5: Sairaustapausten syöttäminen
- ### UTC_6: Aktiivisuustapausten syöttäminen
- ### UTC_7: Poikkeustapausten syöttäminen
- ### UTC_8: Kalenterimerkinnän poistaminen
- ### UTC_9: Käyttöohjeet
- ### UTC_10: Uloskirjautuminen

### Testit

Seuraavaksi esitellään luodut ohjelmistotestit. Huomioitavaa on, että käyttötapauksia ollaan testattu samoissa testeissä. Esimerkiksi kirjautuminen (ja mahdollisesti rekistöröinti) ovat pakollisia vaatimuksia muiden käyttötapausten testaamiseksi. Mikäli käyttötapausta ei voida testata tietyssä kohteessa (UI tai taustapalvelin), tästä myös mainitaan. Esimerkiksi uloskirjautuminen testataan vain käyttöliittymän puolella ja liitetään suureen osaan muista testeistä.

Test Suite 1: Kirjautuminen.

- Onnistunut kirjautuminen (ja mahdollisesti rekistöröityminen) käyttöliittymän puolella. ---> Testi: [login-valid-login.robot](login-valid-login.robot) (Käyttötapaukset UTC_1 ja UTC_2)

- Tähän onnistunut taustapalvelimeen kirjautuminen!!!!!!!!!! KESKEN !

- Huonoilla käyttäjätunnuksilla kirjautuminen (ja mahdollisesti rekistöröityminen) käyttöliittymän puolella. Kirjautumisen tulee palauttaa haluttu vastaus virheellisistä tunnuksista. Epäonnistunut kirjautuminen ei mahdollista tulosten tarkastelua. ---> Testi: [utc_123_invalid_login_ui.robot](utc_123_invalid_login_ui.robot) (Käyttötapaukset UTC_1 ja UTC_2)

- Huonoilla käyttäjätunnuksilla (ja mahdollisesti rekistöröityminen) taustapalvelimen puolella. Kirjautumisen tulee palauttaa haluttu vastaus virheellisistä tunnuksista. Epäonnistunut kirjautuminen ei mahdollista tulosten tarkastelua. ---> Testi: [utc_123_invalid_login_server.robot](utc_123_invalid_login_server.robot) (Käyttötapaukset UTC_1 ja UTC_2)

Test Suite 2: Mittaukset

Renovo sovellukselle tehdään testejä, jossa tarkastellaan käyttäjän mittaustuloksia. Mikäli käyttäjää ei vielä löydy sovelluksesta, hänet luodaan kirjautumisen ohessa.

- Onnistunut kirjautuminen (ja mahdollisesti rekistöröityminen) käyttöliittymän puolella, jonka jälkeen pyydetään tuloksia 30 päivältä (viimeisten 10:n päivän tulokset näytetään automaattisesti oikealla sivulla) ja kirjaudutaan ulos. ---> Testi: [utc_123_valid_login_ui.robot](utc_123_valid_login_ui.robot) --->
(Käyttötapaukset UTC_1, UTC_2, UTC_3 ja UTC_10)

- Onnistunut kirjautuminen (ja mahdollisesti rekistöröityminen) taustapalvelimen puolella, jonka jälkeen pyydetään tulokset viimeiseltä 10 ja 30 päivältä. ---> Testi: [utc_123_valid_login_server.robot](utc_123_valid_login_server.robot) --->
(Käyttötapaukset UTC_1, UTC_2 ja UTC_3)

- Luvaton pyyntö mittaustuloksien tuloksesta taustapalvelimen puolella. Testistä jätetään sisäänkirjautuminen pois kokonaan. Pyynnön tulee palauttaa viesti pyynnön luvattomuudesta. Testiä ei suoriteta käyttöliittymän puolella, sillä pyyntöä ei kykene suorittamaan UI:n kautta ilman sisäänkirjautumista. ---> Testi: [utc_123_invalid_request_server.robot](utc_123_invalid_request_server.robot) (Käyttötapaus UTC_3)

Test Suite 3: Kalenteri

Test Suite 4: Käyttöohjeet

Testien suoritus:
- 1. Taustapalvelin ja selain päälle `npm run dev`- komennolla.
- 2. `source tests/.venv/Scripts/activate` -komennolla virtuaaliympäristö päälle.
- 3. `robot --outputdir outputs tests/<testin_nimi>`> -komennolla suoritettiin ohjelmistotestit ja ohjattiin tulokset outputs-kansioon.

## Lokit, tulostukset ja raportit

#### Lokit ---> [log.html](../outputs/log.html)
#### Raportit ---> [report.html](../outputs/report.html)
#### Tulostukset ---> [output.xml](../outputs/output.xml)


