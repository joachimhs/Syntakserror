export async function handle({event, resolve}) {
    console.log('SvelteKit Hook: handle');
    if (event.request.url.includes('/syntakserror-app')) {
        console.log('skipping hook for syntakserror-app');
        return await resolve(event);
    }

    console.log('\t\tregistering event for: ' + event.request.url);

    if (event.request.url.includes('/sequel-api') || event.request.url.includes('node_modules')) {
        console.log('skipping hook for /sequel-api and node_modules');
        return await resolve(event);
    }

    console.log('registering url event: ' + event.request.url);
    const cookies = parseCookies(event.request.headers.get("cookie") || '');
    const uuid = cookies['uuid'];

    const referrer = event.request.headers.get('referer') || '';
    const requestHost = new URL(event.request.url).host;
    const urlContainsReferrerHost = referrer && new URL(referrer).host === requestHost;

    let data = {
        id: stripUrl(event.request.url),
        type: 'url'
    }

    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

    if (uuid) {
        headers['cookie'] = 'uuid=' + uuid;
    }

    let rawResponse = await event.fetch('/sequel-api/admin/monitoringEvents', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: headers
    });

    if (!urlContainsReferrerHost) {
        data = {
            id: stripUrl(referrer),
            type: 'referrer'
        }

        rawResponse = await event.fetch('/sequel-api/admin/monitoringEvents', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: headers
        });
    }

    console.log('registered url event: ' + event.request.url + ' with status: ' + rawResponse.status);

    const response = await resolve(event);
    return response;
}

function stripUrl(url) {
    // Remove http:// or https://
    let strippedUrl = url.replace(/^(http:\/\/|https:\/\/)/, "");

    // Remove the query string and everything after "__"
    strippedUrl = strippedUrl.split('?')[0].split('__')[0];

    if (strippedUrl.endsWith('/')) {
        strippedUrl = strippedUrl.slice(0, -1);
    }

    return strippedUrl;
}

function parseCookies(cookieString) {
    if (cookieString === null || cookieString === '') return {};

    const cookies = {};
    cookieString.split(';').forEach(cookie => {
        const [name, value] = cookie.split('=').map(c => c.trim());
        cookies[name] = value;
    });

    return cookies;
}

