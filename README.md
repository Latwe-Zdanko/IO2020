# IO2020
## Wymagania:
* [MongoDb](https://docs.mongodb.com/manual/installation/)
* Java 11
* Node.js
* (Opcjonalnie) wtyczka `Lombok` do InetlliJ [link](https://plugins.jetbrains.com/plugin/6317-lombok) 

## Uruchomienie servera: 
* Z konsoli:
    * `./gradlew bootRun`
* Z Intellij:
    * zakładka gradle po prawej stronie -> `Tasks -> application -> bootRun` 

Server jest dostępny pod adresem: `localhost:8080` (przykładowe zapytanie: `http://localhost:8080/users/all/`).

## Uruchomienie checkstyle:
* Zainstalować Gradle [link](https://gradle.org)
* W katalogu projektu: 'gradle check'

## Uruchomienie Reacta: 
### Instalacja:
* `cd front`
* `npm install`
### Uruchomienie:
* `npm start`

Frontend jest dostępny pod adresem: `localhost:3000`

## Przeglądanie bazy danych
Dobrym narzędziem jest Robo 3T: [link](https://robomongo.org/download)