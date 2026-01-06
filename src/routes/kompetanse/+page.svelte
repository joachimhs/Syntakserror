<script>
    // --- DATA FRA CV ---
    const profile = {
        name: "Joachim Haagen Skeie",
        title: "Seniorkonsulent | Tech Lead",
        email1: "joachim@jpro.no",
        email2: "joachim@skeiene.no",
        phone: "4141 5805",
        birthYear: 1981,
        // Bilde-URL: Bytt denne med stien til ditt eget bilde, f.eks: '/meg.jpg'
        imageUrl: "/joachim_bilde.jpeg",
        summary: [
            "Joachim er en strategisk og forretningsorientert teknologileder med tung erfaring som IT-arkitekt og tech lead i komplekse prosjekter. Han har en unik evne til å bygge og inspirere utviklingsteam, og brenner for å skape en kultur preget av faglig eierskap, kvalitet og trivsel.",
            "Hans faglige engasjement underbygges av flere utgitte fagbøker, styreverv i javaBin, og som grunnlegger av den internasjonale konferansen EmberFest. Denne ekspertisen har han anvendt i ledende roller i store digitaliseringsprosjekter hos, blant annet NorgesGruppen og Statens Pensjonskasse, hvor han har omsatt komplekse behov til robuste og skalerbare løsninger.",
            "De siste årene har Joachim fokusert på å koble teknologi til forretningsstrategi, blant annet gjennom å forme KI-strategien og lede kompetanseutviklingen i KulturIT. Han er en trygg og engasjert formidler som trives i krysningen mellom mennesker, teknologi og kommersielle resultater."
        ]
    };

    const skills = {
        "Ledelse og strategi": [
            "Teamledelse og mentoring",
            "Strategisk rådgivning (AI/ML)",
            "Rekruttering og teambygging",
            "Budsjett- og resultatansvar",
            "Forretningsutvikling",
            "Prosjektledelse og anbud"
        ],
        "Teknisk Arkitektur": [
            "System- og løsningsarkitektur",
            "Java (Dyp kjernekompetanse)",
            "Frontend (React, Svelte)",
            "Mikrotjenester og API-er",
            "Databasemodellering (SQL, NoSQL)"
        ]
    };

    const experience = [
        {
            id: 1,
            company: "jPro",
            role: "Seniorkonsulent | Tech Lead & Arkitekt",
            period: "2026 - Nå",
            description: "Som seniorkonsulent i jPro går Joachim inn i roller som Tech Lead eller Lead Arkitekt for kunder med komplekse digitaliseringsbehov. Han spesialiserer seg på å bygge broen mellom forretningsstrategi og teknisk utførelse, med særlig fokus på moderne Java-arkitektur, skyplattformer og skjæringspunktet mellom IT og foretning.",
            tech: ["Tech Lead", "Løsningsarkitektur", "Java", "Cloud", "IoT", "Strategisk rådgivning"],
            points: [
                "Bistår kunder med teknisk ledelse i krevende prosjekter, med ansvar for arkitekturvalg, kodekvalitet og teamkultur.",
                "Rådgiver for modernisering av systemporteføljer og overgang til skybaserte, mikrotjenesteorienterte arkitekturer.",
                "Fungerer som 'spillende trener' som kombinerer hands-on utvikling med mentoring for å løfte kompetansen i utviklingsteamene."
            ]
        },
        {
            id: 10,
            company: "KulturIT",
            role: "Teknologileder & Lead Arkitekt",
            period: "2023 - 2025",
            description: "Ledet selskapets strategiske teknologiløft og AI-satsing for Primus, Nordens ledende forvaltningssystem for museer (300+ kunder). Ansvarlig for å modernisere arkitekturen og realisere gevinstene ved bruk av kunstig intelligens.",
            tech: ["AI/LLM Strategi", "Python (FastAPI)", "RAG/Gemma", "AWS/Kubernetes", "OCR/HCR", "Løsningsarkitektur"],
            points: [
                "Designet og implementerte selskapets sentrale AI-plattform på AWS/Kubernetes, basert på åpne modeller (Gemma) og mikrotjenester.",
                "Utviklet løsninger for tunge dataprosesseringsoppgaver som håndskriftstolkning (HCR) og OCR, for automatiserte og manuelle prosesser for museene.",
                "Gjennomførte en totalanalyse av Primus-plattformens arkitektur og la veikartet for ytelsesoptimalisering av både frontend og backend.",
                "Ansvarlig for faglig ledelse og kompetanseheving i utviklingsteamet, inkludert interne fagsamlinger og ekstern presentasjon av AI-strategien."
            ]
        },
        {
            id: 2,
            company: "Skaperiet / Blockuino",
            role: "Gründer, Lead Fullstack Arkitekt",
            period: "2020 - Nå",
            description: "Leder produktutviklingen av en komplett EdTech-plattform (SaaS) som lar elever programmere fysisk elektronikk direkte i nettleseren. Har hatt totalansvar for arkitektur, utvikling og drift fra konsept til produksjon.",
            tech: ["Fullstack Arkitektur", "Java 17 / Spring Boot 3", "SvelteKit / React", "Docker / CI/CD", "WebUSB / Hardware Integration", "Produktledelse"],
            points: [
                "Designet og bygget en skalerbar fullstack-løsning fra bunnen av, bestående av moderne Java-backend og reaktiv Svelte-frontend.",
                "Løste komplekse tekniske utfordringer knyttet til hardware-kommunikasjon i nettleser (WebUSB/WebSerial) uten behov for drivere.",
                "Etablerte et profesjonelt driftsmiljø basert på Docker-konteinere med automatiserte CI/CD-pipelines for hyppige leveranser.",
                "Kombinerer rollen som Lead Developer med forretningsutvikling, partnerskap og pedagogisk formidling."
            ]
        },
        {
            id: 3,
            company: "NorgesGruppen ASA",
            role: "Teknisk Arkitekt & Tech Lead (NGFLYT)",
            period: "2020 - 2023",
            description: "Hovedarkitekt for NGFLYT/Luminate, konsernets sentrale initiativ for å modernisere verdikjeden. Systemet styrer vareflyt og logistikk for milliarder av kroner og krever ekstrem oppetid.",
            tech: ["Løsningsarkitektur", "Java 17 / Spring Boot", "Event-Driven Architecture (JMS)", "Microservices", "Oracle", "Integrasjon"],
            points: [
                "Designet en hendelsesdrevet mikrotjenestearkitektur som integrerer over 50 fagsystemer for å gi sanntids oversikt over lager og vareflyt.",
                "Ledet et utviklingsteam på 5-12 personer og fungerte som teknisk brobygger mellom logistikkavdelingen og utviklerne.",
                "Ansvarlig for integrasjonen mot AI-plattformen BlueYonder for automatisert varepåfylling.",
                "Sikret robusthet, skalerbarhet og kodekvalitet i en forretningskritisk løsning som håndterer 80-90% av konsernets omsetning."
            ]
        },
        {
            id: 4,
            company: "Kikora AS",
            role: "Lead Frontend Arkitekt",
            period: "2019 - 2020",
            description: "Ledet utviklingen av en integrert programmeringsmodul i Kikoras læringsplattform i forbindelse med fagfornyelsen (LK20).",
            tech: ["Frontend Arkitektur", "Angular", "Python (Client-side)", "Blockly", "Systemintegrasjon"],
            points: [
                "Designet arkitekturen for å kjøre Python-kode sikkert direkte i nettleseren (client-side execution) integrert i en Angular-applikasjon.",
                "Ledet et spesialisert team gjennom konseptutvikling, prototyping og produksjonssetting.",
                "Leverte en sømløs løsning som koblet visuell blokk-programmering sammen med tekstbasert koding, nå en sentral del av Kikoras produkt."
            ]
        },
        {
            id: 5,
            company: "Utdanningsetaten i Oslo",
            role: "Fagansvarlig & Delprosjektleder",
            period: "2017 - 2019",
            description: "Ledet den operative gjennomføringen av storsatsingen 'Koding i Skolen', et massivt logistikk- og opplæringsprosjekt som nådde 12 000 elever.",
            tech: ["Prosjektledelse", "Skalering", "Organisasjonsutvikling", "EdTech", "Pedagogisk design"],
            points: [
                "Designet en skalerbar 'train-the-trainer'-modell hvor 600 ungdomsskoleelever ble utdannet til instruktører.",
                "Hadde ansvar for logistikk, kvalitetssikring og gjennomføring av opplæring på tvers av hele Osloskolen.",
                "Utviklet standardisert undervisningsmateriell og ledet en kulturell endringsprosess for innføring av teknologi i klasserommet."
            ]
        },
        {
            id: 6,
            company: "Kodegenet AS",
            role: "Gründer, Daglig Leder & Lead Utvikler",
            period: "2015 - 2020",
            description: "Bygget opp et EdTech-selskap fra idé til nasjonal aktør. Kombinerte rollen som bedriftsleder med rollen som Lead Utvikler for selskapets digitale plattformer.",
            tech: ["Fullstack Utvikling", "Java / Spring", "Ember.js", "Personalledelse", "Forretningsutvikling", "Integrasjon (Feide/Stripe)"],
            points: [
                "Designet og implementerte selskapets kursplattform med Java backend og Ember.js frontend.",
                "Hadde fullt personalansvar for 8 ansatte, samt ansvar for budsjett, salg og strategi.",
                "Utviklet integrasjoner mot betalingsløsninger (Stripe) og identitetsleverandører (Feide) for skolesektoren.",
                "Etablerte seg som internasjonal ekspert gjennom forfatterskap av fagboken 'Ember.js in Action'."
            ]
        },
        {
            id: 7,
            company: "Akvaplan Niva / SenseERA",
            role: "Lead Developer & Løsningsarkitekt",
            period: "2010 - 2020",
            description: "Hadde teknisk totalansvar for SenseERA, en kritisk analyseplattform for beregning av miljørisiko ved oljeutslipp. Ledet modernisering og forvaltning over en 10-års periode.",
            tech: ["Java Desktop (Swing/JavaFX)", "Big Data", "NoSQL (LevelDB)", "Algoritmeoptimalisering", "Langsiktig forvaltning"],
            points: [
                "Gjennomførte en total omskriving av regnemotoren og migrerte til NoSQL, noe som reduserte analysetiden fra 1 uke til under 1 dag (20-50x ytelsesløft).",
                "Ledet moderniseringen av brukergrensesnittet fra Swing til JavaFX for bedre visualisering av komplekse data.",
                "Ansvarlig for arkitekturvalg for håndtering av store datamengder (Big Data) og kvalitetssikring av koden."
            ]
        },
        {
            id: 8,
            company: "EmberFest Conference",
            role: "Grunnlegger & Konferansesjef",
            period: "2013 - 2016",
            description: "Etablerte og driftet Europas ledende fagkonferanse for Ember.js-rammeverket. Bygget et internasjonalt fagmiljø.",
            tech: ["Community Building", "Internasjonal prosjektledelse", "Event Management", "Merkevarebygging"],
            points: [
                "Organiserte konferanser i München, Barcelona og Budapest med deltakere fra hele verden.",
                "Ansvarlig for økonomi, sponsorsalg og teknisk gjennomføring.",
                "Vellykket exit ved overføring av eierskapet til det europeiske communityet som driftet konseptet videre."
            ]
        },
        {
            id: 20,
            company: "UMS (Everbridge)",
            role: "Frontend Lead & Seniorkonsulent",
            period: "2015 - 2016",
            description: "Modernisering av nasjonalt varslingssystem for krisehåndtering. Ledet frontend-arbeidet i et distribuert team.",
            tech: ["Frontend Arkitektur", "Ember.js", "SPA", "Internasjonalt samarbeid", "UX/UI implementering"],
            points: [
                "Fungerte som Tech Lead for frontend i et team fordelt mellom Norge og India.",
                "Ledet migreringen fra en eldre løsning til en moderne Single Page Application (Ember.js).",
                "Sikret kvalitet og brukervennlighet i et system som brukes i kritiske nødssituasjoner."
            ]
        },
        {
            id: 21,
            company: "SocialCee",
            role: "Senior Frontend Arkitekt",
            period: "2014 - 2015",
            description: "Teknisk modernisering av en SaaS-plattform for publikumsengasjement på store sportsarrangementer.",
            tech: ["Frontend Arkitektur", "Ember.js", "JavaScript", "Skalering", "Sanntidskommunikasjon"],
            points: [
                "Analyserte eksisterende kodebase og definerte ny arkitektur for å sikre stabilitet under høy belastning.",
                "Ledet oppgraderingen til en robust produksjonsversjon i samarbeid med utviklere i Polen.",
                "Etablerte 'best practices' for JavaScript-utvikling i selskapet."
            ]
        },
        {
            id: 22,
            company: "Schibsted / Aftenposten",
            role: "Senior Systemutvikler (Backend)",
            period: "2013 - 2014",
            description: "Utvikling av Aftenpostens digitale betalingsløsning. Fokus på integrasjon og høyt transaksjonsvolum.",
            tech: ["Java Backend", "REST API Design", "Integrasjon", "Sikkerhet", "Betalingsløsninger"],
            points: [
                "Designet og implementerte REST-APIer for å koble Aftenpostens CMS mot betalingssystemene.",
                "Sikret robust dataflyt og feilhåndtering i en forretningskritisk inntektsstrøm."
            ]
        },
        {
            id: 23,
            company: "Gjensidige Forsikring",
            role: "Senior Java Utvikler",
            period: "2013",
            description: "Forvaltning av virksomhetskritisk eArkiv-løsning som håndterer all kundekommunikasjon og poliser.",
            tech: ["Java EE", "SOAP WebServices", "Integrasjon", "Dokumenthåndtering", "Maven"],
            points: [
                "Utviklet og vedlikeholdt SOAP-tjenester for integrasjon mot fagsystemer.",
                "Optimaliserte søk og lagring av store dokumentmengder.",
                "Jobbet i et spesialisert team med fokus på stabilitet og dataintegritet."
            ]
        },
        {
            id: 24,
            company: "Statens Pensjonskasse (SPK)",
            role: "Senior Systemutvikler (PERFORM)",
            period: "2010 - 2011",
            description: "Deltok i moderniseringen av Norges pensjonssystem. Et av landets største IT-prosjekter med absolutte tidsfrister.",
            tech: ["Java / Spring", "Spring Batch", "SOA / WebServices", "Integrasjon (NAV)", "JSF"],
            points: [
                "Utviklet kritiske integrasjoner mot NAV for utveksling av trygdedata.",
                "Implementerte tunge batch-jobber for massehåndtering av pensjonsberegninger.",
                "Jobbet fullstack med både tung backend-logikk og saksbehandlergrensesnitt."
            ]
        },
        {
            id: 11,
            company: "NorgesGruppen Data",
            role: "Teamleder & Tech Lead",
            period: "2006 - 2010",
            description: "Startet karrieren med raskt avansement. Fikk tidlig ansvar for å lede utviklingen av konsernets viktigste handelssystemer.",
            tech: ["Tech Lead", "Java EE", "Scrum Master", "Teamledelse", "Applikasjonsovervåkning"],
            points: [
                "Ledet et team på 11 utviklere med ansvar for ASKO Netthandel og Ordreprosjektet/NGFLYT.",
                "Innførte Scrum som metodikk og profesjonaliserte utviklingsprosessene.",
                "Implementerte avansert overvåkning (CA Wily) for å sikre oppetid i produksjon.",
                "Kombinerte rollen som teamleder med operativt arkitekturansvar."
            ]
        }
    ];

    const education = [
        { year: "2005 - 2006", degree: "Master of Information Technology", school: "Queensland University of Technology, Australia" },
        { year: "2002 - 2004", degree: "Bachelor of Information Technology", school: "Queensland University of Technology, Australia" },
        { year: "2000 - 2001", degree: "Grunnfag i informasjonsteknologi", school: "NTNU, Trondheim" },
        { year: "1999 - 2000", degree: "Grunnfag i realfag", school: "UiO, Oslo" }
    ];

    const publications = [
        "2016: Fagbok: Scratch fra scratch | Kodegenet (Eget forlag)",
        "2014: Fagbok: Ember.js in Action | Manning Publications (Internasjonalt forlag)",
        "2013: Artikkel: Ember.js - Web Applications Done Right Follow-up | InfoQ",
        "2012: Artikkel: Ember.js: Rich Web Applications Done Right | InfoQ",
        "2011: Artikkel: Effective Java Profiling With Open Source Tools | InfoQ"
    ];

    const projects = [
        {
            name: "Blockuino",
            url: "https://blockuino.no",
            desc: "Komplett SaaS-plattform for blokkprogrammering av mikrokontrollere (Arduino/ESP32). Fullstack Java/Svelte-løsning med avansert hardware-integrasjon i nettleser via WebSerial.",
            tech: ["Systemarkitektur", "Java 17 / Spring Boot", "SvelteKit", "Docker / K8s", "WebSerial API", "C++ Kompilering"]
        },
        {
            name: "Blockuino Mini",
            url: "https://mini.blockuino.no",
            desc: "Tilpasset versjon for de yngste, med fokus på UX og forenklet grensesnitt. Demonstrerer gjenbruk av kjerne-backend med ny frontend-klient.",
            tech: ["Frontend Arkitektur", "UX Design", "SvelteKit", "Java Backend"]
        },
        {
            name: "Midgard",
            url: "https://skaperiet.no/midgard",
            desc: "Gamification av læring. Et norrønt-inspirert spill hvor logiske gåter løses med kodeblokker. Egenutviklet spillmotor i nettleseren.",
            tech: ["Spillutvikling", "Canvas API", "SvelteKit", "Algoritmisk tenkning"]
        },
        {
            name: "Klosslabben",
            url: "https://skaperiet.no/klosslabben",
            desc: "Nettbasert 3D-modelleringsverktøy (Voxel-basert). Lar brukere designe figurer og eksportere direkte til STL for 3D-printing.",
            tech: ["3D Grafikk", "Three.js", "Filgenerering (Binary STL)", "SvelteKit"]
        },
        {
            name: "P5 Editor Suite",
            url: "https://skaperiet.no/editor",
            desc: "Fullverdig sky-IDE for kreativ koding (JavaScript/P5.js). Inneholder både blokk- og tekstbasert editor, live preview og pikselkunst-verktøy.",
            tech: ["Cloud IDE", "JavaScript", "Docker", "SvelteKit", "Sanntidskompilering"]
        }
    ];

    const talks = [
        {
            id: 1,
            year: 2025,
            title: "Kunstig «intelligens» i museumsløsningene | eKulturseminar KulturIT"
        },
        {
            id: 2,
            year: 2025,
            title: "3D printing (kurs) | JavaZone Kids"
        },
        {
            id: 3,
            year: 2023,
            title: "Making the web Svelter (tm) with SvelteKit | JavaZone (kurs) og Framsida (foredrag)"
        },
        {
            id: 4,
            year: 2019,
            title: "Kreativ elektronikk med Arduino (for barn) | Booster Conference"
        },
        {
            id: 5,
            year: 2014,
            title: "Ember.js in Action | Ember London"
        }

    ]

    // --- STATE ---
    let isLightMode = false;
    let expandedJobs = new Set([1]); // Default open the first job

    function toggleTheme() {
        isLightMode = !isLightMode;
        if (isLightMode) {
            document.documentElement.classList.add('light-mode');
        } else {
            document.documentElement.classList.remove('light-mode');
        }
    }

    function toggleJob(id) {
        if (expandedJobs.has(id)) {
            expandedJobs.delete(id);
        } else {
            expandedJobs.add(id);
        }
        expandedJobs = expandedJobs; // Reactivity trigger
    }

    function printCV() {
        window.print();
    }
