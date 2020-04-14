[![Build Status](https://travis-ci.com/Latwe-Zdanko/IO2020.svg?branch=develop)](https://travis-ci.com/Latwe-Zdanko/IO2020)
# IO2020
## Wymagania:
* [MongoDb](https://docs.mongodb.com/manual/installation/)
* Java 13
* Node.js
* (Opcjonalnie) wtyczka `Lombok` do InetlliJ [link](https://plugins.jetbrains.com/plugin/6317-lombok) 

## Uruchomienie servera: 
* Z konsoli:
    * `./gradlew bootRun`
* Z Intellij:
    * zakładka gradle po prawej stronie -> `Tasks -> application -> bootRun` 

Server jest dostępny pod adresem: `localhost:8080` (przykładowe zapytanie: `http://localhost:8080/users/all/`).

## Uruchomienie checkstyle:
* W katalogu projektu: `./gradlew check`

## Uruchomienie Reacta: 
### Instalacja:
* `cd front`
* `npm install`
### Uruchomienie:
* `npm start`

Frontend jest dostępny pod adresem: `localhost:3000`

## Przeglądanie bazy danych
Dobrym narzędziem jest Robo 3T: [link](https://robomongo.org/download)
