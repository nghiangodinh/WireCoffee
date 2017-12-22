import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { AngularFireModule } from "angularfire2";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from "./app.component";
import {
  HomePage,
  LoginPage,
  RegisterPage
} from "../pages/pages";
import { UserServiceProvider } from '../providers/user-service/user-service';

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
    HomePage,
    LoginPage,
    RegisterPage
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
    HomePage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserServiceProvider
  ]
})
export class AppModule {}
