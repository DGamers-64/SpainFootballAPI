export default async function fetchCustom(url, { method = "GET", tipo = "json", body } = {}) {
    const config = { method };

    if (body && method !== "GET") {
        config.headers = { "Content-Type": "application/json" };
        config.body = JSON.stringify(body);
    }

    const res = await fetch(url, config);

    if (!res.ok) {
        throw new Error(`Error HTTP ${res.status}: ${res.statusText}`);
    }

    switch (tipo) {
        case "json":
            return res.json();
        case "text":
            return res.text();
        case "blob":
            return res.blob();
        case "arrayBuffer":
            return res.arrayBuffer();
        default:
            return res.text();
    }
}