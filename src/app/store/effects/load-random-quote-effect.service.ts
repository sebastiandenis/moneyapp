import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { QuoteService } from "../../../services/quote.service";
import * as storeActions from "../actions";

@Injectable()
export class LoadRandomQuoteEffectService {
    constructor(private actions$: Actions, private quoteService: QuoteService) {

    }

    @Effect() randomQuote$: Observable<Action> = this.actions$
        .ofType(storeActions.LOAD_RANDOM_QUOTE_ACTION)
        .map((action: storeActions.LoadRandomQuoteAction) => {
            return action.payload;
        })
        .switchMap(quoteCategory => this.quoteService.loadRandomQuote(quoteCategory))
        .map(allData => new storeActions.RandomQuoteLoadedAction(allData))
}
