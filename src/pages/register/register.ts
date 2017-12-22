import { Component } from "@angular/core";
import {
  NavController,
  AlertController,
  LoadingController
} from "ionic-angular";

import { HomePage } from "../pages";

import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { NgForm } from "@angular/forms/src/directives/ng_form";
import { UserServiceProvider } from "../../providers/providers"

@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private userService: UserServiceProvider
  ) {}

  displayAlert(alertTitle, alertSub) {
    const alert = this.alertCtrl.create({
      title: alertTitle,
      subTitle: alertSub,
      buttons: ["Ok"]
    });
    alert.present();
  }

  onRegister(form: NgForm) {
    if (form.value.password1 !== form.value.password2) {
      this.displayAlert(
        "Password problem!",
        "Passwords do not match, please try again!"
      );
      form.reset({
        email: form.value.email,
        password1: "",
        password2: ""
      });
    } else {
      const loading = this.loadingCtrl.create({
        content: "Creating your account..."
      });
      loading.present();

      this.afAuth.auth
        .createUserWithEmailAndPassword(form.value.email, form.value.password1)
        .then(data => {
          loading.dismiss();
          this.regSuccess(form);
        })
        .catch(err => {
          loading.dismiss();
          this.displayAlert("Error!", err);
        });
    }
  }

  regSuccess(form: NgForm) {
    this.userService
      .logOn(form.value.email, form.value.password1)
      .then(data => this.navCtrl.push(HomePage));
  }
}
