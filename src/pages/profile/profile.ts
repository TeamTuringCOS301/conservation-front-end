import { Component, } from '@angular/core';
import { NavController, ToastController, ModalController} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Http } from '../../http-api';
import { LoginPage } from '../login/login';
import { ProfileEditPage } from '../profile-edit/profile-edit';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

    profile:any;

    editMode:boolean = false;

    constructor(public http: Http,  public navCtrl: NavController, public toastCtrl: ToastController,
        public camera: Camera, public modalCtrl: ModalController)
    {
        this.profile = {};  
        this.getInformation();      
    }

    public editName()
    {
        let jsonSend = {
            detail: this.profile.name,
            infoType: "Name",
            password: false
        };
        let addModal = this.modalCtrl.create(ProfileEditPage, {'jsonReceived': jsonSend});
        addModal.onDidDismiss(value => {
            if (value) 
            {              
                let jsonObj = {
                    name: value.infoDetail,
                    surname: this.profile.surname,
                    email: this.profile.email
                };                     
                this.http.post('/admin/update/', jsonObj).subscribe
                (
                    (data) =>
                    {
                        this.presentToast("Successfully Submitted");
                        this.getInformation();
                    },
                    (error) =>
                    {
                        this.presentToast("Error: " + error);
                    }
                );
            }
          });
        addModal.present();
    }

    public editSurname()
    {
        let jsonSend = {
            detail: this.profile.surname,
            infoType: "Surname",
            password: false
        };
        let addModal = this.modalCtrl.create(ProfileEditPage, {'jsonReceived': jsonSend});
        addModal.onDidDismiss(value => {
            if (value) 
            {           
                let jsonObj = {
                    name: this.profile.name,
                    surname: value.infoDetail,
                    email: this.profile.email
                };                     
                this.http.post('/admin/update/', jsonObj).subscribe
                (
                    (data) =>
                    {
                        this.presentToast("Successfully Submitted");
                        this.getInformation();
                    },
                    (error) =>
                    {
                        this.presentToast("Error: " + error);
                    }
                );
            }
          });
        addModal.present();
    }

    public editEmail()
    {
        let jsonSend = {
            detail: this.profile.email,
            infoType: "Email",
            password: false
        };
        let addModal = this.modalCtrl.create(ProfileEditPage, {'jsonReceived': jsonSend});
        addModal.onDidDismiss(value => {
            if (value) 
            {           
                let jsonObj = {
                    name: this.profile.name,
                    surname: this.profile.surname,
                    email: value.infoDetail
                };                     
                this.http.post('/admin/update/', jsonObj).subscribe
                (
                    (data) =>
                    {
                        this.presentToast("Successfully Submitted");
                        this.getInformation();
                    },
                    (error) =>
                    {
                        this.presentToast("Error: " + error);
                    }
                );
            }
          });
        addModal.present();
    }

    public changePassword()
    {
        let jsonSend = {
            detail: this.profile.password,
            infoType: "Password",
            password: true
        };
        let addModal = this.modalCtrl.create(ProfileEditPage, {'jsonReceived': jsonSend});
        addModal.onDidDismiss(value => {
            if (value) 
            {           
                let jsonObj = {
                    name: this.profile.name,
                    surname: this.profile.surname,
                    email: value.infoDetail
                };                     
                this.http.post('/admin/update/', jsonObj).subscribe
                (
                    (data) =>
                    {
                        this.presentToast("Successfully Submitted");
                        this.getInformation();
                    },
                    (error) =>
                    {
                        this.presentToast("Error: " + error);
                    }
                );
            }
          });
        addModal.present();
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
                this.navCtrl.push(LoginPage);
                this.presentToast("Logged Out");
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
            }
        );
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
