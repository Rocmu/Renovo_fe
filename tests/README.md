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
│   └── login-invalid-login.robot
│   └── login-server-test.robot
│   └── login-server-test.robot
│   └── login-valid-login.robot
│   └── server-test.robot
│   └── UTC_HRV_failed_Server.robot
│   └── UTC_HRVMeasurements_GUI.robot
│   └── UTC_HRVMeasurements_Server.robot
│   └── UTC_InvalidLogin_GUI.robot
│   └── UTC_InvalidLogin_Server.robot
│   └── UTC_PostToCalendar_GUI.robot
│   └── UTC_ValidLogin_Server.robot
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

Seuraavaksi esitellään luodut ohjelmistotestit. Huomioitavaa on, että käyttötapauksia ollaan testattu samoissa testeissä. Esimerkiksi kirjautuminen (ja mahdollisesti rekistöröinti) ovat pakollisia vaatimuksia muiden käyttötapausten testaamiseksi. Mikäli käyttötapausta ei voida testata tietyssä kohteessa (UI tai taustapalvelin), tästä myös mainitaan. Esimerkiksi uloskirjautuminen testataan vain käyttöliittymän puolella ja liitetään mukaan suureen osaan muista testeistä.

#### Kirjautuminen.

Sovellukselle tehdään testejä, joissa syötetään oikeita/vääriä tunnuksia ja katsotaan, että ohjelmisto palauttaa oikean vastauksen. Sulkuihin on merkitty, mitkä käyttötapaukset testataan.

- Onnistunut kirjautuminen (ja mahdollisesti rekistöröityminen) käyttöliittymän puolella. Onnistunut kirjautuminen vie etusivulle, jossa näkyvät sovelluksen käyttöohjeet. ---> Testi: [login-valid-login.robot](login-valid-login.robot) (Käyttötapaukset UTC_1, UTC_2 ja UTC_9) (tehty 29.04.2025)

- Onnistunut kirjautuminen (ja mahdollisesti rekistöröityminen) taustapalvelimen puolella. ---> Testi: [UTC_ValidLogin_Server.robot](UTC_ValidLogin_Server.robot) (Käyttötapaukset UTC_1 ja UTC_2) (tehty 30.04.2025)

- Huonoilla käyttäjätunnuksilla kirjautuminen (ja mahdollisesti rekistöröityminen) käyttöliittymän puolella. Kirjautumisen tulee palauttaa haluttu vastaus virheellisistä tunnuksista. Epäonnistunut kirjautuminen ei mahdollista tulosten tarkastelua. ---> Testi: [UTC_InvalidLogin_GUI.robot](UTC_InvalidLogin_GUI.robot) (Käyttötapaukset UTC_1 ja UTC_2) (tehty 29.04.2025)

- Huonoilla käyttäjätunnuksilla (ja mahdollisesti rekistöröityminen) taustapalvelimen puolella. Kirjautumisen tulee palauttaa haluttu vastaus virheellisistä tunnuksista. Epäonnistunut kirjautuminen ei mahdollista tulosten tarkastelua. ---> Testi: [UTC_InvalidLogin_Server.robot](UTC_InvalidLogin_Server.robot) (Käyttötapaukset UTC_1 ja UTC_2) (tehty 29.04.2025)

#### Mittaukset

Renovo sovellukselle tehdään testejä, jossa tarkastellaan käyttäjän mittaustuloksia. Mikäli käyttäjää ei vielä löydy sovelluksesta, hänet luodaan kirjautumisen ohessa.

- Onnistunut kirjautuminen (ja mahdollisesti rekistöröityminen) käyttöliittymän puolella, jonka jälkeen pyydetään tuloksia 30 päivältä (viimeisten 10:n päivän tulokset näytetään automaattisesti oikealla sivulla) ja kirjaudutaan ulos. ---> Testi: [UTC_HRVMeasurements_GUI.robot](UTC_HRVMeasurements_GUI.robot) ---> (Käyttötapaukset UTC_1, UTC_2, UTC_3, UTC_9 ja UTC_10) (tehty 29.04.2025)

- Onnistunut kirjautuminen (ja mahdollisesti rekistöröityminen) taustapalvelimen puolella, jonka jälkeen pyydetään tulokset viimeiseltä 10 ja 30 päivältä. ---> Testi: [UTC_HRVMeasurements_Server.robot](UTC_HRVMeasurements_Server.robot) ---> (Käyttötapaukset UTC_1, UTC_2 ja UTC_3) (tehty 29.04.2025)

- Luvaton pyyntö mittaustuloksien tuloksesta taustapalvelimen puolella. Testistä jätetään sisäänkirjautuminen pois kokonaan. Pyynnön tulee palauttaa viesti pyynnön luvattomuudesta. Testiä ei suoriteta käyttöliittymän puolella, sillä pyyntöä ei kykene suorittamaan UI:n kautta ilman sisäänkirjautumista. ---> Testi: [UTC_HRV_failed_Server.robot](UTC_HRV_failed_Server.robot) (Käyttötapaus UTC_3) (tehty 29.04.2025)

#### Kalenteri

- Kalenterimerkintöjen syöttäminen kalenteriin onnistuneen sisäänkirjautumisen jälkeen käyttöliittymässä. Merkintöjen syöttämisen jälkeen sovelluksesta kirjaudutaan ulos. [UTC_PostToCalendar_GUI.robot](UTC_PostToCalendar_GUI.robot) (Käyttötapaus UTC_1, UTC_2, UTC_4, UTC_5, UTC_6, UTC_7 ja UTC_10) (tehty 30.04.2025)

- Kalenterimerkintöjen syöttäminen kalenteriin onnistuneen sisäänkirjautumisen jälkeen taustapalvelimessa. (Käyttötapaus UTC_1, UTC_2, UTC_4, UTC_5, UTC_6, UTC_7)

- Virheellinen kalenterimerkintöjen syöttäminen kalenteriin onnistuneen sisäänkirjautumisen jälkeen käyttöliittymässä. (Käyttötapaus UTC_1, UTC_2, UTC_4, UTC_5, UTC_6, UTC_7 ja UTC_10)

- Virheellinen kalenterimerkintöjen syöttäminen kalenteriin onnistuneen sisäänkirjautumisen jälkeen taustapalvelimessa. (Käyttötapaus UTC_1, UTC_2, UTC_4, UTC_5, UTC_6, UTC_7)

#### Testien suoritus:
- 1. Taustapalvelin ja selain päälle `npm run dev`- komennolla.
- 2. `source tests/.venv/Scripts/activate` -komennolla virtuaaliympäristö päälle.
- 3. `robot --outputdir outputs tests/<testin_nimi>`> -komennolla suoritettiin ohjelmistotestit ja ohjattiin tulokset outputs-kansioon.

## Lokit, tulostukset ja raportit

#### Lokit ---> [log.html](../outputs/log.html)
#### Raportit ---> [report.html](../outputs/report.html)
#### Tulostukset ---> [output.xml](../outputs/output.xml)


