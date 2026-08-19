# Migrering: isVisible-kolonne på presentations

Dato: 2026-08-19

Legger til et `isVisible`-felt på presentasjoner. Når det er `FALSE` skal
presentasjonen ikke vises i listen under `/presentasjoner` (uansett om
«Vis utkast» er valgt), men den kan fortsatt åpnes via direkte URL.

Kjøres manuelt mot Syntakserror-databasen (`syntakserror` på
`syntakserror-mysql`).

## SQL

```sql
-- Ny kolonne, nye presentasjoner starter skjult
ALTER TABLE presentations ADD COLUMN isVisible BOOLEAN NOT NULL DEFAULT FALSE;

-- Eksisterende presentasjoner forblir synlige
UPDATE presentations SET isVisible = TRUE;
```

## Sjekk ApiRoutes i SequelAPI admin-UI

- Hvis liste-endepunktet (`/sequel-api/api-route/presentations`) bruker
  `SELECT *`, flyter `isVisible` automatisk med i responsen — ingen endring
  nødvendig.
- Hvis kolonnene er eksplisitt listet i SQL-en, legg til `isVisible` i
  SELECT-listen.
- Hvis det finnes et lagre-/oppdaterings-endepunkt for presentasjoner, legg
  til `isVisible` der også, slik at synlighet kan slås av/på per presentasjon.

## Frontend

Frontenden (commit-klar i dette repoet) filtrerer på feltet i
`src/routes/presentasjoner/+page.svelte` og typen er utvidet i
`src/lib/types/Presentation.ts`. Frem til SQL-en over er kjørt og feltet
returneres fra API-et, vil listen på `/presentasjoner` være tom.
