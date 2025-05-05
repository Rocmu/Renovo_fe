*** Settings ***
Documentation     Onnistunut sisäänkirjautuminen ja HRV mittaustulosten pyyntö taustapalvelimessa.
Library    Collections
Library    RequestsLibrary
Library     CryptoLibrary     variable_decryption=True

*** Variables ***

${Username}    crypt:Rjv8RYjWPp72oh1mY1wAE/5lzYGPwGmMA+Av09jQ1gfGEA6wffCSNA8Fcr0LmquPMVaTP6ePNW2PDgkWJZu5Zmt3loU=
${Password}    crypt:oDNjvOw2FZFOo8kcHVJzgdRa4z2uT3QNjHzM/+eUXHladU7DzzwgNCpRMdP+ZQqe9ubpacwAg0Vpc0M=

*** Test Cases ***
Login to Server

    ${body}    Create Dictionary    username=${Username}    password=${Password}
    ${response}    POST    url=http://127.0.0.1:3000/api/auth/kubios-login    json=${body}

    Should Contain    ${response.json()}[message]    Logged in successfully with Kubios
    Dictionary Should Contain Key    ${response.json()}  user
