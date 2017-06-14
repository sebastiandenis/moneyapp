import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";
import { BudgetService } from "../../services/budget.service";
import { QuoteService } from "../../services/quote.service";
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-main-dashboard',
  templateUrl: 'main-dashboard.html',
})
export class MainDashboardPage {

  stroke: number = 15;
  radius: number = 115;
  semicircle: boolean = false;
  rounded: boolean = true;
  responsive: boolean = true;
  clockwise: boolean = false;
  color: string = '#baa0c5';
  background: string = '#c4d2db';
  duration: number = 800;
  animation: string = 'easeOutCubic';
  animationDelay: number = 1000;
  animations: string[] = [];
  gradient: boolean = false;
  realCurrent: number = 0;

  loading: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public budgetService: BudgetService,
    public quoteService: QuoteService,
    private translate: TranslateService,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {


  }





  onAddOutgo() {
    const modal = this.modalCtrl.create('AddOutgoPage', {

    })
    modal.present();

  }

  onLines() {

  }

  getColor(left: number, total: number): string {
    if (left && total) {
      let p = left / total;
      if (p <= 0.15) {
        return "#ff6666";
      } else if (p >= 0.50) {
        return "#99cc00";
      } else {
        return "#ffaa00";
      }
    } else {
      return this.color;
    }
  }

  getBackgroundColor(left: number, total: number): string {
    if (left && total) {
      let p = left / total;
      if (p <= 0.15) {
        return "#ffe6e6";
      } else if (p >= 0.50) {
        return "#ecf9ec";
      } else {
        return "#fff7e6";
      }
    } else {
      return this.color;
    }
  }

  getOverlayStyle() {
    let isSemi = this.semicircle;
    let transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      'top': isSemi ? 'auto' : '50%',
      'bottom': isSemi ? '5%' : 'auto',
      'left': '50%',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size': this.radius / 3.5 + 'px'
    };
  }



}
