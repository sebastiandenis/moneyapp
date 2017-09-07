import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { BudgetService } from "../../../services/budget.service";
import * as storeActions from "../actions";

@Injectable()
export class LoadDefaultBudgetLinesEffectService {
    constructor(private actions$: Actions, private budgetService: BudgetService) {

    }

    @Effect()
    defaultBudgetLines$: Observable<Action> = this.actions$
        .ofType(storeActions.LOAD_DEFAULT_BUDGET_LINES_ACTION)
        .switchMap(action => this.budgetService.findDefaultBudgetLines())
        .mergeMap(allData => {
            return [
                new storeActions.DefaultBudgetLinesLoadedAction(allData),
                new storeActions.SetFilteredBudgetLinesAction(allData)
            ]
        })
}
