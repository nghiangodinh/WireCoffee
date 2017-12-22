import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-reward-modal',
  templateUrl: 'reward-modal.html',
})
export class RewardModalPage {
  displayParam: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController) {
    this.displayParam = this.navParams.get("rewardParam")
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

}
