<script lang="ts">
    import Markdown from "$components/Markdown.svelte";

    let content = `### Om Syntakserror

**Velkommen til Syntakserror – en blogg dedikert til kunsten og vitenskapen bak koding, teknologi, skaperverksted og kunstig "intelligens".**

Mitt navn er Joachim Haagen Skeie, og jeg er lidenskapelig opptatt av alt som har med programmering, programvareutvikling, skaperverksted og de uendelige mulighetene innenor kunstig intelligens. Denne bloggen er mitt personlige lerret hvor jeg deler mine uhildede meninger, betraktninger og erfaringer fra den stadig utviklende teknologiverdenen.

**Hvorfor "Syntakserror"?**

Navnet "Syntakserror" er et nikk til en av de mest universelle opplevelsene for enhver utvikler – den frustrerende, men likevel lærerike, prosessen med å finne og rette feil i koden. Det representerer ideen om at veien til elegant og funksjonell kode sjelden er en rett linje. Den er fylt med prøving, feiling og de små "aha"-øyeblikkene som driver oss fremover. Det er i disse øyeblikkene av feilsøking og problemløsning at den virkelige læringen skjer.

Det er her mitt favoritt sitat hører hjemme:

<div class="sitat">Veien til Helvete er brolagt med de beste intensjoner! <div class="sitat-referanse">Bernhard av Clairvaux</div></div>

Sitatet passer i så alt for mange sammenhenger, og når du lurer på hvorfor ditt favoritt rammeverk ikke lenger føles så agilt, eller hvordan en kodebase har blitt til spaghetti, så er svaret som regel at intensjonen opprinnelig var svært så god - og etterpå har hverdagen gått sin gang!

**Hva kan du forvente å finne her?**

På Syntakserror vil jeg dykke ned i en rekke temaer, inkludert:

*   **Dypdykk i teknologi jeg synes er interessant:** Fra frontend til backend, databaser, og andre relevante teknologier.
*   **Praktisk programmering:** Tips, triks og guider som kan hjelpe deg med å skrive renere, mer effektiv og vedlikeholdbar kode.
*   **Tanker om teknologi:** Refleksjoner rundt de nyeste trendene innen programvareutvikling, kunstig intelligens og hvordan teknologi former fremtiden vår.
*   **Personlige prosjekter:** Innblikk i mine egne prosjekter, utfordringer jeg møter og løsningene jeg kommer frem til.
*   **Skaperverkstedet Skaperiet:** Jeg driver et et fritidstilbud for barn gjennom skaperverkstedet til Skaperiet. Her utvikler jeg både programmeringsløsninger for barn, kretskort for å forenkle elektronikken, samt robotsett osv. Her vil jeg dele om prosjektene som får verkstedet til å fungere!

Målet med denne bloggen er å skape et rom for nysgjerrighet, læring og diskusjon. Enten du er en erfaren utvikler, en student som nettopp har startet, eller bare nysgjerrig på teknologi, håper jeg du vil finne noe av verdi her.

Takk for at du leser!

**Joachim Haagen Skeie**`
</script>

{#if content}
    <div class="container page-content">
        <Markdown toHtml={content}></Markdown>
    </div>
{/if}

<style>

</style>