<script lang="ts">
    import Markdown from "$components/Markdown.svelte";

    export let data: PageLoad;
    const {article}  = data;
</script>

<svelte:head>
    <title>{article?.title} - Syntakserror.no</title>

    {#if article}
        <!-- OpenGraph / Facebook -->
        <meta property="og:title" content="{article.title}" />
        <meta property="og:description" content="{article.preamble}" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://syntakserror.no/artikkel/{article.id}" />
        <meta property="og:image" content="https://syntakserror.no{article.thumbnail}" />
        <meta property="og:site_name" content="SyntaksError" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="{article.title}" />
        <meta name="twitter:description" content="{article.preamble}" />
        <meta name="twitter:image" content="https://syntakserror.no{article.thumbnail}" />
        <meta name="twitter:creator" content="@joachimhs" />
    {/if}

</svelte:head>

<div class="article-wrapper">
    <div class="container">
        {#if article}
            <article>
                <a href="/" class="back-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    Tilbake til forsiden
                </a>

                <header>
                    <div class="article-topics">
                        {#each article.topics?.split(",") as topic}
                            <span class="badge">{topic}</span>
                        {/each}
                    </div>
                    <h1>{article.title}</h1>
                    <p class="meta">
                        <time>{article.publishedDate}</time>
                        {#if article.author}
                            <span class="meta-sep">&middot;</span>
                            <span>{article.author}</span>
                        {/if}
                    </p>
                </header>

                <img class="featured-image" src={article.thumbnail} alt={article.title} />

                <div class="content prose">
                    <Markdown toHtml={article.preamble} />
                </div>

                <div class="content prose">
                    <Markdown toHtml={article.contents}></Markdown>
                </div>

                <div class="bottom-link">
                    <a href="/" class="back-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        Tilbake til forsiden
                    </a>
                </div>
            </article>
        {/if}
    </div>
</div>

<style>
    .article-wrapper {
        padding-top: 2rem;
        padding-bottom: 4rem;
    }

    .container {
        max-width: 760px;
    }

    .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 2.5rem;
        font-weight: 500;
        font-size: 0.875rem;
        color: var(--secondary-text-color);
        transition: color 0.2s ease;
    }

    .back-link:hover {
        color: var(--accent-color-light);
    }

    header {
        margin-bottom: 2rem;
    }

    .article-topics {
        margin-bottom: 1rem;
    }

    h1 {
        font-size: clamp(1.75rem, 4vw, 2.5rem);
        font-weight: 800;
        color: var(--primary-text-color);
        line-height: 1.2;
        letter-spacing: -0.02em;
    }

    .meta {
        margin-top: 1rem;
        color: var(--secondary-text-color);
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .meta-sep {
        opacity: 0.4;
    }

    .featured-image {
        width: 100%;
        border-radius: 16px;
        margin-bottom: 2.5rem;
    }

    .content {
        line-height: 1.8;
        font-size: 1.0625rem;
    }

    .content :global(p.lead) {
        font-size: 1.2rem;
        color: var(--primary-text-color);
        margin-bottom: 1.5rem;
    }

    .content :global(h1) {
        border-bottom: 2px solid var(--thin-accent);
        padding-bottom: 0.5rem;
    }

    .content :global(h2) {
        font-size: 1.4rem;
        font-weight: 600;
        margin-top: 3rem;
        margin-bottom: 1rem;
        letter-spacing: -0.01em;
        color: var(--primary-text-color);
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 0.5rem;
    }

    .content :global(p) {
        margin: 1.25rem 0;
    }

    .content :global(ul li) {
        margin: 0.75rem 0 0.75rem 2rem;
    }

    .content :global(strong) {
        background: var(--highlight);
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: 600;
    }

    :global(.content img) {
        max-width: 100%;
        border-radius: 12px;
        margin: 1.5rem 0;
    }

    .bottom-link {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid var(--border-color);
    }
</style>
