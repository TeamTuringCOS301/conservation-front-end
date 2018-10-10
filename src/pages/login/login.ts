import { Component } from '@angular/core';
import { NavController, ToastController, IonicPage } from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { Http } from '../../http-api';
import { presentToast, handleError } from '../../app-functions';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  adminUser: any;
  constructor(public http: Http,  public navCtrl: NavController, public toastCtrl: ToastController) {
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
