import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SavingsService } from "../../services/savings.service";
import { SavingLine } from "../../models/saving-line";
import { Subscription } from "rxjs/Rx";

@IonicPage()
@Component({
  selector: 'page-edit-saving-line',
  templateUrl: 'edit-saving-line.html',
})
export class EditSavingLinePage implements OnInit {

  editSavingLineForm: FormGroup;
  savingId: string;
  lineToEdit: SavingLine;
  subscription: Subscription;

  constructor(
    public navParams: NavParams,
    public savingsService: SavingsService,
    private viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
   // this.savingId = this.navParams.get('savingId');
    this.lineToEdit = this.navParams.get('selectedLine');

    if (this.isEditing()) {
      //edycja
      this.editSavingLineForm = new FormGroup({
        'lineName': new FormControl(this.lineToEdit.name, Validators.required),
        'amount': new FormControl(this.lineToEdit.cashLeft, Validators.required)
      });
    } else {
      //nowa linia
      this.editSavingLineForm = new FormGroup({
        'lineName': new FormControl(null, Validators.required),
        'amount': new FormControl(null, Validators.required)
      });
    }

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad EditSavingLinePage');
  }

  ionViewWillUnload() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

  onSave(exit: boolean, savingId?: string) {
    const value = this.editSavingLineForm.value;
    if(!this.isEditing()){
      //nowa linia
      this.lineToEdit = new SavingLine(null, savingId, null, 0);
    }
    this.lineToEdit.name = value.lineName;
    this.lineToEdit.cashLeft = value.amount * 1;
    if (this.isEditing()) {
      //edycja linii
      this.savingsService.updateSavingLine(this.lineToEdit.$key, this.lineToEdit);
    } else {
      //dodanie nowej linii
      this.savingsService.updateSavingLine(null, this.lineToEdit);

    }

    this.editSavingLineForm.reset();
    this.savingId = null;
    if (exit) {
      this.onClose();
    }
  }

  isEditing() {
    return this.lineToEdit ? true : false;
  }

}
