import { Component, } from '@angular/core';
import { NavController, ToastController, ModalController, IonicPage} from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Http } from '../../http-api';
import { LoginPage } from '../login/login';
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

    public changePasswordToggle()
    {
        if (!this.editPasswordMode)
            this.editPasswordMode = true;
        else
            this.editPasswordMode = false;
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
        if (value.name.length == 0 || value.surname.length == 0 || value.email.length == 0)
        {
            presentToast(this.toastCtrl, "Please dont leave any field empty");
        }
        else if (!regexEmail.test(value.email)) {
            presentToast(this.toastCtrl, "Please enter a valid email address");
        }
        else if (this.editPasswordMode)
        {
            if (value.newPassword == null || value.newPassword == null || value.newPassword.length == 0)
            {
                presentToast(this.toastCtrl, "Please enter a password");
            }
            else if (value.newPassword !== value.confirmNewPassword)
            {
                presentToast(this.toastCtrl,"New password and confrim password do not match");
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
                    presentToast(this.toastCtrl,"Successfully Submitted");
                    this.editMode = false;
                    this.getInformation();   
                },
                (error) =>
                {
                    presentToast(this.toastCtrl,"Error: " + error);
                }
            );
        }        
    }

    public logOut()
    {
        this.http.get("/admin/logout").subscribe
        (
            (data) =>
            {
                let elements = document.querySelectorAll(".tabbar");

                if (elements != null) {
                    Object.keys(elements).map((key) => {
                        elements[key].style.display = 'none';
                    });
                }
                this.navCtrl.push('LoginPage');
                presentToast(this.toastCtrl,"Logged Out");
            },
            (error) =>
            {
                alert("Error: " + error);
            }            
        );        
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
