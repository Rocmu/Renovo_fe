# Ohjelmistotestit

Tässä dokumentissa on raportoitu projektiryhmän kevään 2025 suorittamat ohjelmistotestit. Ohessa lukijalle esitellään testausaikataulu, tiedostorakenne, viikoittaiset pakollliset ryhmätestit sekä Renovo sovelluksen käyttötapauksien mukaan rakennetut testit, joilla varmistetaan sovelluksen soveltuvuuden sille asetettuihin vaatimuksiin.

Tämä dokumentaatio löytyy myös projektin Github.io sivulta ---> [Linkki Github.io](https://nappulat.github.io/FeTesting/)

## Aikataulu

- #### Viikko 1-3: Tutustuttu kurssimateriaaliin ja tehty projektin ohjelmistotestaukseen valmistavia yksilötehtäviä.

- #### Viikko 4: Palautettu projektin repositiori opettajalle ja suoritettu ensimmäinen (tahalleen) epäonnistunut sisäänkirjautumistesti [Testi](login-server-test.robot)

- #### Viikko 5: Tehty projektille sisäänkirjautumistesti. Testattu sisäänkirjautumista sekä onnistuneesti (toimiva tunnus ja salasana) ja niin, että sisäänkirjautuminen epäonnistuu (väärä tunnus ja/tai salasana) Testi 1 [Sisäänkirjautuminen (invalid)](login-invalid-login.robot) Testi 2 [Sisäänkirjautuminen (valid)](login-valid-login.robot)

- #### Viikko 6: Projektin ensimmäiset taustapalvelimen testit [Taustapalvelin-vuorot-haku-syöttö](server-test.robot)

- #### Viikko 7: [Github.io](https://nappulat.github.io/FeTesting/)

- #### Viikko 7-8: Käyttötapaukset ja niihin perustuvat testit. [Dokumentaatio](#testit)

## Rakenne

Projektin testitiedostojen rakenne.

```
Renovo_fe/
├── tests/
│   └── asennustesti.py
│   └── login-invalid-login.robot
│   └── login-server-test.robot
│   └── login-valid-login.robot
│   └── server-test.robot
│   └── UTC_DeleteFromCalendar_Server.robot
│   └── UTC_HRV_failed_Server.robot
│   └── UTC_HRVMeasurements_GUI.robot
│   └── UTC_HRVMeasurements_Server.robot
│   └── UTC_InvalidDeleteFromCalendar_Server.robot
│   └── UTC_InvalidLogin_GUI.robot
│   └── UTC_InvalidLogin_Server.robot
│   └── UTC_InvalidPostToCalendar_GUI.robot
│   └── UTC_InvalidPostToCalendar_Server.robot
│   └── UTC_PostToCalendar_GUI.robot
│   └── UTC_PostToCalendar_Server.robot
│   └── UTC_ValidLogin_Server.robot
│   └── requirements.txt
│   └── README.md
└── outputs/
│   └── log.html
│   └── output.xml
│   └── report.html
│   └── README.md
```

## Sisäänkirjautuminen (Päivitetty 2.5.2025, päivitetty resurssitiedoston nimi)

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

## Sisäänkirjautuminen (viikko 5) (Päivitetty 2.5.2025 päivitetty resurssitiedoston nimi ja tunnarit)

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

## Taustapalvelimen testaus (viikko 6) (Päivitetty 2.5.2025 päivitetty tunnarit)

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

## Käyttötapaukset ja niitä vastaavat testit (viikko 7 ja 8) (Päivitetty 2.5.2025)

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

Seuraavaksi esitellään luodut ohjelmistotestit. Huomioitavaa on, että käyttötapauksia ollaan testattu samoissa testeissä. Esimerkiksi kirjautuminen (ja mahdollisesti rekistöröinti) ovat pakollisia vaatimuksia muiden käyttötapausten testaamiseksi. Mikäli käyttötapausta ei voida testata tietyssä kohteessa (UI tai taustapalvelin), tästä myös mainitaan. Esimerkiksi uloskirjautuminen (UTC_10) testataan vain käyttöliittymän puolella ja liitetään mukaan suureen osaan muista testeistä. Samoin käyttöohjeet (UTC_9) ovat estusivulla, johon päädytään aina onnistuneen sisäänkirjautumisen jälkeen, joten sitä ei testata erikseen.

Sulkuihin on merkitty, mitkä käyttötapaukset testataan.

#### Kirjautuminen.

- Onnistunut kirjautuminen (ja mahdollisesti rekistöröityminen) käyttöliittymän puolella. Onnistunut kirjautuminen vie etusivulle, jossa näkyvät sovelluksen käyttöohjeet. ---> Testi: [login-valid-login.robot](login-valid-login.robot) (Käyttötapaukset UTC_1, UTC_2 ja UTC_9) (tehty 29.04.2025)

- Onnistunut kirjautuminen (ja mahdollisesti rekistöröityminen) taustapalvelimen puolella. ---> Testi: [UTC_ValidLogin_Server.robot](UTC_ValidLogin_Server.robot) (Käyttötapaukset UTC_1 ja UTC_2) (tehty 30.04.2025)

- Huonoilla käyttäjätunnuksilla kirjautuminen (ja mahdollisesti rekistöröityminen) käyttöliittymän puolella. Kirjautumisen tulee palauttaa haluttu vastaus virheellisistä tunnuksista. Epäonnistunut kirjautuminen ei mahdollista tulosten tarkastelua. ---> Testi: [UTC_InvalidLogin_GUI.robot](UTC_InvalidLogin_GUI.robot) (Käyttötapaukset UTC_1 ja UTC_2) (tehty 29.04.2025)

- Huonoilla käyttäjätunnuksilla (ja mahdollisesti rekistöröityminen) taustapalvelimen puolella. Kirjautumisen tulee palauttaa haluttu vastaus virheellisistä tunnuksista. Epäonnistunut kirjautuminen ei mahdollista tulosten tarkastelua. ---> Testi: [UTC_InvalidLogin_Server.robot](UTC_InvalidLogin_Server.robot) (Käyttötapaukset UTC_1 ja UTC_2) (tehty 29.04.2025)

#### Mittaukset

Renovo sovellukselle tehdään testejä, jossa tarkastellaan käyttäjän mittaustuloksia. Mikäli käyttäjää ei vielä löydy sovelluksesta, hänet luodaan kirjautumisen ohessa.

- Onnistunut kirjautuminen (ja mahdollisesti rekistöröityminen) käyttöliittymän puolella, jonka jälkeen pyydetään tuloksia 30 päivältä (viimeisten 10:n päivän tulokset näytetään automaattisesti oikealla sivulla) ja kirjaudutaan ulos. ---> Testi: [UTC_HRVMeasurements_GUI.robot](UTC_HRVMeasurements_GUI.robot) ---> (Käyttötapaukset UTC_1, UTC_2, UTC_3, UTC_9 ja UTC_10) (tehty 29.04.2025)

- Onnistunut kirjautuminen (ja mahdollisesti rekistöröityminen) taustapalvelimen puolella, jonka jälkeen pyydetään tulokset viimeiseltä 10 ja 30 päivältä. ---> Testi: [UTC_HRVMeasurements_Server.robot](UTC_HRVMeasurements_Server.robot) ---> (Käyttötapaukset UTC_1, UTC_2 ja UTC_3) (tehty 29.04.2025)

- Luvaton pyyntö mittaustuloksien tuloksesta taustapalvelimen puolella. Testistä jätetään sisäänkirjautuminen pois kokonaan. Pyynnön tulee palauttaa viesti pyynnön luvattomuudesta. Testiä ei suoriteta käyttöliittymän puolella, sillä pyyntöä ei kykene suorittamaan UI:n kautta ilman sisäänkirjautumista. ---> Testi: [UTC_HRV_failed_Server.robot](UTC_HRV_failed_Server.robot) (Käyttötapaus UTC_3) (tehty 29.04.2025)

#### Kalenteri, merkintöjen lisäys

- Kalenterimerkintöjen syöttäminen kalenteriin onnistuneen sisäänkirjautumisen jälkeen käyttöliittymässä. Merkintöjen syöttämisen jälkeen sovelluksesta kirjaudutaan ulos. [UTC_PostToCalendar_GUI.robot](UTC_PostToCalendar_GUI.robot) (Käyttötapaukset UTC_1, UTC_2, UTC_4, UTC_5, UTC_6, UTC_7, UTC_9 ja UTC_10) (tehty 30.04.2025)

- Kalenterimerkintöjen syöttäminen kalenteriin onnistuneen sisäänkirjautumisen jälkeen taustapalvelimessa [UTC_PostToCalendar_Server.robot](UTC_PostToCalendar_Server.robot) (Käyttötapaukset UTC_1, UTC_2, UTC_4, UTC_5, UTC_6, UTC_7) (tehty 02.05.2025)

- Kalenterimerkintöjen epäonnistunut syöttäminen kalenteriin onnistuneen sisäänkirjautumisen jälkeen käyttöliittymässä. Merkintöjen syöttöyrityksen jälkeen sovelluksesta kirjaudutaan ulos. Syöttökentässä on "required" HTML- koodissa, eikä pyyntö suostu lähtemään, mikäli kenttä on tyhjä.Siksi testissä painetaan "Tallenna" napin sijasta "Sulje" -nappia. [UTC_InvalidPostToCalendar_GUI.robot](UTC_InvalidPostToCalendar_GUI.robot) (Käyttötapaukset UTC_1, UTC_2, UTC_4, UTC_5, UTC_6, UTC_7 ja UTC_10) (tehty 2.5.2025)

- Virheellinen kalenterimerkintöjen syöttäminen kalenteriin onnistuneen sisäänkirjautumisen jälkeen taustapalvelimessa. [UTC_InvalidPostToCalendar_Server.robot](UTC_InvalidPostToCalendar_Server.robot)(Käyttötapaukset UTC_1, UTC_2, UTC_4, UTC_5, UTC_6, UTC_7) (tehty 2.5.2025)

#### Kalenteri, merkintöjen poistaminen

- Ei ehditty testata kalenterimerkintöjen poistoa käyttöliittymässä. (UTC_1, UTC_2, UTC_8, UTC_9 ja UTC_10)

- Kalenterimerkintöjen poistaminen onnistuneen sisäänkirjautumisen jälkeen taustapalvelimessa. [UTC_DeleteFromCalendar_Server.robot](UTC_DeleteFromCalendar_Server.robot) (UTC_1, UTC_2 ja UTC_8) (tehty 2.5.2025)

- Ei ehditty testata kalenterimerkintöjen epäonnistunutta poistoa käyttöliittymässä. (UTC_1, UTC_2, UTC_8, UTC_9 ja UTC_10)

- Kalenterimerkintöjen epäonnistunut poistaminen onnistuneen sisäänkirjautumisen jälkeen taustapalvelimessa. [UTC_InvalidDeleteFromCalendar_Server.robot](UTC_DeleteFromCalendar_Server.robot) (UTC_1, UTC_2 ja UTC_8)

#### Testien suoritus:
- 1. Taustapalvelin ja selain päälle `npm run dev`- komennolla.
- 2. `source tests/.venv/Scripts/activate` -komennolla virtuaaliympäristö päälle.
- 3. `robot --outputdir outputs tests/<testin_nimi>`> -komennolla suoritettiin ohjelmistotestit ja ohjattiin tulokset outputs-kansioon.
- 4. Lopuksi kaikki testit suoritettiin komennolla: `robot --outputdir outputs tests/login-invalid-login.robot tests/login-server-test.robot tests/login-valid-login.robot tests/UTC_ValidLogin_Server.robot tests/UTC_InvalidLogin_GUI.robot tests/UTC_InvalidLogin_Server.robot tests/UTC_HRVMeasurements_GUI.robot tests/UTC_HRVMeasurements_Server.robot tests/UTC_HRV_failed_Server.robot tests/UTC_PostToCalendar_GUI.robot tests/UTC_PostToCalendar_Server.robot tests/UTC_InvalidPostToCalendar_GUI.robot tests/UTC_InvalidPostToCalendar_Server.robot tests/UTC_DeleteFromCalendar_Server.robot tests/UTC_InvalidDeleteFromCalendar_Server.robot tests/server-test.robot`

## Yhteenveto, lokit, tulostukset ja raportit

Kaiken kaikkiaan 31 testiä, 29 onnistuu.

2 Epäonnistuvaa ovat ensimmäisiltä viikoilta 4 ([login-server-test.robot](login-server-test.robot)) ja 5 ([login-server-test.robot](login-server-test.robot)). Nämä on jätetty epäonnistuneiksi dokumentaatiota varten.

#### Lokit ---> [log.html](../outputs/log.html)
#### Raportit ---> [report.html](../outputs/report.html)
#### Tulostukset ---> [output.xml](../outputs/output.xml)
