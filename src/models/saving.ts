import { SavingLine } from "./saving-line";
import { FirebaseListObservable } from "angularfire2/database";

export class Saving {

    constructor(
        public $key: string,
        public name: string,
        public totalCash: number,
        public lines: any,
        public savingLines: FirebaseListObservable<SavingLine[]>) {

    }

    public getRoundedTotalCash() {
        // console.log("getRoundedCashLeft...");
        return Math.round(this.totalCash);
    }


    static fromJson({$key, name, totalCash, lines, savingLines}): Saving {
        return new Saving($key, name, totalCash, lines, savingLines);
    }

    static fromJsonArray(json: any[]): Saving[] {
        return json.map(saving => Saving.fromJson(saving));
    }

}