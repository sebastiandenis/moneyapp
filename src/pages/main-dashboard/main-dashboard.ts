import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";
import { BudgetService } from "../../services/budget.service";

@IonicPage()
@Component({
  selector: 'page-main-dashboard',
  templateUrl: 'main-dashboard.html',
})
export class MainDashboardPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public budgetService: BudgetService) {
  }

  ionViewDidLoad() {
    //pobierz aktywny budżet
    console.log("Pobieram aktywny budżet...");
 
  }

}
