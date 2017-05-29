export class Outgo {
    constructor(public $key: string, public amount: number, public name?: string, public description?: string, ) { }

    static fromJson({$key, amount, name, desc}): Outgo {
        return new Outgo($key, amount, name, desc);
    }

    static fromJsonArray(json: any[]): Outgo[] {
        return json.map(outgoe => Outgo.fromJson(outgoe));
    }

    
}