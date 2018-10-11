import { Component } from '@angular/core';
import { NavController, ToastController, IonicPage } from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { Http } from '../../http-api';
import { presentToast, handleError } from '../../app-functions';
import {Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  adminUser: any;
  constructor(public storage: Storage, public http: Http,  public navCtrl: NavController, public toastCtrl: ToastController) {
    this.adminUser = new FormGroup({user: new FormControl(), pass: new FormControl()});
  }

  public loginAdmin(value: any)
  {
    var jsonArr = {
      "username" : "",
      "password" : ""
    };
    jsonArr.username = value.user;
    jsonArr.password = value.pass;

    this.http.post("/admin/login", jsonArr).subscribe
    (
      (data) =>
      {
        var jsonResp = JSON.parse(data.text());
        if(jsonResp.success)
        {
          presentToast(this.toastCtrl, "Logged in!");
          var notificationToken: any = {}
          this.storage.get('pushToken').then((token) =>
          {
            console.log("Sent token is: "+token);
            notificationToken.token = token;
            this.http.post("/admin/token", notificationToken);
          })
          this.navCtrl.push('TabsPage');
        }
        else
        {
          presentToast(this.toastCtrl, "Invalid username/password combination");
        }
      },
      (error) =>
      {
        handleError(this.navCtrl, error, this.toastCtrl);
      }
    );
  }
}
