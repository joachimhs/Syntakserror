<script>
    import { fade } from 'svelte/transition';
    import { fly } from 'svelte/transition';

    let isLightMode = false;
    let activeSection = 'about';
    let skills = [
        { category: 'Ledelse og strategi', items: ['Teamledelse og mentoring', 'Strategisk rådgivning (AI/ML)', 'Rekruttering og teambygging', 'Budsjett- og resultatansvar'] },
        { category: 'Teknisk Arkitektur', items: ['System- og løsningsarkitektur', 'Java-teknologier', 'Moderne Frontend (React, Svelte)', 'Mikrotjenester og API-er'] }
    ];

    function toggleTheme() {
        isLightMode = !isLightMode;
        document.documentElement.classList.toggle('light-mode', isLightMode);
    }

    function setSection(section) {
        activeSection = section;
        document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
    }

    function getProgress(year) {
        const currentYear = new Date().getFullYear();
        return Math.min(100, ((currentYear - year) / 50) * 100);
    }
</script>

<svelte:head>
    <style>
        :global(:root) {
            --background-color: #0f172a;
            --surface-color: #1e293b;
            --primary-text-color: #e2e8f0;
            --secondary-text-color: #94a3b8;
            --accent-color: #60a5fa;
            --border-color: #334155;
        }

        :global(html.light-mode) {
            --background-color: #ffffff;
            --surface-color: #f8fafc;
            --primary-text-color: #0f172a;
            --secondary-text-color: #64748b;
            --accent-color: #3b82f6;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            transition: background-color 0.3s ease;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 3rem;
        }

        .header-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--accent-color), #8b5cf6);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 1.5rem;
        }

        .theme-toggle {
            background: var(--accent-color);
            border: none;
            padding: 0.75rem 1.25rem;
            color: white;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .theme-toggle:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3);
        }

        nav {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .nav-btn {
            background: transparent;
            border: none;
            padding: 0.75rem 1.25rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            color: var(--secondary-text-color);
            font-weight: 500;
        }

        .nav-btn.active {
            background: var(--accent-color);
            color: white;
        }

        .section {
            background: var(--surface-color);
            border-radius: 12px;
            padding: 2.5rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 15px var(--shadow-color);
            position: relative;
        }

        .section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 2rem;
            width: 6px;
            height: 100%;
            background: linear-gradient(to bottom, var(--accent-color), transparent);
        }

        h1 {
            font-size: 2.8rem;
            margin-bottom: 0.5rem;
            background: linear-gradient(90deg, var(--accent-color), #8b5cf6);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        h2 {
            font-size: 1.8rem;
            margin-bottom: 1rem;
            color: var(--accent-color);
        }

        h3 {
            font-size: 1.4rem;
            margin-bottom: 0.5rem;
            color: var(--accent-color);
        }

        p {
            color: var(--primary-text-color);
            line-height: 1.7;
        }

        .highlight {
            background: linear-gradient(90deg, var(--accent-color), #8b5cf6);
            padding: 0.3rem 0.6rem;
            border-radius: 6px;
            display: inline-block;
        }

        .skills-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 1.5rem;
        }

        .skill-category {
            background: rgba(96, 165, 250, 0.1);
            padding: 1.5rem;
            border-radius: 8px;
            transition: all 0.3s ease;
        }

        .skill-category:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(96, 165, 250, 0.2);
        }

        .skill-category h3 {
            margin-top: 0;
            color: var(--accent-color);
        }

        .skill-item {
            display: flex;
            align-items: center;
            margin-bottom: 0.75rem;
            padding: 0.25rem 0;
        }

        .skill-item::before {
            content: "✦";
            color: var(--accent-color);
            margin-right: 0.75rem;
            font-weight: bold;
        }

        .timeline {
            position: relative;
            padding-left: 2rem;
        }

        .timeline::before {
            content: '';
            position: absolute;
            left: 0.7rem;
            top: 0;
            bottom: 0;
            width: 3px;
            background: linear-gradient(to bottom, var(--accent-color), transparent);
        }

        .timeline-item {
            position: relative;
            margin-bottom: 2rem;
            padding-left: 1.5rem;
        }

        .timeline-item::after {
            content: '';
            position: absolute;
            left: -0.3rem;
            top: 15px;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: var(--accent-color);
            box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.3);
        }

        .timeline-content {
            padding-left: 1rem;
        }

        .timeline-date {
            font-weight: bold;
            color: var(--accent-color);
            margin-bottom: 0.5rem;
        }

        .timeline-title {
            font-weight: bold;
            margin-bottom: 0.5rem;
        }

        .timeline-description {
            color: var(--secondary-text-color);
            margin-bottom: 1rem;
        }

        .progress-container {
            width: 100%;
            height: 8px;
            background: rgba(96, 165, 250, 0.1);
            border-radius: 4px;
            overflow: hidden;
        }

        .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, var(--accent-color), #8b5cf6);
            border-radius: 4px;
            transition: width 1s ease;
        }

        .badge {
            display: inline-block;
            background: linear-gradient(135deg, var(--accent-color), #8b5cf6);
            color: white;
            padding: 0.3rem 0.75rem;
            border-radius: 6px;
            font-size: 0.8rem;
            margin-right: 0.5rem;
        }

        .contact-info {
            display: flex;
            gap: 1.5rem;
            margin-top: 1rem;
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .contact-icon {
            width: 24px;
            height: 24px;
            background: var(--accent-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        @media (max-width: 768px) {
            .container {
                padding: 1rem;
            }

            header {
                flex-direction: column;
                gap: 1rem;
            }

            .section {
                padding: 1.5rem;
            }
        }
    </style>
</svelte:head>

<div class="container">
    <header>
        <div class="header-content">
            <div class="avatar">JH</div>
            <h1>Joachim Haagen Skeie</h1>
        </div>
        <button class="theme-toggle" on:click={toggleTheme}>
            {isLightMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
    </header>

    <nav>
        <button class:active={activeSection === 'about'} class="nav-btn" on:click={() => setSection('about')}>
            👤 Om meg
        </button>
        <button class:active={activeSection === 'skills'} class="nav-btn" on:click={() => setSection('skills')}>
            💻 Kompetanse
        </button>
        <button class:active={activeSection === 'experience'} class="nav-btn" on:click={() => setSection('experience')}>
            📅 Erfaring
        </button>
        <button class:active={activeSection === 'education'} class="nav-btn" on:click={() => setSection('education')}>
            🎓 Utdanning
        </button>
    </nav>

    <section id="about" class="section">
        <h2>Teknologileder og IT-Arkitekt</h2>
        <div class="contact-info">
            <div class="contact-item">
                <div class="contact-icon">✉️</div>
                <span>joachim@skeiene.no</span>
            </div>
            <div class="contact-item">
                <div class="contact-icon">📞</div>
                <span>4141 5805</span>
            </div>
            <div class="contact-item">
                <div class="contact-icon">🎂</div>
                <span>Født 1981</span>
            </div>
        </div>

        <h3>Profil</h3>
        <p>Joachim er en strategisk og forretningsorientert teknologileder med tung erfaring som IT-arkitekt og tech lead i komplekse prosjekter. Han har en unik evne til å bygge og inspirere utviklingsteam, og brenner for å skape en kultur preget av faglig eierskap, kvalitet og trivsel.</p>

        <p>Hans faglige engasjement underbygges av flere utgitte fagbøker, styreverv i javaBin, og som grunnlegger av den internasjonale konferansen EmberFest. Denne ekspertisen har han anvendt i ledende roller i store digitaliseringsprosjekter hos, blant annet NorgesGruppen og Statens Pensjonskasse, hvor han har omsatt komplekse behov til robuste og skalerbare løsninger.</p>

        <div class="highlight">De siste årene har Joachim fokusert på å koble teknologi til forretningsstrategi, blant annet gjennom å forme KI-strategien og lede kompetanseutviklingen i KulturIT. Han er en trygg og engasjert formidler som trives i krysningen mellom mennesker, teknologi og kommersielle resultater.</div>
    </section>

    <section id="skills" class="section">
        <h2>Kjernekompetanse</h2>
        <div class="skills-container">
            {#each skills as skill}
                <div class="skill-category" in:fly={{ y: 20, duration: 500 }}>
                    <h3>{skill.category}</h3>
                    {#each skill.items as item}
                        <div class="skill-item">{item}</div>
                    {/each}
                </div>
            {/each}

            <div class="skill-category" in:fly={{ y: 20, duration: 500 }}>
                <h3>Teknisk Arkitektur og Java-spesialisering</h3>
                <div class="skill-item">System- og løsningsarkitektur for komplekse systemer</div>
                <div class="skill-item">Dyp kjernekompetanse innenfor Java-teknologier</div>
                <div class="skill-item">Moderne Frontend (React, Svelte)</div>
                <div class="skill-item">Design av mikrotjenester og API-er</div>
                <div class="skill-item">Databasemodellering og optimalisering (SQL, NoSQL)</div>
            </div>
        </div>

        <h3>Erfaringsoversikt</h3>
        {#each [2006, 2010, 2015, 2020] as year}
            <div class="progress-container">
                <div
                        class="progress-bar"
                        style={`width: ${getProgress(year)}%`}
                ></div>
            </div>
        {/each}
    </section>

    <section id="experience" class="section">
        <h2>Relevant prosjekterfaring</h2>

        <div class="timeline">
            {#each [
                {
                    year: "2020 - Nå",
                    title: "KulturIT",
                    subtitle: "Primus, KI og fagarrangementer | Kultur",
                    points: [
                        "Ledet dybdeanalyse av Primus-plattformens arkitektur og teknologi",
                        "Sentral rolle i selskapets nye Arkitektur- og Innovasjonsavdeling",
                        "Designer ny sentral KI-applikasjon for museumssektoren"
                    ]
                },
                {
                    year: "2020 - Nå",
                    title: "Skaperiet",
                    subtitle: "Skaperverksted for barn | Undervisning",
                    points: [
                        "Eier og leder utviklingen av Blockuino.no",
                        "Designer teknisk stack med Java 17 og Svelte/SvelteKit",
                        "Driver ukentlige gratis skaperverksteder for barn"
                    ]
                },
                {
                    year: "2006 - 2010 & 2020-2023",
                    title: "NorgesGruppen ASA",
                    subtitle: "NG FLYT og Luminate | Varehandel og logistikk",
                    points: [
                        "Ansvarlig for arkitektur av KI-plattform integrert med 50+ fagsystemer",
                        "Definerte tekniske krav for Java og React komponenter",
                        "Sikret robust løsning for NorgesGruppens kjerne-verdikjede"
                    ]
                }
            ] as experience}
                <div class="timeline-item" in:fly={{ y: 20, duration: 500 }}>
                    <div class="timeline-content">
                        <div class="timeline-date">{experience.year}</div>
                        <h3>{experience.title}</h3>
                        <p class="timeline-description">{experience.subtitle}</p>
                        {#each experience.points as point}
                            <div class="skill-item">{point}</div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <section id="education" class="section">
        <h2>Utdanning</h2>
        <div class="timeline">
            {#each [
                {
                    year: "2005 - 2006",
                    title: "Master of Information Technology",
                    institution: "Queensland University of Technology, Brisbane, Australia"
                },
                {
                    year: "2002 - 2004",
                    title: "Bachelor of Information Technology",
                    institution: "QUT, Australia"
                }
            ] as education}
                <div class="timeline-item" in:fly={{ y: 20, duration: 500 }}>
                    <div class="timeline-content">
                        <div class="timeline-date">{education.year}</div>
                        <h3>{education.title}</h3>
                        <p>{education.institution}</p>
                    </div>
                </div>
            {/each}
        </div>

        <h3>Foredrag og faglig formidling</h3>
        {#each [
            "2025 - Kunstig «intelligens» i museumsløsningene | eKulturseminar KulturIT",
            "2023 - Making the web Svelter (tm) with SvelteKit | JavaZone og Framsida",
            "2014 - Ember.js in Action | Ember London"
        ] as talk}
            <div class="skill-item">{talk}</div>
        {/each}

        <h3>Publikasjoner</h3>
        {#each [
            "2016 - Fagbok for barn: Scratch fra scratch | Kodegenet",
            "2014 - Fagbok: Ember.js in action | Manning Publications"
        ] as publication}
            <div class="skill-item">{publication}</div>
        {/each}

        <h3>Sertifiseringer</h3>
        <span class="badge">2008 Certified Scrum Master (CSM)</span>
    </section>
</div>

<style>
    /* Additional global styles can be added here */
    body {
        background-color: var(--background-color);
        color: var(--primary-text-color);
    }

    /* Add some subtle animations */
    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
    }

    .avatar {
        animation: float 3s ease-in-out infinite;
    }
</style>