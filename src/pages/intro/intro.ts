import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("intropage");
  }

  ionViewDidLoad() {
  }

  goToTabsPage(){
    this.navCtrl.setRoot('TabsPage');
    this.navCtrl.popToRoot();
  }
}
