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

    let themeUrl = $derived(`/node_modules/reveal.js/dist/theme/${presentation.theme || 'white'}.css`);

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

                // controls: false,
                // progress: false
            })

            deck.initialize()

        }, 150)

    })


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
    .reveal-footer {
        width: 100%;
        max-height: 200px;
    }

    .reveal-footer img {
        max-height: 200px !important;
        max-width: 100%;
    }

    .reveal {
        width: 100%;
        height: calc(100vh - 550px);
        background-position: 50% 50%;
        background-repeat: no-repeat;
    }

    .slides {
        width: 85% !important;
    }

    img {
        max-height: 700px !important;
    }

    .reveal pre code {
        max-height: 700px;
    }
</style>