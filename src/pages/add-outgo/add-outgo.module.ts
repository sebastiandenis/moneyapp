import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddOutgoPage } from './add-outgo';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    AddOutgoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddOutgoPage),
    TranslateModule.forChild()
  ],
  exports: [
    AddOutgoPage
  ]
})
export class AddOutgoPageModule {}
