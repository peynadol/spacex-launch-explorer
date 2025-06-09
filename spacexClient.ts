const BASE_URL = 'https://api.spacexdata.com/v5';

export async function postQuery(endpoint: string, body: object){
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`);
    }
    return res.json();
}


