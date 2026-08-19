# CV/Competence API Design

## Overview

Migrere statisk CV-data fra `/kompetanse`-siden til dynamisk data hentet fra SequelAPI via `cacheStore`. Dataen skal lagres i en MySQL-database og tilgjenges via GET-endepunkter med toppnivå-strukturering.

## Type Definitions

Alle typer legges i `src/lib/types/` og registreres i `+layout.svelte`.

## Single Endpoint API Design

### Recommended: GET /sequel-api/api-route/cvProfile/{id}

Returnerer all CV-data med sideloading i toppnivå-strukturer:

```json
{
    "cvProfile": { /* profildata */ },
    "cvExperiences": [ /* alle erfaringer */ ],
    "experiencePoints": [ /* alle punkter */ ],
    "cvEducations": [ /* utdanning */ ],
    "cvPublications": [ /* publikasjoner */ ],
    "cvProjects": [ /* prosjekter */ ],
    "cvSkills": [ /* kompetanse */ ],
    "cvTalks": [ /* foredrag */ ]
}
```

### Complete SQL Query

```sql
SELECT 
    p.*,
    
    -- Experiences (with points)
    concat('[', COALESCE((
        SELECT GROUP_CONCAT(
            concat(
                '{',
                '"id":"', e.id, '",',
                '"company":"', REPLACE(e.company, '"', '\\"'), '",',
                '"role":"', REPLACE(e.role, '"', '\\"'), '",',
                '"period":"', e.period, '",',
                '"description":"', REPLACE(e.description, '"', '\\"'), '",',
                '"sortOrder":', e.sort_order, ',',
                '"points":[', COALESCE((
                    SELECT GROUP_CONCAT(
                        concat('{"id":', ep.id, ',"pointText":"', REPLACE(ep.point_text, '"', '\\"'), '","sortOrder":', ep.sort_order, '}')
                        ORDER BY ep.sort_order
                    )
                    FROM experiencePoint ep WHERE ep.experienceId = e.id AND ep.cvProfileId = p.id
                ), ''), ']'
                ,'}'
            )
        )
        FROM cvExperience e WHERE e.cvProfileId = p.id ORDER BY e.sort_order
    ), ''), ']') as experiences,
    
    -- Education
    concat('[', COALESCE((
        SELECT GROUP_CONCAT(
            concat('{"id":', ed.id, ',"yearRange":"', ed.year_range, '","degree":"', REPLACE(ed.degree, '"', '\\"'), '","school":"', REPLACE(ed.school, '"', '\\"'), '","sortOrder":', ed.sort_order, '}')
            ORDER BY ed.sort_order
        )
        FROM cvEducation ed WHERE ed.cvProfileId = p.id
    ), ''), ']') as educations,
    
    -- Publications
    concat('[', COALESCE((
        SELECT GROUP_CONCAT(
            concat('{"id":', pub.id, ',"publicationText":"', REPLACE(pub.publication_text, '"', '\\"'), '","sortOrder":', pub.sort_order, '}')
            ORDER BY pub.sort_order
        )
        FROM cvPublication pub WHERE pub.cvProfileId = p.id
    ), ''), ']') as publications,
    
    -- Projects (with tech_stack as JSON array)
    concat('[', COALESCE((
        SELECT GROUP_CONCAT(
            concat(
                '{',
                '"id":', pr.id, ',',
                '"name":"', REPLACE(pr.name, '"', '\\"'), '",',
                '"url":"', COALESCE(pr.url, ''), '",',
                '"description":"', REPLACE(pr.description, '"', '\\"'), '",',
                '"techStack":', COALESCE(pr.tech_stack, '[]'), ',',
                '"sortOrder":', pr.sort_order,
                '}'
            )
        )
        FROM cvProject pr WHERE pr.cvProfileId = p.id ORDER BY pr.sort_order
    ), ''), ']') as projects,
    
    -- Skills
    concat('[', COALESCE((
        SELECT GROUP_CONCAT(
            concat('{"id":', sk.id, ',"category":"', REPLACE(sk.category, '"', '\\"'), '","skillName":"', REPLACE(sk.skill_name, '"', '\\"'), '","sortOrder":', sk.sort_order, '}')
            ORDER BY sk.category, sk.sort_order
        )
        FROM cvSkill sk WHERE sk.cvProfileId = p.id
    ), ''), ']') as skills,
    
    -- Talks
    concat('[', COALESCE((
        SELECT GROUP_CONCAT(
            concat('{"id":', ta.id, ',"year":', ta.year, ',"title":"', REPLACE(ta.title, '"', '\\"'), '","sortOrder":', ta.sort_order, '}')
            ORDER BY ta.year DESC, ta.sort_order
        )
        FROM cvTalk ta WHERE ta.cvProfileId = p.id
    ), ''), ']') as talks

FROM cvProfile p
WHERE p.id = {id}
```

**Response structure:**
```json
{
    "cvProfile": {
        "id": 1,
        "name": "Joachim Haagen Skeie",
        ...
    },
    "experiences": [...],
    "educations": [...],
    "publications": [...],
    "projects": [...],
    "skills": [...],
    "talks": [...]
}
```

