import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SavingsPage } from './savings';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    SavingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SavingsPage),
    TranslateModule.forChild()
  ],
  exports: [
    SavingsPage
  ]
})
export class SavingsPageModule {}
