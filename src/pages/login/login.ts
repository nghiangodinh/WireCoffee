import { Component } from "@angular/core";
import { NavController, LoadingController } from "ionic-angular";
import { NgForm } from "@angular/forms";

import { RegisterPage, HomePage } from "../pages";
import { UserServiceProvider } from "../../providers/providers";


@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  regPage = RegisterPage;

  constructor(
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private userService: UserServiceProvider
  ) {}

  onSubmit(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: "Signing in...",
    });
    loading.present();

    this.userService
      .logOn(form.value.email, form.value.password)
      .then(returned => {
        loading.dismiss();

        if (this.userService.success) {
          this.navCtrl.push(HomePage);
        } else {
          form.reset();
        }
      });
  }
}
