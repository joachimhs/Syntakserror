<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import { cacheStore } from 'svelte-cache-store';

	import '../app.css';

	import { theme } from '$lib/stores/theme';
	import type {Article} from "$lib/types/Article";
	import {onMount} from "svelte";

	let { children, data } = $props();

	cacheStore.registerType<Article>('article', 'articles', '/sequel-api/api-route')

    const {openGraphic}  = data;

</script>

<svelte:head>
    {#if openGraphic}
        <title>{openGraphic?.title} - Syntakserror.no</title>
        <meta property="og:name" content={openGraphic.siteName} />
        <meta property="og:site_name" content={openGraphic.siteName} />
        <meta property="og:image" content={openGraphic.image} />
        <meta property="og:image:url" content={openGraphic.image} />
        <meta property="twitter:image" content={openGraphic.image} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="og:description" content={openGraphic.description} />
        <meta property="twitter:description" content={openGraphic.description} />
        <meta property="og:title" content={openGraphic.title} />
        <meta property="twitter:title" content={openGraphic.title} />
        <meta property="og:image:width" content={openGraphic.width} />
        <meta property="og:image:height" content={openGraphic.height} />
        <meta property="og:type" content={openGraphic.type} />
    {/if}
</svelte:head>

<Header />

<main>
	{@render children()}
</main>

<Footer />
