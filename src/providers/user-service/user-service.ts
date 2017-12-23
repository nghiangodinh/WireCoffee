import * as firebase from "firebase/app";
import { AlertController } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { RewardServiceProvider } from "../providers";

@Injectable()
export class UserServiceProvider {
  items: FirebaseListObservable<any>;
  success: boolean = false;
  user: any

  constructor(
    private alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    private storage: Storage,
    private afDb: AngularFireDatabase,
    private rewardService: RewardServiceProvider
  ) {
    this.items = this.afDb.list("/users");
  }

  logout() {
    this.afAuth.auth
      .signOut()
      .then(loggedOut => {
        this.displayAlert("Logged out", "Come back and visit soon!");
        this.success = false;
      })
      .catch(err => this.displayAlert("Error!", err));
  }

  displayAlert(alertTitle, alertSub) {
    const alert = this.alertCtrl.create({
      title: alertTitle,
      subTitle: alertSub,
      buttons: ["Ok"]
    });
    alert.present();
  }

  storageControl(action, key?, value?) {
    if (action === "set") {
      return this.storage.set(key, value);
    }
    if (action === "get") {
      return this.storage.get(key);
    }
    if (action === "delete") {
      if (!key) {
        this.displayAlert("Warning", "About to delete all user data");
        return this.storage.clear();
      } else {
        this.displayAlert(key, "Deleting this users data");
        return this.storage.remove(key);
      }
    }
  }

  saveNewUser(user: any) {
    const userObj = {
      creation: new Date().toDateString(),
      logins: 1,
      rewardCount: 0,
      lastLogin: new Date().toLocaleString(),
      id: ""
    };
    this.items
      .push({
        username: user,
        creation: userObj.creation,
        logins: userObj.logins,
        rewardCount: userObj.rewardCount,
        lastLogin: userObj.lastLogin
      })
      .then(res => {
        userObj.id = res.key;
        return this.storageControl("set", user, userObj);
      });

    return this.storageControl("get", user);
  }

  updateUser(theUser, theUserData) {
    const newData = {
      creation: theUserData.creation,
      logins: theUserData.logins,
      rewardCount: theUserData.rewardCount,
      lastLogin: new Date().toLocaleString(),
      id: theUserData.id
    };

    this.items.update(newData.id, {
      logins: newData.logins,
      rewardCount: newData.rewardCount,
      lastLogin: newData.lastLogin
    });

    return this.storageControl("set", theUser, newData);
  }

  logOn(user, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(user, password)
      .then(result => {
        this.storageControl("get", user).then(returned => {
          if (!returned) {
            this.saveNewUser(user).then(res => {
              this.displayAlert(user, "New account saved for this user");
            });
          } else {
            this.rewardService
              .rewardsCheck(user, returned)
              .then(rewardResult => {
                this.updateUser(user, rewardResult).then(updated =>
                  console.log(user, updated)
                );
              });
          }
        });

        this.success = true;
        return result;
      })
      .catch(err => {
        this.success = false;
        this.displayAlert("Error logging in", err);
        return err;
      });
  }

  returnUser(){
    return Promise.resolve(this.user);
  }

}
