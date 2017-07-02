import { Component } from '@angular/core';
import { IonicPage } from "ionic-angular";

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  mainDashboardPage = 'MainDashboardPage';
  linesPage = 'LinesPage';
  contactPage = 'ContactPage';
  savingsPage = 'SavingsPage';

  constructor() {

  }
}
