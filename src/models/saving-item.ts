export class SavingItem {
    constructor(public $key: string, public amount: number, public savingLineId: string, public name?: string, public description?: string) { }

    static fromJson({$key, amount, savingLineId, name, desc}): SavingItem {
        return new SavingItem($key, amount, savingLineId, name, desc);
    }

    static fromJsonArray(json: any[]): SavingItem[] {
        return json.map(savingItem => SavingItem.fromJson(savingItem));
    }


}