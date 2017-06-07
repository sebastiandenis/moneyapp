export class Outgo {
    constructor(public $key: string, public amount: number, public budgetLineId: string, public name?: string, public description?: string, ) { }

    static fromJson({$key, amount, budgetLineId, name, desc}): Outgo {
        return new Outgo($key, amount, budgetLineId, name, desc);
    }

    static fromJsonArray(json: any[]): Outgo[] {
        return json.map(outgoe => Outgo.fromJson(outgoe));
    }


}