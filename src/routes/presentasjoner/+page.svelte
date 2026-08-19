<script lang="ts">
    import type { PageData } from './$types';
    import Markdown from "$components/Markdown.svelte";

    let { data }: { data: PageData } = $props();

    type SortOption = 'newest' | 'oldest' | 'title';
    let sortBy = $state<SortOption>('title');
    let showDrafts = $state(false);
    let searchQuery = $state('');

    // Sorted and filtered presentations
    let sortedPresentations = $derived(() => {
        // Hidden presentations never appear in the list, only via direct URL
        let presentations = (data.presentations || []).filter(p => p.isVisible);

        if (!showDrafts) {
            presentations = presentations.filter(p => p.isPublished);
        }

        // Then filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            presentations = presentations.filter(p => {
                const title = (p.title || '').toLowerCase();
                const content = (p.content || '').toLowerCase();

                return title.includes(query) || content.includes(query);
            });
        }

        // Then sort
        switch (sortBy) {
            case 'newest':
                return presentations.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });
            case 'oldest':
                return presentations.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateA - dateB;
                });
            case 'title':
                return presentations.sort((a, b) => {
                    const titleA = (a.title || 'Uten tittel').toLowerCase();
                    const titleB = (b.title || 'Uten tittel').toLowerCase();
                    return titleA.localeCompare(titleB, 'nb-NO');
                });
            default:
                return presentations;
        }
    });

    // Extract first slide content for preview
    function extractFirstSlide(content: string): string {
        if (!content) return '';

        // Split by horizontal separator (---)
        const slides = content.split(/\r?\n---\r?\n/);

        // Return first slide content (limited to first few lines for preview)
        return slides[0]?.split('\n').slice(0, 5).join('\n') || '';
    }

    function formatDate(dateString: string | null): string {
        if (!dateString) return '';

        const date = new Date(dateString);
        return date.toLocaleDateString('nb-NO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function countSlides(content: string): number {
        if (!content) return 0;

        // Count horizontal separators (---) + 1 for the first slide
        const matches = content.match(/\r?\n---\r?\n/g);
        return (matches?.length || 0) + 1;
    }
</script>

<div class="presentations-container">
    <header class="page-header">
        <h1>Presentasjoner</h1>
        <p class="subtitle">Utforsk alle tilgjengelige presentasjoner</p>

        <div class="controls-wrapper">
            <div class="search-container">
                <div class="search-input-wrapper">
                    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <input
                        type="text"
                        id="search-input"
                        placeholder="Søk/filtrer presentasjonene..."
                        bind:value={searchQuery}
                    />
                    {#if searchQuery}
                        <button class="clear-button" onclick={() => searchQuery = ''} aria-label="Tøm søk">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    {/if}
                </div>
            </div>

            <div class="sort-controls">
                <div class="sort-select-group">
                    <label for="sort-select">Sorter etter:</label>
                    <select id="sort-select" bind:value={sortBy}>
                        <option value="newest">Nyeste først</option>
                        <option value="oldest">Eldste først</option>
                        <option value="title">Tittel (A-Å)</option>
                    </select>
                </div>

                <div class="checkbox-group">
                    <input
                        type="checkbox"
                        id="show-drafts"
                        bind:checked={showDrafts}
                    />
                    <label for="show-drafts">Vis utkast</label>
                </div>
            </div>
        </div>
    </header>

    {#if sortedPresentations().length > 0}
        <div class="presentations-grid">
            {#each sortedPresentations() as presentation}
                <article class="presentation-card">
                    <a href="/presentasjoner/{presentation.id}">
                        <div class="preview" data-theme={presentation.theme || 'white'}>
                            {#if presentation.content}
                                <div class="slide-preview">
                                    <div class="preview-content">
                                        <Markdown toHtml={extractFirstSlide(presentation.content)} />
                                    </div>
                                </div>
                            {:else}
                                <div class="no-preview">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                        <line x1="8" y1="21" x2="16" y2="21"></line>
                                        <line x1="12" y1="17" x2="12" y2="21"></line>
                                    </svg>
                                    <span>Ingen forhåndsvisning</span>
                                </div>
                            {/if}

                            {#if presentation.backgroundUrl}
                                <div class="background-indicator" title="Har bakgrunnsbilde">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                        <polyline points="21 15 16 10 5 21"></polyline>
                                    </svg>
                                </div>
                            {/if}
                        </div>

                        <div class="card-content">
                            <h2>{presentation.title || 'Uten tittel'}</h2>

                            <div class="metadata">
                                <span class="slide-count" title="Antall slides">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                    </svg>
                                    {countSlides(presentation.content)} slides
                                </span>

                                <span class="theme-badge" data-theme={presentation.theme || 'white'}>
                                    {presentation.theme || 'white'}
                                </span>

                                {#if presentation.createdAt}
                                    <time class="created-date" datetime={presentation.createdAt}>
                                        {formatDate(presentation.createdAt)}
                                    </time>
                                {/if}
                            </div>

                            {#if !presentation.isPublished}
                                <div class="draft-badge">Utkast</div>
                            {/if}
                        </div>
                    </a>
                </article>
            {/each}
        </div>
    {:else}
        <div class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <h2>Ingen presentasjoner funnet</h2>
            <p>Det ser ut til at det ikke finnes noen presentasjoner ennå.</p>
        </div>
    {/if}
</div>

<style>
    .presentations-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 2rem;
    }

    .page-header {
        margin-bottom: 3rem;
        text-align: center;
    }

    .page-header h1 {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
        color: var(--text-color, #1a1a1a);
    }

    .subtitle {
        font-size: 1.1rem;
        color: var(--text-secondary, #666);
        margin: 0 0 1.5rem 0;
    }

    .controls-wrapper {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin-top: 1.5rem;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    .search-container {
        flex: 1;
        min-width: 280px;
        max-width: 400px;
    }

    .search-input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    .search-icon {
        position: absolute;
        left: 1rem;
        color: var(--text-secondary, #666);
        pointer-events: none;
    }

    .search-input-wrapper input {
        width: 100%;
        padding: 0.75rem 1rem 0.75rem 2.75rem;
        border: 1px solid var(--border-color, #e0e0e0);
        border-radius: 8px;
        background: var(--card-bg, #fff);
        color: var(--text-color, #1a1a1a);
        font-size: 0.95rem;
        transition: all 0.2s ease;
    }

    .search-input-wrapper input:focus {
        outline: none;
        border-color: var(--primary-color, #4a90e2);
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
    }

    .search-input-wrapper input::placeholder {
        color: var(--text-secondary, #999);
    }

    .clear-button {
        position: absolute;
        right: 0.5rem;
        background: transparent;
        border: none;
        padding: 0.5rem;
        cursor: pointer;
        color: var(--text-secondary, #666);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: all 0.2s ease;
    }

    .clear-button:hover {
        background: var(--hover-bg, rgba(0, 0, 0, 0.05));
        color: var(--text-color, #1a1a1a);
    }

    .sort-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: nowrap;
    }

    .sort-select-group {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .sort-select-group label {
        font-size: 0.95rem;
        color: var(--text-secondary, #666);
        font-weight: 500;
    }

    .sort-controls select {
        padding: 0.5rem 1rem;
        border: 1px solid var(--border-color, #e0e0e0);
        border-radius: 8px;
        background: var(--card-bg, #fff);
        color: var(--text-color, #1a1a1a);
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .sort-controls select:hover {
        border-color: var(--primary-color, #4a90e2);
    }

    .sort-controls select:focus {
        outline: none;
        border-color: var(--primary-color, #4a90e2);
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
    }

    .checkbox-group {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border: 1px solid var(--border-color, #e0e0e0);
        border-radius: 8px;
        background: var(--card-bg, #fff);
        transition: all 0.2s ease;
    }

    .checkbox-group:hover {
        border-color: var(--primary-color, #4a90e2);
    }

    .checkbox-group input[type="checkbox"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
        accent-color: var(--primary-color, #4a90e2);
    }

    .checkbox-group label {
        font-size: 0.95rem;
        color: var(--text-secondary, #666);
        font-weight: 500;
        cursor: pointer;
        user-select: none;
    }

    .presentations-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 2rem;
    }

    .presentation-card {
        background: var(--card-bg, #fff);
        border: 1px solid var(--border-color, #e0e0e0);
        border-radius: 12px;
        overflow: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .presentation-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        border-color: var(--primary-color, #4a90e2);
    }

    .presentation-card a {
        text-decoration: none;
        color: inherit;
        display: block;
    }

    .preview {
        position: relative;
        aspect-ratio: 16 / 9;
        background: #f5f5f5;
        overflow: hidden;
    }

    .preview[data-theme="black"] {
        background: #1a1a1a;
    }

    .slide-preview {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        overflow: hidden;
    }

    .preview-content {
        font-size: 0.7rem;
        line-height: 1.4;
        max-height: 100%;
        overflow: hidden;
        text-align: center;
        color: #333;
    }

    .preview[data-theme="black"] .preview-content {
        color: #fff;
    }

    .no-preview {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #999;
        gap: 0.5rem;
    }

    .background-indicator {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 6px;
        padding: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666;
    }

    .card-content {
        padding: 1.5rem;
        position: relative;
    }

    h2 {
        margin: 0 0 1rem;
        font-size: 1.25rem;
        color: var(--text-color, #1a1a1a);
        line-height: 1.3;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .metadata {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
        font-size: 0.875rem;
        color: var(--text-secondary, #666);
    }

    .slide-count,
    .created-date {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }

    .theme-badge {
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
    }

    .theme-badge[data-theme="white"] {
        background: #f0f0f0;
        color: #333;
    }

    .theme-badge[data-theme="black"] {
        background: #333;
        color: #fff;
    }

    .draft-badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: #ff9800;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
    }

    .empty-state {
        grid-column: 1 / -1;
        text-align: center;
        padding: 4rem 2rem;
        color: var(--text-secondary, #666);
    }

    .empty-state svg {
        margin-bottom: 1rem;
        opacity: 0.3;
    }

    .empty-state h2 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: var(--text-color, #1a1a1a);
    }

    .empty-state p {
        font-size: 1rem;
        margin: 0;
    }

    @media (max-width: 1024px) {
        .controls-wrapper {
            flex-direction: column;
        }

        .search-container {
            max-width: 600px;
        }

        .sort-controls {
            flex-wrap: wrap;
            justify-content: center;
        }
    }

    @media (max-width: 768px) {
        .presentations-container {
            padding: 1rem;
        }

        .page-header h1 {
            font-size: 2rem;
        }

        .presentations-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }

        .sort-controls {
            flex-direction: column;
            gap: 1rem;
            width: 100%;
        }

        .sort-select-group,
        .checkbox-group {
            width: 100%;
            justify-content: center;
        }

        .sort-controls select {
            width: 100%;
        }
    }
</style>
