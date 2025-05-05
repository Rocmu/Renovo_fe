*** Settings ***
Documentation     Epäonnistunut sisäänkirjautuminen ja epäonnistunut kalenterimerkintöjen syöttö taustapalvelimessa.
Library    Collections
Library    RequestsLibrary
Library     CryptoLibrary     variable_decryption=True

Suite Setup    Authenticate as Regular

*** Variables ***

${Username}    crypt:Rjv8RYjWPp72oh1mY1wAE/5lzYGPwGmMA+Av09jQ1gfGEA6wffCSNA8Fcr0LmquPMVaTP6ePNW2PDgkWJZu5Zmt3loU=
${Password}    crypt:oDNjvOw2FZFOo8kcHVJzgdRa4z2uT3QNjHzM/+eUXHladU7DzzwgNCpRMdP+ZQqe9ubpacwAg0Vpc0M=

*** Keywords ***
Authenticate as Regular

    ${body}    Create Dictionary    username=${Username}    password=${Password}
    ${response}    POST    url=http://127.0.0.1:3000/api/auth/kubios-login    json=${body}

    Should Contain    ${response.json()}[message]    Logged in successfully with Kubios
    Dictionary Should Contain Key    ${response.json()}  user

    ${token}    Set Variable    ${response.json()}[token]
    ${user_id}    Set Variable    ${response.json()}[user_id]

    Set Suite Variable    ${token}
    Set Suite Variable    ${user_id}

*** Test Cases ***

Fail to Post Shift

    ${header}    Create Dictionary    Authorization=Bearer ${token}
    ${body}    Create Dictionary    user_id=${user_id}    start_date=    start_time=08:00    end_time=16:00    end_date=2025-05-11
    ${response}    POST    http://localhost:3000/api/shifts/   headers=${header}   json=${body}    expected_status=400
    Should Contain    ${response.json()}[message]    Bad Request
    Dictionary Should Contain Key    ${response.json()}  errors

Fail to Post Exercise

    ${header}    Create Dictionary    Authorization=Bearer ${token}
    ${body}    Create Dictionary    user_id=${user_id}    exercise_date=    exercise_type=Lenkki    start_time=18:00    end_time=19:00    level=Medium    notes=OhjelmistotestiServer
    ${response}    POST    http://localhost:3000/api/exercise   headers=${header}   json=${body}    expected_status=400
    Should Contain    ${response.json()}[message]    Bad Request
    Dictionary Should Contain Key    ${response.json()}  errors

Fail to Post Sickness

    ${header}    Create Dictionary    Authorization=Bearer ${token}
    ${body}    Create Dictionary    user_id=${user_id}    sickness_date=    description=Päänsärky    impact=Low    notes=OhjelmistotestiServer
    ${response}    POST    http://localhost:3000/api/sickness   headers=${header}   json=${body}    expected_status=400
    Should Contain    ${response.json()}[message]    Bad Request
    Dictionary Should Contain Key    ${response.json()}  errors

Fail to Post Others

    ${header}    Create Dictionary    Authorization=Bearer ${token}
    ${body}    Create Dictionary    user_id=${user_id}    others_date=    description=Häät    intensity=High    notes=OhjelmistotestiServer
    ${response}    POST    http://localhost:3000/api/others   headers=${header}   json=${body}    expected_status=400
    Should Contain    ${response.json()}[message]    Bad Request
    Dictionary Should Contain Key    ${response.json()}  errors
