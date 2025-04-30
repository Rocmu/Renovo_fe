*** Settings ***
Documentation     Onnistunut sisäänkirjautuminen ja HRV mittaustulosten pyyntö taustapalvelimessa.
Library    Collections
Library    RequestsLibrary
Library     CryptoLibrary     variable_decryption=True

*** Variables ***

${Username}    crypt:p7Wl4yv6DONY7nHE9vU9aSGZJUupaJqnwdbDOc/icmt9qrhPnEW7U3EURlLJfXBI/7wbPk+mSsxIxZ81qh//b8KOGhQ=
${Password}    crypt:SNsMiRq3+ZXKvNZV1JauH1zZ7iBOJagqrf8/QS7xJG/mwcsXtlXTuwn/09aY6q1uIm43m+6h5YOMXcQ=

*** Test Cases ***
Login to Server

    ${body}    Create Dictionary    username=${Username}    password=${Password}
    ${response}    POST    url=http://127.0.0.1:3000/api/auth/kubios-login    json=${body}

    Should Contain    ${response.json()}[message]    Logged in successfully with Kubios
    Dictionary Should Contain Key    ${response.json()}  user
