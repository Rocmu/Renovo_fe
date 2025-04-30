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

    Wait For Load State    domcontentloaded    timeout=3s

    #Click Shift Modal Open
    Click With Options    xpath=//button[@id='openShiftModal' and text()='Lisää työvuoroja']    delay=1 s

    #Input shift data
    Type Text      //input[@name='start_1']        08:00    delay=0.1 s
    Type Text      //input[@name='end_1']        16:00    delay=0.1 s

    #Press Enter to send form
    Keyboard Key    press    Enter

    #Click Exercise Modal Open
    Click With Options    xpath=//button[@id='openExerciseModal' and text()='Lisää liikunta']    delay=0.5 s

    #Input exercise data
    Type Text      //input[@name='exercise_date']        30.04.2025    delay=0.1 s
    Type Text      //input[@name='exercise_type']        Jooga    delay=0.1 s
    Type Text      //input[@id='exercise_start_time']        1330    delay=0.1 s
    Type Text      //input[@id='exercise_end_time']        1430    delay=0.1 s
    Click With Options    //label[@for='exercise-low']
    Type Text      //textarea[@id='exerciseTextArea']        Ohjelmistotesti    delay=0.1 s
    Click With Options    //button[@id='saveMyExercise']

    #Click Sickness Modal Open
    Click With Options    xpath=//button[@id='openSicknessModal' and text()='Lisää sairastuminen']    delay=0.5 s

    #Input sickness data
    Type Text      //input[@name='sickness_date']        29.04.2025    delay=0.1 s
    Type Text      //input[@id='sick_description']        Migreeni    delay=0.1 s
    Click With Options    //label[@for='sickness-medium']
    Type Text      //textarea[@id='sicknessTextArea']        Ohjelmistotesti    delay=0.1 s
    Click With Options    //button[@id='saveMySickness']

    #Click Others Modal Open
    Click With Options    xpath=//button[@id='openOthersModal' and text()='Muut tapahtumat']    delay=0.5 s

    #Input others data
    Type Text      //input[@name='others_date']        28.04.2025    delay=0.1 s
    Type Text      //input[@id='other_description']        Migreeni    delay=0.1 s
    Click With Options    //label[@for='others-high']
    Type Text      //textarea[@id='othersTextArea']        Ohjelmistotesti    delay=0.1 s
    Click With Options    //button[@id='saveMyOthers']

    Click With Options    xpath=//button[@id='log-out-user' and text()='Kirjaudu ulos']    delay=2 s

    Wait For Condition    Text    Title   contains    Kirjautumissivu


