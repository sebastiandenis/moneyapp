import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as fromApp from '../../app/store/app.reducers';
import { BudgetLine } from "../../models/budget-line.model";
import { Budget } from "../../models/budget.model";


@IonicPage()
@Component({
  selector: 'page-add-outgo',
  templateUrl: 'add-outgo.html',
})
export class AddOutgoPage implements OnInit {

  choosenLine: BudgetLine;
  addOutgoForm: FormGroup;
  budget$: Observable<Budget>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<fromApp.AppState>,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.initForm();
    this.budget$ = this.store.select(state => state.storeData.budget);

  }

  private initForm() {

    this.addOutgoForm = new FormGroup({
      'amount': new FormControl(null, Validators.required)
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AddOutgoPage');
  }



  onClose() {
    this.viewCtrl.dismiss();
  }

  onSave(exit: boolean) {
    const value = this.addOutgoForm.value;
    /* TODO: zamienić na akcję
    this.budgetService.addOutgo(this.budget, this.choosenLine, value.amount*1);
    */
    this.addOutgoForm.reset();
    this.choosenLine = null;
    if (exit) {
      this.onClose();
    }
  }


  onChooseLine(lines: BudgetLine[]) {
    //  console.log("BudgetLines from add-outgo: ", lines);
    const modal = this.modalCtrl.create('LinesListPage', {
      //   budgetId: this.budgetId,

      budgetLines: lines
    })
    modal.present();


    modal.onDidDismiss((selectedLine: BudgetLine) => {
      if (selectedLine) {
        // console.log("Cos wybrano: ", selectedLine.name);
        this.choosenLine = selectedLine;
      }
    });
  }

}
