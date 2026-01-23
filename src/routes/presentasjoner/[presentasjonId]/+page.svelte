<script lang="ts">
    import SlideDeck from '$lib/components/SlideDeck.svelte';
    import type {PageData} from './$types';

    let {data}: { data: PageData } = $props();

    $effect(() => {
        loaded = !!data.presentation;
    });
</script>

{#key data.presentation?.id}
    {#if data.presentation}
        <SlideDeck presentation={data.presentation} />
    {/if}
{/key}