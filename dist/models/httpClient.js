// httpClient.ts
export class HttpClient {
    constructor(endpoint) {
        this._endpoint = endpoint;
    }
    async get() {
        try {
            const response = await fetch(this._endpoint);
            if (!response.ok) {
                throw new Error(`GET failed: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        }
        catch (error) {
            throw new Error(`HTTP Get error: ${error}`);
        }
    }
    async post(data) {
        try {
            const response = await fetch(this._endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`POST failed: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        }
        catch (error) {
            throw new Error(`HTTP Post error: ${error}`);
        }
    }
}
