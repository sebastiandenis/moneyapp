import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddOutgoPage } from './add-outgo';

@NgModule({
  declarations: [
    AddOutgoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddOutgoPage),
  ],
  exports: [
    AddOutgoPage
  ]
})
export class AddOutgoPageModule {}
