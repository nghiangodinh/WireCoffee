import { UserServiceProvider } from "./../../providers/user-service/user-service";
import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import {
  AboutPage,
  AccountPage,
  CheckoutPage,
  MenuPage,
  LocationsPage,
  LoginPage
} from "../pages";

import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
//import { FCM } from "@ionic-native/fcm";


@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  menuData = [
    { title: "Our Menu", pic: "assets/img/soup1.jpg", pushPage: MenuPage },
    {
      title: "Account",
      pic: "assets/img/coffee-people3.jpg",
      pushPage: AccountPage
    },
    { title: "About Us", pic: "assets/img/coffee6.jpg", pushPage: AboutPage },
    {
      title: "Locations",
      pic: "assets/img/cafe2.jpg",
      pushPage: LocationsPage
    }
  ];

  logPage = LoginPage;
  checkoutPage = CheckoutPage
  loggedIn: any;

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private userService: UserServiceProvider//,
    //private fcm: FCM
  ) {}

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.loggedIn = this.userService.user = user.email;
      }
    });

    //this.initFcm();
  }

  signOff() {
    this.userService.logout();
    this.loggedIn = "";
  }

  myPagePush(page) {
    this.navCtrl.push(page).then(result => {
      if (!result) {
        this.userService.displayAlert(
          "Sorry",
          "You must first register an account!"
        );
      }
    });
  }

  initFcm() {
    // this.fcm.onNotification().subscribe(data => {
    //   if (data.wasTapped) {
    //     //Notification was received on device tray and tapped by the user.
    //     console.log(data);
    //     this.userService.displayAlert(data.title, data.content);
    //   } else {
    //     //Notification was received in foreground. Maybe the user needs to be notified.
    //     console.log(data);
    //     this.userService.displayAlert(data.title, data.content);
    //   }
    // });
  }
}
