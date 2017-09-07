export interface QuoteConfigModel {
    $key: string;
    lastQuoteId: string;
}

export class QuoteConfig implements QuoteConfigModel {
    constructor(public $key: string, public lastQuoteId: string) { }

    static fromJson({$key, lastQuoteId}): QuoteConfig {
        return new QuoteConfig($key, lastQuoteId);
    }

}