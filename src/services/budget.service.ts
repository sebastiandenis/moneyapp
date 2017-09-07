import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase/app';
import { Observable, Subject } from "rxjs/Rx";
import { Budget } from "../models/budget.model";
import { BudgetLine } from "../models/budget-line.model";
import { Outgo } from "../models/outgo";
import { AuthService } from "./auth.service";


@Injectable()
export class BudgetService {

    currentBudget$: Observable<Budget>;


    sdkDb: any;
    constructor(private db: AngularFireDatabase, private authService: AuthService) {
        this.sdkDb = firebase.database().ref();


    }

    /*
    init() {
        this.currentBudget$ = this.findDefaultBudget();
    }

    */

    findDefaultBudget(): Observable<Budget> {
        return this.authService.userConfig$
            .filter(userConfig => userConfig != null)
            .map(userConfig => userConfig.currentBudgetId)
            .switchMap(budgetId => {
                // console.log("Poszukiwany budgetId: ", budgetId);
                return this.findBudgetById(budgetId);
            });
    }

    findDefaultBudgetLines(): Observable<BudgetLine[]> {
        console.log("Wywołuję findDefaultBudgetLines()...");
        return this.findDefaultBudget()
            .switchMap(budget => {
                console.log("Poszukiwanie budgetLines dla budgetId: ", budget.$key);
                return this.findAllLinesForBudgetId(budget.$key);
            });
    }



    /*
        findBudgetLines(): Observable<BudgetLine[]> {
            return this.currentBudget$
                .switchMap((budget) => budget.budgetLines);
        }
        */

    findBudgetById(id: string): Observable<Budget> {
        return this.db.list('budgets', {
            query: {
                orderByKey: true,
                equalTo: id,
                limitToFirst: 1
            }
        })
            /*
                .map(results => {
                    results[0].budgetLines = this.findAllLinesForBudget(results[0].$key);
                    //  .map(lines => {
                    //        this.budgetLines$.next(lines);
                    //    });
    
                    //console.log("Budget: ", results[0]);
                    return results[0];
                })
    
                */
            // .do(() => console.log("Pobieranie budżetu...12345, ID:", id))
            .map((budget) => {
                //  console.log("Pobrany budżet: ", budget[0]);
                return Budget.fromJson(budget[0]);
            })


    }
    //.flatMap(fbojs => Observable.combineLatest(fbojs) )

    findBudgetLinesKeysPerBudgetId(id: string, query = {}): Observable<string[]> {
        return this.db.list(`linesInBudget/${id}`, query)
            .map(lspb => lspb.map(lpb => lpb.$key))
    }

    findBudgetLinesForKeys(budgetLinesKeys$: Observable<string[]>): Observable<BudgetLine[]> {
        return budgetLinesKeys$
            .map(lpb => lpb.map(linesKey => this.db.object('budgetLines/' + linesKey)))
            .flatMap(fbojs => Observable.combineLatest(fbojs));
    }

    findAllLinesForBudgetId(budgetId: string): Observable<BudgetLine[]> {
        return this.findBudgetLinesForKeys(this.findBudgetLinesKeysPerBudgetId(budgetId));
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
        // console.log("Amount typeof: ", typeof outgoAmount);
        const outgoToSave = new Outgo('', outgoAmount, line.$key, '', '');
        delete (outgoToSave.$key);
        delete (outgoToSave.name);
        delete (outgoToSave.description);
        // console.log("outgo to save type of amount: ", typeof outgoToSave.amount);
        //   const outgoToSave = Object.assign({}, { amount: outgoAmount});
        //   Object.assign(outgoToSave, {budgetLineId: line.$key }); //tworzenie obiektu outgo
        // console.log("Outgo to save: ", outgoToSave);
        const newOutgoKey = this.sdkDb.child('outgoes').push().key; // tworzenie klucza dla nowego obiektu outgoes
        //  Object.assign(line.outgoes, { [newOutgoKey]: true });
        //  line.noOutgoes++; //zwiększanie liczby outgoes
        dataToSave["outgoes/" + newOutgoKey] = outgoToSave; //przygotowanie obiektu w outgoes
        //  console.log("Data to save: ", dataToSave);
        //   dataToSave[`budgetLines/${line.$key}`] = line;

        // przygotowanie budżetu do zapisu, nowy obiekt na bazie pierwotnego, zgodny ze strukturą w Firebase
        //     const budgetToSave = Object.assign({}, budget);
        //      delete (budgetToSave.$key);
        //      delete (budgetToSave.budgetLines);
        //     dataToSave[`budgets/${budget.$key}`] = budgetToSave;


        //TODO: przelicz cały budżet w cashLeft
        return this.firebaseUpdate(dataToSave);
    }

}
