import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule, Http } from "@angular/http";
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { firebaseConfig } from "../environments/firebase.config";
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from "angularfire2/auth";

import { AuthService } from "../services/auth.service";
import { QuoteService } from "../services/quote.service";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { MainDashboardPage } from "../pages/main-dashboard/main-dashboard";
import { LinesPage } from "../pages/lines/lines";
import { AddOutgoPage } from "../pages/add-outgo/add-outgo";
import { BudgetService } from "../services/budget.service";

import {LinesListPage} from "../pages/lines-list/lines-list";

import { RoundProgressModule } from 'angular-svg-round-progressbar';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    MainDashboardPage,
    LinesPage,
    AddOutgoPage,
    LinesListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    [RoundProgressModule]
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    MainDashboardPage,
    LinesPage,
    AddOutgoPage,
    LinesListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    AngularFireAuth,
    BudgetService,
    QuoteService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
