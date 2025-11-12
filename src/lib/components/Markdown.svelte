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
        border-radius: 16px;
        overflow-x: auto;
        line-height: 0.7rem;
        border: 1px solid #888;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .markdown-content :global(code) {
        font-family: 'Fira Code', 'Courier New', monospace;
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
        color: #888;
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