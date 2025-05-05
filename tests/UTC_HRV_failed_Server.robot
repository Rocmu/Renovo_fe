*** Settings ***
Documentation     Luvaton pyyntö HRV mittaustuloksista taustapalvelimessa.
Library    Collections
Library    RequestsLibrary

*** Test Cases ***
An Unauthorized Request For User's Results From Past Ten Days

    ${response}    GET    http://127.0.0.1:3000/api/kubios/user-data-ten    expected_status=401

An Unauthorized Request For User's Results From Past Thirty Days

    ${response}    GET    http://127.0.0.1:3000/api/kubios/user-data-thirty   expected_status=401
