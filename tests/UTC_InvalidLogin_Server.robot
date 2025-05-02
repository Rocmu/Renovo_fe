*** Settings ***
Documentation     Sisäänkirjautuminen huonoilla tunnuksilla taustapalvelimessa.
Library    Collections
Library    RequestsLibrary
Variables  load_env.py

*** Test Cases ***

Login as Regular

    ${body}    Create Dictionary    username=${BAD_USERNAME}    password=$BAD_PASSWORD
    ${response}    POST    url=http://127.0.0.1:3000/api/auth/kubios-login    json=${body}    expected_status=401

    Should Contain    ${response.json()}[message]    Login with Kubios failed due bad username/password
