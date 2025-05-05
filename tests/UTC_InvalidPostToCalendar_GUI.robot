*** Settings ***
Documentation     Epäonnistunut työvuoro, -liikunta, -sairaus ja poikkeusmerkintöjen syöttäminen
Library           Browser    auto_closing_level=KEEP
Library     CryptoLibrary     variable_decryption=True

*** Variables ***

${Username}    crypt:Rjv8RYjWPp72oh1mY1wAE/5lzYGPwGmMA+Av09jQ1gfGEA6wffCSNA8Fcr0LmquPMVaTP6ePNW2PDgkWJZu5Zmt3loU=
${Password}    crypt:oDNjvOw2FZFOo8kcHVJzgdRa4z2uT3QNjHzM/+eUXHladU7DzzwgNCpRMdP+ZQqe9ubpacwAg0Vpc0M=

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
    Type Text      //input[@name='start_2']        08:00    delay=0.1 s
    Type Text      //input[@name='end_2']        16:00    delay=0.1 s

    #Press X to Cancel
    Click With Options    //span[@id='shiftCloseX']

    #Click Exercise Modal Open
    Click With Options    xpath=//button[@id='openExerciseModal' and text()='Lisää liikunta']    delay=0.5 s

    #Input exercise data
    Type Text      //input[@name='exercise_date']        30.04.2025    delay=0.1 s
    Type Text      //input[@name='exercise_type']        Jooga    delay=0.1 s
    Type Text      //input[@id='exercise_start_time']        1330    delay=0.1 s
    Type Text      //input[@id='exercise_end_time']        1430    delay=0.1 s
    Click With Options    //label[@for='exercise-low']
    Type Text      //textarea[@id='exerciseTextArea']        OhjelmistotestiGUI    delay=0.1 s

    #Press X to Cancel
    Click With Options    //span[@id='exerciseCloseX']

    #Click Sickness Modal Open
    Click With Options    xpath=//button[@id='openSicknessModal' and text()='Lisää sairastuminen']    delay=1 s

    #Input sickness data
    Type Text      //input[@name='sickness_date']        29.04.2025    delay=0.1 s
    Type Text      //input[@id='sick_description']        Migreeni    delay=0.1 s
    Click With Options    //label[@for='sickness-medium']
    Type Text      //textarea[@id='sicknessTextArea']        OhjelmistotestiGUI    delay=0.1 s

    #Press X to Cancel
    Click With Options    //span[@id='sicknessCloseX']

    #Click Others Modal Open
    Click With Options    xpath=//button[@id='openOthersModal' and text()='Muut tapahtumat']    delay=1 s

    #Input others data
    Type Text      //input[@name='others_date']        28.04.2025    delay=0.1 s
    Type Text      //input[@id='other_description']        Migreeni    delay=0.1 s
    Click With Options    //label[@for='others-high']
    Type Text      //textarea[@id='othersTextArea']        OhjelmistotestiGUI    delay=0.1 s

    #Press X to Cancel
    Click With Options    //span[@id='othersCloseX']

    Click With Options    xpath=//button[@id='log-out-user' and text()='Kirjaudu ulos']    delay=2 s

    Wait For Condition    Text    Title   contains    Kirjautumissivu
