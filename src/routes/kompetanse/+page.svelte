<script lang="ts">
    import { onMount } from 'svelte';
    import {cacheStore} from "svelte-cache-store";
    import type {CVEducation, CVExperience, CVProfile, CVProject, CVPublication, CVSkill, CVTalk} from "$lib/types/CV";
    import Markdown from "$components/Markdown.svelte";
    
    let profile: CVProfile | null = $state(null);
    let skills: CVSkill[] = $state([]);
    let education: CVEducation[] = $state([]);
    let publications: CVPublication[] = $state([]);
    let talks: CVTalk[] = $state([]);
    let projects: CVProject[] = $state([]);
    let experience: CVExperience[] = $state([]);

    let uniqueCategories = $derived([...new Set(skills.map(s => s.category))]);

    let isLoading = $state(false);

    onMount(async () => {
        profile = await cacheStore.fetchById<CVProfile>('cvProfile', 'joachim-haagen-skeie');
        for (const projId of profile.cvProjects) {
            let proj = await cacheStore.fetchById<CVProject>('cvProject', projId);
            projects.push(proj);
        }

        for (const expId of profile.cvExperience) {
            let exp = await cacheStore.fetchById<CVExperience>('cvExperience', expId);
            experience.push(exp);
        }

        if (experience.length > 0) {
            experience[0].isOpen = true;
        }

        for (const skillId of profile.cvSkills) {
            let skill = await cacheStore.fetchById<CVSkill>('cvSkill', skillId);
            skills.push(skill);
        }

        console.log(skills);

        for (const eduId of profile.cvEducations) {
            let edu = await cacheStore.fetchById<CVEducation>('cvEducation', eduId);
            education.push(edu);
        }

        for (const pubId of profile.cvPublications) {
            let pub = await cacheStore.fetchById<CVPublication>('cvPublication', pubId);
            publications.push(pub);
        }

        for (const talkId of profile.cvTalks) {
            let talk = await cacheStore.fetchById<CVTalk>('cvTalk', talkId);
            talks.push(talk);
        }

        isLoading = false;
    });

    function toggleJob(job : CVExperience) {
        job.isOpen = !job.isOpen;
    }
</script>

{#if profile}
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

                {#if skills}
                    <!-- Skills -->
                    <section class="card">
                        <h3>Kompetanse</h3>
                        {#each uniqueCategories as category}
                            <div class="skill-group">
                                <h4 class="skill-header">{category}</h4>
                                <div class="badges">
                                    {#each skills.filter(s => s.category === category) as skill}
                                        <span class="badge">{skill.skillName}</span>
                                    {/each}
                                </div>
                            </div>
                        {/each}
                    </section>
                {/if}

                {#if education}
                    <!-- Education -->
                    <section class="card">
                        <h3>Utdanning</h3>
                        <ul class="list-none">
                            {#each education as edu}
                                <li class="edu-item">
                                    <div class="year">{edu.yearRange}</div>
                                    <div class="degree">{edu.degree}</div>
                                    <div class="school">{edu.school}</div>
                                </li>
                            {/each}
                        </ul>
                    </section>
                {/if}

                {#if publications && talks}
                    <!-- Certifications & Publications Short -->
                    <section class="card">
                        <h3>Annet</h3>
                        <h4>Sertifiseringer</h4>
                        <p class="small-text">2008: Certified Scrum Master (CSM)</p>

                        <h4 class="mt-4">Publikasjoner</h4>
                        <ul class="simple-list small-text">
                            {#each publications as pub}
                                <li>{pub.publicationText}</li>
                            {/each}
                        </ul>

                        <h4 class="mt-4">Utvalgte Foredrag og kurs</h4>
                        <ul class="simple-list small-text">
                            {#each talks as talk}
                                <li><strong>{talk.year}</strong> - {talk.title}</li>
                            {/each}
                        </ul>
                    </section>
                {/if}
            </aside>

            <!-- Main Content -->
            <div class="content">
                <!-- Summary -->
                <section class="card summary-card">
                    <h2>Om Joachim</h2>
                    <div><Markdown toHtml={profile.summary} /></div>
                </section>

                <!-- Portfolio Grid -->
                <section class="card">
                    <h2>Egne Prosjekter & Verktøy</h2>
                    <p class="intro-text">
                        Som en del av arbeidet med Skaperiet har jeg utviklet en rekke pedagogiske verktøy for barn, unge og nybegynnere som brukes på mitt eget skaperverksted, samt gratis av skoler og kodeklubber.
                    </p>

                    {#if projects}
                        <div class="project-grid">
                            {#each projects as project}
                                <a href={project.url} target="_blank" rel="noopener noreferrer" class="project-card">
                                    <div class="project-header">
                                        <span class="project-title">{project.name}</span>
                                        <!-- External Link Icon -->
                                        <svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                    </div>
                                    <p class="project-desc">{project.description}</p>
                                    <div class="project-tech">
                                        {#each project.techStack as t}
                                            <span class="mini-tag">{t}</span>
                                        {/each}
                                    </div>
                                </a>
                            {/each}
                        </div>
                    {/if}
                </section>

                {#if experience}
                    <!-- Experience Timeline -->
                    <section class="timeline-section">
                        <h2>Erfaring</h2>
                        <div class="timeline">
                            {#each experience as job}

                                <div
                                        class="timeline-item {job.isOpen ? 'active' : ''}"
                                        onclick={() => toggleJob(job)}
                                        role="button"
                                        tabindex="0"
                                        onkeydown={(e) => { if(e.key === 'Enter' || e.key === ' ') toggleJob(job); }}
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
                                        {#if job.techTags}
                                            <div class="job-tech">
                                                {#each job.techTags as t}
                                                    <span class="tech-badge">{t}</span>
                                                {/each}
                                            </div>
                                        {/if}


                                        {#if job.isOpen}
                                            <div class="job-details">
                                                <hr class="separator"/>
                                                <Markdown toHtml={job.points} />
                                            </div>
                                        {:else}
                                            {#if job.points}
                                                <div class="expand-hint">
                                                    Vis nøkkelpunkter
                                                    <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                                </div>
                                            {/if}
                                        {/if}
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </section>
                {/if}
            </div>

        </main>
    </div>
{/if}

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

    :global(.job-details ul) {
        margin: 0;
        padding-left: 1.2rem;
        color: var(--secondary-text-color);
    }

    :global(.job-details li) {
        margin-bottom: 0.5rem; font-size: 0.95rem;
    }

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

    :global(.summary-card p) {
        font-size: 1rem;
        color: var(--primary-text-color);
        line-height: 1.6;
        margin: 20px 0;
    }
</style>