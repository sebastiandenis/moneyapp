import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainDashboardPage } from './main-dashboard';

@NgModule({
  declarations: [
    MainDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(MainDashboardPage),
  ],
  exports: [
    MainDashboardPage
  ]
})
export class MainDashboardPageModule {}
