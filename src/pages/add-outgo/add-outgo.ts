import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BudgetService } from "../../services/budget.service";
import { BudgetLine } from "../../models/budget-line";
import { Budget } from "../../models/budget";
import { Subscription } from "rxjs/Rx";


@IonicPage()
@Component({
  selector: 'page-add-outgo',
  templateUrl: 'add-outgo.html',
})
export class AddOutgoPage implements OnInit {

  choosenLine: BudgetLine;
  addOutgoForm: FormGroup;
  budget: Budget;
  subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public budgetService: BudgetService,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.initForm();
    this.budgetService.currentBudget$.subscribe(
      (budget) => this.budget = budget
    )
  }

  private initForm() {

    this.addOutgoForm = new FormGroup({
      'amount': new FormControl(null, Validators.required)
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AddOutgoPage');
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
    const value = this.addOutgoForm.value;
    this.budgetService.addOutgo(this.budget, this.choosenLine, value.amount*1);
    this.addOutgoForm.reset();
    this.choosenLine = null;
    if(exit){
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
