import { Injectable, Inject } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseApp } from "angularfire2";
import { FirebaseListFactoryOpts } from "angularfire2/interfaces";
import { Observable, Subject, BehaviorSubject } from "rxjs/Rx";
import { Budget } from "../models/budget";
import { BudgetLine } from "../models/budget-line";
import { AuthService } from "./auth.service";

@Injectable()
export class BudgetService {

    private subject = new BehaviorSubject<Budget>(null);
    currentBudget$: Observable<Budget> = this.subject.asObservable();

    sdkDb: any;
    constructor(private db: AngularFireDatabase, @Inject(FirebaseApp) fb: FirebaseApp, private authService: AuthService) {
        this.sdkDb = fb.database().ref();
    }

    init() {
        this.currentBudget$ = this.authService.user$
            .map(user => user.config)
            .filter(userConfig => userConfig != null)
            .map(userConfig => userConfig.currentBudgetId)
            .switchMap(budgetId => {
                return this.findBudgetById(budgetId);
            })

    }




    findBudgetLines(): Observable<BudgetLine[]> {
        return this.currentBudget$
            .switchMap((budget) => budget.budgetLines);
    }

    findBudgetById(id: string): Observable<Budget> {
        return this.db.list('budgets', {
            query: {
                orderByKey: true,
                equalTo: id,
                limitToFirst: 1
            }
        })
            .map(results => results[0])
            .map(budget => {
                //budget.lines = this.findAllLinesForBudget(budget.$key);
                return Budget.fromJson(budget);
            })
    }
    //.flatMap(fbojs => Observable.combineLatest(fbojs) )

    findBudgetLinesKeysPerBudgetId(id: string, query: FirebaseListFactoryOpts = {}): Observable<string[]> {
        return this.findBudgetById(id)
            .do(val => console.log("budget", val))
            .filter(budget => !!budget)
            .switchMap(budget => this.db.list(`budgets/${id}/lines`, query))
            .map(lspb => lspb.map(lpb => lpb.$key))
    }

    findBudgetLinesForKeys(budgetLinesKeys$: Observable<string[]>): Observable<BudgetLine[]> {
        return budgetLinesKeys$
            .map(lpb => lpb.map(linesKey => this.db.object('budgetLines/' + linesKey)))
            .flatMap(fbojs => Observable.combineLatest(fbojs));
    }

    findAllLinesForBudget(budgetId: string): Observable<BudgetLine[]> {
        return this.findBudgetLinesForKeys(this.findBudgetLinesKeysPerBudgetId(budgetId));
    }

}
