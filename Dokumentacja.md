# Play2Gether -- Aplikacja do uprawiania sportów grupowych
Play2Gether jest aplikacją, która pozwala tworzyć nowe wydarzenia sportowe oraz dołączać do aktualnie już istniejących. Poza tym umożliwia dodawanie nowych miejsc (boiska, hale) przez użytkowników, które muszą być później zaakceptowane przez administratora. 

## Instalacja
### Wymagane oprogramowanie
- Node.js (wersja >= 14.0.0),
- menadżer pakietów języka Javascript (npm (wersja >= 5.6) lub yarn,

### Uruchamianie
#### Wersja deweloperska
Aby uruchomić aplikację Play2Gether należy zainstalować wymagane oprogramowanie. Następnie wykonać poniższe kroki

```bash
# instalacja potrzebnych pakietów
$ npm install

# uruchomienie aplikacji
$ npm start
```

#### Wersja statyczna
Aby uruchomić wersję statyczną strony, na serwerze należy umieścić pliki znajdujące się w folderze `build/`.

## Konfiguracja
W pliku .env w katalogu źródłowym znajdują się zmienne konfiguracyjne aplikacji.

Należy zarejestrować się na mapbox API oraz umieścić swój token w zmiennej `REACT_APP_API_MAP_TOKEN=<twoj _token>`. 

Należy również umieścić informację na temat endpointu backendu w zmiennej (domyślnie ustawiony jest port 5000) `REACT_APP_API_ENDPOINT="http://localhost:5000"`

## Repozytorium na www.github.com
Aplikacja była rozwijana przy użyciu zdalnego repozytorium założonego na portalu github, poniżej znajduje się link do repozytorium.

https://github.com/bartoszpiech/play2gether
