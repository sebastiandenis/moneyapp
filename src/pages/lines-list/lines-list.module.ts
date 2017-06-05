import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LinesListPage } from './lines-list';

@NgModule({
  declarations: [
    LinesListPage,
  ],
  imports: [
    IonicPageModule.forChild(LinesListPage),
  ],
  exports: [
    LinesListPage
  ]
})
export class LinesListPageModule {}
