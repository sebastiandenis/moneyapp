import { ViewController, ModalController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  template: `
    <ion-list>
      <ion-list-header>{{'options' | translate}}</ion-list-header>
      <ion-item (click)="onAddSavingLine()">
        {{'addnewline' | translate}}
      </ion-item>
      <ion-item (click)="close()">
        {{'close' | translate}}
      </ion-item>
    </ion-list>
  `
})
export class SavingsPopoverPage {
  constructor(
    public viewCtrl: ViewController,
    public modalCtrl: ModalController, ) { }

  close() {
    this.viewCtrl.dismiss();
  }

  private onAddSavingLine() {
    const modal = this.modalCtrl.create('EditSavingLinePage' )
    modal.present();
    this.viewCtrl.dismiss();


  }
}