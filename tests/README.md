# Ohjelmistotestit

## Sisäänkirjautuminen

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
