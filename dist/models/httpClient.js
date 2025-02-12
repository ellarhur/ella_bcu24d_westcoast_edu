export class HttpClient{
    constructor() {
        this._url = "https://westcoasteducation30-d82b.restdb.io/rest/account";
    }
    async get(endpoint){
        try {
            const response = await fetch(endpoint, {
                headers: {
                    'x-apikey':'67acfca0ac0e2d31bf16ce2a',
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                return await response.json();
            } else { 
                throw new Error(`Felkod ${response.status} Felmeddelande:${response.statusTest}`);
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}