import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";
import { QuoteService } from "../../services/quote.service";
import { TranslateService } from '@ngx-translate/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as fromApp from '../../app/store/app.reducers';
import { Budget } from "../../models/budget.model";
import { Quote } from "../../models/quote.model";

@IonicPage()
@Component({
  selector: 'page-main-dashboard',
  templateUrl: 'main-dashboard.html',
})
export class MainDashboardPage implements OnInit {

  budget$: Observable<Budget>;
  quote$: Observable<Quote>;

  stroke: number = 15;
  radius: number = 105;
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
    private store: Store<fromApp.AppState>,
    public quoteService: QuoteService,
    private translate: TranslateService,
    private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.budget$ = this.store.select(state => state.storeData.budget);
    this.quote$ = this.store.select(state => state.uiState.currentQuote);
  }


  ionViewDidLoad() {
  }


  getRoundedCashLeft(cashLeft: number) {
    return Math.round(cashLeft);
  }

  daysLeft(dateEnd: Date): number {
    if (dateEnd) {
      let today = new Date();
      return Math.round((dateEnd.valueOf() - today.valueOf()) / (1000 * 60 * 60 * 24));
    } else {
      return 0;
    }
  }


  perDay(cashLeft: number, dateEnd: Date): number {
    let daysLeft = this.daysLeft(dateEnd);
    if (daysLeft && daysLeft > 0 && cashLeft && cashLeft > 0) {
      return Math.round(cashLeft / daysLeft);
    } else {
      return 0;
    }
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
