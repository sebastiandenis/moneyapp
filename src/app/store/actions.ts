import { Action } from "@ngrx/store";
import { Budget } from "../../models/budget.model";
import { BudgetLinesSort, BudgetLinesSortBy } from "../../models/budget-line.model";
import { BudgetLine } from "../../models/budget-line.model";
import { Quote, QuoteCategory } from "../../models/quote.model";

//STORE-DATA
export const LOAD_DEFAULT_BUDGET_ACTION = 'LOAD_DEFAULT_BUDGET_ACTION';
export const DEFAULT_BUDGET_LOADED_ACTION = 'DEFAULT_BUDGET_LOADED_ACTION';
export const LOAD_DEFAULT_BUDGET_LINES_ACTION = "LOAD_DEFAULT_BUDGET_LINES_ACTION";
export const DEFAULT_BUDGET_LINES_LOADED_ACTION = "DEFAULT_BUDGET_LINES_LOADED_ACTION";

//UI
export const SET_BUDGET_LINES_SORT_ACTION = "SET_BUDGET_LINES_SORT_ACTION";
export const BUDGET_LINES_SORT_SET_ACTION = "BUDGET_LINES_SORT_SET_ACTION";
export const LOAD_BUDGET_LINES_SORT_ACTION = "LOAD_BUDGET_LINES_SORT_ACTION";
export const BUDGET_LINES_SORT_LOADED_ACTION = "BUDGET_LINES_SORT_LOADED_ACTION";
export const LOAD_FILTERED_BUDGET_LINES_ACTION = "LOAD_FILTERED_BUDGET_LINES_ACTION";
export const FILTERED_BUDGET_LINES_LOADED_ACTION = "FILTERED_BUDGET_LINES_LOADED_ACTION";
export const SET_FILTERED_BUDGET_LINES_ACTION = "SET_FILTERED_BUDGET_LINES_ACTION";
export const FILTERED_BUDGET_LINES_SET_ACTION = "FILTERED_BUDGET_LINES_SET_ACTION";
export const SET_BUDGET_LINES_SEARCH_QUERY_ACTION = "SET_BUDGET_LINES_SEARCH_QUERY_ACTION";
export const LOAD_RANDOM_QUOTE_ACTION = "LOAD_RANDOM_QUOTE_ACTION";
export const RANDOM_QUOTE_LOADED_ACTION = "RANDOM_QUOTE_LOADED_ACTION";


export class LoadRandomQuoteAction implements Action {
    readonly type: string = LOAD_RANDOM_QUOTE_ACTION;
    constructor(public payload?: QuoteCategory) { }
}

export class RandomQuoteLoadedAction implements Action {
    readonly type: string = RANDOM_QUOTE_LOADED_ACTION;
    constructor(public payload?: Quote) { }
}

export class SetBudgetLinesSearchQueryAction implements Action {
    readonly type: string = SET_BUDGET_LINES_SEARCH_QUERY_ACTION;
    constructor(public payload?: string) { }
}

export class LoadDefaultBudgetAction implements Action {
    readonly type: string = LOAD_DEFAULT_BUDGET_ACTION;
}

export class DefaultBudgetLoadedAction implements Action {
    readonly type: string = DEFAULT_BUDGET_LOADED_ACTION;
    constructor(public payload?: Budget) {
        //console.log("DefaultBudgetLoadedAction.constructor(): ", payload);
    }
}

export class BudgetLinesSortSetAction implements Action {
    readonly type: string = BUDGET_LINES_SORT_SET_ACTION;
    constructor(public payload?: BudgetLinesSort) {
    }
}

export class SetBudgetLinesSortAction implements Action {
    readonly type: string = SET_BUDGET_LINES_SORT_ACTION;
    constructor(public payload?: BudgetLinesSortBy) {
    }
}

export class LoadBudgetLinesSortAction implements Action {
    readonly type: string = LOAD_BUDGET_LINES_SORT_ACTION;
}

export class BudgetLinesSortLoadedAction implements Action {
    readonly type: string = BUDGET_LINES_SORT_LOADED_ACTION;
    constructor(public payload?: BudgetLinesSort) {
    }
}

export class LoadFilteredBudgetLinesAction implements Action {
    readonly type: string = LOAD_FILTERED_BUDGET_LINES_ACTION;
}

export class FilteredBudgetLinesLoadedAction implements Action {
    readonly type: string = FILTERED_BUDGET_LINES_LOADED_ACTION;
    constructor(public payload?: BudgetLine[]) {
        //console.log("constructor -> FilteredBudgetLinesLoadedAction(): ", payload);
    }
}

export class SetFilteredBudgetLinesAction implements Action {
    readonly type: string = SET_FILTERED_BUDGET_LINES_ACTION;
    constructor(public payload?: BudgetLine[]) {
    }
}

export class FilteredBudgetLinesSetAction implements Action {
    readonly type: string = FILTERED_BUDGET_LINES_SET_ACTION;
}

export class LoadDefaultBudgetLinesAction implements Action {
    readonly type: string = LOAD_DEFAULT_BUDGET_LINES_ACTION;
}

export class DefaultBudgetLinesLoadedAction implements Action {
    readonly type: string = DEFAULT_BUDGET_LINES_LOADED_ACTION;
    constructor(public payload?: BudgetLine[]) {
        console.log("Action -> DefaultBudgetLinesLoadedAction(): ", payload);
    }
}





export type AppActions =
    LoadDefaultBudgetAction |
    DefaultBudgetLoadedAction |
    SetBudgetLinesSortAction |
    BudgetLinesSortSetAction |
    LoadBudgetLinesSortAction |
    BudgetLinesSortLoadedAction |
    LoadFilteredBudgetLinesAction |
    FilteredBudgetLinesLoadedAction |
    SetFilteredBudgetLinesAction |
    FilteredBudgetLinesSetAction |
    LoadDefaultBudgetLinesAction |
    DefaultBudgetLinesLoadedAction;