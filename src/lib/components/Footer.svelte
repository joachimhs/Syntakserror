<!-- src/lib/components/Footer.svelte -->

<footer>
    <div class="container footer-grid">
        <!-- Kolonne 1: Logo og Copyright -->
        <div class="logo-section">
            <a href="/" class="logo">
                Syntaks<span class="accent">error</span><span class="blinking-cursor"></span>
            </a>
            <p class="copyright">
                &copy; 2025 Joachim Haagen Skeie | Syntakserror.no <br />Alle rettigheter reservert.
            </p>
        </div>

        <!-- Kolonne 2: Lenker -->
        <div class="links-section">
            <h5>Lenker</h5>
            <ul>
                <li><a href="/om-syntakserror">Om Syntakserror</a></li>
            </ul>
        </div>

        <!-- Kolonne 3: Følg oss
        <div class="social-section">
            <h5>Følg oss</h5>
            <div class="social-icons">
                <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="Syntakserror på X">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                </a>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="Syntakserror på GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03.1.531 1.03.875 2.295.623 2.857.477.088-.372.342-.623.623-.766-2.18-.248-4.467-1.09-4.467-4.857 0-1.071.383-1.947 1.009-2.633-.101-.248-.438-1.246.096-2.6 0 0 .823-.264 2.696 1.003A9.43 9.43 0 0112 8.001a9.43 9.43 0 012.46.336c1.873-1.267 2.696-1.003 2.696-1.003.535 1.354.2 2.352.096 2.6.627.686 1.009 1.562 1.009 2.633 0 3.778-2.29 4.607-4.478 4.85.35.304.667.9.667 1.813 0 1.31-.012 2.37-.012 2.69 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clip-rule="evenodd"></path></svg>
                </a>
            </div>
        </div> -->
    </div>
</footer>

<style>
    footer {
        border-top: 1px solid var(--border-color);
        padding: 4rem 0; /* 64px top/bottom */
        font-size: 0.875rem; /* 14px */
        color: var(--secondary-text-color);
    }
    .footer-grid {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr; /* Gir første kolonne mer plass */
        gap: 2rem; /* 32px */
    }

    /* Kolonne 1: Logo og Copyright */
    .logo {
        display: inline-block;
        font-size: 1.5rem; /* 24px */
        font-weight: 700;
        color: var(--primary-text-color);
        margin-bottom: 1rem;
    }
    .logo .accent {
        color: var(--accent-color);
    }
    .copyright {
        max-width: 45ch; /* Sørger for fin linjebryting */
    }

    /* Kolonne 2 & 3: Lenker og Sosiale medier */
    h5 {
        font-size: 0.75rem; /* 12px */
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--primary-text-color);
        margin-bottom: 1rem;
    }
    .links-section ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.75rem; /* 12px */
    }
    .links-section a {
        color: var(--secondary-text-color);
        transition: color 0.2s ease;
    }
    .links-section a:hover {
        color: var(--accent-color);
    }

    .social-icons {
        display: flex;
        gap: 1rem; /* 16px */
    }
    .social-icons a {
        color: var(--secondary-text-color);
        transition: color 0.2s ease;
    }
    .social-icons a:hover {
        color: var(--primary-text-color);
    }

    /* Responsivt design for mobil */
    @media (max-width: 768px) {
        .footer-grid {
            grid-template-columns: 1fr; /* Stabler kolonnene */
            gap: 3rem; /* Mer avstand vertikalt */
            text-align: center;
        }
        .logo-section,
        .links-section,
        .social-section {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .social-icons {
            justify-content: center;
        }
    }
</style>