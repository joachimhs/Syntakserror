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

<div class="container">
    {#if article}
        <article>
            <header>
                <a href="/" class="back-link">&larr; Tilbake til forsiden</a>
                <h1>{article.title}</h1>
                {#each article.topics?.split(",") as topic}
                    <span class="badge">{topic}</span>
                {/each}
                <p class="meta">Publisert: {article.publishedDate}</p>
            </header>

            <img class="featured-image" src={article.thumbnail} alt={article.title} />

            <div class="content prose">
                <Markdown toHtml={article.preamble} />
            </div>

            <div class="content prose">
                <Markdown toHtml={article.contents}></Markdown>
            </div>

            <div class="bottom-link">
                <a href="/" class="back-link">&larr; Tilbake til forsiden</a>
            </div>
        </article>
    {/if}
</div>

<style>
    .container {
        max-width: 800px;
        padding-top: 4rem;
        padding-bottom: 4rem;
    }
    .back-link {
        display: inline-block;
        margin-bottom: 2rem;
        font-weight: 600;
    }
    header {
        margin-bottom: 2rem;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 1.5rem;
    }
    .category {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--accent-color);
        text-transform: uppercase;
    }
    h1 {
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        font-size: 2.5rem;
        font-weight: 900;
        color: var(--primary-text-color);
        line-height: 1.2;
    }
    .meta {
        margin-top: 1rem;
        color: var(--secondary-text-color);
    }
    .featured-image {
        width: 100%;
        border-radius: 0.75rem;
        margin-bottom: 2rem;
    }
    /* Stil for innholdet som kommer fra {@html} */
    .content {
        line-height: 1.8;
    }
    .content :global(p.lead) {
        font-size: 1.25rem;
        color: var(--primary-text-color);
        margin-bottom: 1.5rem;
    }

    .content :global(h1) {
        border-bottom: 1px solid var(--accent-color);
    }

    .content :global(h2) {
        font-size: 1.45rem;
        font-weight: 300;
        margin-top: 3rem;
        margin-bottom: 1rem;
        padding-left: 50px;
        letter-spacing: 0.25rem;
        border-bottom: 1px solid var(--thin-accent);
    }

    .content :global(p) {
        margin: 25px 0;
    }

    .content :global(ul li) {
        margin: 15px 90px;
    }

    .content :global(strong) {
        background: var(--highlight);
        padding: 5px;
    }

    :global(.content img) {
        max-width: 100%;
        border-radius: 0.75rem;
        margin-bottom: 2rem;
    }

    .bottom-link {
        margin-top: 15px;
    }
</style>