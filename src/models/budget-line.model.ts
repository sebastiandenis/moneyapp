export interface BudgetLineModel {
    $key: string;
    budgetId: string;
    cashLeft: number;
    cashToSpend: number;
    name: string;
    noOutgoes: number;
}

export class BudgetLine implements BudgetLineModel {
    constructor(public $key: string,
        public budgetId: string,
        public cashLeft: number,
        public cashToSpend: number,
        public name: string,
        public noOutgoes: number) {

    }

    static fromJson({ $key, budgetId, name, cashToSpend, cashLeft, noOutgoes }): BudgetLine {
        return new BudgetLine($key, budgetId, name, cashToSpend, cashLeft, noOutgoes);
    }

    static fromJsonArray(json: any[]): BudgetLine[] {
        return json.map(budget => BudgetLine.fromJson(budget));
    }
}

export enum BudgetLinesSort {
    BY_CASH_LEFT_ASC,
    BY_CASH_LEFT_DESC,
    BY_NAME_ASC,
    BY_NAME_DESC
}

export enum BudgetLinesSortBy{
    BY_CASH_LEFT,
    BY_NAME
}

