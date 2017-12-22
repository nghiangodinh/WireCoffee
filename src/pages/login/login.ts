import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { RegisterPage } from "../pages";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  regPage = RegisterPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }
}
