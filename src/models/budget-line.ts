import { Outgo } from "./outgo";
import { CashShift } from "./cash-shift";

export class BudgetLine {
    constructor(public $key: string, public name: string, public cashToSpend: number,
        public cashLeft: number, public outgoes: Outgo[], public noOutgoes: number, public shifts: CashShift[]) {

    }

    
    static fromJson({$key, name, cashToSpend, cashLeft, outgoes, noOutgoes, shifts}): BudgetLine {
        return new BudgetLine($key, name, cashToSpend, cashLeft, outgoes, noOutgoes, shifts);
    }

    static fromJsonArray(json: any[]): BudgetLine[] {
        return json.map(budget => BudgetLine.fromJson(budget));
    }
}