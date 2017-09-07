
export interface BudgetModel {
    $key: string;
    name: string;
    dateStart: Date;
    dateEnd: Date;
    totalCash: number;
    cashLeft: number;

}

export class Budget implements BudgetModel {
    constructor(public $key: string,
        public name: string,
        public dateStart: Date,
        public dateEnd: Date,
        public totalCash: number,
        public cashLeft: number) {
    }



    static fromJson({ $key, name, dateStart, dateEnd, totalCash, cashLeft }): Budget {
        return new Budget($key, name, new Date(dateStart), new Date(dateEnd), totalCash, cashLeft);
    }

    static fromJsonArray(json: any[]): Budget[] {
        return json.map(budget => Budget.fromJson(budget));
    }


}





