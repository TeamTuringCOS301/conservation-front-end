import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Http } from '../../http-api';

@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html'
})
export class ProfileEditPage {

    edittedProfile:any;
    jsonRec:any;

    constructor(public http: Http, public navCtrl: NavController, public toastCtrl: ToastController, public params: NavParams,
         public camera: Camera, public modalCtrl: ModalController, public viewCtrl: ViewController )
    {
        this.edittedProfile = new FormGroup({
            infoDetail: new FormControl(),
            oldPassword: new FormControl(),
            newPassword: new FormControl(),
            confirmNewPassword: new FormControl()
        });
        this.jsonRec = this.params.get('jsonReceived');
    }

    public cancel()
    {   
        this.viewCtrl.dismiss(null);                  
    }

    public editInformation(value:any)
    {
        if (!this.jsonRec.password)
        {
            this.viewCtrl.dismiss(value);
            return;
        }
        else
        {
            if (value.newPassword !== value.confirmNewPassword)
            {
                this.presentToast("New password and confrim password do not password");
            }
            else
            {
                let jsonSend = {
                    old: value.oldPassword,
                    new: value.newPassword
                };
                this.http.post('/admin/password/', jsonSend).subscribe
                (
                    (data) =>
                    {
                        if (data)
                            this.viewCtrl.dismiss(null);
                        else
                            this.presentToast("Old password Incorrect");
                    },
                    (error) =>
                    {
                        alert("Error: " + error);
                    }
                );                
            }
        }    
    }

    presentToast(text)
    {
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