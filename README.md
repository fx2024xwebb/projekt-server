## Projekt webbplats

Det här är en webbplats skapad som en del av ett projekt.<br>
Webbplatsen är för ett fiktivt Coffee House.<br>
Det här projektet hanterar server-sidan av webbplatsen.
<br>
Här hanteras:
- Kommunikation med databasen samt CRUD-operationer.
- Inloggning och autentisering av administratörskonto.

### Användning

Inloggning <br>
- POST (/login): Hanterar inloggning, kontroll av namn/lösenord.
- GET (/admin): Hanterar autentisering vid inloggning.

Meny/produkter
- GET (/products): Läser in menyn med produkter.
- POST (/products): Lägger till en ny produkt.
- PUT (/products/:id): Uppdaterar ett befintligt inlägg.
- DELETE (/products/:id): Raderar ett befintligt inlägg.

