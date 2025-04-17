*** Settings ***
Documentation     Sisäänkirjautuminen, onnistunut
Library           Browser    auto_closing_level=KEEP
Library     CryptoLibrary     variable_decryption=True

*** Variables ***

${Username}    crypt:p7Wl4yv6DONY7nHE9vU9aSGZJUupaJqnwdbDOc/icmt9qrhPnEW7U3EURlLJfXBI/7wbPk+mSsxIxZ81qh//b8KOGhQ=
${Password}    crypt:SNsMiRq3+ZXKvNZV1JauH1zZ7iBOJagqrf8/QS7xJG/mwcsXtlXTuwn/09aY6q1uIm43m+6h5YOMXcQ=

*** Test Cases ***
Login Test
    [Documentation]    Sisäänkirjautumistesti
    New Browser    chromium    headless=No

    New Page       http://localhost:5173
    Get Title      ==    Kirjautumissivu
    Type Text      //input[@id='username']        ${Username}    delay=0.1 s
    Type Secret    //input[@id='password']    $Password      delay=0.1 s
    Click With Options    xpath=//button[@type='submit' and text()='Kirjaudu sisään']    delay=2 s

    Wait For Condition    Text    Title   contains    Renovo App
