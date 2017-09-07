import { Action } from "@ngrx/store";
import * as storeActions from "../actions";
import * as _ from 'lodash';
import { BudgetLine } from "../../../models/budget-line.model";
import { BudgetLinesSort, BudgetLinesSortBy } from "../../../models/budget-line.model";
import { Quote } from "../../../models/quote.model";


export interface State {
    userId: string;
    currentBudgetId: string;
    currentSavingsId: string;
    budgetLinesSort: BudgetLinesSort;
    filteredBudgetLines: BudgetLine[];
    budgetLinesSearchQuery: string;
    currentQuote: Quote;
}

export const INITIAL_UI_STATE: State = {
    userId: undefined,
    currentBudgetId: undefined,
    currentSavingsId: undefined,
    budgetLinesSort: BudgetLinesSort.BY_NAME_ASC,
    filteredBudgetLines: [],
    budgetLinesSearchQuery: "",
    currentQuote: undefined
};

export function uiState(state: State = INITIAL_UI_STATE, action: Action): State {
    switch (action.type) {
        case storeActions.LOAD_DEFAULT_BUDGET_ACTION:
            return {
                ...state
            };

        case storeActions.DEFAULT_BUDGET_LOADED_ACTION:
            return handleDefaultBudgetLoadedAction(state, <any>action);

        case storeActions.BUDGET_LINES_SORT_LOADED_ACTION:
            return {
                ...state
            };
        case storeActions.SET_BUDGET_LINES_SORT_ACTION:
            return handleSetBudgetLinesSortAction(state, <any>action);
        case storeActions.BUDGET_LINES_SORT_SET_ACTION:
            return {
                ...state
            };
        case storeActions.LOAD_BUDGET_LINES_SORT_ACTION:
            return {
                ...state
            };
        case storeActions.LOAD_FILTERED_BUDGET_LINES_ACTION:
            return {
                ...state
            };
        case storeActions.FILTERED_BUDGET_LINES_LOADED_ACTION:
            return {
                ...state
            };
        case storeActions.SET_FILTERED_BUDGET_LINES_ACTION:
            return handleSetFilteredBudgetLinesAction(state, <any>action);
        case storeActions.FILTERED_BUDGET_LINES_SET_ACTION:
            return {
                ...state
            };
        case storeActions.SET_BUDGET_LINES_SEARCH_QUERY_ACTION:
            return handleSetBudgetLinesSearchQueryAction(state, <any>action);

        case storeActions.LOAD_RANDOM_QUOTE_ACTION:
            return {
                ...state
            };
        case storeActions.RANDOM_QUOTE_LOADED_ACTION:
            return handleRandomQuoteLoadedAction(state, <any>action);

        default:
            return state;
    }
}

function handleRandomQuoteLoadedAction(state: State, action: storeActions.RandomQuoteLoadedAction): State {
    const newUiState: State = _.cloneDeep(state);
    newUiState.currentQuote = action.payload;
    return newUiState;
}

function handleSetBudgetLinesSearchQueryAction(state: State, action: storeActions.SetBudgetLinesSearchQueryAction): State {
    const newUiState: State = _.cloneDeep(state);
    newUiState.budgetLinesSearchQuery = action.payload;
    return newUiState;
}

function handleSetFilteredBudgetLinesAction(state: State, action: storeActions.SetFilteredBudgetLinesAction): State {
    let newUiState: State = _.cloneDeep(state);
    newUiState.filteredBudgetLines = action.payload;
    newUiState = sortBudgetLines(state, newUiState);
    return newUiState;
}

function handleDefaultBudgetLoadedAction(state: State, action: storeActions.DefaultBudgetLoadedAction): State {
    const newUiState: State = _.cloneDeep(state);
    newUiState.currentBudgetId = action.payload.$key;
    return newUiState;
}

function handleSetBudgetLinesSortAction(state: State, action: storeActions.SetBudgetLinesSortAction): State {
    let newUiState: State = _.cloneDeep(state);
    newUiState = sortBudgetLines(state, newUiState, action.payload);
    return newUiState;
}

function sortBudgetLines(state: State, newUiState: State, sortBy?: BudgetLinesSortBy): State {
    if (sortBy === undefined) {
        switch (state.budgetLinesSort) {
            case BudgetLinesSort.BY_CASH_LEFT_ASC:
                newUiState.filteredBudgetLines = sortByCashLeft(newUiState.filteredBudgetLines, false);
                break;
            case BudgetLinesSort.BY_CASH_LEFT_DESC:
                newUiState.filteredBudgetLines = sortByCashLeft(newUiState.filteredBudgetLines, true);
                break;
            case BudgetLinesSort.BY_NAME_ASC:
                newUiState.filteredBudgetLines = sortByName(newUiState.filteredBudgetLines, false);
                break;
            case BudgetLinesSort.BY_NAME_DESC:
                newUiState.filteredBudgetLines = sortByName(newUiState.filteredBudgetLines, true);
                break;
            default:
                break;
        }
    }
    else if (sortBy === BudgetLinesSortBy.BY_CASH_LEFT) {
        //sortowanie po cash left
        if (state.budgetLinesSort === BudgetLinesSort.BY_CASH_LEFT_ASC) {
            newUiState.budgetLinesSort = BudgetLinesSort.BY_CASH_LEFT_DESC;
            newUiState.filteredBudgetLines = sortByCashLeft(newUiState.filteredBudgetLines, true);
        } else {
            newUiState.budgetLinesSort = BudgetLinesSort.BY_CASH_LEFT_ASC;
            newUiState.filteredBudgetLines = sortByCashLeft(newUiState.filteredBudgetLines, false);
        }
    }
    else {
        //sortowanie po name
        if (state.budgetLinesSort === BudgetLinesSort.BY_NAME_ASC) {
            newUiState.budgetLinesSort = BudgetLinesSort.BY_NAME_DESC;
            newUiState.filteredBudgetLines = sortByName(newUiState.filteredBudgetLines, true);
        } else {
            newUiState.budgetLinesSort = BudgetLinesSort.BY_NAME_ASC;
            newUiState.filteredBudgetLines = sortByName(newUiState.filteredBudgetLines, false);
        }
    }

    return newUiState;
}


function sortByName(lines: BudgetLine[], isDesc: boolean = false): BudgetLine[] {

    if (lines) {
        lines.sort(function (a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return isDesc ? 1 : -1;
            }
            if (nameA > nameB) {
                return isDesc ? -1 : 1;
            }
            return 0;
        });
        return lines;
    } else {
        return []
    };
}


function sortByCashLeft(lines: BudgetLine[], isDesc: boolean = false): BudgetLine[] {

    if (lines) {
        lines.sort(function (a, b) {
            return isDesc ? b.cashLeft - a.cashLeft : a.cashLeft - b.cashLeft;
        });
        return lines;
    } else {
        return []
    };
}

function sortByNoOutgoes(lines: BudgetLine[], isDesc: boolean = false): BudgetLine[] {
    if (lines) {
        lines.sort(function (a, b) {
            return isDesc ? b.noOutgoes - a.noOutgoes : a.noOutgoes - b.noOutgoes;
        });
        return lines;
    } else {
        return []
    };
}