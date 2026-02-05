import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
import type { Presentation } from '$lib/types/Presentation';

export const load: PageServerLoad = async ({ fetch }) => {
    if (!env.API_BASE_URL) {
        throw new Error("API_BASE_URL is not defined in the environment!");
    }

    console.log('Fetching presentations from server URL', env.API_BASE_URL);

    const fetchUrl = `${env.API_BASE_URL}/sequel-api/api-route/presentations`;

    const res = await fetch(fetchUrl);

    if (!res.ok) {
        throw new Error(`Failed to fetch presentations from external API: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // Sort presentations by createdAt date (newest first)
    const presentations = (data.presentations || []) as Presentation[];
    presentations.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA; // Oldest first
    });

    return {
        presentations
    };
};
