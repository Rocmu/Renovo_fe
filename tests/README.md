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