## Database Schema

### Tabellstruktur (camelCase)

```
cvProfile (1 record)
├── cvExperience (many records) - cvProfileId FK
│   ├── techTags (many records) - many-to-many (kan sløyfes, bruke JSON i stedet)
│   └── experiencePoint (many records) - cvProfileId FK
├── cvEducation (many records) - cvProfileId FK
├── cvPublication (many records) - cvProfileId FK
├── cvProject (many records) - cvProfileId FK
├── cvSkill (many records) - cvProfileId FK, grouped by category
└── cvTalk (many records) - cvProfileId FK
```

### Detailed Table Definitions

**Important:** All tables except `cv_profile` must have a `cv_profile_id` foreign key to ensure data isolation when fetching by `{id}`. The single endpoint `GET /sequel-api/api-route/cvProfile/{id}` will return all related data filtered by this ID.

#### 1. `cvProfile` - Profilinformasjon (1 record)

**Purpose:** Lagre hovedprofilen med kontaktopplysninger og korthet sammendrag

**MySQL CREATE TABLE:**
```sql
CREATE TABLE cvProfile (
    id VARCHAR(200) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    email1 VARCHAR(255),
    email2 VARCHAR(255),
    phone VARCHAR(50),
    birthYear INT,
    imageUrl VARCHAR(512),
    summary TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**INSERT Example:**
```sql
INSERT INTO cvProfile (id, name, title, email1, email2, phone, birthYear, imageUrl, summary, createdAt, updatedAt)
VALUES (
    'joachim-haagen-skeie',
    'Joachim Haagen Skeie',
    'Seniorkonsulent | Tech Lead',
    'joachim@jpro.no',
    'joachim@skeiene.no',
    '4141 5805',
    1981,
    '/joachim_bilde.jpeg',
    '["Joachim er en strategisk og forretningsorientert teknologileder...", "...", "..."]',
    NOW(),
    NOW()
);
```

**API Response Structure:**
```json
{
    "cvProfile": {
        "id": "joachim-haagen-skeie",
        "name": "Joachim Haagen Skeie",
        "title": "Seniorkonsulent | Tech Lead",
        "email1": "joachim@jpro.no",
        "email2": "joachim@skeiene.no",
        "phone": "4141 5805",
        "birthYear": 1981,
        "imageUrl": "/joachim_bilde.jpeg",
        "summary": ["...", "...", "..."]
    }
}
```

---

#### 2. `cvExperience` - Arbeidserfaring

**Purpose:** Lagre alle jobber og prosjekter

**MySQL CREATE TABLE:**
```sql
CREATE TABLE cvExperience (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cvProfileId VARCHAR(200) NOT NULL,
    company VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    period VARCHAR(100), -- "2026 - Nå"
    description TEXT,
    sortOrder INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cvProfileId) REFERENCES cvProfile(id) ON DELETE CASCADE
);
```

**INSERT Example:**
```sql
INSERT INTO cvExperience (cvProfileId, company, role, period, description, sortOrder)
VALUES 
(1, 'jPro', 'Seniorkonsulent | Tech Lead & Arkitekt', '2026 - Nå', 'Som seniorkonsulent i jPro...', 1),
(2, 'Skaperiet / Blockuino', 'Gründer, Lead Fullstack Arkitekt', '2020 - Nå', 'Leder produktutviklingen av en komplett EdTech-plattform...', 2),
(3, 'NorgesGruppen ASA', 'Teknisk Arkitekt & Tech Lead (NGFLYT)', '2020 - 2023', 'Hovedarkitekt for NGFLYT/Luminate...', 3),
(4, 'KulturIT', 'Teknologileder & Lead Arkitekt', '2023 - 2025', 'Ledet selskapets strategiske teknologiløft...', 4),
(5, 'Kikora AS', 'Lead Frontend Arkitekt', '2019 - 2020', 'Ledet utviklingen av en integrert programmeringsmodul...', 5),
(6, 'Utdanningsetaten i Oslo', 'Fagansvarlig & Delprosjektleder', '2017 - 2019', 'Ledet den operative gjennomføringen...', 6),
(7, 'Kodegenet AS', 'Gründer, Daglig Leder & Lead Utvikler', '2015 - 2020', 'Bygget opp et EdTech-selskap...', 7),
(8, 'Akvaplan Niva / SenseERA', 'Lead Developer & Løsningsarkitekt', '2010 - 2020', 'Hadde teknisk totalansvar for SenseERA...', 8),
(9, 'EmberFest Conference', 'Grunnlegger & Konferansesjef', '2013 - 2016', 'Etablerte og driftet Europas ledende fagkonferanse...', 9),
(10, 'UMS (Everbridge)', 'Frontend Lead & Seniorkonsulent', '2015 - 2016', 'Modernisering av nasjonalt varslingssystem...', 10),
(11, 'SocialCee', 'Senior Frontend Arkitekt', '2014 - 2015', 'Teknisk modernisering av en SaaS-plattform...', 11),
(12, 'Schibsted / Aftenposten', 'Senior Systemutvikler (Backend)', '2013 - 2014', 'Utvikling av Aftenpostens digitale betalingsløsning...', 12),
(13, 'Gjensidige Forsikring', 'Senior Java Utvikler', '2013', 'Forvaltning av virksomhetskritisk eArkiv-løsning...', 13),
(14, 'Statens Pensjonskasse (SPK)', 'Senior Systemutvikler (PERFORM)', '2010 - 2011', 'Deltok i moderniseringen av Norges pensjonssystem...', 14),
(15, 'NorgesGruppen Data', 'Teamleder & Tech Lead', '2006 - 2010', 'Startet karrieren med raskt avansement...', 15);
```

**API Response Structure:**
```json
{
    "cvExperiences": [
        {
            "id": 1,
            "cvProfileId": 1,
            "company": "jPro",
            "role": "Seniorkonsulent | Tech Lead & Arkitekt",
            "period": "2026 - Nå",
            "description": "...",
            "sortOrder": 1
        }
    ]
}
```

---

#### 3. `experience_tech_tags` - Teknologi-koblingstabell

**Purpose:** Many-to-many kobling mellom erfaring og teknologier

**MySQL CREATE TABLE:**
```sql
CREATE TABLE experienceTechTags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    experience_id INT NOT NULL,
    tech_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (experience_id) REFERENCES cv_experience(id) ON DELETE CASCADE
);
```

**Alternative simpler approach (if SequelAPI doesn't support many-to-many):**
```sql
CREATE TABLE cvExperience (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    period VARCHAR(100),
    description TEXT,
    tech_tags JSON, -- Store as JSON array: ["Tech Lead", "Java", ...]
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**API Response Structure (with sideloading):**
```json
{
    "cvExperience": [
        {
            "id": 1,
            "company": "jPro",
            "role": "...",
            "period": "...",
            "description": "...",
            "tech_tag_ids": [1, 2, 3]
        }
    ],
    "techTags": [
        {"id": 1, "name": "Tech Lead"},
        {"id": 2, "name": "Java"},
        {"id": 3, "name": "Cloud"}
    ]
}
```

---

#### 4. `experiencePoint` - Jobbpunkter/points

**Purpose:** Lagre de spesifikke prestasjonene/punktene for hver jobb

**MySQL CREATE TABLE:**
```sql
CREATE TABLE experiencePoint (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cvProfileId VARCHAR(200) NOT NULL,
    experienceId INT NOT NULL,
    pointText TEXT NOT NULL,
    sortOrder INT DEFAULT 0,
    FOREIGN KEY (cvProfileId) REFERENCES cvProfile(id) ON DELETE CASCADE,
    FOREIGN KEY (experienceId) REFERENCES cvExperience(id) ON DELETE CASCADE
);
```

**INSERT Example:**
```sql
INSERT INTO experiencePoint (cvProfileId, experienceId, pointText, sortOrder)
VALUES 
(1, 1, 'Bistår kunder med teknisk ledelse i krevende prosjekter, med ansvar for arkitekturvalg, kodekvalitet og teamkultur.', 1),
(1, 1, 'Rådgiver for modernisering av systemporteføljer og overgang til skybaserte, mikrotjenesteorienterte arkitekturer.', 2),
(1, 1, 'Fungerer som ''spillende trener'' som kombinerer hands-on utvikling med mentoring for å løfte kompetansen i utviklingsteamene.', 3);
```

**API Response Structure:**
```json
{
    "cvExperiences": [...],
    "experiencePoints": [
        {
            "id": 1,
            "cvProfileId": 1,
            "experienceId": 1,
            "pointText": "Bistår kunder med teknisk ledelse...",
            "sortOrder": 1
        }
    ]
}
```

---

#### 5. `cvEducation` - Utdanning

**MySQL CREATE TABLE:**
```sql
CREATE TABLE cvEducation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cvProfileId VARCHAR(200) NOT NULL,
    yearRange VARCHAR(50), -- "2005 - 2006"
    degree VARCHAR(255) NOT NULL,
    school VARCHAR(255) NOT NULL,
    sortOrder INT DEFAULT 0,
    FOREIGN KEY (cvProfileId) REFERENCES cvProfile(id) ON DELETE CASCADE
);
```

**INSERT Example:**
```sql
INSERT INTO cvEducation (cvProfileId, yearRange, degree, school, sortOrder)
VALUES 
(1, '2005 - 2006', 'Master of Information Technology', 'Queensland University of Technology, Australia', 1),
(2, '2002 - 2004', 'Bachelor of Information Technology', 'Queensland University of Technology, Australia', 2),
(3, '2000 - 2001', 'Grunnfag i informasjonsteknologi', 'NTNU, Trondheim', 3),
(4, '1999 - 2000', 'Grunnfag i realfag', 'UiO, Oslo', 4);
```

**API Response:**
```json
{
    "cvEducations": [
        {
            "id": 1,
            "cvProfileId": 1,
            "yearRange": "2005 - 2006",
            "degree": "Master of Information Technology",
            "school": "Queensland University of Technology, Australia",
            "sortOrder": 1
        }
    ]
}
```

---

#### 6. `cv_publications` - Publikasjoner

**MySQL CREATE TABLE:**
```sql
CREATE TABLE cvPublication (
                                id INT PRIMARY KEY AUTO_INCREMENT,
                                cvProfileId varchar(200) NOT NULL,
                                publicationText TEXT NOT NULL, -- "2016: Fagbok: Scratch fra scratch..."
                                sortOrder INT DEFAULT 0,
                                FOREIGN KEY (cvProfileId) REFERENCES cvProfile(id) ON DELETE CASCADE
);
```

**API Response:**
```json
{
    "cvPublications": [
        {"id": 1, "publication_text": "2016: Fagbok: Scratch fra scratch", "sort_order": 1}
    ]
}
```

---

#### 7. `cv_projects` - Egne prosjekter

**MySQL CREATE TABLE:**
```sql
CREATE TABLE cvProject (
                            id INT NOT NULL AUTO_INCREMENT,
                            cvProfileId varchar(200) NOT NULL,
                            name VARCHAR(255) NOT NULL,
                            url VARCHAR(512),
                            description TEXT,
                            techStack JSON,
                            sortOrder INT DEFAULT 0,
                            PRIMARY KEY (id),
                            INDEX idx_cv_profile_id (cvProfileId), -- optional, but recommended
                            FOREIGN KEY (cvProfileId) REFERENCES cvProfile(id) ON DELETE CASCADE
)
```

**API Response:**
```json
{
    "cvProjects": [
        {
            "id": 1,
            "name": "Blockuino",
            "url": "https://blockuino.no",
            "description": "...",
            "tech_stack": ["Java 17", "Spring Boot", "SvelteKit"],
            "sort_order": 1
        }
    ]
}
```

---

#### 8. `cv_skills` - Kompetanseområder

**MySQL CREATE TABLE:**
```sql
CREATE TABLE cvSkill (
                          id INT PRIMARY KEY AUTO_INCREMENT,
                          cvProfileId varchar(200) NOT NULL,
                          category VARCHAR(100) NOT NULL, -- "Ledelse og strategi"
                          skillName VARCHAR(100) NOT NULL, -- "Teamledelse og mentoring"
                          sortOrder INT DEFAULT 0,
                          FOREIGN KEY (cvProfileId) REFERENCES cvProfile(id) ON DELETE CASCADE
);
```

**Alternative (if category should be separate table):**
```sql
CREATE TABLE skill_category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE cv_skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES skill_category(id)
);
```

**API Response:**
```json
{
    "cvSkills": [
        {
            "id": 1,
            "category": "Ledelse og strategi",
            "skill_name": "Teamledelse og mentoring",
            "sort_order": 1
        }
    ]
}
```

---

#### 9. `cv_talks` - Foredrag og kurs

**MySQL CREATE TABLE:**
```sql
CREATE TABLE cvTalk (
                         id INT PRIMARY KEY AUTO_INCREMENT,
                         cvProfileId varchar(200) NOT NULL,
                         year INT NOT NULL,
                         title VARCHAR(512) NOT NULL,
                         sortOrder INT DEFAULT 0,
                         FOREIGN KEY (cvProfileId) REFERENCES cvProfile(id) ON DELETE CASCADE
);
```

**API Response:**
```json
{
    "cvTalks": [
        {
            "id": 1,
            "year": 2025,
            "title": "Kunstig «intelligens» i museumsløsningene",
            "sort_order": 1
        }
    ]
}
```

---

## Single API Endpoint Design

### Recommended Approach: GET /sequel-api/api-route/cvProfile/{id}

Returnerer all CV-data med sideloading i toppnivå-strukturer:

```json
{
    "cvProfile": { /* profildata */ },
    "cvExperiences": [ /* alle erfaringer */ ],
    "experiencePoints": [ /* alle punkter */ ],
    "cvEducations": [ /* utdanning */ ],
    "cvPublications": [ /* publikasjoner */ ],
    "cvProjects": [ /* prosjekter */ ],
    "cvSkills": [ /* kompetanse */ ],
    "cvTalks": [ /* foredrag */ ]
}
```

### SQL Query for Single Endpoint

```sql
SELECT 
    p.*,
    
    -- Experiences (with points)
    concat('[', COALESCE((
        SELECT GROUP_CONCAT(
            concat(
                '{',
                '"id":"', e.id, '",',
                '"company":"', REPLACE(e.company, '"', '\\"'), '",',
                '"role":"', REPLACE(e.role, '"', '\\"'), '",',
                '"period":"', e.period, '",',
                '"description":"', REPLACE(e.description, '"', '\\"'), '",',
                '"sort_order":', e.sort_order, ',',
                '"points":[', COALESCE((
                    SELECT GROUP_CONCAT(
                        concat('{"id":', ep.id, ',"point_text":"', REPLACE(ep.point_text, '"', '\\"'), '","sort_order":', ep.sort_order, '}')
                        ORDER BY ep.sort_order
                    )
                    FROM experience_points ep WHERE ep.experience_id = e.id AND ep.cv_profile_id = p.id
                ), ''), ']'
                ,'}'
            )
        )
        FROM cv_experience e WHERE e.cv_profile_id = p.id ORDER BY e.sort_order
    ), ''), ']') as experiences,
    
    -- Education
    concat('[', COALESCE((
        SELECT GROUP_CONCAT(
            concat('{"id":', ed.id, ',"year_range":"', ed.year_range, '","degree":"', REPLACE(ed.degree, '"', '\\"'), '","school":"', REPLACE(ed.school, '"', '\\"'), '","sort_order":', ed.sort_order, '}')
            ORDER BY ed.sort_order
        )
        FROM cv_education ed WHERE ed.cv_profile_id = p.id
    ), ''), ']') as educations,
    
    -- Publications
    concat('[', COALESCE((
        SELECT GROUP_CONCAT(
            concat('{"id":', pub.id, ',"publication_text":"', REPLACE(pub.publication_text, '"', '\\"'), '","sort_order":', pub.sort_order, '}')
            ORDER BY pub.sort_order
        )
        FROM cv_publications pub WHERE pub.cv_profile_id = p.id
    ), ''), ']') as publications,
    
    -- Projects (with tech_stack as JSON array)
    concat('[', COALESCE((
        SELECT GROUP_CONCAT(
            concat(
                '{',
                '"id":', pr.id, ',',
                '"name":"', REPLACE(pr.name, '"', '\\"'), '",',
                '"url":"', COALESCE(pr.url, ''), '",',
                '"description":"', REPLACE(pr.description, '"', '\\"'), '",',
                '"tech_stack":', COALESCE(pr.tech_stack, '[]'), ',',
                '"sort_order":', pr.sort_order,
                '}'
            )
        )
        FROM cv_projects pr WHERE pr.cv_profile_id = p.id ORDER BY pr.sort_order
    ), ''), ']') as projects,
    
    -- Skills
    concat('[', COALESCE((
        SELECT GROUP_CONCAT(
            concat('{"id":', sk.id, ',"category":"', REPLACE(sk.category, '"', '\\"'), '","skill_name":"', REPLACE(sk.skill_name, '"', '\\"'), '","sort_order":', sk.sort_order, '}')
            ORDER BY sk.category, sk.sort_order
        )
        FROM cv_skills sk WHERE sk.cv_profile_id = p.id
    ), ''), ']') as skills,
    
    -- Talks
    concat('[', COALESCE((
        SELECT GROUP_CONCAT(
            concat('{"id":', ta.id, ',"year":', ta.year, ',"title":"', REPLACE(ta.title, '"', '\\"'), '","sort_order":', ta.sort_order, '}')
            ORDER BY ta.year DESC, ta.sort_order
        )
        FROM cv_talks ta WHERE ta.cv_profile_id = p.id
    ), ''), ']') as talks

FROM cvProfile p
WHERE p.id = {id}
```

**Response structure:**
```json
{
    "cvProfile": {
        "id": "joachim-haagen-skeie",
        "name": "Joachim Haagen Skeie",
        ...
    },
    "cvExperiences": [...],
    "experiencePoints": [...],
    "cvEducations": [...],
    "cvPublications": [...],
    "cvProjects": [...],
    "cvSkills": [...],
    "cvTalks": [...]
}
```

### Alternative: Separate Queries (if SequelAPI doesn't support complex joins)

Hvis SequelAPI ikke støtter komplekse SQL-queries med GROUP_CONCAT, Kan hente hovedprofilen og deretter side-load relaterte data:

```typescript
// In +page.svelte
let profile: CVProfile;
let experience: CVExperience[];
let education: CVEducation[];
// ... etc

onMount(async () => {
    profile = await cacheStore.fetchOne<CVProfile>('cvProfile', 1);
    experience = await cacheStore.fetchAll<CVExperience>('cvExperience');
    education = await cacheStore.fetchAll<CVEducation>('cvEducation', [
        { sortColumn: 'sort_order', sortOrder: 'asc' }
    ]);
    // ... etc
});
```

**Men den anbefalte tilnærmingen er den første (single endpoint med all data).**

### Sidenet API Calls (via cacheStore)

**Example in `src/routes/kompetanse/+page.svelte`:**
```typescript
<script lang="ts">
    import { onMount } from 'svelte';
    import { cacheStore } from 'svelte-cache-store';
    import type { 
        CVProfile, 
        CVExperience, 
        CVEducation, 
        CVPublication, 
        CVProject, 
        CVSkill, 
        CVTalk,
        ExperiencePoint
    } from '$lib/types/CV';

    let profile: CVProfile;
    let experience: CVExperience[];
    let education: CVEducation[];
    let publications: CVPublication[];
    let projects: CVProject[];
    let skills: CVSkill[];
    let talks: CVTalk[];

    onMount(async () => {
        profile = await cacheStore.fetchOne<CVProfile>('cvProfile', 1);
        experience = await cacheStore.fetchAll<CVExperience>('cvExperience');
        education = await cacheStore.fetchAll<CVEducation>('cvEducation', [
            { sortColumn: 'sort_order', sortOrder: 'asc' }
        ]);
        publications = await cacheStore.fetchAll<CVPublication>('cvPublication', [
            { sortColumn: 'sort_order', sortOrder: 'asc' }
        ]);
        projects = await cacheStore.fetchAll<CVProject>('cvProject', [
            { sortColumn: 'sort_order', sortOrder: 'asc' }
        ]);
        skills = await cacheStore.fetchAll<CVSkill>('cvSkill', [
            { sortColumn: 'sort_order', sortOrder: 'asc' }
        ]);
        talks = await cacheStore.fetchAll<CVTalk>('cvTalk', [
            { sortColumn: 'sort_order', sortOrder: 'asc' }
        ]);
    });
</script>
```

---

## Implementation Steps

### 1. Create TypeScript Types

Opprett følgende typer i `src/lib/types/`:

```typescript
// src/lib/types/CV.ts

export interface CVProfile {
    id: string;
    name: string;
    title: string;
    email1?: string;
    email2?: string;
    phone?: string;
    birthYear: number;
    imageUrl: string;
    summary: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface CVExperience {
    id: number;
    cvProfileId: string;
    company: string;
    role: string;
    period: string;
    description: string;
    techTags?: string[];
    sortOrder: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ExperiencePoint {
    id: number;
    cvProfileId: string;
    experienceId: number;
    pointText: string;
    sortOrder: number;
}

export interface CVPublication {
    id: number;
    cvProfileId: string;
    publicationText: string;
    sortOrder: number;
}

export interface CVProject {
    id: number;
    cvProfileId: string;
    name: string;
    url?: string;
    description: string;
    techStack: string[];
    sortOrder: number;
}

export interface CVSkill {
    id: number;
    cvProfileId: string;
    category: string;
    skillName: string;
    sortOrder: number;
}

export interface CVTalk {
    id: number;
    cvProfileId: string;
    year: number;
    title: string;
    sortOrder: number;
}

export interface CVEducation {
    id: number;
    cvProfileId: string;
    yearRange: string;
    degree: string;
    school: string;
    sortOrder: number;
}
```

### 2. Update +layout.svelte

Legg til alle registreringer i `src/routes/+layout.svelte`:

```typescript
import type {Article} from "$lib/types/Article";
import type {CVProfile, CVExperience, ExperiencePoint, CVPublication, 
              CVProject, CVSkill, CVTalk, CVEducation} from "$lib/types/CV";

cacheStore.registerType<Article>('article', 'articles', '/sequel-api/api-route')
cacheStore.registerType<CVProfile>('cvProfile', 'cvProfiles', '/sequel-api/api-route')
cacheStore.registerType<CVExperience>('cvExperience', 'cvExperiences', '/sequel-api/api-route')
cacheStore.registerType<ExperiencePoint>('experiencePoint', 'experiencePoints', '/sequel-api/api-route')
cacheStore.registerType<CVPublication>('cvPublication', 'cvPublications', '/sequel-api/api-route')
cacheStore.registerType<CVProject>('cvProject', 'cvProjects', '/sequel-api/api-route')
cacheStore.registerType<CVSkill>('cvSkill', 'cvSkills', '/sequel-api/api-route')
cacheStore.registerType<CVTalk>('cvTalk', 'cvTalks', '/sequel-api/api-route')
cacheStore.registerType<CVEducation>('cvEducation', 'cvEducations', '/sequel-api/api-route')
```

### 3. Database Setup
   - Run CREATE TABLE statements on MySQL
   - Insert existing CV data (manual or script)
   - Verify data integrity

### 4. SequelAPI Configuration
   - Configure each table in SequelAPI admin
   - Set up proper permissions (read-only for API users)
   - Test each endpoint

### 5. SvelteKit Integration
   - Update `src/routes/kompetanse/+page.svelte` to fetch from cacheStore
   - Update component to work with dynamic data
   - Add loading states and error handling

### 6. Testing
    - Verify all data displays correctly
    - Test theme switching still works
    - Verify responsive design

## Notes

- **Versioning:** Consider adding `version` column to `cv_profile` for cache invalidation
- **Caching:** `cacheStore` handles caching automatically based on configured TTL
- **Fallback:** Keep static data as fallback during migration
- **Side-loading:** SequelAPI supports side-loading in separate top-level structures (if needed for related data)

## Database Setup - INSERT SQL Statements

Sett `cvProfile.id = 'joachim-haagen-skeie'` (hardcoded verdien)

### cvPublication

```sql
INSERT INTO cvPublication (cvProfileId, publicationText, sortOrder)
VALUES 
("joachim-haagen-skeie", '2016: Fagbok: Scratch fra scratch | Kodegenet (Eget forlag)', 1),
("joachim-haagen-skeie", '2014: Fagbok: Ember.js in Action | Manning Publications (Internasjonalt forlag)', 2),
("joachim-haagen-skeie", '2013: Artikkel: Ember.js - Web Applications Done Right Follow-up | InfoQ', 3),
("joachim-haagen-skeie", '2012: Artikkel: Ember.js: Rich Web Applications Done Right | InfoQ', 4),
("joachim-haagen-skeie", '2011: Artikkel: Effective Java Profiling With Open Source Tools | InfoQ', 5);
```

### cvProject

```sql
INSERT INTO cvProject (cvProfileId, name, url, description, techStack, sortOrder)
VALUES 
("joachim-haagen-skeie", 'Blockuino', 'https://blockuino.no', 'Komplett SaaS-plattform for blokkprogrammering av mikrokontrollere (Arduino/ESP32). Fullstack Java/Svelte-løsning med avansert hardware-integrasjon i nettleser via WebSerial.', '["Systemarkitektur", "Java 17 / Spring Boot", "SvelteKit", "Docker / K8s", "WebSerial API", "C++ Kompilering"]', 1),

("joachim-haagen-skeie", 'Blockuino Mini', 'https://mini.blockuino.no', 'Tilpasset versjon for de yngste, med fokus på UX og forenklet grensesnitt. Demonstrerer gjenbruk av kjerne-backend med ny frontend-klient.', '["Frontend Arkitektur", "UX Design", "SvelteKit", "Java Backend"]', 2),

("joachim-haagen-skeie", 'Midgard', 'https://skaperiet.no/midgard', 'Gamification av læring. Et norrønt-inspirert spill hvor logiske gåter løses med kodeblokker. Egenutviklet spillmotor i nettleseren.', '["Spillutvikling", "Canvas API", "SvelteKit", "Algoritmisk tenkning"]', 3),

("joachim-haagen-skeie", 'Klosslabben', 'https://skaperiet.no/klosslabben', 'Nettbasert 3D-modelleringsverktøy (Voxel-basert). Lar brukere designe figurer og eksportere direkte til STL for 3D-printing.', '["3D Grafikk", "Three.js", "Filgenerering (Binary STL)", "SvelteKit"]', 4),

("joachim-haagen-skeie", 'P5 Editor Suite', 'https://skaperiet.no/editor', 'Fullverdig sky-IDE for kreativ koding (JavaScript/P5.js). Inneholder både blokk- og tekstbasert editor, live preview og pikselkunst-verktøy.', '["Cloud IDE", "JavaScript", "Docker", "SvelteKit", "Sanntidskompilering"]', 5);
```

### cvSkill

```sql
INSERT INTO cvSkill (cvProfileId, category, skillName, sortOrder)
VALUES 
("joachim-haagen-skeie", 'Ledelse og strategi', 'Teamledelse og mentoring', 1),
("joachim-haagen-skeie", 'Ledelse og strategi', 'Strategisk rådgivning (AI/ML)', 2),
("joachim-haagen-skeie", 'Ledelse og strategi', 'Rekruttering og teambygging', 3),
("joachim-haagen-skeie", 'Ledelse og strategi', 'Budsjett- og resultatansvar', 4),
("joachim-haagen-skeie", 'Ledelse og strategi', 'Forretningsutvikling', 5),
("joachim-haagen-skeie", 'Ledelse og strategi', 'Prosjektledelse og anbud', 6),

("joachim-haagen-skeie", 'Teknisk Arkitektur', 'System- og løsningsarkitektur', 1),
("joachim-haagen-skeie", 'Teknisk Arkitektur', 'Java (Dyp kjernekompetanse)', 2),
("joachim-haagen-skeie", 'Teknisk Arkitektur', 'Frontend (React, Svelte)', 3),
("joachim-haagen-skeie", 'Teknisk Arkitektur', 'Mikrotjenester og API-er', 4),
("joachim-haagen-skeie", 'Teknisk Arkitektur', 'Databasemodellering (SQL, NoSQL)', 5);
```

### cvTalk

```sql
INSERT INTO cvTalk (cvProfileId, year, title, sortOrder)
VALUES 
("joachim-haagen-skeie", 2025, 'Kunstig «intelligens» i museumsløsningene | eKulturseminar KulturIT', 1),
("joachim-haagen-skeie", 2025, '3D printing (kurs) | JavaZone Kids', 2),
("joachim-haagen-skeie", 2023, 'Making the web Svelter (tm) with SvelteKit | JavaZone (kurs) og Framsida (foredrag)', 3),
("joachim-haagen-skeie", 2019, 'Kreativ elektronikk med Arduino (for barn) | Booster Conference', 4),
("joachim-haagen-skeie", 2014, 'Ember.js in Action | Ember London', 5);
```

### cvEducation

```sql
INSERT INTO cvEducation (cvProfileId, yearRange, degree, school, sortOrder)
VALUES 
("joachim-haagen-skeie", '2005 - 2006', 'Master of Information Technology', 'Queensland University of Technology, Australia', 1),
("joachim-haagen-skeie", '2002 - 2004', 'Bachelor of Information Technology', 'Queensland University of Technology, Australia', 2),
("joachim-haagen-skeie", '2000 - 2001', 'Grunnfag i informasjonsteknologi', 'NTNU, Trondheim', 3),
("joachim-haagen-skeie", '1999 - 2000', 'Grunnfag i realfag', 'UiO, Oslo', 4);
```

### cvExperience

```sql
INSERT INTO cvExperience (cvProfileId, company, role, period, description, sortOrder)
VALUES 
("joachim-haagen-skeie", 'jPro', 'Seniorkonsulent | Tech Lead & Arkitekt', '2026 - Nå', 'Som seniorkonsulent i jPro går Joachim inn i roller som Tech Lead eller Lead Arkitekt for kunder med komplekse digitaliseringsbehov. Han spesialiserer seg på å bygge broen mellom forretningsstrategi og teknisk utførelse, med særlig fokus på moderne Java-arkitektur, skyplattformer og skjæringspunktet mellom IT og foretning.', 1),
("joachim-haagen-skeie", 'KulturIT', 'Teknologileder & Lead Arkitekt', '2023 - 2025', 'Ledet selskapets strategiske teknologiløft og AI-satsing for Primus, Nordens ledende forvaltningssystem for museer (300+ kunder). Ansvarlig for å modernisere arkitekturen og realisere gevinstene ved bruk av kunstig intelligens.', 2),
("joachim-haagen-skeie", 'Skaperiet / Blockuino', 'Gründer, Lead Fullstack Arkitekt', '2020 - Nå', 'Leder produktutviklingen av en komplett EdTech-plattform (SaaS) som lar elever programmere fysisk elektronikk direkte i nettleseren. Har hatt totalansvar for arkitektur, utvikling og drift fra konsept til produksjon.', 3),
("joachim-haagen-skeie", 'NorgesGruppen ASA', 'Teknisk Arkitekt & Tech Lead (NGFLYT)', '2020 - 2023', 'Hovedarkitekt for NGFLYT/Luminate, konsernets sentrale initiativ for å modernisere verdikjeden. Systemet styrer vareflyt og logistikk for milliarder av kroner og krever ekstrem oppetid.', 4),
("joachim-haagen-skeie", 'Kikora AS', 'Lead Frontend Arkitekt', '2019 - 2020', 'Ledet utviklingen av en integrert programmeringsmodul i Kikoras læringsplattform i forbindelse med fagfornyelsen (LK20).', 5),
("joachim-haagen-skeie", 'Utdanningsetaten i Oslo', 'Fagansvarlig & Delprosjektleder', '2017 - 2019', 'Ledet den operative gjennomføringen av storsatsingen ''Koding i Skolen'', et massivt logistikk- og opplæringsprosjekt som nådde 12 000 elever.', 6),
("joachim-haagen-skeie", 'Kodegenet AS', 'Gründer, Daglig Leder & Lead Utvikler', '2015 - 2020', 'Bygget opp et EdTech-selskap fra idé til nasjonal aktør. Kombinerte rollen som bedriftsleder med rollen som Lead Utvikler for selskapets digitale plattformer.', 7),
("joachim-haagen-skeie", 'Akvaplan Niva / SenseERA', 'Lead Developer & Løsningsarkitekt', '2010 - 2020', 'Hadde teknisk totalansvar for SenseERA, en kritisk analyseplattform for beregning av miljørisiko ved oljeutslipp. Ledet modernisering og forvaltning over en 10-års periode.', 8),
("joachim-haagen-skeie", 'EmberFest Conference', 'Grunnlegger & Konferansesjef', '2013 - 2016', 'Etablerte og driftet Europas ledende fagkonferanse for Ember.js-rammeverket. Bygget et internasjonalt fagmiljø.', 9),
("joachim-haagen-skeie", 'UMS (Everbridge)', 'Frontend Lead & Seniorkonsulent', '2015 - 2016', 'Modernisering av nasjonalt varslingssystem for krisehåndtering. Ledet frontend-arbeidet i et distribuert team.', 10),
("joachim-haagen-skeie", 'SocialCee', 'Senior Frontend Arkitekt', '2014 - 2015', 'Teknisk modernisering av en SaaS-plattform for publikumsengasjement på store sportsarrangementer.', 11),
("joachim-haagen-skeie", 'Schibsted / Aftenposten', 'Senior Systemutvikler (Backend)', '2013 - 2014', 'Utvikling av Aftenpostens digitale betalingsløsning. Fokus på integrasjon og høyt transaksjonsvolum.', 12),
("joachim-haagen-skeie", 'Gjensidige Forsikring', 'Senior Java Utvikler', '2013', 'Forvaltning av virksomhetskritisk eArkiv-løsning som håndterer all kundekommunikasjon og poliser.', 13),
("joachim-haagen-skeie", 'Statens Pensjonskasse (SPK)', 'Senior Systemutvikler (PERFORM)', '2010 - 2011', 'Deltok i moderniseringen av Norges pensjonssystem. Et av landets største IT-prosjekter med absolutte tidsfrister.', 14),
("joachim-haagen-skeie", 'NorgesGruppen Data', 'Teamleder & Tech Lead', '2006 - 2010', 'Startet karrieren med raskt avansement. Fikk tidlig ansvar for å lede utviklingen av konsernets viktigste handelssystemer.', 15);
```
