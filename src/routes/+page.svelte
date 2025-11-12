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
        <h1>Velkommen til <span class="accent">Syntakserror</span></h1>
        <p>Joachims uhildede meninger og betraktninger rundt programmering, rammeverk, programvareutvikling og kunstig "intelligens"!</p>
    </div>
</section>

<section id="articles" class="articles-section">
    <div class="container">
        <div class="article-list">
            {#if articles && articles.length > 0}
                {#each articles as post, index}

                    <a href="/artikkel/{post.id}" class="article-card {index === 0 ? 'article-card-first' : ''}">
                        <img src={post.thumbnail} alt={post.title} />
                        <div class="card-content">
                            <span class="category">
                                {#each post.topics.split(",") as topic}
                                    <span class="badge">{topic}</span>
                                {/each}
                            </span>
                            <h3>{post.title}</h3>
                            <p>{post.preamble}</p>
                        </div>
                    </a>
                {/each}
            {:else}
                <p>Ingen artikler funnet.</p>
            {/if}
        </div>
    </div>
</section>

<style>
    .hero {
        padding: 6rem 0;
        text-align: center;
    }
    h1 {
        font-size: 3rem;
        font-weight: 900;
        line-height: 1.1;
    }
    .accent { color: var(--accent-color); }

    .article-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 25px;
    }

    @media screen and (max-width: 800px) {
        .article-list {
            grid-template-columns: 1fr;
        }
    }

    .article-list .article-card-first {
        grid-column-start: 0;
        grid-column-end: span 3;
    }

    .hero p {
        margin: 1.5rem auto 0;
        max-width: 60ch;
        font-size: 1.125rem;
        color: var(--secondary-text-color);
    }
    .articles-section {
        background-color: var(--surface-color);
        border-top: 1px solid var(--border-color);
        padding: 4rem 0;
    }
    .articles-section h2 {
        font-size: 2rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 3rem;
    }
    .article-card {
        display: block;
        background-color: var(--background-color);
        border: 1px solid var(--border-color);
        border-radius: 0.75rem;
        overflow: hidden;
        margin-bottom: 20px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .article-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
    .article-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
    .card-content {
        padding: 1.5rem;
    }
    .category {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--accent-color);
        text-transform: uppercase;
    }
    h3 {
        margin-top: 0.5rem;
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--primary-text-color);
    }
</style>