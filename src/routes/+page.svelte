<script lang="ts">
    import {onMount} from "svelte";
    import {cacheStore} from "svelte-cache-store";
    import type {Article} from "$lib/types/Article";

    let articles : Article[];
    onMount(async () => {
        articles = await cacheStore.fetchAll('article');
    });
</script>

<svelte:head>
    <title>Syntakserror.no - Hjem</title>
</svelte:head>

<section class="hero">
    <div class="container">
        <p class="hero-label">Blogg & Betraktninger</p>
        <h1>Velkommen til <span class="accent">Syntakserror</span></h1>
        <p class="hero-description">Joachims uhildede meninger og betraktninger rundt programmering, rammeverk, programvareutvikling og kunstig "intelligens"!</p>
    </div>
</section>

<section id="articles" class="articles-section">
    <div class="container">
        <div class="article-list">
            {#if articles && articles.length > 0}
                {#each articles as post, index}
                    {#if post.isPublished}
                        <a href="/artikkel/{post.id}" class="article-card {index === 0 ? 'article-card-featured' : ''}">
                            <div class="card-image-wrapper">
                                <img src={post.thumbnail} alt={post.title} />
                            </div>
                            <div class="card-content">
                                <div class="card-topics">
                                    {#each post.topics.split(",") as topic}
                                        <span class="badge">{topic}</span>
                                    {/each}
                                </div>
                                <h3>{post.title}</h3>
                                <p class="card-preamble">{post.preamble}</p>
                                <span class="read-more">Les artikkelen &rarr;</span>
                            </div>
                        </a>
                    {/if}
                {/each}
            {:else}
                <p class="empty-state">Ingen artikler funnet.</p>
            {/if}
        </div>
    </div>
</section>

<style>
    .hero {
        padding: 5rem 0 4rem;
        text-align: center;
        position: relative;
    }

    .hero::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%);
        pointer-events: none;
        z-index: -1;
    }

    .hero-label {
        font-size: 0.8125rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--accent-color-light);
        margin-bottom: 1.25rem;
    }

    h1 {
        font-size: clamp(2.25rem, 5vw, 3.5rem);
        font-weight: 800;
        line-height: 1.1;
        letter-spacing: -0.03em;
    }

    .accent {
        background: var(--accent-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .hero-description {
        margin: 1.5rem auto 0;
        max-width: 56ch;
        font-size: 1.0625rem;
        color: var(--secondary-text-color);
        line-height: 1.7;
    }

    .articles-section {
        padding: 3rem 0 5rem;
    }

    .article-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
    }

    @media screen and (max-width: 900px) {
        .article-list {
            grid-template-columns: repeat(2, 1fr);
        }
        .article-card-featured {
            grid-column: span 2 !important;
        }
    }

    @media screen and (max-width: 600px) {
        .article-list {
            grid-template-columns: 1fr;
        }
        .article-card-featured {
            grid-column: span 1 !important;
        }
    }

    .article-card-featured {
        grid-column: span 3;
    }

    .article-card-featured .card-image-wrapper img {
        height: 380px;
    }

    .article-card {
        display: flex;
        flex-direction: column;
        background-color: var(--surface-color);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        overflow: hidden;
        transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        color: inherit;
    }

    .article-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--card-hover-shadow);
        border-color: rgba(99, 102, 241, 0.15);
    }

    .card-image-wrapper {
        overflow: hidden;
    }

    .card-image-wrapper img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        transition: transform 0.4s ease;
    }

    .article-card:hover .card-image-wrapper img {
        transform: scale(1.03);
    }

    .card-content {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .card-topics {
        margin-bottom: 0.75rem;
    }

    h3 {
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--primary-text-color);
        line-height: 1.35;
        letter-spacing: -0.01em;
        margin-bottom: 0.5rem;
    }

    .article-card-featured h3 {
        font-size: 1.5rem;
    }

    .card-preamble {
        font-size: 0.9rem;
        color: var(--secondary-text-color);
        line-height: 1.6;
        flex: 1;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .read-more {
        font-size: 0.8125rem;
        font-weight: 600;
        color: var(--accent-color-light);
        margin-top: 1rem;
        transition: color 0.2s ease;
    }

    .article-card:hover .read-more {
        color: var(--accent-color);
    }

    .empty-state {
        grid-column: 1 / -1;
        text-align: center;
        color: var(--secondary-text-color);
        padding: 4rem 0;
    }
</style>
