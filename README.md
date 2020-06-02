[![Build Status](https://travis-ci.com/Latwe-Zdanko/IO2020.svg?branch=develop)](https://travis-ci.com/Latwe-Zdanko/IO2020)
# IO2020
Demo: https://lz-model-testing.herokuapp.com/
## Wymagania:
* [MongoDb](https://docs.mongodb.com/manual/installation/)
* Java 13
* Node.js
* (Opcjonalnie) wtyczka `Lombok` do IntelliJ [link](https://plugins.jetbrains.com/plugin/6317-lombok) 

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
### Serwer (potrzebuje go tylko chat):
* `cd front/src/server`
* `node Server.js`

Frontend jest dostępny pod adresem: `localhost:3000`

## Przeglądanie bazy danych
Dobrym narzędziem jest Robo 3T: [link](https://robomongo.org/download)

## Jak przebiega deploy na heroku
### Jak zostały stworzone aplikacje na heroku
* Backend (Spring boot + mongo)
    * `heroku create lz-model-testing-api` - stworzenie aplikacji serwującej restowe api
    * `heroku addons:create mongolab` - dodanie serwisu bazodanowego do aplikacji
    * utworzenie i uzupełnienie pliku [Procfile](Procfile) 
* Frontend (React) -  postępowane zgodnie z [instrukcją](https://github.com/mars/heroku-cra-node) 
    * `heroku create lz-model-testing`
    * konfiguracja [pliku package.json](package.json)
    * utworzenie i uzupełnienie pliku [Procfile](front/Procfile)
* dodanie obsługi wielu plików Procfile: [heroku-buildpack-multi-procfile](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-multi-procfile)
    * `heroku buildpacks:add -a lz-model-testing-api https://github.com/heroku/heroku-buildpack-multi-procfile`
    * `heroku buildpacks:add -a lz-model-testing https://github.com/heroku/heroku-buildpack-multi-procfile`
    * `heroku config:set -a lz-model-testing-api PROCFILE=Procfile`
    * `heroku config:set -a lz-model-testing-api PROCFILE=front/Procfile`
   
### Deploy ręczny
 [Instrukcja](https://devcenter.heroku.com/articles/git#for-an-existing-heroku-app)
 
### Deploy automatyczny
~~Z każdym buildem na [travisie](https://travis-ci.com/github/Latwe-Zdanko/IO2020) następuje build obu aplikacji
(frontend i backend) zgodnie z [konfiguracją](.travis.yml).~~
Nie ma
