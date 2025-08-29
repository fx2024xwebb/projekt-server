## Projekt webbplats

Det här är en webbplats skapad som en del av ett projekt.<br>
Det här är server-delen av projektet.<br>

Här hanteras bl.a. kommunikation med databasen, autentisering och inloggning,<br>
samt interaktion med databasen via CRUD-operationer.

### Användning

Inloggning <br>
- POST (/login): Hanterar inloggning, kontroll av namn/lösenord.
- GET (/admin): Hanterar autentisering vid inloggning.

Meny/produkter
- GET (/products): Läser in menyn med produkter.
- POST (/products): Lägger till en ny produkt.
- PUT (/products/:id): Uppdaterar ett befintligt inlägg.
- DELETE (/products/:id): Raderar ett befintligt inlägg.

