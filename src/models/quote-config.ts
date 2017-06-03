export class QuoteConfig {
    constructor(public $key: string, public lastQuoteId: string) { }

    static fromJson({$key, lastQuoteId}): QuoteConfig {
        return new QuoteConfig($key, lastQuoteId);
    }

}