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

        <div class="nav-links">

        </div>
        <button on:click={toggleTheme} class="theme-toggle" aria-label="Bytt mellom lyst og mørkt tema">
            {#if $theme === 'light'}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            {/if}
        </button>
    </nav>
</header>

<style>
    header {
        background-color: color-mix(in srgb, var(--background-color), transparent 20%);
        backdrop-filter: blur(10px);
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
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--primary-text-color);
    }
    .logo .accent {
        color: var(--accent-color);
    }
    .nav-links {
        display: flex;
        gap: 2rem;
    }
    .theme-toggle {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--secondary-text-color);
        padding: 0.5rem;
        border-radius: 99px;
    }
    .theme-toggle:hover {
        color: var(--primary-text-color);
        background-color: var(--surface-color);
    }
</style>