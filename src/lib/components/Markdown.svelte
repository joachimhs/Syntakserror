<!-- src/lib/components/Markdown.svelte -->

<script>
    // 1. Import the PRE-CONFIGURED parser, not the original 'marked' library
    import { markdownParser } from '$lib/utils/markdownParser.js';

    export let toHtml = '';
</script>

{#if toHtml}
    <div class="markdown-content">
        <!-- 2. Use the imported parser -->
        {@html markdownParser(toHtml) }
    </div>
{/if}

<style>
    /* Basic styling for the code block container */
    .markdown-content :global(pre) {
        border-radius: 12px;
        overflow-x: auto;
        line-height: 0.7rem;
        border: 1px solid var(--border-color);
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
    }

    .markdown-content :global(code) {
        font-family: 'Source Code Pro', 'Fira Code', 'Courier New', monospace;
        font-size: 0.9em;
    }

    .markdown-content :global(p > code),
    .markdown-content :global(li > code) {
        background-color: var(--badge-background-color);
        padding: 2px 8px;
        border-radius: 6px;
        font-size: 0.85em;
        border: 1px solid var(--badge-border-color);
    }

    /* 4. CSS for the line numbers */
    .markdown-content :global(.line) {
        display: flex;
        align-items: flex-start;
    }

    .markdown-content :global(.line-number) {
        flex-shrink: 0;
        width: 2em;
        margin-right: 1em;
        text-align: right;
        color: #555;
        user-select: none;
    }

    .markdown-content :global(.line-content) {
        flex-grow: 1;
    }

    /* Add a hover effect for better readability */
    .markdown-content :global(.line:hover) {
        background-color: var(--code-hightlight-color);
    }
</style>
