import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LinesPage } from './lines';
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [
    LinesPage,
  ],
  imports: [
    IonicPageModule.forChild(LinesPage),
    TranslateModule.forChild()
  ],
  exports: [
    LinesPage
  ]
})
export class LinesPageModule { }
