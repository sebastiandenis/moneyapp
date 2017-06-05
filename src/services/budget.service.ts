import { Injectable, Inject } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseApp } from "angularfire2";
import { FirebaseListFactoryOpts } from "angularfire2/interfaces";
import { Observable, Subject } from "rxjs/Rx";
import { Budget } from "../models/budget";
import { BudgetLine } from "../models/budget-line";
import { AuthService } from "./auth.service";

@Injectable()
export class BudgetService {

    currentBudget$: Observable<Budget>;


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
                return this.findBudgetById(budgetId)
                  //  .map(budget => Budget.fromJson(budget))

            })
           ;


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
            .map(results => {
                results[0].budgetLines = this.findAllLinesForBudget(results[0].$key);
              //  .map(lines => {
            //        this.budgetLines$.next(lines);
            //    });
                
                //console.log("Budget: ", results[0]);
                return results[0];
            })

            .map(budget => Budget.fromJson(budget))
                        

    }
    //.flatMap(fbojs => Observable.combineLatest(fbojs) )

    findBudgetLinesKeysPerBudgetId(id: string, query: FirebaseListFactoryOpts = {}): Observable<string[]> {
        return this.findBudgetById(id)
           // .do(val => console.log("budget", val))
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

    sortByName(lines: BudgetLine[], isDesc: boolean = false): BudgetLine[] {

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


    sortByCashLeft(lines: BudgetLine[], isDesc: boolean = false): BudgetLine[] {

        if (lines) {
            lines.sort(function (a, b) {
                return isDesc ? b.cashLeft - a.cashLeft : a.cashLeft - b.cashLeft;
            });
            return lines;
        } else {
            return []
        };
    }

    sortByNoOutgoes(lines: BudgetLine[], isDesc: boolean = false): BudgetLine[] {
        if (lines) {
            lines.sort(function (a, b) {
                return isDesc ? b.noOutgoes - a.noOutgoes : a.noOutgoes - b.noOutgoes;
            });
            return lines;
        } else {
            return []
        };
    }

    firebaseUpdate(dataToSave) {
        const subject = new Subject();
        this.sdkDb.update(dataToSave)
            .then(
            val => {
                subject.next(val);
                subject.complete();
            },
            err => {
                subject.error(err);
                subject.complete();
            }
            );


        return subject.asObservable();
    }

    updateBudgetLine(lineId: string, line: BudgetLine): Observable<any> {
        const lineToSave = Object.assign({}, line);
        delete (lineToSave.$key);

        let dataToSave = {};
        dataToSave[`budgetLines/${lineId}`] = lineToSave;

        return this.firebaseUpdate(dataToSave);

    }

    addOutgo(budget: Budget, line: BudgetLine, outgoAmount: number) {
        let dataToSave = {}; //tu będą dane do zapisu
        line.cashLeft -= outgoAmount; //odejmij wartość od linii
        budget.cashLeft -= outgoAmount;
        const outgoToSave = Object.assign({}, { amount: outgoAmount }); //tworzenie obiektu outgo
        const newOutgoKey = this.sdkDb.child('outgoes').push().key; // tworzenie klucza dla nowego obiektu outgoes
        Object.assign(line.outgoes, { [newOutgoKey]: true });
        line.noOutgoes++; //zwiększanie liczby outgoes
        dataToSave["outgoes/" + newOutgoKey] = outgoToSave; //przygotowanie obiektu w outgoes
        dataToSave[`budgetLines/${line.$key}`] = line;

        // przygotowanie budżetu do zapisu, nowy obiekt na bazie pierwotnego, zgodny ze strukturą w Firebase
        const budgetToSave = Object.assign({}, budget);
        delete (budgetToSave.$key);
        delete (budgetToSave.budgetLines);
        dataToSave[`budgets/${budget.$key}`] = budgetToSave;
    

        //TODO: przelicz cały budżet w cashLeft
        return this.firebaseUpdate(dataToSave);
    }

}
