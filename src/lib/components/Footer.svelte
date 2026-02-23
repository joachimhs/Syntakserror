<!-- src/lib/components/Footer.svelte -->

<footer>
    <div class="container footer-content">
        <div class="footer-top">
            <!-- Logo og beskrivelse -->
            <div class="footer-brand">
                <a href="/" class="logo">
                    Syntaks<span class="accent">error</span><span class="blinking-cursor"></span>
                </a>
                <p class="brand-description">
                    Meninger og betraktninger om programmering, rammeverk og kunstig intelligens.
                </p>
            </div>

            <!-- Lenker -->
            <div class="footer-links">
                <h5>Sider</h5>
                <ul>
                    <li><a href="/om-syntakserror">Om Syntakserror</a></li>
                    <li><a href="/kompetanse">Kompetanse</a></li>
                    <li><a href="/presentasjoner">Presentasjoner</a></li>
                </ul>
            </div>
        </div>

        <div class="footer-bottom">
            <p class="copyright">
                &copy; 2025 &ndash; 2026 Joachim Haagen Skeie &middot; Syntakserror.no
            </p>
        </div>
    </div>
</footer>

<style>
    footer {
        border-top: 1px solid var(--border-color);
        padding: 3.5rem 0 2rem;
        font-size: 0.875rem;
        color: var(--secondary-text-color);
    }

    .footer-top {
        display: flex;
        justify-content: space-between;
        gap: 3rem;
        padding-bottom: 2.5rem;
        border-bottom: 1px solid var(--border-color);
    }

    .footer-brand {
        max-width: 360px;
    }

    .logo {
        display: inline-block;
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--primary-text-color);
        margin-bottom: 0.75rem;
        letter-spacing: -0.02em;
    }

    .logo .accent {
        background: var(--accent-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .brand-description {
        line-height: 1.6;
        color: var(--secondary-text-color);
    }

    h5 {
        font-size: 0.6875rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--primary-text-color);
        margin-bottom: 1rem;
    }

    .footer-links ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.625rem;
    }

    .footer-links a {
        color: var(--secondary-text-color);
        font-size: 0.875rem;
        transition: color 0.2s ease;
    }

    .footer-links a:hover {
        color: var(--accent-color-light);
    }

    .footer-bottom {
        padding-top: 1.5rem;
    }

    .copyright {
        font-size: 0.8125rem;
        color: var(--secondary-text-color);
        opacity: 0.7;
    }

    @media (max-width: 640px) {
        .footer-top {
            flex-direction: column;
            gap: 2rem;
        }
    }
</style>
