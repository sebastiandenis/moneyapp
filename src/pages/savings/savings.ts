import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ViewController, ActionSheetController, ModalController, AlertController, PopoverController } from 'ionic-angular';
import { Subscription } from "rxjs/Rx";
import { SavingLine } from "../../models/saving-line";
import { SavingsService } from "../../services/savings.service";
import { TranslateService } from '@ngx-translate/core';
import { SavingsPopoverPage} from "./savings-popover";

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
  txtTitle: string;
  txtAddMoney: string;
  txtEditLine: string;
  txtRemoveLine: string;
  txtCancel: string;
  txtRemoveLineTitle: string;
  txtRemoveLineDesc: string;
  txtYes: string;
  txtNo: string;


  constructor(
    public navCtrl: NavController,
    public translate: TranslateService,
    public savingsService: SavingsService,
    public viewCtrl: ViewController,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController
  ) {
  }

  ngOnInit() {
    this.initLines(); //inicjalizacja listy linii

    this.initTranslations();  //inicjalizacja tłumaczeń


  }

  private initLines() {
    this.subscription = this.savingsService.findSavingLines()
      .subscribe(
      (savingLines => this.filteredLines = savingLines.slice())
      );
  }

  private initTranslations() {
    this.translate.get('savings').subscribe((res: string) => {
      this.txtTitle = res;
    });
    this.translate.get('addmoney').subscribe((res: string) => {
      this.txtAddMoney = res;
    });
    this.translate.get('editline').subscribe((res: string) => {
      this.txtEditLine = res;
    });

    this.translate.get('removeline').subscribe((res: string) => {
      this.txtRemoveLine = res;
    });

    this.translate.get('cancel').subscribe((res: string) => {
      this.txtCancel = res;
    });

    this.translate.get('removelineconfirmtitle').subscribe((res: string) => {
      this.txtRemoveLineTitle = res;
    });

    this.translate.get('removelineconfirmdesc').subscribe((res: string) => {
      this.txtRemoveLineDesc = res;
    });

    this.translate.get('tak').subscribe((res: string) => {
      this.txtYes = res;
    });


    this.translate.get('no').subscribe((res: string) => {
      this.txtNo = res;
    });

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

  onLineSelect(selectedLine: SavingLine, savingId: string) {
    this.presentActionSheet(selectedLine, savingId);
  }

  presentActionSheet(selectedLine: SavingLine, savingId: string) {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.txtTitle,
      buttons: [
        {
          text: this.txtAddMoney,
          role: 'addmoney',
          handler: () => {
            this.onAddSavingItem(selectedLine);
          }
        }, {
          text: this.txtEditLine,
          role: 'editline',
          handler: () => {
            this.onEditSavingLine(selectedLine, savingId);
          }
        },
        {
          text: this.txtRemoveLine,
          role: 'removeline',
          handler: () => {
            this.onRemoveSavingLine(selectedLine);
          }
        }, {
          text: this.txtCancel,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  private onShowPopover(event: MouseEvent){
      let popover = this.popoverCtrl.create(SavingsPopoverPage);
      popover.present({
      ev: event
    });
  }

  private onAddSavingItem(selectedLine: SavingLine) {
    const modal = this.modalCtrl.create('AddSavingItemPage', { selectedLine: selectedLine })
    modal.present();
  }

  private onRemoveSavingLine(selectedLine: SavingLine) {
    this.showRemoveConfirm(selectedLine);
  }

  private onEditSavingLine(selectedLine: SavingLine, savingId: string) {
    const modal = this.modalCtrl.create('EditSavingLinePage', { selectedLine: selectedLine, savingId: savingId })
    modal.present();
  }

 

  showRemoveConfirm(selectedLine: SavingLine) {
    let confirm = this.alertCtrl.create({
      title: this.txtRemoveLineTitle,
      message: this.txtRemoveLineDesc,
      buttons: [
        {
          text: this.txtNo,
          handler: () => {
            console.log('Nie clicked');
          }
        },
        {
          text: this.txtYes,
          handler: () => {
            this.savingsService.removeSavingLine(selectedLine.savingId, selectedLine.$key);
          }
        }
      ]
    });
    confirm.present();
  }





}
