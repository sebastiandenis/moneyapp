import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(
    public navCtrl: NavController, 
    public authService: AuthService,
    public translate: TranslateService) {

  }

  ionViewDidLoad(){

   
    console.log("FB user email: ",this.authService.getActiveUser().email);
    console.log("FB user UID: ",this.authService.getActiveUser().uid);
    
  }

  onCheckLang(){
    console.log("onCheckLang: ", this.translate.currentLang);
  }

}
