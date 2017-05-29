export class CashShift {
    constructor(public $key: string, public wherToGoId: string, public amount: number) { }

    static fromJson({$key, whereToGo, amount}): CashShift {
        return new CashShift($key, whereToGo, amount);
    }

    static fromJsonArray(json: any[]): CashShift[] {
        return json.map(cashSh => CashShift.fromJson(cashSh));
    }

}