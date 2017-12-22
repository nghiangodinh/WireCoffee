import { UserServiceProvider } from "./../../providers/providers";
import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-account",
  templateUrl: "account.html"
})
export class AccountPage implements OnInit {
  accountUser: string = "";
  userInfo: any[] = [];
  rewardInfo: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserServiceProvider
  ) {}

  ionViewCanEnter(): boolean {
    return this.userService.success == true;
  }

  ngOnInit() {
    this.accountUser = this.userService.user;

    this.userService
      .storageControl("get", this.accountUser)
      .then(userData => (this.userInfo = userData));

    this.userService
      .storageControl("get", `${this.accountUser}-rewards`)
      .then(rewardData => (this.rewardInfo = rewardData));
  }
}
