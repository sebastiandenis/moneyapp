import { Action } from "@ngrx/store";
//import { StoreData, INITIAL_STORE_DATA} from "../store-data";
import * as storeActions from "../actions";
import * as _ from 'lodash';
import { Budget } from "../../../models/budget.model";
import { BudgetLine } from "../../../models/budget-line.model";


export interface State {
    budget: Budget;
    budgetLines: BudgetLine[];
}


export const INITIAL_STORE_DATA: State = {
    budget: {
        $key: undefined,
        name: undefined,
        dateStart: undefined,
        dateEnd: undefined,
        totalCash: 0,
        cashLeft: 0,
    },
    budgetLines: []
};

export function storeData(state = INITIAL_STORE_DATA, action: Action): State {
    switch (action.type) {
        case storeActions.LOAD_DEFAULT_BUDGET_ACTION:
            return {
                ...state
            };

        case storeActions.DEFAULT_BUDGET_LOADED_ACTION:
            return handleDefaultBudgetLoadedAction(state, <any>action);

        case storeActions.LOAD_DEFAULT_BUDGET_LINES_ACTION:
            return {
                ...state
            };
        case storeActions.DEFAULT_BUDGET_LINES_LOADED_ACTION:
            return handleDefaultBudgetLinesLoadedAction(state, <any>action);

        default:
            return state;
    }
}

function handleDefaultBudgetLinesLoadedAction(state: State, action: storeActions.DefaultBudgetLinesLoadedAction): State {
    const newState: State = _.cloneDeep(state);
    newState.budgetLines = action.payload;
    return newState;
}

function handleDefaultBudgetLoadedAction(state: State, action: storeActions.DefaultBudgetLoadedAction): State {
    const newState: State = _.cloneDeep(state);
    newState.budget = action.payload;
    return newState;
}