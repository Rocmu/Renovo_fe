*** Settings ***
Documentation     Sisäänkirjautuminen huonoilla tunnuksilla käyttöliittymässä.
Library           Browser    auto_closing_level=KEEP
Library     CryptoLibrary     variable_decryption=True

Variables         login_env.py

*** Test Cases ***
Login Test
    [Documentation]    Sisäänkirjautumistesti
    New Browser    chromium    headless=No

    New Page       http://localhost:5173
    Get Title      ==    Kirjautumissivu
    Type Text      //input[@id='username']        ${BAD_USERNAME}    delay=0.1 s
    Type Secret    //input[@id='password']    $BAD_PASSWORD      delay=0.1 s
    Click With Options    xpath=//button[@type='submit' and text()='Kirjaudu sisään']    delay=2 s

    Wait For Condition    Text    //p[@id='login-valid-confirm']   contains    Sisäänkirjautuminen epäonnistui. Väärä käyttäjänimi/salasana.
