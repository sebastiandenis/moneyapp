import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainDashboardPage } from './main-dashboard';
import { TranslateModule } from "@ngx-translate/core";
import { RoundProgressModule } from 'angular-svg-round-progressbar';


@NgModule({
  declarations: [
    MainDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(MainDashboardPage),
    TranslateModule.forChild(),
    [RoundProgressModule]
  ],
  exports: [
    MainDashboardPage
  ]
})
export class MainDashboardPageModule { }
