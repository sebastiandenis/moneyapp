import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";
import { TranslateService } from '@ngx-translate/core';
import { IonicPage } from "ionic-angular";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Budget } from "../../models/budget.model";
import * as fromApp from '../../app/store/app.reducers';
import * as appActions from "../../app/store/actions";

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {

  budget$: Observable<Budget>;

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public translate: TranslateService,
    private store: Store<fromApp.AppState>) {

  }

  ngOnInit() {
    this.store.dispatch(new appActions.LoadDefaultBudgetAction());
    //  this.budget$ = this.store.select(state => state.storeData.budget);
    //console.log("Wynik store: ", this.store.select('storeData'));
    this.budget$ = this.store.select(state => state.storeData.budget);

    
   
  }


  ionViewDidLoad() {

    console.log("Current lang: ", this.translate.currentLang);
    console.log("FB user email: ", this.authService.getActiveUser().email);
    console.log("FB user UID: ", this.authService.getActiveUser().uid);

  }

  onCheckLang() {
    console.log("onCheckLang: ", this.translate.currentLang);

  }

}
