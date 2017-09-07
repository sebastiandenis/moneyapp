import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { BudgetLine, BudgetLinesSortBy } from "../../models/budget-line.model";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as fromApp from '../../app/store/app.reducers';
import * as appActions from '../../app/store/actions';

@IonicPage()
@Component({
  selector: 'page-lines-list',
  templateUrl: 'lines-list.html',
})
export class LinesListPage implements OnInit {
  newOutgo: number;
  budgetLines$: Observable<BudgetLine[]>;
  searchQuery$: Observable<string>;
  filteredLines$: Observable<BudgetLine[]>;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<fromApp.AppState>,
    public viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.initLines();
  }

  initLines() {
    this.budgetLines$ = this.store.select(state => state.storeData.budgetLines);
    this.filteredLines$ = this.store.select(state => state.uiState.filteredBudgetLines);
    this.searchQuery$ = this.store.select(state => state.uiState.budgetLinesSearchQuery);
  }

  ionViewDidLoad() {
    //   console.log('ionViewDidLoad LinesListPage');
  }



  onClose(selectedLine: BudgetLine = null) {
    this.viewCtrl.dismiss(selectedLine);
  }
  onSortByCashLeft(): void {
    this.store.dispatch(new appActions.SetBudgetLinesSortAction(BudgetLinesSortBy.BY_CASH_LEFT));
  }

  onSortByName(): void {
    this.store.dispatch(new appActions.SetBudgetLinesSortAction(BudgetLinesSortBy.BY_NAME));
  }


  getBadgeColor(cashLeft: number, totalCash: number): string {
    if (cashLeft && totalCash) {
      if (cashLeft <= 0) {
        return "danger";
      } else if (Math.round((cashLeft / totalCash) * 100) < 25) {
        return "warning";
      } else {
        return "success";
      }
    } else {
      return "danger";
    }
  }

  getItems(ev: any, filteredLines: BudgetLine[], budgetLines: BudgetLine[]): BudgetLine[] {
    // set val to the value of the searchbar
    let val = ev.target.value;
    this.store.dispatch(new appActions.SetBudgetLinesSearchQueryAction(val));
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      filteredLines = budgetLines.filter((line) => {
        return (line.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      this.store.dispatch(new appActions.SetFilteredBudgetLinesAction(filteredLines));

    } else {
      this.initLines();
      this.store.dispatch(new appActions.LoadDefaultBudgetLinesAction());
      return filteredLines;
    }
  }

  onLineSelect(selectedLine: BudgetLine) {

    this.onClose(selectedLine);
  }

}
