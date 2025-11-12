import { env } from '$env/dynamic/private';
import type {Article} from "$lib/types/Article";

export async function load({ url, fetch }) {
    if (!env.API_BASE_URL) {
        throw new Error("API_BASE_URL is not defined in the environment!");
    }

    console.log("url host: ", url.host);
    console.log("url path: ", url.pathname);

    if (url.pathname.startsWith("/artikkel/")) {
        let pathname = "" + url.pathname;
        let articleId = pathname.slice("/artikkel/".length);

        // ✅ SANITIZE articleId: remove non-alphanumeric and non-hyphen/underscore characters
        articleId = articleId.replace(/[^\w\-]/g, '');

        console.log("articleId: ", articleId);

        const fetchUrl = `${env.API_BASE_URL}/sequel-api/api-route/articles/${articleId}`;

        console.log("fetchUrl2: ", fetchUrl);
        const res = await fetch(fetchUrl);

        console.log("res: ", res);

        if (res.ok) {
            console.log("res.ok");
            const data = await res.json();

            console.log(data);

            // The data returned here is securely passed to the client.
            return {
                openGraphic: {
                    siteName:"Syntakserror.no",
                    image: "https://syntakserror.no" + data.article.thumbnail,
                    description: data.article.preamble,
                    title: data.article.title,
                    width: 1200,
                    height: 630,
                    type: "website"
                }
            };
        }
    }

    return null;
}