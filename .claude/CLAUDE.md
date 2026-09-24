# node-event-loop

Projekt edukacyjny w Node.js pokazujący krok po kroku jak działa **event loop** i **thread pool** (libuv). Celem nie jest gotowa aplikacja produkcyjna, tylko zestaw uruchamialnych scenariuszy, które logują *kiedy* i *w jakiej fazie event loopa* wykonuje się dany kod.

## Status

Sekcje A (nextTick/promise), B (fazy event loopa), C (I/O przez OS) i D (thread pool) mają zaimplementowane scenariusze w `scenarios/`. Pełna lista zaplanowanych scenariuszy (w tym E — scenariusz łączony) ustalana jest w sesji planistycznej z użytkownikiem — nie zgaduj kolejnych scenariuszy bez ustalenia.

## Konwencja logowania

Format ustalony w `lib/logger.js`: `[+<ms>ms] [<PHASE>] <message>` — pozwala odpowiedzieć na trzy pytania: *co się wykonało*, *w jakiej fazie/kolejce event loopa*, *o której (względem startu skryptu)*. Nie wprowadzaj innego formatu bez ustalenia z użytkownikiem.

Etykiety faz (SYNC, NEXTTICK, MICROTASK, TIMERS, PENDING, POLL, CHECK, THREADPOOL, OS-IO, CLOSE, EXIT) to nasza dydaktyczna adnotacja oparta na udokumentowanym zachowaniu libuv/Node — Node nie eksponuje z poziomu JS informacji "w jakiej fazie właśnie jesteśmy". Nie twórz wrażenia, że logger to mierzy w runtime.

## Jak uruchamiać

`npm run scenario:NN` albo bezpośrednio `node scenarios/NN-nazwa.js`. Numeracja plików w `scenarios/` odpowiada kolejności sekcji planu (A/B/C/D/...).

## Zasady pracy w tym repo

- To jest projekt edukacyjny — priorytetem jest czytelność logów i kodu nad wydajnością czy abstrakcjami.
- Nie dodawaj frameworków (Express, Next.js itp.) — to demo ma pokazywać czysty Node.js runtime.
- Zmiany w architekturze/scenariuszach ustalamy w sesji planistycznej, nie implementujemy ad-hoc.
- **Komentarze i komunikaty w kodzie (logi, treść scenariuszy) piszemy po angielsku.** Rozmowa z użytkownikiem może być po polsku, ale kod ma być czytelny dla każdego.
