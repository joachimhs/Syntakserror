<script lang="ts">
    import SlideDeck from '$lib/components/SlideDeck.svelte';
    import type {PageData} from './$types';

    let {data}: { data: PageData } = $props();
</script>

<div class="presentation-page">
    <div class="back-link-container">
        <a href="/presentasjoner" class="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Tilbake til alle presentasjoner
        </a>
    </div>

    {#key data.presentation?.id}
        {#if data.presentation}
            <SlideDeck presentation={data.presentation} />
            {#if data.presentation.youtubeVideoId}
                <div class="video-container">
                    <h3>Opptak</h3>
                    <div class="video-wrapper">
                        <iframe
                            src="https://www.youtube.com/embed/{data.presentation.youtubeVideoId}"
                            title="YouTube video"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            {/if}
        {/if}
    {/key}
</div>

<style>
    .presentation-page {
        width: 100%;
    }

    .back-link-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem 2rem;
    }

    .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        color: var(--text-secondary, #666);
        text-decoration: none;
        font-size: 0.95rem;
        border-radius: 8px;
        transition: all 0.2s ease;
    }

    .back-link:hover {
        color: var(--primary-color, #4a90e2);
        background: var(--hover-bg, rgba(74, 144, 226, 0.05));
    }

    .back-link svg {
        flex-shrink: 0;
    }

    .video-container {
        max-width: 1200px;
        margin: 2rem auto;
        padding: 0 2rem;
    }

    .video-container h3 {
        margin-bottom: 1rem;
        color: var(--text-secondary, #333);
    }

    .video-wrapper {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .video-wrapper iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
