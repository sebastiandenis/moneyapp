import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSavingItemPage } from './add-saving-item';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    AddSavingItemPage,
  ],
  imports: [
    IonicPageModule.forChild(AddSavingItemPage),
    TranslateModule.forChild()
  ],
  exports: [
    AddSavingItemPage
  ]
})
export class AddSavingItemPageModule {}
