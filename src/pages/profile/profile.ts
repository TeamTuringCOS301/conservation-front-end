import { Component, } from '@angular/core';
import { NavController, ToastController, ModalController, IonicPage} from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Http } from '../../http-api';
import { presentToast, handleError } from '../../app-functions';

@IonicPage({})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

    profile:any;

    editMode:boolean = false;
    editPasswordMode:boolean = false;
    edittedProfile:any;

    constructor(public http: Http,  public navCtrl: NavController, public toastCtrl: ToastController,
        public camera: Camera, public modalCtrl: ModalController)
    {
        this.edittedProfile = new FormGroup({
            name: new FormControl(),
            surname: new FormControl(),
            email: new FormControl(),
            oldPassword: new FormControl(),
            newPassword: new FormControl(),
            confirmNewPassword: new FormControl()
        });
        this.profile = {};  
        this.getInformation();      
    }

    public editToggle()
    {
        if (!this.editMode)
        {
            this.edittedProfile.reset();
            this.editMode = true;
        }
        else
            this.editMode = false;
    }

    public edit(value)
    {
        let jsonInfoSend = {
            name: value.name,
            surname: value.surname,
            email: value.email
        };
        var regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value.name == null || value.name == "")
        {
            presentToast(this.toastCtrl, "Name field is empty.");
            return false;
        }
        else if (value.surname == null || value.surname == "")
        {
            presentToast(this.toastCtrl, "Surname field is empty.");
            return false;
        }
        else if (value.email == null || value.email == "")
        {
            presentToast(this.toastCtrl, "Email field is empty.");
            return false;
        }
        else if (!regexEmail.test(value.email)) {
            presentToast(this.toastCtrl, "Please enter a valid email address.");
            return false;
        }
        else if (this.editPasswordMode)
        {
            if (value.newPassword == null || value.newPassword.length == 0)
            {
                presentToast(this.toastCtrl, "Please enter a password.");
            }
            else if (value.newPassword != value.confirmNewPassword)
            {
                presentToast(this.toastCtrl, "New password and Confirm password do not match.");
            }
            else
            {
                let jsonPasswordSend = {
                    old: value.oldPassword,
                    new: value.newPassword
                };
                this.http.post('/admin/password', jsonPasswordSend).subscribe
                (
                    (data) =>
                    {
                        var jsonResp = JSON.parse(data.text());
                        if (!jsonResp.success)    
                            presentToast(this.toastCtrl,"Old password Incorrect");
                        else
                        {
                            this.http.post('/admin/update', jsonInfoSend).subscribe
                            (
                                (data) =>
                                {
                                    presentToast(this.toastCtrl, "Successfully Submitted");
                                    this.editMode = false;
                                    this.editPasswordMode = false;
                                    this.getInformation();   
                                },
                                (error) =>
                                {
                                    handleError(this.navCtrl, error, this.toastCtrl);
                                }
                            );                             
                        }
                    },
                    (error) =>
                    {
                        handleError(this.navCtrl, error, this.toastCtrl);
                    }
                );                                 
            }
        }
        else
        {
            this.http.post('/admin/update', jsonInfoSend).subscribe
            (
                (data) =>
                {
                    this.editMode = false;
                    this.getInformation();
                    presentToast(this.toastCtrl,"Successfully Submitted");
                },
                (error) =>
                {
                    presentToast(this.toastCtrl,"Error: " + error);
                }
            );
        }        
    }
    
    public getInformation()
    {
        this.http.get("/admin/info").subscribe
        (
            (data) =>
            {
                this.profile = JSON.parse(data.text());           
            },
            (error) =>
            {
                handleError(this.navCtrl, error, this.toastCtrl);
            }
        );
    }
}
