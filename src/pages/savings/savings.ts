import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ViewController, ActionSheetController, ModalController } from 'ionic-angular';
import { Subscription } from "rxjs/Rx";
import { SavingLine } from "../../models/saving-line";
import { SavingsService } from "../../services/savings.service";

@IonicPage()
@Component({
  selector: 'page-savings',
  templateUrl: 'savings.html',
})
export class SavingsPage implements OnInit {
  savingLines: SavingLine[] = [];
  //searchQuery: string = '';
  filteredLines: SavingLine[];
  sortByCashLeftOrderAsc: boolean = true;
  sortByNameOrderAsc: boolean = true;
  subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public savingsService: SavingsService,
    public viewCtrl: ViewController,
    public actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
    this.initLines();
  }

  private initLines() {
    this.subscription = this.savingsService.findSavingLines()
      .subscribe(
      (savingLines => this.filteredLines = savingLines.slice())
      );
  }


  ionViewDidLoad() {
    //console.log('ionViewDidLoad SavingsPage');
  }

  ionViewWillUnload() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSortByCashLeft() {
    this.sortByCashLeftOrderAsc = !this.sortByCashLeftOrderAsc;
    this.filteredLines = this.savingsService.sortByCashLeft(this.filteredLines, this.sortByCashLeftOrderAsc);
  }

  onSortByName() {
    this.sortByNameOrderAsc = !this.sortByNameOrderAsc;
    this.filteredLines = this.savingsService.sortByName(this.filteredLines, this.sortByNameOrderAsc);
  }
  /*
    getItems(ev: any) {
      // set val to the value of the searchbar
      let val = ev.target.value;
  
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.filteredLines = this.filteredLines.filter((line) => {
          return (line.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      } else {
        this.initLines();
        return this.filteredLines;
      }
    }
  */
  onLineSelect(selectedLine: SavingLine) {
    this.presentActionSheet(selectedLine);
  }

  presentActionSheet(selectedLine: SavingLine) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Savings',
      buttons: [
        {
          text: 'Add money',
          role: 'addmoney',
          handler: () => {
            this.onAddSavingItem(selectedLine);
          }
        }, {
          text: 'Add line',
          role: 'addline',
          handler: () => {
            console.log('Add line clicked!');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  private onAddSavingItem(selectedLine: SavingLine) {
    const modal = this.modalCtrl.create('AddSavingItemPage', {selectedLine: selectedLine})
    modal.present();
  }




}
