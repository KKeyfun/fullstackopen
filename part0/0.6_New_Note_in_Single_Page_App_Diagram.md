```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: User fills input field and hits the save button
    browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note over server: Server creates new note and pushes to notes
    server-->>browser: HTTP status 201 Created
    Note over browser: Browser renders note
```