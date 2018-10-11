import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { initializeFirebase, enableMessages } from '../push-notification';
import { LoginPage } from '../pages/login/login';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'LoginPage';

  constructor(public storage: Storage, public toastCtrl: ToastController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      var token = initializeFirebase();
      this.storage.set('pushToken', token);
      enableMessages(toastCtrl);
      //askForPermissioToReceiveNotifications();
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
