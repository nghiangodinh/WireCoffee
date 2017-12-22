import { MenuServiceProvider } from '../../providers/providers';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {

  myCoffee:any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menuService: MenuServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  ngOnInit() {
    this.grabMenu();
  }

  grabMenu() {
    return this.menuService
      .getCafeDB()
      .then(coffee => this.myCoffee = coffee);
  }

  chooseCafe(id) {
    console.log(id);
  }

}
