*** Settings ***
Library    Collections
Library    RequestsLibrary
Resource    login.robot

*** Test Cases ***

Login as Regular

    ${body}    Create Dictionary    username=${Username}    password=${Password}
    ${response}    POST    url=http://127.0.0.1:3000/api/auth/kubios-login    json=${body}
    #Log To Console   ${response.json()}

    Should Contain    ${response.json()}[message]    Logged in successfully with Kubios
    Dictionary Should Contain Key    ${response.json()}  user

    ${token}    Set Variable    ${response.json()}[token]
    ${user_id}    Set Variable    ${response.json()}[user_id]
    Log To Console   ${response.json()}[message]
    Set Suite Variable    ${token}
    Set Suite Variable    ${user_id}
