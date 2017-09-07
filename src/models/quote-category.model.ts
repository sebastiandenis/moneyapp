
export interface QuoteCategoryModel {
    $key: string;
    name: string;
    quotes: {};
}

export class QuoteCategory implements QuoteCategoryModel {
    constructor(public $key: string, public name: string, public quotes: {}) { }

    static fromJson({ $key, name, quotes }): QuoteCategory {
        return new QuoteCategory($key, name, quotes);
    }

    static fromJsonArray(json: any[]): QuoteCategory[] {
        return json.map(category => QuoteCategory.fromJson(category));
    }
}