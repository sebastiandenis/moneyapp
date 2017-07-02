import { Injectable, Inject } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseApp } from "angularfire2";
import { FirebaseListFactoryOpts } from "angularfire2/interfaces";
import { Observable, Subject } from "rxjs/Rx";
import { AuthService } from "./auth.service";
import { Saving } from "../models/saving";
import { SavingLine } from "../models/saving-line";
import { SavingItem } from "../models/saving-item";

@Injectable()
export class SavingsService {

    currentSaving$: Observable<Saving>;


    sdkDb: any;
    constructor(private db: AngularFireDatabase, @Inject(FirebaseApp) fb: FirebaseApp, private authService: AuthService) {
        this.sdkDb = fb.database().ref();

    }

    init() {

        this.currentSaving$ = this.authService.user$
            .map(user => user.config)
            .filter(userConfig => userConfig != null)
            .map(userConfig => userConfig.currentSavingId)
            .switchMap(savingId => {
                return this.findSavingById(savingId)

            });
    }




    findSavingLines(): Observable<SavingLine[]> {
        return this.currentSaving$
            .switchMap((saving) => saving.savingLines);
    }

    findSavingById(id: string): Observable<Saving> {
        return this.db.list('savings', {
            query: {
                orderByKey: true,
                equalTo: id,
                limitToFirst: 1
            }
        })
            .map(results => {
                results[0].savingLines = this.findAllLinesForSaving(results[0].$key);
                return results[0];
            })

            .map(saving => Saving.fromJson(saving))


    }

    findSavingLinesKeysPerSavingId(id: string, query: FirebaseListFactoryOpts = {}): Observable<string[]> {
        return this.findSavingById(id)
            .filter(saving => !!saving)
            .switchMap(saving => this.db.list(`savings/${id}/lines`, query))
            .map(lspb => lspb.map(lpb => lpb.$key))
    }

    findSavingLinesForKeys(savingLinesKeys$: Observable<string[]>): Observable<SavingLine[]> {
        return savingLinesKeys$
            .map(lpb => lpb.map(linesKey => this.db.object('savingLines/' + linesKey)))
            .flatMap(fbojs => Observable.combineLatest(fbojs));
    }

    findAllLinesForSaving(savingId: string): Observable<SavingLine[]> {
        return this.findSavingLinesForKeys(this.findSavingLinesKeysPerSavingId(savingId));
    }

    sortByName(lines: SavingLine[], isDesc: boolean = false): SavingLine[] {

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


    sortByCashLeft(lines: SavingLine[], isDesc: boolean = false): SavingLine[] {

        if (lines) {
            lines.sort(function (a, b) {
                return isDesc ? b.cashLeft - a.cashLeft : a.cashLeft - b.cashLeft;
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



    updateSavingLine(lineId: string, line: SavingLine): Observable<any> {
        const lineToSave = Object.assign({}, line);
        delete (lineToSave.$key);
        //  console.log("SavingLine to save: ", lineToSave);

        let dataToSave = {};
        if (!lineId) {
            //jeżeli nowa linia 
            lineId = this.sdkDb.child('savingLines').push().key; //utwórz nowy klucz
        }
        dataToSave[`savingLines/${lineId}`] = lineToSave;

        return this.firebaseUpdate(dataToSave);

    }

    removeSavingLine(savingId: string, lineId: string): Observable<any> {
        let dataToRemove = {};
        dataToRemove[`savings/${savingId}/lines/${lineId}`] = null;

        //reszta usuwana za pomocą funkcji GCF

        return this.firebaseUpdate(dataToRemove);
    }


    addSavingItem(saving: Saving, line: SavingLine, savingItemAmount: number) {
        let dataToSave = {}; //tu będą dane do zapisu
        const savingItemToSave = new SavingItem('', savingItemAmount, line.$key, '', '');
        delete (savingItemToSave.$key);
        delete (savingItemToSave.name);
        delete (savingItemToSave.description);

        const newSavingItemKey = this.sdkDb.child('savingItems').push().key; // tworzenie klucza dla nowego obiektu savingItem
        dataToSave["savingItems/" + newSavingItemKey] = savingItemToSave; //przygotowanie obiektu w savingItem

        //reszta działan w funkcji google cloud

        return this.firebaseUpdate(dataToSave);
    }

}