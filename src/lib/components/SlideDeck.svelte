<!-- src/lib/components/slides/SlideDeck.svelte -->
<script lang="ts">
    import Reveal from 'reveal.js';
    import 'reveal.js/dist/reveal.css';
    // Dynamic theme import logic would go here,
    // but for simplicity, we import the base and loading a theme css in <svelte:head> is better
    import 'reveal.js/plugin/highlight/monokai.css';

    import type {Presentation} from "$lib/types/Presentation";
    import RevealMarkdown from "reveal.js/plugin/markdown/markdown";
    import RevealHighlight from "reveal.js/plugin/highlight/highlight";
    import RevealNotes from "reveal.js/plugin/notes/notes";
    import {onMount} from "svelte";

    interface Props {
        presentation: Presentation;
    }

    let { presentation } = $props();
    let loaded = $state(false);
    let deck: Reveal.Api | null = $state(null);

    let themeUrl = $derived(`/reveal/theme/${presentation.theme || 'white'}.css`);

    $effect(() => {
        // Remove existing theme link
        const existingLink = document.querySelector('link[data-reveal-theme]');
        if (existingLink) {
            existingLink.remove();
        }

        // Add new theme link
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = themeUrl;
        link.setAttribute('data-reveal-theme', 'true');
        document.head.appendChild(link);
    });


    onMount(() => {
        loaded = true;
        setTimeout(() => {
            const deck = new Reveal({
                plugins: [RevealMarkdown, RevealHighlight, RevealNotes],
                autoAnimateEasing: 'ease',
                autoAnimateDuration: 1,
                hash: true,
                progress: true,
                slideNumber: true,
                embedded: true,
                width: 1100,

                // Factor of the display size that should remain empty around
                // the content
                margin: 0.04,

                // Bounds for smallest/largest possible scale to apply to content
                minScale: 0.2,
                maxScale: 2.0,

                // controls: false,
                // progress: false
            })

            deck.initialize()


        }, 150)

    });

    function scaleSlide() {
        const slides = document.querySelectorAll('.reveal .slides section');
        slides.forEach(slide => {
            const content = slide.querySelector(':scope > *');
            if (content) {
                const slideHeight = slide.clientHeight;
                const contentHeight = content.scrollHeight;
                if (contentHeight > slideHeight) {
                    const scale = slideHeight / contentHeight * 0.95;
                    content.style.transform = `scale(${scale})`;
                }
            }
        });
    }


</script>

<svelte:head>
    <link rel="stylesheet" href="/node_modules/reveal.js/dist/theme/{presentation.theme || 'white'}.css">
</svelte:head>

    <div class="reveal" id="revealDeck">
            <div class="slides">
                <!--
                    Data-markdown tells Reveal to parse the content.
                    The separators tell Reveal how to split slides:
                    ---  = Horizontal Slide
                    ---- = Vertical Slide
                 -->

                <section data-markdown data-background-image="{presentation.backgroundUrl}" data-background-size="contain">
                {#if loaded && presentation.content}
                    {presentation.content}
                {/if}
                </section>

            </div>
    </div>

<div class="reveal-footer">
    <img src={presentation.footerImageUrl} alt="Presentasjon footer bilde"/>
</div>


<style>
    /* ... footer styles ... */

    .reveal-footer {
        max-width: 100%;
        max-height: 200px;
        text-align: center;
    }

    .reveal-footer img {
        max-height: 200px !important;
        max-width: 1100px;
        margin-left: auto;
    }

    /* Standard visning (Embedded) */
    .reveal {
        width: 100%;
        max-width: 1100px;
        height: calc(100vh - 550px);
        background-position: 50% 50%;
        background-repeat: no-repeat;
        border: 1px solid #eee;
        font-size: 32px;
        margin: 2rem auto;
        padding: 0; /* Fjern padding her, Reveal håndterer 'margin' i config */
    }

    /* HÅNDTERING AV FULLSKJERM */
    /* Når nettleseren setter elementet i fullskjerm, nullstill begrensningene */
    .reveal:fullscreen {
        max-width: 100vw;
        width: 100vw;
        height: 100vh;
        margin: 0;
        border: none;
        padding: 0;
    }

    :global(.reveal h1) { font-size: 2em; }
    :global(.reveal h2) { font-size: 1.6em; }
    :global(.reveal h3) { font-size: 1.3em; }

    /* VIKTIG: Fjern denne! */
    /* .slides { width: 85% !important; } <--- Denne ødela layouten */

    /* Hvis du absolutt vil styre bredden på slides containeren,
       gjør det via Reveal config 'width' eller 'margin', ikke CSS. */

    :global(.reveal .slides img) {
        max-height: 700px !important;
        max-width: 100%; /* Sørg for at bilder ikke stikker utenfor */
    }

    :global(.reveal pre code) {
        max-height: 700px;
    }
</style>