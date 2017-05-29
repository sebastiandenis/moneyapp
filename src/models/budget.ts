import { BudgetLine } from "./budget-line";
import { FirebaseListObservable } from "angularfire2/database";

export class Budget {

    constructor(public $key: string, public name: string, public dateStart: Date, public dateEnd: Date,
        public totalCash: number, public cashLeft: number, public budgetLines?: FirebaseListObservable<BudgetLine[]>) {

    }

    public getRoundedCashLeft() {
        // console.log("getRoundedCashLeft...");
        return Math.round(this.cashLeft);
    }

    public daysLeft(): number {
        if (this.dateEnd) {
            let today = new Date();
            return Math.round((this.dateEnd.valueOf() - today.valueOf()) / (1000 * 60 * 60 * 24));
        } else {
            return 0;
        }
    }


    perDay(): number {
        let daysLeft = this.daysLeft();
        if (daysLeft && daysLeft > 0 && this.cashLeft && this.cashLeft > 0) {
            return Math.round(this.cashLeft / daysLeft);
        } else {
            return 0;
        }
    }

    static fromJson({$key, name, dateStart, dateEnd, totalCash, cashLeft, lines}): Budget {
        return new Budget($key, name, new Date(dateStart), new Date(dateEnd), totalCash, cashLeft, lines);
    }

    static fromJsonArray(json: any[]): Budget[] {
        return json.map(budget => Budget.fromJson(budget));
    }

}