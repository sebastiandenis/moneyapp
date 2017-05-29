import { Translation } from "./translation";

export class Quote {
    constructor(public $key: string, public author: string, public translations: Translation) { }

    static fromJson({$key, author, translations}): Quote {
        return new Quote($key, author, translations);
    }

    static fromJsonArray(json: any[]): Quote[] {
        return json.map(quote => Quote.fromJson(quote));
    }

}