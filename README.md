[![Build Status](https://travis-ci.com/Latwe-Zdanko/IO2020.svg?branch=develop)](https://travis-ci.com/Latwe-Zdanko/IO2020)
# IO2020
Demo: https://lz-model-testing.herokuapp.com/
## Wymagania:
* MongoDb instalacja [standardowa](https://docs.mongodb.com/manual/installation/) lub z wykorzystaniem dockera: `sudo docker run -d -p 27017:27017  mongo`
* Java 13 [Windows](https://java.tutorials24x7.com/blog/how-to-install-java-13-on-windows) [Linux](https://www.linuxuprising.com/2019/09/install-oracle-java-13-on-ubuntu-linux.html)
* [Node.js](https://nodejs.org/en/download/)

## Uruchomienie lokalne aplikacji: 
* Pobranie aplikacji: `git clone https://github.com/Latwe-Zdanko/IO2020`
* wejście do folderu: `cd IO2020`
### Server
* serwer mongodb powinien być uruchomiony
* włączenie serwera aplikacji: `./gradlew bootRun`
### Frontend
* wejście do folderu: `cd front`
* instalacja zależności: `npm install`
* włączenie aplikacji: `npm start`, aplikacja powinna się otworzyć w przeglądarce pod pod adresem `localhost:3000`

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
