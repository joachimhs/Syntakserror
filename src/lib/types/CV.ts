import type {CacheItem} from "svelte-cache-store";

export interface CVProfile extends CacheItem {
    name: string;
    title: string;
    email1?: string;
    email2?: string;
    phone?: string;
    birthYear: number;
    imageUrl: string;
    summary: string;
    createdAt?: string;
    updatedAt?: string;
    cvProjects: string[];
    cvExperience: string[];
    cvSkills: string[];
    cvEducations: string[];
    cvPublications: string[];
    cvTalks: string[];
}

export interface CVResponse extends CacheItem {
    cvProfile: CVProfile;
    cvExperiences: CVExperience[];
    experiencePoints?: ExperiencePoint[];
    cvEducations: CVEducation[];
    cvPublications: CVPublication[];
    cvProjects: CVProject[];
    cvSkills: CVSkill[];
    cvTalks: CVTalk[];
}

export interface CVExperience extends CacheItem {
    cvProfileId: string;
    company: string;
    role: string;
    period: string;
    description: string;
    techTags?: string[];
    sortOrder: number;
    createdAt?: string;
    updatedAt?: string;
    points?: string[];
    isOpen: boolean;
}

export interface ExperiencePoint extends CacheItem {
    cvProfileId: string;
    experienceId: number;
    pointText: string;
    sortOrder: number;
}

export interface CVPublication extends CacheItem {
    cvProfileId: string;
    publicationText: string;
    sortOrder: number;
}

export interface CVProject extends CacheItem {
    cvProfileId: string;
    name: string;
    url?: string;
    description: string;
    techStack: string[];
    sortOrder: number;
}

export interface CVSkill extends CacheItem {
    cvProfileId: string;
    category: string;
    skillName: string;
    sortOrder: number;
}

export interface CVTalk extends CacheItem {
    cvProfileId: string;
    year: number;
    title: string;
    sortOrder: number;
}

export interface CVEducation extends CacheItem {
    cvProfileId: string;
    yearRange: string;
    degree: string;
    school: string;
    sortOrder: number;
}
