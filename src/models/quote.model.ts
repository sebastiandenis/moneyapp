import { Translation } from "./translation";


export const enum QuoteCategory {
    MONEY = "money",
    HEALTH = "health"
}

export interface QuoteModel {
    $key: string;
    author: string;
    translations: Translation;
}

export class Quote implements QuoteModel {
    constructor(public $key: string, public author: string, public translations: Translation) { }

    static fromJson({ $key, author, translations }): Quote {
        return new Quote($key, author, translations);
    }

    static fromJsonArray(json: any[]): Quote[] {
        return json.map(quote => Quote.fromJson(quote));
    }

}