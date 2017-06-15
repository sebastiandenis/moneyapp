import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { BudgetService } from "../../services/budget.service";
import { BudgetLine } from "../../models/budget-line";
import { Subscription } from "rxjs/Rx";

@IonicPage()
@Component({
  selector: 'page-lines',
  templateUrl: 'lines.html',
})
export class LinesPage implements OnInit{

  budgetLines: BudgetLine[] = [];
  searchQuery: string = '';
  filteredLines: BudgetLine[];
  sortByCashLeftOrderAsc: boolean = true;
  sortByNameOrderAsc: boolean = true;
  subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public budgetService: BudgetService,
    public viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.budgetLines = this.navParams.get('budgetLines');
    this.initLines();

  }

  private initLines() {
    this.subscription = this.budgetService.findBudgetLines()
      .subscribe(
      (budgetLines => this.filteredLines = budgetLines.slice())
      );
  }

  ionViewDidLoad() {
    //   console.log('ionViewDidLoad LinesListPage');
  }

  ionViewWillUnload() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onClose(selectedLine: BudgetLine = null) {
    this.viewCtrl.dismiss(selectedLine);
  }

  onSortByCashLeft() {
    this.sortByCashLeftOrderAsc = !this.sortByCashLeftOrderAsc;
    this.filteredLines = this.budgetService.sortByCashLeft(this.filteredLines, this.sortByCashLeftOrderAsc);
  }

  onSortByName() {
    this.sortByNameOrderAsc = !this.sortByNameOrderAsc;
    this.filteredLines = this.budgetService.sortByName(this.filteredLines, this.sortByNameOrderAsc);
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

  getItems(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filteredLines = this.filteredLines.filter((line) => {
        return (line.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.initLines();
      return this.filteredLines;
    }
  }

  onLineSelect(selectedLine: BudgetLine) {

    this.onClose(selectedLine);
  }


}
