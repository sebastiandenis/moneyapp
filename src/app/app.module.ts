import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule, Http } from "@angular/http";
import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

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

import { BudgetService } from "../services/budget.service";
import { SavingsService } from "../services/savings.service";

import { SavingsPopoverPage } from '../pages/savings/savings-popover';

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducers } from './store/app.reducers';

import { LoadDefaultBudgetEffectService } from "./store/effects/load-default-budget-effect.service";
import { LoadDefaultBudgetLinesEffectService } from "./store/effects/load-default-budget-lines-effect.service";
import { LoadRandomQuoteEffectService } from "./store/effects/load-random-quote-effect.service";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}




@NgModule({
  declarations: [
    MyApp,
    SavingsPopoverPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([LoadDefaultBudgetEffectService, LoadDefaultBudgetLinesEffectService,
      LoadRandomQuoteEffectService]),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SavingsPopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    AngularFireAuth,
    BudgetService,
    SavingsService,
    QuoteService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
