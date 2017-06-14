import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { single } from './data';

@IonicPage()
@Component({
  selector: 'page-lines',
  templateUrl: 'lines.html',
})
export class LinesPage {

  /*
    view: any[] = undefined;
  data: any[];

 colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C']
  };

*/
  // line, area
//  autoScale = true;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  //   this.data = single;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LinesPage');
  }


}
