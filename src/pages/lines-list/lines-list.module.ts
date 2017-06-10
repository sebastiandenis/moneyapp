import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LinesListPage } from './lines-list';
import { TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    LinesListPage,
  ],
  imports: [
    IonicPageModule.forChild(LinesListPage),
    TranslateModule.forChild()
  ],
  exports: [
    LinesListPage
  ]
})
export class LinesListPageModule {}
