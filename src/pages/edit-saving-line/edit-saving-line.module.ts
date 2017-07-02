import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditSavingLinePage } from './edit-saving-line';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    EditSavingLinePage,
  ],
  imports: [
    IonicPageModule.forChild(EditSavingLinePage),
    TranslateModule.forChild()
  ],
  exports: [
    EditSavingLinePage
  ]
})
export class EditSavingLinePageModule { }
