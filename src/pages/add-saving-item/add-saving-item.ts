import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SavingsService } from "../../services/savings.service";
import { SavingLine } from "../../models/saving-line";
import { Saving } from "../../models/saving";
import { Subscription } from "rxjs/Rx";


@IonicPage()
@Component({
  selector: 'page-add-saving-item',
  templateUrl: 'add-saving-item.html',
})
export class AddSavingItemPage implements OnInit {

  choosenLine: SavingLine;
  addSavingItemForm: FormGroup;
  saving: Saving;
  subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public savingsService: SavingsService,
    private viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.initForm();
    this.subscription = this.savingsService.currentSaving$.subscribe(
      (saving) => this.saving = saving
    )
  }

  private initForm() {
    this.choosenLine = this.navParams.get('selectedLine');
    this.addSavingItemForm = new FormGroup({
      'amount': new FormControl(null, Validators.required)
    });
  }


  ionViewDidLoad() {
    //  console.log('ionViewDidLoad AddSavingItemPage');
  }

  ionViewWillUnload() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

  onSave(exit: boolean) {
    const value = this.addSavingItemForm.value;
    this.savingsService.addSavingItem(this.saving, this.choosenLine, value.amount * 1);
    this.addSavingItemForm.reset();
    this.choosenLine = null;
    if (exit) {
      this.onClose();
    }
  }



}
