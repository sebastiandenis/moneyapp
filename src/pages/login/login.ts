import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { TranslateService } from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private translate: TranslateService) {
  }



  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: "Signing in..."
    });

    loading.present();
    this.authService.login(form.value.email, form.value.password)
      .subscribe(
      () => {
        loading.dismiss();
        this.goHome();
      },
      err => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: "Sign in error!",
          message: err.message,
          buttons: ["Ok"]
        });
        alert.present();
      }
      )

  }

  goHome() {
    this.navCtrl.push('TabsPage');
  }

}
