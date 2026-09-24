# node-event-loop

Projekt edukacyjny w Node.js pokazujący krok po kroku jak działa **event loop** i **thread pool** (libuv). Celem nie jest gotowa aplikacja produkcyjna, tylko zestaw uruchamialnych scenariuszy, które logują *kiedy* i *w jakiej fazie event loopa* wykonuje się dany kod.

## Status

Projekt jest w fazie planowania. Struktura aplikacji (foldery, scenariusze, format loggera) zostanie ustalona w osobnej sesji planistycznej — nie zgaduj architektury, dopóki nie powstanie plan.

## Konwencja logowania (do ustalenia w sesji planistycznej aplikacji)

Każdy log powinien pozwalać odpowiedzieć na trzy pytania: *co się wykonało*, *w jakiej fazie/kolejce event loopa*, *o której (względem startu skryptu)*. Dokładny format zostanie ustalony przy projektowaniu loggera — nie wprowadzaj własnego formatu bez ustalenia.

## Jak uruchamiać

Standardowo przez `node`. Konkretne komendy pojawią się tu, gdy powstaną pierwsze scenariusze (`npm run scenario:...` lub podobnie).

## Zasady pracy w tym repo

- To jest projekt edukacyjny — priorytetem jest czytelność logów i kodu nad wydajnością czy abstrakcjami.
- Nie dodawaj frameworków (Express, Next.js itp.) — to demo ma pokazywać czysty Node.js runtime.
- Zmiany w architekturze/scenariuszach ustalamy w sesji planistycznej, nie implementujemy ad-hoc.
