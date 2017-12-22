import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";

import { HomePage } from "../pages";

import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  reg = {
    email: "",
    password1: "",
    password2: ""
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private afAuth: AngularFireAuth
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");
  }

  displayAlert(alertTitle, alertSub) {
    const alert = this.alertCtrl.create({
      title: alertTitle,
      subTitle: alertSub,
      buttons: ["Ok"]
    });
    alert.present();
  }

  registerAccount() {
    if (this.reg.password1 !== this.reg.password2) {
      this.displayAlert(
        "Password problem!",
        "Passwords do not match, please try again!"
      );
      this.reg.password1 = "";
      this.reg.password2 = "";
    } else {
      this.afAuth.auth
        .createUserWithEmailAndPassword(this.reg.email, this.reg.password1)
        .then(data => this.regSuccess(data))
        .catch(err => this.displayAlert("Error!", err));
    }
  }

  regSuccess(result: any) {
    this.displayAlert(result.email, "Account created for this email address");
    this.afAuth.auth
      .signInWithEmailAndPassword(this.reg.email, this.reg.password1)
      .then(data => this.navCtrl.push(HomePage))
      .catch(err => this.displayAlert("Error!", err));
  }
}
