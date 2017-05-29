import { Component } from '@angular/core';

import { MainDashboardPage } from '../main-dashboard/main-dashboard';
import { ContactPage } from '../contact/contact';
import { LinesPage } from '../lines/lines';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  mainDashboardPage = MainDashboardPage;
  linesPage = LinesPage;
  contactPage = ContactPage;

  constructor() {

  }
}
