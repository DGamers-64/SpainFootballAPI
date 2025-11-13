// Clase estática
class Fetch2 {
    static #resParsers = {
        json: res => res.json(),
        text: res => res.text(),
        blob: res => res.blob(),
        arrayBuffer: res => res.arrayBuffer()
    }

    static #prepareRequestBody(body, reqType, headers) {
        switch (reqType) {
            case "json": headers["Content-Type"] = "application/json"; return JSON.stringify(body)
            case "text": headers["Content-Type"] = "text/plain"; return body.toString()
            case "form-urlencoded": headers["Content-Type"] = "application/x-www-form-urlencoded"; return new URLSearchParams(body)
            case "formdata": return body
            default: return body
        }
    }

    static async #request(method, url, body, options) {
        const opts = { reqType: "json", resType: "json", ...options }
        const headers = {}
        const fetchOptions = { method, headers }

        if (body !== undefined) fetchOptions.body = Fetch2.#prepareRequestBody(body, opts.reqType, headers)

        try {
            const res = await fetch(url, fetchOptions)
            if (!res.ok) {
                // Si status no es 2xx, lanzar error con info
                throw new Error(`HTTP error ${res.status}: ${res.statusText}`)
            }
            const parser = Fetch2.#resParsers[opts.resType] || Fetch2.#resParsers.text
            return parser(res)
        } catch (err) {
            // Puedes loguear, o devolver un objeto de error consistente
            console.error(`Fetch2 ${method} error:`, err)
            throw err
        }
    }

    static get(url, options) { return Fetch2.#request("GET", url, undefined, options) }
    static post(url, body, options) { return Fetch2.#request("POST", url, body, options) }
    static put(url, body, options) { return Fetch2.#request("PUT", url, body, options) }
    static patch(url, body, options) { return Fetch2.#request("PATCH", url, body, options) }
    static delete(url, options) { return Fetch2.#request("DELETE", url, undefined, options) }
}

// Clase de instancia
class Fetch2Config {
    #options
    #resParsers = {
        json: res => res.json(),
        text: res => res.text(),
        blob: res => res.blob(),
        arrayBuffer: res => res.arrayBuffer()
    }

    constructor(options = { reqType: "json", resType: "json" }) {
        this.#options = { reqType: "json", resType: "json", ...options }
    }

    #prepareRequestBody(body, reqType, headers) {
        switch (reqType) {
            case "json": headers["Content-Type"] = "application/json"; return JSON.stringify(body)
            case "text": headers["Content-Type"] = "text/plain"; return body.toString()
            case "form-urlencoded": headers["Content-Type"] = "application/x-www-form-urlencoded"; return new URLSearchParams(body)
            case "formdata": return body
            default: return body
        }
    }

    async #request(method, url, body) {
        const headers = {}
        const fetchOptions = { method, headers }

        if (body !== undefined) fetchOptions.body = this.#prepareRequestBody(body, this.#options.reqType, headers)

        try {
            const res = await fetch(url, fetchOptions)
            if (!res.ok) {
                throw new Error(`HTTP error ${res.status}: ${res.statusText}`)
            }
            const parser = this.#resParsers[this.#options.resType] || this.#resParsers.text
            return parser(res)
        } catch (err) {
            console.error(`Fetch2Config ${method} error:`, err)
            throw err
        }
    }

    get(url) { return this.#request("GET", url) }
    post(url, body) { return this.#request("POST", url, body) }
    put(url, body) { return this.#request("PUT", url, body) }
    patch(url, body) { return this.#request("PATCH", url, body) }
    delete(url) { return this.#request("DELETE", url) }
}

// Export con nombres en minúscula
export default Fetch2
export const fetch2Config = Fetch2Config
