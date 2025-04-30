*** Settings ***
Documentation     Onnistunut työvuoro, -liikunta, -sairaus ja poikkeusmerkintöjen syöttäminen
Library           Browser    auto_closing_level=KEEP
Library     CryptoLibrary     variable_decryption=True

*** Variables ***

${Username}    crypt:p7Wl4yv6DONY7nHE9vU9aSGZJUupaJqnwdbDOc/icmt9qrhPnEW7U3EURlLJfXBI/7wbPk+mSsxIxZ81qh//b8KOGhQ=
${Password}    crypt:SNsMiRq3+ZXKvNZV1JauH1zZ7iBOJagqrf8/QS7xJG/mwcsXtlXTuwn/09aY6q1uIm43m+6h5YOMXcQ=

*** Test Cases ***
Post a new Shift, Exercise, Sickness and Others entry
    [Documentation]    Sisäänkirjautuminen, mittaustulosten pyyntö ja uloskirjautuminen.
    New Browser    chromium    headless=No

    New Page       http://localhost:5173
    Get Title      ==    Kirjautumissivu
    Type Text      //input[@id='username']        ${Username}    delay=0.1 s
    Type Secret    //input[@id='password']    $Password      delay=0.1 s
    Click With Options    xpath=//button[@type='submit' and text()='Kirjaudu sisään']    delay=0.1 s

    Wait For Condition    Text    Title   contains    Renovo App

    Click With Options    xpath=(//a[@href='calendar.html' and text()='Kalenteri'])[1]    delay=0.1 s

    Click With Options    xpath=//button[@id='openShiftModal' and text()='Lisää työvuoroja']    delay=0.5 s

    Type Text      //input[@name='start_1']        08:00    delay=0.1 s
    Type Text      //input[@name='end_1']        16:00    delay=0.1 s

    ${submit_shift}=    Get Element    xpath=//form[@id='shiftForm']

    Mouse Move Relative To    ${submit_shift}
    Scroll To    ${submit_shift}    bottom    50%

    Keyboard Key    press    Enter


