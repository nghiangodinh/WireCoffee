import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { FCM } from '@ionic-native/fcm';

import { AngularFireModule } from "angularfire2";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from "./app.component";
import {
  AboutPage,
  AccountPage,
  HomePage,
  LocationsPage,
  LoginPage,
  MenuPage,
  RegisterPage,
  RewardModalPage
} from "../pages/pages";

import {
  RewardServiceProvider,
  UserServiceProvider
} from "../providers/providers"
import { MenuServiceProvider } from '../providers/menu-service/menu-service';

export const firebaseConfig = {
  apiKey: "AIzaSyCuMTJOkLADDkJoiCP9aainHhyza4DUBro",
  authDomain: "wirecoffee-e0f3e.firebaseapp.com",
  databaseURL: "https://wirecoffee-e0f3e.firebaseio.com",
  projectId: "wirecoffee-e0f3e",
  storageBucket: "wirecoffee-e0f3e.appspot.com",
  messagingSenderId: "289651362413"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AccountPage,
    HomePage,
    LocationsPage,
    LoginPage,
    MenuPage,
    RegisterPage,
    RewardModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AccountPage,
    HomePage,
    LocationsPage,
    LoginPage,
    MenuPage,
    RegisterPage,
    RewardModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RewardServiceProvider,
    UserServiceProvider,
    FCM,
    MenuServiceProvider
  ]
})
export class AppModule {}