</script>

<div class="cv-container">
    <!-- Header / Top Bar -->
    <header class="header">
        <div class="header-inner">
            <div class="profile-section">
                <div class="profile-image-wrapper">
                    <img src={profile.imageUrl} alt={profile.name} class="profile-image" />
                </div>
                <div class="profile-text">
                    <h1 class="name">{profile.name}</h1>
                    <p class="title">{profile.title}</p>
                </div>
            </div>

            <div class="actions">
                <!--button class="btn-primary no-print" on:click={printCV}>
                    Last ned PDF
                </button-->
            </div>
        </div>
    </header>

    <main class="grid-layout">
        <!-- Sidebar -->
        <aside class="sidebar">
            <!-- Contact Info -->
            <section class="card contact-card">
                <h3>Kontakt</h3>
                <div class="contact-item">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                     <a href="mailto:{profile.email1}">{profile.email1}</a>
                </div>
                <div class="contact-item">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                     <a href="mailto:{profile.email2}">{profile.email2}</a>
                </div>
                <div class="contact-item">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <span>{profile.phone}</span>
                </div>
                <div class="contact-item">
                    <span class="label">Født:</span> {profile.birthYear}
                </div>
            </section>

            <!-- Skills -->
            <section class="card">
                <h3>Kompetanse</h3>
                {#each Object.entries(skills) as [category, items]}
                    <div class="skill-group">
                        <h4 class="skill-header">{category}</h4>
                        <div class="badges">
                            {#each items as skill}
                                <span class="badge">{skill}</span>
                            {/each}
                        </div>
                    </div>
                {/each}
            </section>

            <!-- Education -->
            <section class="card">
                <h3>Utdanning</h3>
                <ul class="list-none">
                    {#each education as edu}
                        <li class="edu-item">
                            <div class="year">{edu.year}</div>
                            <div class="degree">{edu.degree}</div>
                            <div class="school">{edu.school}</div>
                        </li>
                    {/each}
                </ul>
            </section>

            <!-- Certifications & Publications Short -->
            <section class="card">
                <h3>Annet</h3>
                <h4>Sertifiseringer</h4>
                <p class="small-text">2008: Certified Scrum Master (CSM)</p>

                <h4 class="mt-4">Publikasjoner</h4>
                <ul class="simple-list small-text">
                    {#each publications as pub}
                        <li>{pub}</li>
                    {/each}
                </ul>

                <h4 class="mt-4">Utvalgte Foredrag og kurs</h4>
                <ul class="simple-list small-text">
                    {#each talks as talk}
                        <li><strong>{talk.year}</strong> - {talk.title}</li>
                    {/each}
                </ul>
            </section>
        </aside>

        <!-- Main Content -->
        <div class="content">
            <!-- Summary -->
            <section class="card summary-card">
                <h2>Om Joachim</h2>
                {#each profile.summary as paragraph}
                    <p>{paragraph}</p>
                {/each}
            </section>

            <!-- Portfolio Grid -->
            <section class="card">
                <h2>Egne Prosjekter & Verktøy</h2>
                <p class="intro-text">
                    Som en del av arbeidet med Skaperiet har jeg utviklet en rekke pedagogiske verktøy for barn, unge og nybegynnere som brukes på mitt eget skaperverksted, samt gratis av skoler og kodeklubber.
                </p>

                <div class="project-grid">
                    {#each projects as project}
                        <a href={project.url} target="_blank" rel="noopener noreferrer" class="project-card">
                            <div class="project-header">
                                <span class="project-title">{project.name}</span>
                                <!-- External Link Icon -->
                                <svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            </div>
                            <p class="project-desc">{project.desc}</p>
                            <div class="project-tech">
                                {#each project.tech as t}
                                    <span class="mini-tag">{t}</span>
                                {/each}
                            </div>
                        </a>
                    {/each}
                </div>
            </section>

            <!-- Experience Timeline -->
            <section class="timeline-section">
                <h2>Erfaring</h2>
                <div class="timeline">
                    {#each experience as job}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div
                                class="timeline-item {expandedJobs.has(job.id) ? 'active' : ''}"
                                on:click={() => toggleJob(job.id)}
                        >
                            <div class="timeline-marker"></div>
                            <div class="timeline-content card hover-effect">
                                <div class="job-header">
                                    <div>
                                        <h3>{job.role}</h3>
                                        <span class="company">{job.company}</span>
                                    </div>
                                    <span class="period badge-outline">{job.period}</span>
                                </div>

                                <p class="job-description">{job.description}</p>

                                <!-- NYTT: Visning av teknologier -->
                                {#if job.tech}
                                    <div class="job-tech">
                                        {#each job.tech as t}
                                            <span class="tech-badge">{t}</span>
                                        {/each}
                                    </div>
                                {/if}

                                {#if expandedJobs.has(job.id)}
                                    <div class="job-details">
                                        <hr class="separator"/>
                                        <ul>
                                            {#each job.points as point}
                                                <li>{point}</li>
                                            {/each}
                                        </ul>
                                    </div>
                                {:else}
                                    {#if job.points.length > 0}
                                        <div class="expand-hint">
                                            Vis nøkkelpunkter ({job.points.length})
                                            <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                        </div>
                                    {/if}
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
            </section>
        </div>
    </main>
</div>

<style>
    /* --- PASTE YOUR CSS VARIABLES HERE --- */
    :root {
        /* Standard tema er DARK MODE */
        --background-color: #0f172a; /* slate-900 */
        --surface-color: #1e293b; /* slate-800 */
        --primary-text-color: #e2e8f0; /* slate-200 */
        --secondary-text-color: #94a3b8; /* slate-400 */
        --accent-color: #60a5fa; /* blue-400 */
        --border-color: #334155; /* slate-700 */
        --shadow-color: rgba(0, 0, 0, 0.2);
        --badge-text-color: rgb(219, 234, 254);
        --badge-background-color: rgb(29, 78, 216);
        --code-background-color: #171717;
        --code-hightlight-color: #333;
        --thin-accent: rgba(52, 129, 255, 0.45);
        --highlight: #ffeb3b78;
    }

    :global(html.light-mode) {
        --background-color: #ffffff;
        --surface-color: #f8fafc;
        --primary-text-color: #0f172a;
        --secondary-text-color: #64748b;
        --accent-color: #3b82f6;
        --border-color: #e2e8f0;
        --shadow-color: rgba(0, 0, 0, 0.05);
        --badge-text-color:  rgb(29, 78, 216);
        --badge-background-color: rgb(219, 234, 254);
        --code-background-color: #c1c1c1;
        --code-hightlight-color: #ccc;
        --thin-accent: rgb(59 130 246 / 20%);
        --highlight: #ffeb3b78;
    }

    /* --- LAYOUT & STYLING --- */
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background-color: var(--background-color);
        color: var(--primary-text-color);
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    .cv-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    /* Header Styles Updated for Image */
    .header {
        margin-bottom: 3rem;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 2rem;
    }

    .header-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
        flex-wrap: wrap;
    }

    .profile-section {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .profile-image-wrapper {
        width: 100px;
        height: 100px;
        flex-shrink: 0;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid var(--accent-color);
        box-shadow: 0 0 15px var(--thin-accent);
    }

    .profile-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .profile-text {
        display: flex;
        flex-direction: column;
    }

    .name {
        font-size: 2.2rem;
        font-weight: 800;
        margin: 0;
        color: var(--primary-text-color);
        line-height: 1.2;
    }

    .title {
        font-size: 1.2rem;
        color: var(--accent-color);
        margin: 0.25rem 0 0;
        font-weight: 500;
    }

    .actions {
        display: flex;
        gap: 1rem;
        align-items: center;
        margin-left: auto;
    }

    @media (max-width: 768px) {
        .header-inner { flex-direction: column; align-items: flex-start; }
        .actions { margin-left: 0; width: 100%; justify-content: flex-start; }
        .profile-section { width: 100%; }
        .name { font-size: 1.8rem; }
    }

    /* Buttons */
    button {
        cursor: pointer;
        font-family: inherit;
        border: none;
        transition: all 0.2s;
    }

    .btn-icon {
        background: var(--surface-color);
        color: var(--primary-text-color);
        padding: 0.6rem;
        border-radius: 50%;
        border: 1px solid var(--border-color);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn-icon:hover {
        background: var(--thin-accent);
        color: var(--accent-color);
    }

    .btn-primary {
        background-color: var(--accent-color);
        color: #fff;
        padding: 0.6rem 1.4rem;
        border-radius: 6px;
        font-weight: 600;
        font-size: 0.95rem;
    }

    .btn-primary:hover {
        opacity: 0.9;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px var(--thin-accent);
    }

    /* Grid Layout */
    .grid-layout {
        display: grid;
        grid-template-columns: 320px 1fr;
        gap: 2.5rem;
    }

    @media (max-width: 900px) {
        .grid-layout {
            grid-template-columns: 1fr;
        }
    }

    /* Cards */
    .card {
        background-color: var(--surface-color);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 4px 6px var(--shadow-color);
        transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
    }

    .hover-effect:hover {
        transform: translateY(-2px);
        border-color: var(--accent-color);
        box-shadow: 0 8px 15px var(--shadow-color);
    }

    h2, h3, h4 { margin-top: 0; color: var(--primary-text-color); }

    h2 { font-size: 1.5rem; border-bottom: 2px solid var(--thin-accent); padding-bottom: 0.5rem; margin-bottom: 1.5rem; }
    h3 { font-size: 1.1rem; color: var(--accent-color); margin-bottom: 1rem; }
    h4 { font-size: 0.95rem; margin-bottom: 0.5rem; opacity: 0.9; font-weight: 600; }

    p { line-height: 1.6; color: var(--primary-text-color); margin-bottom: 1rem; }
    p:last-child { margin-bottom: 0; }

    .small-text { font-size: 0.9rem; color: var(--secondary-text-color); }

    /* Sidebar Specifics */
    .contact-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.75rem;
        font-size: 0.95rem;
    }

    .contact-item a { color: var(--primary-text-color); text-decoration: none; transition: color 0.2s; }
    .contact-item a:hover { color: var(--accent-color); }
    .icon { width: 18px; height: 18px; color: var(--accent-color); flex-shrink: 0; }
    .label { color: var(--secondary-text-color); width: 40px; }

    .skill-group { margin-bottom: 1.5rem; }
    .skill-header { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--secondary-text-color); margin-bottom: 0.6rem; }

    .badges { display: flex; flex-wrap: wrap; gap: 0.5rem; }

    .badge {
        background-color: var(--badge-background-color);
        color: var(--badge-text-color);
        font-size: 0.8rem;
        padding: 0.25rem 0.7rem;
        border-radius: 99px;
        font-weight: 600;
    }

    .badge-outline {
        border: 1px solid var(--accent-color);
        color: var(--accent-color);
        font-size: 0.75rem;
        padding: 0.15rem 0.6rem;
        border-radius: 6px;
        white-space: nowrap;
        background: var(--thin-accent);
    }

    .edu-item { margin-bottom: 1.2rem; border-left: 2px solid var(--border-color); padding-left: 1rem; }
    .edu-item .year { font-size: 0.8rem; color: var(--accent-color); font-weight: 600; margin-bottom: 0.2rem; }
    .edu-item .degree { font-weight: 600; font-size: 0.95rem; color: var(--primary-text-color); }
    .edu-item .school { font-size: 0.9rem; color: var(--secondary-text-color); margin-top: 0.1rem; }

    /* Timeline */
    .timeline {
        position: relative;
        padding-left: 2rem;
        border-left: 2px solid var(--border-color);
    }

    .timeline-item {
        position: relative;
        margin-bottom: 2rem;
        cursor: pointer;
    }

    .timeline-marker {
        position: absolute;
        left: -2.55rem;
        top: 1.8rem;
        width: 1.1rem;
        height: 1.1rem;
        background-color: var(--surface-color);
        border: 2px solid var(--secondary-text-color);
        border-radius: 50%;
        transition: all 0.3s;
        z-index: 2;
    }

    .timeline-item:hover .timeline-marker,
    .timeline-item.active .timeline-marker {
        background-color: var(--accent-color);
        border-color: var(--accent-color);
        box-shadow: 0 0 0 4px var(--thin-accent);
    }

    .job-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.8rem;
        gap: 1rem;
    }

    .job-header h3 { margin: 0; color: var(--primary-text-color); font-size: 1.15rem; font-weight: 700; }
    .company { color: var(--accent-color); font-weight: 600; font-size: 0.95rem; display: block; margin-top: 0.2rem; }

    .job-description {
        color: var(--primary-text-color);
        font-size: 0.95rem;
        line-height: 1.6;
        margin-bottom: 0.5rem;
    }

    .separator { border: 0; border-top: 1px dashed var(--border-color); margin: 1rem 0; }

    .job-details ul {
        margin: 0;
        padding-left: 1.2rem;
        color: var(--secondary-text-color);
    }

    .job-details li { margin-bottom: 0.5rem; font-size: 0.95rem; }

    .expand-hint {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.85rem;
        color: var(--accent-color);
        font-weight: 500;
        margin-top: 1rem;
        padding-top: 0.5rem;
        border-top: 1px solid transparent;
    }
    .timeline-item:hover .expand-hint { opacity: 1; }
    .chevron { transition: transform 0.2s; }
    .active .chevron { transform: rotate(180deg); }

    /* List Styles */
    .list-none { list-style: none; padding: 0; margin: 0; }
    .simple-list { padding-left: 1.2rem; }
    .simple-list li { margin-bottom: 0.5rem; }

    .footer {
        text-align: center;
        margin-top: 4rem;
        color: var(--secondary-text-color);
        font-size: 0.85rem;
        padding-top: 2rem;
        border-top: 1px solid var(--border-color);
    }

    .mt-4 { margin-top: 1.5rem; }

    .job-tech {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem; /* Litt mer luft mellom dem */
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .tech-badge {
        /* Font */
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: 0.8rem; /* Litt større tekst for lesbarhet */
        font-weight: 600;  /* Fetere tekst gjør at fargen popper mer */

        /* Farger - Bruker badge-variablene for tydelig blåtone */
        background-color: var(--badge-background-color);
        color: var(--badge-text-color);

        /* Utforming */
        padding: 0.3rem 0.6rem; /* Litt mer "padding" for at de skal ta plass */
        border-radius: 6px;
        border: 1px solid transparent; /* Skjuler border som standard for renere look */

        transition: all 0.2s ease-in-out;
    }

    /* Hover-effekt */
    .timeline-item:hover .tech-badge {
        /* Når man holder over jobben, blir badgen litt mørkere/sterkere */
        transform: translateY(-1px);
        box-shadow: 0 2px 4px var(--shadow-color);
        filter: brightness(1.05);
    }

    /* --- PORTFOLIO STYLES --- */
    .intro-text {
        margin-bottom: 1.5rem;
        color: var(--secondary-text-color);
    }

    .project-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 1rem;
    }

    .project-card {
        background-color: var(--background-color); /* Litt mørkere enn kortet for kontrast */
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 1rem;
        text-decoration: none;
        transition: all 0.2s ease;
        display: flex;
        flex-direction: column;
        height: 100%;
        box-sizing: border-box;
    }

    .project-card:hover {
        border-color: var(--accent-color);
        transform: translateY(-3px);
        box-shadow: 0 4px 12px var(--shadow-color);
    }

    .project-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .project-title {
        font-weight: 700;
        color: var(--accent-color);
        font-size: 1rem;
    }

    .external-icon {
        width: 14px;
        height: 14px;
        color: var(--secondary-text-color);
        transition: color 0.2s;
    }

    .project-card:hover .external-icon {
        color: var(--accent-color);
    }

    .project-desc {
        font-size: 0.85rem;
        color: var(--primary-text-color);
        margin: 0 0 1rem 0;
        line-height: 1.4;
        flex-grow: 1; /* Presser tech-tags ned til bunnen */
    }

    .project-tech {
        display: flex;
        flex-wrap: wrap;
        gap: 0.3rem;
    }

    .mini-tag {
        font-size: 0.7rem;
        background-color: var(--surface-color);
        border: 1px solid var(--border-color);
        color: var(--secondary-text-color);
        padding: 0.1rem 0.4rem;
        border-radius: 4px;
    }
</style>