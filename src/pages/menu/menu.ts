import { MenuServiceProvider } from '../../providers/providers';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuDetailPage } from '../pages';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {
  menuDetailPage = MenuDetailPage

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
    this.navCtrl.push(this.menuDetailPage, {
      id: id
    });
  }

}
