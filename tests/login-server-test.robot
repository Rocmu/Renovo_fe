*** Settings ***
Library    Collections
Library    RequestsLibrary
Variables  login_env.py

*** Test Cases ***

Login as Regular

    ${body}    Create Dictionary    username=${MY_USERNAME}    password=$MY_PASSWORD
    ${response}    POST    url=http://127.0.0.1:3000/api/auth/kubios-login    json=${body}

    Should Contain    ${response.json()}[message]    Logged in successfully with Kubios
    Dictionary Should Contain Key    ${response.json()}  user
