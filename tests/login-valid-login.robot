*** Settings ***
Documentation     Sisäänkirjautuminen .env- tiedoston avulla, onnistunut
Library           Browser    auto_closing_level=KEEP
Variables         login_env.py

*** Test Cases ***
Login Test
    [Documentation]    Sisäänkirjautumistesti
    New Browser    chromium    headless=No

    New Page       http://localhost:5173
    Get Title      ==    Kirjautumissivu
    Type Text      //input[@id='username']        ${MY_USERNAME}    delay=0.1 s
    Type Secret    //input[@id='password']    $MY_PASSWORD      delay=0.1 s
    Click With Options    xpath=//button[@type='submit' and text()='Kirjaudu sisään']    delay=2 s

    Wait For Condition    Text    Title   contains    Renovo App
