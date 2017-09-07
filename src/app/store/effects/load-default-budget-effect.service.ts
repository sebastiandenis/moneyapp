import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { BudgetService } from "../../../services/budget.service";
import * as storeActions from "../actions";

@Injectable()
export class LoadDefaultBudgetEffectService {
    constructor(private actions$: Actions, private budgetService: BudgetService) {

    }

    @Effect() defaultBudget$: Observable<Action> = this.actions$
        .ofType(storeActions.LOAD_DEFAULT_BUDGET_ACTION)
        .switchMap(action => this.budgetService.findDefaultBudget())
        .map(allData => new storeActions.DefaultBudgetLoadedAction(allData))
}