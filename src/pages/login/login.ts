import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import { FormGroup, FormControl} from '@angular/forms';
import { TabsPage } from '../tabs/tabs';

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
    let addr: any = "http://192.168.43.47:8080/admin/login";
    var jsonArr = {
      "username" : "",
      "password" : ""
    };
    jsonArr.username = value.user;
    jsonArr.password = value.pass;

    /*
    var param = jsonArr;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});

    
    this.http.post(addr, param, options).subscribe
    (
      (data) =>
      {
        var jsonResp = JSON.parse(data.text());
        if(jsonResp.success)
        {
          this.presentToast("Logged in!")
          this.navCtrl.push(TabsPage);
        }
      },
      (error) =>
      {
        alert("Error: " + error);
      }
    );*/

    this.presentToast("Logged in!")
    this.navCtrl.push(TabsPage);

    //

  }

  presentToast(text){
    let toast = this.toastCtrl.create(
      {
        message: text,
        duration: 1500,
        position: 'bottom',
        dismissOnPageChange: false
      }
    );
    toast.present();
  }

}
