# Renovo_fe

Frontend of the health application project

## Kuvakaappaukset sovelluksen käyttöliittymästä

Kuvakaappaukset sovelluksen käyttöliittymästä desktop- ja mobiilinäkymässä.

### Desktop käyttöliittymä:

#### Sisäänkirjautuminen

![Login page](/public/img/ui_login.png)

#### Kotisivu

![Home page](/public/img/ui_home.png)

#### Kalenteri

![Home page](/public/img/ui_calendar.png)

#### Tulokset

![Results page](/public/img/ui_results.png)

#### Info

![Info page](/public/img/ui_info.png)

### Mobiili käyttöliittymä:

#### Sisäänkirjautuminen

![Mobile login page](/public/img/mobile_ui_login.png)

#### Kotisivu

![Mobiel home page](/public/img/mobile_ui_home.png)

#### Kalenteri

![Mobile home page](/public/img/mobile_ui_calendar.png)

#### Tulokset

![Mobile results page](/public/img/mobile_ui_results.png)

#### Info

![Mobile info page](/public/img/mobile_ui_info.png)

### Front-end - linkki julkaistuun sovellukseen

[Front-end](http://thehyte.northeurope.cloudapp.azure.com/)

### Back-end - linkki käytössä olevaan back-end-sovellukseen/APIin

[Back-end](https://github.com/Rocmu/Renovo_be)

### Rautalankamallit

Kuvat rautalankamalleista

#### Kotisivu

![Homepage wireframe](/public/img/wireframe_home.png)

#### Kalenteri

![Calendar wireframe](/public/img/wireframe_calendar.png)

#### Työvuoron merkitseminen

![Adding a shift wireframe](/public/img/wireframe_shift.png)

### Listaus ja kuvaus kaikista toiminnallisuuksista, mitä on toteutettu

#### Sisään kirjautuminen (TV_1).

  - Käyttäjä pystyy kirjautumaan sovellukseen kubioksen käyttäjätunnuksella ja salasanalla.

#### Käyttäjälle luodaan oma käyttäjätili (TV_30).

  - Ensimmäisen sisäänkirjautumisen yhteydessä käyttäjätili tallennetaan sovelluksen tietokantaan.

#### Sovelluksen välilehtien selaaminen navigaatiopalkissa.

  - Sovelluksen sisäinen navigointi on vaivatonta ja
    nopeaa, haluttu tieto tai toiminto löytyy nopeasti ja loogisesta paikasta.

#### Työvuorojen merkitseminen kalenteriin (TV_28, TV_29).

  - Käyttäjä pystyy tallentamaan työvuoronsa kalenteriin sekä tarvittaessa muokkaamaan ja poistamaan työvuoroja. Työvuorot merkataan halutulle päivälle valitsemalla alkamis- ja päättymisaika. Työvuorot näkyvät kalenterissa päiväkohtaisesti.

#### Liikunnan ja aktiivisuuden merkitseminen kalenteriin (TV_12).

  - Käyttäjä pystyy merkitsemään liikuntaan ja aktiivisuuteen liittyviä merkintöjä kalenteriin sekä muokkaamaan ja poistamaan suorituksia. Käyttäjä pystyy raportoimaan merkinnän yhteyteen arvion suorituksen kuormittavuudesta. Merkinnät ovat näkyvillä kalenterissa päiväkohtaisesti.

#### Sairaustapausten merkitseminen kalenteriin (TV_8, TV_9, TV_10, TV_11).

  - Käyttäjä pystyy tallentamaan sairaustapaukset kalenteriin sekä tarvittaessa muokkaamaan ja poistamaan sairaustapauksia. Käyttäjä pystyy myös kirjaamaan lisätietoa sairastumisesta vapaaseen tekstikenttään. Merkinnät ovat näkyvillä kalenterissa päiväkohtaisesti.

#### Muiden tapahtumien ja poikkeustapahtumien merkitseminen kalenteriin (TV_16, TV_17, TV_18, TV_19).

  - Käyttäjä pystyy lisäämään muita tapahtumia ja poikkeustapauksia kalenteriin sekä tarvittaessa muokkaamaan ja poistamaan tapahtumia. Käyttäjä pystyy antamaan lisätietoa merkinnän yhteydessä vapaaseen tekstikenttään sekä arvioimaan tapahtuman kuormitusta tarvittaessa. Merkinnät jäävät kalenteriin näkyviin päiväkohtaisesti.

#### HRV mittaustulosten tarkastelu 10 päivän ja 30 päivän jaksoissa

  - Käyttäjä näkee voi tarkastella mittaustuloksia tulokset-sivulla 10 ja 30 päivän jaksoissa.

#### Mittaustulosten raportointi visuaalisesti (TV_21).

  - Mittaustuloksisa luodaan käyttäjälle visuaaliset kaaviot.

#### Käyttäjän palaute (TV_26).

  - Käyttäjä pystyy antamaan palautetta mittaustuloksista, jos kokee etteivät tulokset vastaa tämän hetkistä terveydentilaa tai ovat virheellisiä.

#### Käyttäjälle tarjotaan tietoa HRV:stä (TV_27).

  - Käyttäjälle on sovelluksessa tarjolla tietoa sykevälivaihtelusta (HRV) sekä mittauksen suorittamisesta.

#### Uloskirjautuminen (TV_31).
  - Käyttäjä pystyy kirjautumaan ulos sovelluksesta. Käyttäjä myös kirjataan ulos automaattisesti tunnin inaktiivisuuden jälkeen.

### Tiedossa olevat bugit/ongelmat

  - Kalenterissa alle 7h yövuorot / vuorot jotka jatkuvat seuraavalle vuorokaudelle jäävät näkyviin "päivävuoroina". Näitä vuoroja ei pysty jälkeenpäin muokkaamaan tai poistamaan, koska vuorot eivät tallennu oikealla tavalla.
  - Yövuorot, joka jatkuu ma-su yön yli, jää kalenteriin näkyviin hassusti.
  - Liikunta-/aktiivisuusmerkintöjen muokkausmodaali ei tuo aloitus- ja lopetusaikoja.

### Referenssit, käytetyt tutoriaalit, grafiikkakirjastot, tms.

  - [Chart.js](https://www.chartjs.org/docs/latest/) tulosten graafista esitystä varten.
  - [FullCalendar](https://fullcalendar.io/) luodaan kalenteri ja sen toiminnallisuudet.
  - [W3Schools](https://www.w3schools.com/) apuna vähän kaikessa.

### Linkki ohjelmistotestauskansioon, mistä löytyvät testitapaukset ja -raportit

  - Testit --> [tests](tests)
  - Tulokset --> [tests](outputs)
  - [Taustapalvelintestin READ.me](tests/README.md)
  - [Linkki Githubio-sivulle](https://nappulat.github.io/FeTesting/)
