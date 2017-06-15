
export class SavingLine {
    constructor(
        public $key: string,
        public savingId: string,
        public name: string,
        public cashLeft: number) {

    }


    static fromJson({$key, budgetId, name, cashLeft}): SavingLine {
        return new SavingLine($key, budgetId, name, cashLeft);
    }

    static fromJsonArray(json: any[]): SavingLine[] {
        return json.map(sLine => SavingLine.fromJson(sLine));
    }
}