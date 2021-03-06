import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import firebase from 'firebase';

import { AuthService } from "../services/auth.service";
import { BudgetService } from "../services/budget.service";
import { SavingsService } from "../services/savings.service";
import { QuoteService } from "../services/quote.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'TabsPage';
  loginPage: any = 'LoginPage';

  @ViewChild('nav') navCtrl: NavController;

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private menuCtrl: MenuController,
    private budgetService: BudgetService,
    private savingsService: SavingsService,
    private quoteService: QuoteService,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen) {

    translate.addLangs(["en"]);
    translate.addLangs(["pl"]);
    translate.setDefaultLang('en');
    translate.use('en');

    //firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (!user) {
          console.log("NOT LOGIN");

          this.rootPage = 'LoginPage';
        } else {
          //       console.log("Logged In: ", user);
          this.authService.init();
          this.budgetService.init();
          this.savingsService.init();
          this.quoteService.initRandomQuote('money');
          this.loadLang();
          this.rootPage = 'TabsPage';
        }
      });



    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  loadLang() {
    this.authService.user$.subscribe(
      (user) => {
        this.translate.use(user.config.defaultLang);
      }
    );
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.navCtrl.setRoot('LoginPage');
  }


  onLoad(page: any) {
    this.navCtrl.setRoot(page);
    this.menuCtrl.close();
  }


}
