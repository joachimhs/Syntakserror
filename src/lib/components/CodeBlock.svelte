<!-- src/lib/components/CodeBlock.svelte -->
<script>
    /** @type {string} */
    export let code = '';
</script>

<div class="code-block-wrapper">
    <!-- Innholdet vil bli stylet via CSS -->
    <pre><code>{code.trim()}</code></pre>
</div>

<style>
    .code-block-wrapper {
        margin: 2rem 0;
        background-color: color-mix(in srgb, var(--surface-color), black 20%);
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
        padding: 1.5rem;
        overflow-x: auto;
    }
    pre {
        font-family: 'Source Code Pro', monospace;
        font-size: 0.9rem;
    }
</style>