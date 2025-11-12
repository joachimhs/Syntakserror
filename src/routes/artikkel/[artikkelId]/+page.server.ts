import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types'; // Note: PageServerLoad, not PageLoad
import type { Article } from '$lib/types/Article';

export const load: PageServerLoad = async ({ fetch, params }) => {
    if (!env.API_BASE_URL) {
        throw new Error("API_BASE_URL is not defined in the environment!");
    }

    console.log('server URL', env.API_BASE_URL);
    // This code now ONLY runs on the server.
    const fetchUrl = `${env.API_BASE_URL}/sequel-api/api-route/articles/${params.artikkelId}`;

    // This 'fetch' makes a real network request from the SvelteKit container
    // to the API container.
    const res = await fetch(fetchUrl);

    if (!res.ok) {
        throw new Error(`Failed to fetch article from external API: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();

    // The data returned here is securely passed to the client.
    return {
        article: data.article as Article
    };
};