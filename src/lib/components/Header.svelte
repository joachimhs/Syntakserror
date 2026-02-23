<script>
    import { theme } from '$stores/theme.js';
    import {browser} from "$app/environment";

    const themes = {
        light: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css',
        dark: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
    };


    function updateHljsTheme() {
        if (!browser) return; // Ensure this only runs in the browser

        let storedTheme = window.localStorage.getItem('theme');
        if (!storedTheme) storedTheme = 'dark';

        let linkElement = document.getElementById('hljs-theme');

        // If the link tag doesn't exist, create it
        if (!linkElement) {
            linkElement = document.createElement('link');
            linkElement.id = 'hljs-theme';
            linkElement.rel = 'stylesheet';
            document.head.appendChild(linkElement);
        }

        // Set the href to the correct theme URL
        linkElement.href = themes[storedTheme];
    }

    function toggleTheme() {
        // theme.update() tar den nåværende verdien og returnerer den nye.
        theme.update((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
        updateHljsTheme();
        document.documentElement.setAttribute('data-theme', $theme);
    }

    updateHljsTheme();
</script>

<header>
    <nav class="container">
        <a href="/" class="logo">
            Syntaks<span class="accent">error</span><span class="blinking-cursor"></span>
        </a>

        <div class="nav-right">
            <div class="nav-links">
                <a href="/om-syntakserror">Om</a>
                <a href="/kompetanse">Kompetanse</a>
                <a href="/presentasjoner">Presentasjoner</a>
            </div>
            <button on:click={toggleTheme} class="theme-toggle" aria-label="Bytt mellom lyst og mørkt tema">
                {#if $theme === 'light'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                {/if}
            </button>
        </div>
    </nav>
</header>

<style>
    header {
        background-color: color-mix(in srgb, var(--background-color), transparent 15%);
        backdrop-filter: blur(16px) saturate(180%);
        -webkit-backdrop-filter: blur(16px) saturate(180%);
        position: sticky;
        top: 0;
        z-index: 50;
        border-bottom: 1px solid var(--border-color);
    }
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 4rem;
    }
    .logo {
        font-size: 1.35rem;
        font-weight: 700;
        color: var(--primary-text-color);
        letter-spacing: -0.02em;
    }
    .logo .accent {
        background: var(--accent-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    .nav-right {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }
    .nav-links {
        display: flex;
        gap: 1.75rem;
    }
    .nav-links a {
        color: var(--secondary-text-color);
        font-size: 0.875rem;
        font-weight: 500;
        transition: color 0.2s ease;
    }
    .nav-links a:hover {
        color: var(--primary-text-color);
    }
    .theme-toggle {
        background: none;
        border: 1px solid var(--border-color);
        cursor: pointer;
        color: var(--secondary-text-color);
        padding: 0.5rem;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
    }
    .theme-toggle:hover {
        color: var(--primary-text-color);
        background-color: var(--surface-color-elevated);
        border-color: rgba(99, 102, 241, 0.2);
    }

    @media (max-width: 640px) {
        .nav-links {
            display: none;
        }
    }
</style>
