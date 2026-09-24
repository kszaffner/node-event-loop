---
description: Uruchamia wybrany scenariusz event loop / thread pool i tłumaczy log wykonania
---

Uruchom scenariusz podany w argumencie (`$ARGUMENTS`) poleceniem `node`. Jeśli argument jest pusty, zapytaj użytkownika który scenariusz uruchomić (na razie brak zaimplementowanych scenariuszy — poinformuj o tym).

Po uruchomieniu:
1. Pokaż surowy output logów.
2. Krótko wyjaśnij kolejność wykonania w odniesieniu do faz event loopa (microtasks, timers, I/O callbacks, check, close callbacks, thread pool) — tylko na podstawie tego co faktycznie pojawiło się w logu, nie zgaduj.
3. Nie modyfikuj kodu scenariusza w ramach tej komendy — to komenda do obserwacji, nie do developmentu.
